package com.finalproject.Member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public void signUp(MemberDTO memberDTO) {
        StringBuilder usernumber = new StringBuilder();

        for(int i=0; i<10; i++){
            usernumber.append((int) Math.floor(Math.random() * 10));
        }
        memberDTO.setUserNumber(usernumber.toString());
        memberDTO.setDeleteFlag("1");

        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        memberRepository.save(memberEntity);
    }

    @Override
    public void withdrawal(MemberDTO memberDTO) {
        memberRepository.updateDeleteFlag(memberDTO.getId());
    }
}
