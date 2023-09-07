package com.kdt.BookVoyage.Security;

import com.kdt.BookVoyage.Common.CookieConfig;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenConfig tokenConfig;
    private final TokenDecoder tokenDecoder;
    private final CookieConfig cookieConfig;
    private final MemberRepository memberRepository;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize ->
                        authorize

                                .requestMatchers("/api/admin/autoLogin").hasRole("ADMIN") //로그인
                                .requestMatchers("/api/admin/login/**").permitAll() // 관리자 로그인
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/api/user/logIn").permitAll() //로그인
                                .requestMatchers("/api/user/signUp/**").permitAll() //회원 가입
                                .requestMatchers("/api/user/logOut").permitAll() //로그아웃
                                .requestMatchers("/api/user/findMyInfo/**").permitAll() //내정보 찾기
                                .requestMatchers("/api/user/dormantAccount").permitAll() //휴면계정
                                .requestMatchers("/api/book/**").hasRole("USER")
                                .requestMatchers("/api/user/board/**").hasRole("USER") //게시글 관련
                                .requestMatchers("/api/user/myPage/**").hasRole("USER") //내 페이지 관련
                                .requestMatchers("/api/user/withdrawal").hasRole("USER") //회원탈퇴
                                .requestMatchers("/api/user/purchase/**").hasRole("USER") //회원탈퇴
                                .requestMatchers("/api/list/**").permitAll()    // 도서 리스트 호출
                                .requestMatchers("/api/search/**").permitAll() // isbn 검색 결과
                                .requestMatchers("/api/admin/autoLogin").hasRole("ADMIN") //로그인
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/api/books").permitAll()  // 도서 조회 결과 10개씩 페이징 처
                                .requestMatchers("/api/bookdetail").permitAll() // 도서 전체 조회 결과
                                .requestMatchers("/api/bookitems").permitAll()  // id로 도서 검색
                                .requestMatchers("/api/detail/**").permitAll()  // 도서 상세 정보 표시
                                .requestMatchers("/api/searchByIsbn").permitAll()   // isbn으로 db에서 검색
                                .requestMatchers("/api/cart/**").hasRole("USER")    // 장바구니
                                .requestMatchers("/api/board/board-list").permitAll()
                                .requestMatchers("/api/board/board-detail/**").permitAll()
                                .requestMatchers("/api/board/delete-board").permitAll()
                                .requestMatchers("/api/board/update-board").permitAll()
                                .requestMatchers("/api/board/create-board/**").hasRole("USER")
                                .requestMatchers("/api/board/board-detail/reply-list/**").permitAll()
                                .requestMatchers("/api/board/board-detail/reply-delete/**").permitAll()
                                .requestMatchers("/api/board/board-detail/reply-update/**").permitAll()
                                .requestMatchers("/api/board/**").hasRole("USER")
                )

                .addFilterBefore(new JwtFilter(tokenConfig,tokenDecoder, cookieConfig, new ModelMapper(), memberRepository), UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}
