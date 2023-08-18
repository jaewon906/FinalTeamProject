package com.kdt.BookVoyage.Member;

import com.kdt.BookVoyage.EmailVerification.EmailDTO;
import com.kdt.BookVoyage.EmailVerification.EmailService;
import jakarta.mail.AuthenticationFailedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberServiceImpl memberService;
    private final EmailService emailService;

    @PostMapping("/signUp") //회원 가입
    public boolean signUp(@Valid MemberDTO memberDTO) throws Exception {
       return memberService.signUp(memberDTO);
    }

    @GetMapping("/signUp/idValidation") //아이디 중복 검증
    public boolean idValidation(@Valid MemberDTO memberDTO){
        return memberService.idDuplicateValidation(memberDTO);
    }

    @GetMapping("/signUp/nicknameValidation") //닉네임 중복검증
    public boolean nicknameValidation(@Valid MemberDTO memberDTO){
        return memberService.nicknameDuplicateValidation(memberDTO);
    }

    @GetMapping("/signUp/emailValidation") //이메일 중복 검증 및 인증번호 전송
    public boolean emailValidation(@Valid EmailDTO emailDTO) { // 이메일 중복검증
        return memberService.emailDuplicateValidation(emailDTO);
    }


    @GetMapping("/signUp/email/auth") // 회원가입 시 이메일 인증
    public boolean emailAuthentication(EmailDTO emailDTO) throws AuthenticationFailedException {
        return memberService.emailAuthentication(emailDTO);
    }

    @GetMapping("/logIn") //로그인
    public boolean login(MemberDTO memberDTO, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
       return memberService.login(memberDTO, request, response);
    }

    @GetMapping("/logOut") //로그아웃
    public void logout(HttpServletResponse response) {
        memberService.logout(response);
    }

    @GetMapping("/myPage") //본인 정보 열람
    public MemberDTO myInfo(MemberDTO memberDTO) {
        return memberService.showMyInfo(memberDTO);
    }

    @GetMapping("/myPage/auth") //본인 정보 열람 전 암호 입력
    public boolean myInfoAuth(MemberDTO memberDTO) {
        return memberService.myInfoAuth(memberDTO);
    }

    @PostMapping("/update") // 본인 정보 업데이트
    public boolean modifyInfo(@Valid MemberDTO memberDTO) { //회원 정보 수정
        return memberService.modifyInfo(memberDTO);
    }


    @GetMapping("/findMyInfo/byEmail")// 아이디찾기(이메일값 넘기고 인증번호 받기)
    public List<String> findId(@Valid MemberDTO memberDTO) {
       return emailService.findIdByEmail(memberDTO);
    }

    @GetMapping("/findMyInfo/byEmail/auth")// 아이디찾기(전송된 인증번호 입력하기)
    public String findIdVerificationCode(EmailDTO emailDTO) throws AuthenticationFailedException {
        return emailService.findIdCompareVerificationCodeAndInput(emailDTO);
    }

    @GetMapping("/findMyInfo/byEmailAndId") //비밀번호 찾기(id,이메일값 넘기고 인증번호 받기)
    public List<String> findPassword(MemberDTO memberDTO) {
        return emailService.findPasswordByEmail(memberDTO);
    }

    @GetMapping("/findMyInfo/byEmailAndId/auth") //비밀번호 찾기(전송된 인증번호 입력하기)
    public String findPasswordVerificationCode(EmailDTO emailDTO) throws AuthenticationFailedException {
        return emailService.findPasswordCompareVerificationCodeAndInput(emailDTO);
    }

    @PostMapping("/findMyInfo/resetAndModifyPassword") // 비밀번호 초기화 후 재설정
    public void resetAndModifyPassword(MemberDTO memberDTO){
        emailService.resetAndModifyPasswordByEmail(memberDTO);
    }

    @PostMapping("/withdrawal") //회원탈퇴
    public void withdrawal(MemberDTO memberDTO) {
        memberService.withdrawal(memberDTO);
    }

    @PostMapping("/dormantAccount") //휴면 -> 일반 전환
    public void wakeUpDormantAccount(MemberDTO memberDTO) {
        memberService.withdrawal1(memberDTO);
    }


}
