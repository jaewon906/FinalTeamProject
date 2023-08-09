package com.finalproject.Security;

import com.finalproject.Member.MemberDTO;
import com.finalproject.Member.MemberEntity;
import com.finalproject.Member.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenConfig {
    public Date expireDate(long num) {
        return new Date(System.currentTimeMillis() + num);
    }


    public TokenDTO generateToken(MemberDTO memberDTO) { // 초기 토큰 생성
        Date currentTime = new Date(System.currentTimeMillis());
        long accessTokenExpireDate = 60L * 60 * 1000; //60분
        long refreshTokenExpireDate = 7L * 24 * 60 * 60 * 1000; //7일

        Key key = Keys.hmacShaKeyFor(SecretKey.secretKeyToByte);

        String accessToken = Jwts.builder()
                .setHeaderParam("type", "accessToken")
                .claim("nickname", memberDTO.getNickname())
                .claim("userNumber",memberDTO.getUserNumber())
                .claim("userRole", memberDTO.getUserRole())
                .setIssuer(memberDTO.getUserId())
                .setIssuedAt(currentTime)
                .setExpiration(expireDate(accessTokenExpireDate))
                .signWith(key, SignatureAlgorithm.HS256) // (alg, secret_key)는 Deprecated
                .compact();

        String refreshToken = Jwts.builder()
                .setHeaderParam("type", "refreshToken")
                .setIssuedAt(currentTime)
                .setExpiration(expireDate(refreshTokenExpireDate))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public boolean validateToken(String token) { //토큰 검증
        Key key = Keys.hmacShaKeyFor(SecretKey.secretKeyToByte);
        try {
            //서블릿 요청으로부터 가져온 accessToken에 있는 인증키와 해당 인증키와 비교해서 검증하는 과정
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        } catch (Exception e) {
            log.info("Exception", e);
        }
        return false;
    }

}
