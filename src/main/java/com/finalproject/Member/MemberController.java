package com.finalproject.Member;

import com.finalproject.EmailVerification.EmailDTO;
import com.finalproject.EmailVerification.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {
    private final MemberServiceImpl memberService;
    private final EmailService emailService;

    @PostMapping("/signUp") //회원 가입
    public void signUp(@Valid MemberDTO memberDTO) {
       memberService.signUp(memberDTO);
    }

    @GetMapping("/signUp/idValidation") //아이디 중복 검증
    public boolean idValidation(MemberDTO memberDTO){
        return memberService.idDuplicateValidation(memberDTO);
    }

    @GetMapping("/signUp/nicknameValidation") //닉네임 중복검증
    public boolean nicknameValidation(MemberDTO memberDTO){
        return memberService.nicknameDuplicateValidation(memberDTO);
    }

    @GetMapping("/signUp/emailValidation") //이메일 중복검증
    public boolean emailValidation(MemberDTO memberDTO){ // 이메일 중복검증
        return memberService.emailDuplicateValidation(memberDTO);
    }
    @GetMapping("/logIn") //로그인
    public void login(){}

    @GetMapping("/logOut") //로그아웃
    public void logout(){}

    @GetMapping("/findMyInfo/byEmail")// 아이디찾기
    public void findId(MemberDTO memberDTO){
        emailService.findIdByEmail(memberDTO);
    }

    @GetMapping("/findMyInfo/byEmailAndId") //비밀번호 찾기
    public MemberDTO findPassword(EmailDTO emailDTO){
        return emailService.sendIdAndEmailAndVerificationCode(emailDTO);
    }

    @PostMapping("/findMyInfo/resetAndModifyPassword") // 비밀번호 초기화 후 재설정
    public void resetAndModifyPassword(){}

    @PostMapping("/withdrawal") //회원탈퇴
    public void withdrawal(MemberDTO memberDTO) {
        memberService.withdrawal(memberDTO);
    }


}
