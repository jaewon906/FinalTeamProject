package com.finalproject.Member;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {
    private final MemberServiceImpl memberService;

    @PostMapping("/signUp") //회원 가입
    public void signUp(MemberDTO memberDTO) {

        memberService.signUp(memberDTO);
    }

    @PostMapping("/withdrawal")
    public void withdrawal(MemberDTO memberDTO) {
        memberService.withdrawal(memberDTO);
    }


}
