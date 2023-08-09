package com.finalproject.Common;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CookieConfig {
    public Cookie setCookie(String token, String cookieKey, boolean setHttpOnly, String setPath, int setMaxAge) throws UnsupportedEncodingException {
        // an invalid character [32] was present in the cookie value 에러가 뜰 때
        // 서블릿에서 한글 쿠키를 사용하기 위해 인코딩을 진행하거나 쿠키에 특수문자, 공백이 들어가지 않았나 확인
        Cookie cookie = new Cookie(cookieKey, token);
        cookie.setHttpOnly(setHttpOnly); //  httponly속성을 부여해서 xss공격을 막는다
        cookie.setPath(setPath);
        cookie.setMaxAge(setMaxAge);
        return cookie;
    }

    public Map<String, String> requestCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        Map<String, String> result = new HashMap<>();

        for (Cookie cookie : cookies) {
            switch (cookie.getName()) {
                case "accessToken" -> result.put("accessToken", cookie.getValue());
                case "refreshToken" -> result.put("refreshToken", cookie.getValue());
                default -> {
                }
            }
        }
        return result;
    }

    public void deleteCookie(HttpServletResponse response, String[] cookieKeys) {

        for (String s : cookieKeys) {
            Cookie cookie = new Cookie(s, null);
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }

    }
}
