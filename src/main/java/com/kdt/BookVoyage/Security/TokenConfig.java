package com.kdt.BookVoyage.Security;

import com.kdt.BookVoyage.Member.MemberDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


    public TokenDTO generateAccessToken(MemberDTO memberDTO) { // 초기 토큰 생성
        Date currentTime = new Date(System.currentTimeMillis());
        long accessTokenExpireDate = 60L * 60 * 1000; //60분

        Key key = Keys.hmacShaKeyFor(SecretKey.accessSecretKeyBytes);

        String accessToken = Jwts.builder()
                .setHeaderParam("type", "accessToken")
                .claim("username",memberDTO.getUsername())
                .claim("nickname", memberDTO.getNickname())
                .claim("userNumber",memberDTO.getUserNumber())
                .setIssuer(memberDTO.getUserId())
                .setIssuedAt(currentTime)
                .setExpiration(expireDate(accessTokenExpireDate))
                .signWith(key, SignatureAlgorithm.HS256) // (alg, secret_key)는 Deprecated
                .compact();

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .build();
    }
    public TokenDTO generateRefreshToken(MemberDTO memberDTO) { // 초기 토큰 생성
        Date currentTime = new Date(System.currentTimeMillis());
        long refreshTokenExpireDate = 7L * 24 * 60 * 60 * 1000; //7일

        Key key = Keys.hmacShaKeyFor(SecretKey.refreshSecretKeyBytes);

        String refreshToken = Jwts.builder()
                .setHeaderParam("type", "refreshToken")
                .claim("userNumber",memberDTO.getUserNumber())
                .claim("role", memberDTO.getRole())
                .setIssuedAt(currentTime)
                .setExpiration(expireDate(refreshTokenExpireDate))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return TokenDTO.builder()
                .grantType("Bearer")
                .refreshToken(refreshToken)
                .build();
    }

    public boolean validateAccessToken(String token) { //토큰 검증
        Key key = Keys.hmacShaKeyFor(SecretKey.accessSecretKeyBytes);
        return validateToken(token, key);
    }

    public boolean validateRefreshToken(String token) { //토큰 검증
        Key key = Keys.hmacShaKeyFor(SecretKey.refreshSecretKeyBytes);
        return validateToken(token, key);
    }

    private boolean validateToken(String token, Key key) {
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
