package com.kdt.BookVoyage.Security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Slf4j
@Component
public class CustomCSRFRequestHandler implements CsrfTokenRequestHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfToken) {
      log.info("{}",csrfToken.get().getHeaderName());
    }
}
