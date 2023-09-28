package com.kdt.BookVoyage.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
public class SpringSecurityConfig {

    @Bean
    public WebSecurityCustomizer configureWebSecurity(){
        return (webSecurity)->{webSecurity.httpFirewall(defaultHttpFirewall());};
    }

    @Bean
    public HttpFirewall defaultHttpFirewall(){
        return new DefaultHttpFirewall();
    }
}
