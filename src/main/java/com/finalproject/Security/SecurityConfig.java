package com.finalproject.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors->cors.disable())
                .csrf(csrf->csrf.disable())
                .formLogin(form -> form.disable())
                .authorizeHttpRequests(authorize->
                        authorize.requestMatchers("/api/user/logIn").permitAll()
                                 .requestMatchers("/api/user/signUp").permitAll()
                                .requestMatchers("/api/user/**").authenticated())
                ///.addFilterBefore()
                .build();
    }

}
