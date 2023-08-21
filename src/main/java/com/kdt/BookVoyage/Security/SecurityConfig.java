package com.kdt.BookVoyage.Security;

import com.kdt.BookVoyage.Common.CookieConfig;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenConfig tokenConfig;
    private final CookieConfig cookieConfig;
    private final MemberRepository memberRepository;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .authorizeHttpRequests(authorize ->
                        authorize.requestMatchers("/api/user/logOut").authenticated() //로그아웃
                                .requestMatchers("/api/user/board/**").authenticated() //게시글 관련
                                .requestMatchers("/api/user/update").authenticated() //회원정보 수정
                                .requestMatchers("/api/user/myPage/**").authenticated() //내 페이지 관련
                                .requestMatchers("/api/user/withdrawal").authenticated() //회원탈퇴
                                .requestMatchers("/api/user/findMyInfo/**").permitAll() //내정보 찾기
                                .requestMatchers("/api/user/signUp/**").permitAll() //회원 가입
                                .requestMatchers("/api/user/logIn").permitAll() //로그인
                                .requestMatchers("/api/user/dormantAccount").permitAll() //휴면계정
                                .requestMatchers("/api/admin/login").permitAll()
                                .requestMatchers("/api/admin/autoLogin").hasRole("ADMIN") //로그인
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/api/board/**").hasRole("ADMIN")
                                .requestMatchers("/api/book/**").hasRole("ADMIN")
                )

                .addFilterBefore(new JwtFilter(tokenConfig, cookieConfig, new ModelMapper(), memberRepository), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    protected UserDetailsService user() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("")
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password("")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin,user);
    }

    @Bean
    protected AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {

        return authenticationConfiguration.getAuthenticationManager();
    }


}
