package com.finalproject.EmailVerification;

import com.finalproject.Member.MemberDTO;
import com.finalproject.Member.MemberEntity;
import com.finalproject.Member.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmailService {
    private final EmailRepository emailRepository;
    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;

    protected void resetPasswordByEmailAndId() {

    }

    public void findIdByEmail(MemberDTO memberDTO) {
        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(memberDTO.getUserEmail());

        if (byUserEmail.isPresent()) {
            String email = byUserEmail.get().getUserEmail();
            sendEmail(email);
        }
    }

    public void sendEmail(String email) { //해당하는 이메일로 인증코드를 보냄
//        MimeMessage는 javaMail API에서 이메일을 나타내는 클래스
//        javaMailSender는 이메일을 보내는데 사용되는 메일 전송 작업을 추상화함.
//        MimeMessageHelper 생성자의 매개변수 중 true는 멀티파트(사진 동영상을 첨부할 수 있는)형식을 지원여부를 묻는다.

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        String matchedId = matcherIdAndEmail(email); //이메일에 해당하는 id
        String verificationCode = makeVerificationCode(); //인증번호 만들기

        EmailDTO emailDTO = EmailDTO.builder()
                .userEmail(email)
                .userId(matchedId)
                .verificationCode(verificationCode)
                .build();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "EUC-KR");
            helper.setTo(email); //메일 수신자.
            helper.setSubject("[Company]인증코드 입니다."); //메일 제목
            helper.setText("인증코드는 " + verificationCode + " 입니다."); //메일 내용
            javaMailSender.send(mimeMessage);
            log.info("성공");

            EmailEntity emailEntity = EmailEntity.DTOToEntity(emailDTO);
            emailRepository.save(emailEntity);
        } catch (MessagingException e) {
            log.error("실패");
        }

    }

    private String matcherIdAndEmail(String email) { //email에 해당하는 id찾기
        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(email);
        return byUserEmail.map(MemberEntity::getUserId).orElse(null);
    }

    private String makeVerificationCode() { // 인증번호 만들기
        StringBuilder verificationCode = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            verificationCode.append((int) (Math.floor(Math.random() * 10.0)));
        }
        return verificationCode.toString();
    }


    @Transactional
    public MemberDTO sendIdAndEmailAndVerificationCode(EmailDTO emailDTO) {
        EmailEntity emailEntity = EmailEntity.DTOToEntity(emailDTO);
        Optional<EmailEntity> ByUserEmail = emailRepository.findByUserEmail(emailEntity.getUserEmail()); //해당하는 이메일 찾기
        MemberEntity memberEntity = memberRepository.findByUserEmail(ByUserEmail.get().getUserEmail()).get(); //해당하는 이메일의 PK값 찾기


        if (ByUserEmail.get().getUserId().equals(emailEntity.getUserId())) { //이메일이 존재하고 ID가 일치할 때
            if (ByUserEmail.get().getVerificationCode().equals(emailEntity.getVerificationCode())) { //위 조건 + 인증번호가 만족될때

                MemberDTO memberDTO = MemberDTO.EntityToDTO(memberEntity);

                emailRepository.deleteByUserEmail(ByUserEmail.get().getUserEmail());
                return memberDTO;
            }
        }
        return null;
    }
}
