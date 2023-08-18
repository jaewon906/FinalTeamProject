package com.kdt.BookVoyage.Member;

import com.kdt.BookVoyage.Common.CookieConfig;
import com.kdt.BookVoyage.Common.UserIdNotFoundException;
import com.kdt.BookVoyage.Common.UserPasswordNotMatchException;
import com.kdt.BookVoyage.EmailVerification.EmailDTO;
import com.kdt.BookVoyage.EmailVerification.EmailRepository;
import com.kdt.BookVoyage.EmailVerification.EmailService;
import com.kdt.BookVoyage.Security.TokenConfig;
import com.kdt.BookVoyage.Security.TokenDTO;
import jakarta.mail.AuthenticationFailedException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final EmailRepository emailRepository;
    private final TokenConfig tokenConfig;
    private final CookieConfig cookieConfig;

    List<MemberEntity> dormantAccounts;
    @Override
    public boolean signUp(MemberDTO memberDTO) throws Exception {
//Validation이 memberDTO를 인터셉트해서 검사를 먼저하고 엔티티에서 unique를 지정했기 때문에 예외처리 하지않음

        StringBuilder userNumber = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            userNumber.append((int) Math.floor(Math.random() * 10));
        }
        memberDTO.setUserNumber(userNumber.toString());

        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(memberEntity.getUserId());

        if (byUserId.isEmpty()) {

            memberRepository.save(memberEntity);

            log.info("회원가입에 성공했습니다.");

            return true;
        }
        else {
            throw new SQLIntegrityConstraintViolationException("회원가입에 실패했습니다.");
        }

    }

    @Override
    public boolean login(MemberDTO memberDTO, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        String plainText = memberDTO.getPassword();
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(memberEntity.getUserId());

        if(byUserId.isPresent()){ // 예외 -> id or 비번 문제 / true -> 로그인 / false -> 휴면 계정 or 비활성화 계정
            if(BCrypt.checkpw(plainText,byUserId.get().getPassword())){
                if(byUserId.get().getDeleteFlag().equals("N")){

                    MemberDTO memberDTO1 = MemberDTO.EntityToDTO(byUserId.get());

                    TokenDTO generateAccessToken = tokenConfig.generateAccessToken(memberDTO1);
                    TokenDTO generateRefreshToken = tokenConfig.generateRefreshToken(memberDTO1);

                    Cookie accessToken = cookieConfig.setCookie(generateAccessToken.getAccessToken(), "accessToken", false, "/", 3600);
                    Cookie refreshToken = cookieConfig.setCookie(generateRefreshToken.getRefreshToken(), "refreshToken", true, "/", 7 * 24 * 3600);

                    response.addCookie(accessToken);
                    response.addCookie(refreshToken);

                    log.info("로그인 성공");

                    emailService.sendEmailLogInNotification(byUserId.get().getUserEmail(), byUserId.get().getUserId());

                    return true;
                }
                else {

                    log.info("휴면 계정");

                    return false;
                }
            }
            else throw new UserPasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }
        else{
            throw new UserIdNotFoundException("아이디가 존재하지 않습니다.");
        }
    }

    @Override
    public void logout(HttpServletResponse response) {
        String[] cookieKey = {"accessToken", "refreshToken"};
        cookieConfig.deleteCookie(response, cookieKey);
    }

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
                        memberEntity.getUserTel(),
                        memberEntity.getUserNumber(),
                        LocalDateTime.now()
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
    @Transactional
    public void withdrawal(MemberDTO memberDTO) {
        memberRepository.updateDeleteFlag(memberDTO.getUserNumber(), LocalDateTime.now());
    }

    @Override
    @Transactional
    public void withdrawal1(MemberDTO memberDTO) {
        memberRepository.updateDeleteFlag1(memberDTO.getUserId());
    }

    @Override
    public boolean idDuplicateValidation(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String id = memberEntity.getUserId();

        Optional<MemberEntity> byUserId = memberRepository.findByUserId(id);
        return byUserId.isEmpty();
    }

    @Override
    public boolean nicknameDuplicateValidation(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        String nickname = memberEntity.getNickname();

        Optional<MemberEntity> byUserNickname = memberRepository.findByNickname(nickname);
        return byUserNickname.isEmpty();
    }

    @Override
    @Transactional
    public boolean emailDuplicateValidation(EmailDTO emailDTO) {
        String email = emailDTO.getUserEmail();

        Optional<MemberEntity> byUserEmail = memberRepository.findByUserEmail(email);

        if (byUserEmail.isEmpty()) {
            String userEmail = emailDTO.getUserEmail();
            emailRepository.deleteByUserEmail(emailDTO.getUserEmail());
            emailService.sendEmailVerificationCode(userEmail);

            return true;
        } else {

            return false;
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

    @Scheduled(fixedDelay = 30 * 24 * 60 * 60 * 1000L) //한달에 한번 씩 휴면계정의 모든 리스트를 불러옴
    public void deleteDormantAccount() {
        dormantAccounts = memberRepository.findByDeleteFlag("Y");
    }

    @Scheduled(fixedDelay = 60 * 60 * 1000L) // 한 시간에 한번씩 휴면 계정 전환 후 30일 이후의 계정들 삭제
    @Transactional
    public void dormantAccountManagementScheduler() {

        if(dormantAccounts.size()!=0){ //휴면 계정이 존재할 때

            for (MemberEntity dormantAccount : dormantAccounts) {

                Timestamp deletedTime = dormantAccount.getTimeBaseEntity().getDeletedTime();
                long now = new Timestamp(System.currentTimeMillis()).getTime();

                long oneMonth = 30 * 24 * 60 * 60 * 1000L;

                long deleteDate = oneMonth + deletedTime.getTime(); //지운 날짜 한달 뒤

                if (now > deleteDate) {
                    memberRepository.deleteByUserNumber(dormantAccount.getUserNumber());
                }
            }
        }
    }

    @Override
    public boolean myInfoAuth(MemberDTO memberDTO) {
        String plainText = memberDTO.getPassword();
        MemberEntity memberEntity = MemberEntity.DTOToEntity(memberDTO);
        Optional<MemberEntity> byUserNumber = memberRepository.findByUserNumber(memberEntity.getUserNumber());

        if(byUserNumber.isPresent()){ // 예외 -> id or 비번 문제 / true -> 로그인 / false -> 휴면 계정 or 비활성화 계정
            if(BCrypt.checkpw(plainText,byUserNumber.get().getPassword())){
                if(byUserNumber.get().getDeleteFlag().equals("N")){

                    log.info("회원정보 열람 인증 성공");

                    return true;
                }
                else {

                    log.info("휴면 계정");

                    return false;
                }
            }
            else throw new UserPasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }
        else{
            throw new UserIdNotFoundException("아이디가 존재하지 않습니다.");
        }
    }
}
