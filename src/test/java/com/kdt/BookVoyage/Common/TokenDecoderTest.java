package com.kdt.BookVoyage.Common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Key;

@SpringBootTest
@Slf4j
class TokenDecoderTest {
    @Test
    public void based64Decoder() {
        String token = "eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IuuwleyerOybkCIsIm5pY2tuYW1lIjoi7J6s7JuQ7Kex7KexIiwidXNlck51bWJlciI6IjI5NDUwMDY3ODEiLCJ1c2VyUm9sZSI6IlVTRVIiLCJpc3MiOiJxd2VyMTIzNCIsImlhdCI6MTY5MjE0ODI0MSwiZXhwIjoxNjkyMTUxODQxfQ.36-W0Y07GZaOIK3jv0jpr9aKWL4Ea-ueTNc244xSa2s";
        String keyStr = "salgbTJWujnsJejsfSLfghaSSjAUWQdjGFUCDOWdJFUAIOFGDGAsdldfojwahfdgFGsajhsdl";
        byte[] byte1 = keyStr.getBytes();
        Key key = Keys.hmacShaKeyFor(byte1);

        Claims body = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();

        log.info(body.get("userNumber",String.class));

    }
}