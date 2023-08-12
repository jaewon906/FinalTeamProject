package com.finalproject.EmailVerification;

import com.finalproject.Member.MemberDTO;
import com.finalproject.Member.MemberEntity;
import com.finalproject.Member.MemberRepository;
import jakarta.mail.AuthenticationFailedException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmailService {
    private final EmailRepository emailRepository;
    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;

    public List<String> findIdByEmail(MemberDTO memberDTO) { //아이디 찾기

        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(memberDTO.getUserEmail());
        List<String> result = new ArrayList<>();

        if (byUserEmail.isPresent()) {
            emailRepository.deleteByUserEmail(byUserEmail.get().getUserEmail()); //이메일에 매핑되는 인증코드 초기화
            log.info("아이디 찾기");
            log.info("입력값에 해당하는 이메일을 찾았습니다.");

            String email = byUserEmail.get().getUserEmail();
            boolean isEmailSendSucceed = sendEmail(email);

            if (isEmailSendSucceed) {
                result.add(email);
                return result;
            }

         } else {
            throw new NullPointerException("일치하는 값이 없습니다.");
         }
         return null;
    }

    public List<String> findPasswordByEmail(MemberDTO memberDTO){ //비밀번호 찾기
        Optional<MemberEntity> byUserEmailAndUserId = memberRepository.findByUserEmailAndUserId(memberDTO.getUserEmail(), memberDTO.getUserId());
        List<String> result = new ArrayList<>();


        if (byUserEmailAndUserId.isPresent()) {
            emailRepository.deleteByUserEmail(byUserEmailAndUserId.get().getUserEmail());//이메일에 매핑되는 인증코드 초기화
            log.info("비밀번호 찾기");
            log.info("입력값에 해당하는 아이디와 이메일을 찾았습니다.");

            String email = byUserEmailAndUserId.get().getUserEmail();
            String userId = byUserEmailAndUserId.get().getUserId();
            boolean isEmailSendSucceed = sendEmail(email);

            if (isEmailSendSucceed) {
                result.add(email);
                result.add(userId);
                return result;
            }
        }
        else {
            throw new NullPointerException("일치하는 값이 없습니다.");
        }
        return  null;
    }

    public String findIdCompareVerificationCodeAndInput(EmailDTO emailDTO) throws AuthenticationFailedException {// 아이디찾기(전송된 인증번호 입력하기)
        Optional<EmailEntity> byUserEmail = emailRepository.findByUserEmail(emailDTO.getUserEmail());

        if(byUserEmail.isPresent()){

            String verificationCode = byUserEmail.get().getVerificationCode();

            if(verificationCode.equals(emailDTO.getVerificationCode())){
                log.info("(아이디 찾기)인증에 성공했습니다.");
                String userId = byUserEmail.get().getUserId();
                emailRepository.deleteByUserEmail(emailDTO.getUserEmail());

                return userId;
            }
            else{
                throw new AuthenticationFailedException("인증번호가 일치하지 않습니다.");
            }
        }
        else throw new NullPointerException("가입하신 이메일이 존재하지 않습니다.");
    }

    public String findPasswordCompareVerificationCodeAndInput(EmailDTO emailDTO) throws AuthenticationFailedException {// 비밀번호 찾기(전송된 인증번호 입력하기)
        Optional<EmailEntity> byUserEmail = emailRepository.findByUserEmail(emailDTO.getUserEmail());

        if(byUserEmail.isPresent()){
            String verificationCode = byUserEmail.get().getVerificationCode();

            if(verificationCode.equals(emailDTO.getVerificationCode())){
                log.info("(비밀번호 찾기)인증에 성공했습니다.");
                Optional<MemberEntity> byUserEmail1 = memberRepository.findByUserEmail(emailDTO.getUserEmail());

                if(byUserEmail1.isPresent()){
                    String userNumber = byUserEmail1.get().getUserNumber();
                    emailRepository.deleteByUserEmail(emailDTO.getUserEmail());

                    return userNumber;
                }
                else throw new NullPointerException("가입하신 이메일이 존재하지 않습니다.");
            }
            else{
                throw new AuthenticationFailedException("인증번호가 일치하지 않습니다.");
            }
        }else {
            throw new NullPointerException("가입하신 이메일이 존재하지 않습니다.");
        }
    }


    public boolean sendEmail(String email) { //해당하는 이메일로 인증코드를 보냄
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
            helper.setFrom("ploi2580@gmail.com","BookVoyage");
            helper.setTo(email); //메일 수신자.
            helper.setSubject("[BookVoyage] 인증코드 입니다."); //메일 제목
            helper.setText("인증코드는 " + verificationCode + " 입니다."); //메일 내용
            javaMailSender.send(mimeMessage);
            log.info("메일을 성공적으로 발송했습니다.");

            EmailEntity emailEntity = EmailEntity.DTOToEntity(emailDTO);
            emailRepository.save(emailEntity);

            return true;
        } catch (MessagingException e) {
            log.error("메일 발송을 실패했습니다.");

            return false;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
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

    public void resetAndModifyPasswordByEmail(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String userNumber = memberEntity.getUserNumber();
        String password = memberEntity.getPassword();
        memberRepository.updatePassword(userNumber,password);
    }


}
