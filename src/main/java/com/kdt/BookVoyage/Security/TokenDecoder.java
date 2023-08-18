package com.kdt.BookVoyage.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;

@Slf4j
public class TokenDecoder {
    public String accessTokenDecoder(String token, String key) {

        Key secretKey = Keys.hmacShaKeyFor(SecretKey.accessSecretKeyBytes);
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().get(key,String.class);

    }

    public String refreshTokenDecoder(String token, String key) {

        Key secretKey = Keys.hmacShaKeyFor(SecretKey.refreshSecretKeyBytes);
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().get(key,String.class);

    }
}
