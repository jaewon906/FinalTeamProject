package com.finalproject.Member;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public void signUp(MemberDTO memberDTO) {
//Validation이 memberDTO를 인터셉트해서 검사를 먼저하고 엔티티에서 unique를 지정했기 때문에 예외처리 하지않음
        StringBuilder userNumber = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            userNumber.append((int) Math.floor(Math.random() * 10));
        }
        memberDTO.setUserNumber(userNumber.toString());
        memberDTO.setDeleteFlag("1");
//        memberDTO.setUserRole(MemberRole.USER);

        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        memberRepository.save(memberEntity);

    }

    @Override
    public void withdrawal(MemberDTO memberDTO) {
        memberRepository.updateDeleteFlag(memberDTO.getId());
    }

    @Override
    public boolean idDuplicateValidation(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String id = memberEntity.getUserId();

        Optional<MemberEntity> byUserId = memberRepository.findByUserId(id);
        return byUserId.isPresent();
    }

    @Override
    public boolean nicknameDuplicateValidation(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String nickname = memberEntity.getNickname();

        Optional<MemberEntity> byUserNickname = memberRepository.findByNickname(nickname);
        return byUserNickname.isPresent();
    }

    @Override
    public boolean emailDuplicateValidation(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String email = memberEntity.getUserEmail();

        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(email);
        return byUserEmail.isPresent();
    }


}
