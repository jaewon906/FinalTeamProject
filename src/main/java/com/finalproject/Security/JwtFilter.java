package com.finalproject.Security;

import com.finalproject.Member.MemberRole;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final TokenConfig tokenConfig;
    private final ModelMapper modelMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final Cookie[] cookies = request.getCookies();

        String accessToken = "";
        String refreshToken = "";

        try{
            for (Cookie cookie : cookies) {
                String cookieName = cookie.getName();

                switch (cookieName) {
                    case "accessToken" -> accessToken = cookie.getValue();
                    case "refreshToken" -> refreshToken = cookie.getValue();
                }
            }
        }catch (Exception ignore){}


        boolean validateAccessToken = tokenConfig.validateAccessToken(accessToken);
        boolean validateRefreshToken = tokenConfig.validateRefreshToken(refreshToken);

        if (validateAccessToken && validateRefreshToken) {

            log.info("엑세스 토큰과 리프레쉬 토큰 둘 다 인증되었습니다.");

            String map = modelMapper.map(MemberRole.USER, String.class); // USER

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken("", "", List.of(new SimpleGrantedAuthority(map)));

            token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(token);

            filterChain.doFilter(request, response);
        } else {
            if (validateRefreshToken) {
                log.info("엑세스 토큰은 인증되지 않고 리프레쉬 토큰은 인증되었습니다.");
//                Base64.Decoder decoder = Base64.getUrlDecoder();
//                byte[] decode = decoder.decode(refreshToken);
//                String decodeString = Arrays.toString(decode);
//                log.info(decodeString);
//                tokenConfig.generateToken()
            } else {
//                throw new TokenNotValidateException("토큰이 유효하지 않습니다."); //403일 때 로그인해야댐
            }
            filterChain.doFilter(request, response);
        }
    }

    private void regenerateAccessToken(String a, String b) {
    }
}
