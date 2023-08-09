package com.finalproject.Member;

import com.finalproject.EmailVerification.EmailDTO;
import com.finalproject.EmailVerification.EmailRepository;
import com.finalproject.EmailVerification.EmailService;
import jakarta.mail.AuthenticationFailedException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final EmailRepository emailRepository;

    @Override
    public boolean signUp(MemberDTO memberDTO) throws Exception {
//Validation이 memberDTO를 인터셉트해서 검사를 먼저하고 엔티티에서 unique를 지정했기 때문에 예외처리 하지않음
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(memberEntity.getUserId());

        if (byUserId.isEmpty()) {
            memberRepository.save(memberEntity);
            log.info("회원가입에 성공했습니다.");

            return true;
        } else {
            throw new SQLIntegrityConstraintViolationException("회원가입에 실패했습니다.");
        }

    }

//    @Override
//    @Transactional
//    public boolean modifyInfo(MemberDTO memberDTO) { //회원 정보 수정
//        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
//        Optional<MemberEntity> byUserNumber = memberRepository.findByUserNumber(memberEntity.getUserNumber());
//
//        if (byUserNumber.isPresent()) {
//            memberRepository.updateMyInfo(
//                    memberEntity.getUsername(),
//                    memberEntity.getPassword(),
//                    memberEntity.getNickname(),
//                    memberEntity.getUserAddress(),
//                    memberEntity.getInterest(),
//                    memberEntity.getUserAge(),
//                    memberEntity.getUserTel(),
//                    memberEntity.getUserNumber()
//            );
//            log.info("회원정보 수정에 성공했습니다.");
//
//            return true;
//        }
//        else{
//            throw new InvalidDataAccessApiUsageException("회원정보 수정에 실패했습니다.");
//        }
//    }
    @Override
    @Transactional
    public boolean modifyInfo(MemberDTO memberDTO) { //회원 정보 수정
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        Optional<MemberEntity> byUserNumber = memberRepository.findByUserNumber(memberEntity.getUserNumber());

        if(byUserNumber.isPresent()){
            try{
                memberRepository.updateMyInfo(
                        memberEntity.getUsername(),
                        memberEntity.getPassword(),
                        memberEntity.getNickname(),
                        memberEntity.getUserAddress(),
                        memberEntity.getInterest(),
                        memberEntity.getUserAge(),
                        memberEntity.getUserTel(),
                        memberEntity.getUserNumber()
                );
                log.info("회원정보 수정에 성공했습니다.");
                return true;

            }
            catch(Exception e){
                log.error("error {}","",e);
                return false;
            }
        }
        else{
            throw new InvalidDataAccessApiUsageException("회원정보 수정에 실패했습니다.");
        }

    }

    @Override
    public MemberDTO showMyInfo(MemberDTO memberDTO) {
        String userNumber = memberDTO.getUserNumber();
        Optional<MemberEntity> allByUserNumber = memberRepository.findAllByUserNumber(userNumber);

        if (allByUserNumber.isPresent()) {
            log.info("회원 정보 불러오기 완료");
            return MemberDTO.EntityToDTO(allByUserNumber.get());
        } else {
            throw new NullPointerException("회원 정보 불러오기 실패");
        }
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
    @Transactional
    public boolean emailDuplicateValidation(EmailDTO emailDTO) throws Exception {
        String email = emailDTO.getUserEmail();

        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(email);

        if (!byUserEmail.isPresent()) {
            String userEmail = emailDTO.getUserEmail();
            emailRepository.deleteByUserEmail(emailDTO.getUserEmail());
            emailService.sendEmail(userEmail);
            return true;
        } else {
            throw new Exception("이메일이 중복됩니다.");
        }
    }


    @Override
    @Transactional
    public boolean emailAuthentication(EmailDTO emailDTO) throws AuthenticationFailedException {

        String verificationCode = emailRepository.findByUserEmail(emailDTO.getUserEmail()).get().getVerificationCode();

        if (verificationCode.equals(emailDTO.getVerificationCode())) {
            log.info("이메일 인증에 성공했습니다.");
            emailRepository.deleteByUserEmail(emailDTO.getUserEmail());

            return true;
        } else {
            throw new AuthenticationFailedException("인증번호가 일치하지 않습니다.");
        }
    }
}
