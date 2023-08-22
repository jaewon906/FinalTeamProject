package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Common.CookieConfig;
import com.kdt.BookVoyage.Common.UserIdNotFoundException;
import com.kdt.BookVoyage.Common.UserPasswordNotMatchException;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Security.TokenConfig;
import com.kdt.BookVoyage.Security.TokenDTO;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AdminRepository adminRepository;
    private final MemberRepository memberRepository;
    private final TokenConfig tokenConfig;
    private final CookieConfig cookieConfig;

    @PostConstruct
    public void createAdminAccount(){
        adminRepository.deleteByUserId("admin");
        adminRepository.createAdminId();
    }
    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        String userId = adminDTO.getAdminId();
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(userId);

        if(byUserId.isPresent()){
            if(byUserId.get().getPassword().equals(adminDTO.getPassword()) && byUserId.get().getRole().equals("ADMIN")){

                MemberDTO memberDTO = MemberDTO.EntityToDTO(byUserId.get());

                TokenDTO generateAccessToken = tokenConfig.generateAccessToken(memberDTO);
                TokenDTO generateRefreshToken = tokenConfig.generateRefreshToken(memberDTO);

                Cookie accessToken = cookieConfig.setCookie(generateAccessToken.getAccessToken(), "accessToken", false, "/", 3600);
                Cookie refreshToken = cookieConfig.setCookie(generateRefreshToken.getRefreshToken(), "refreshToken", true, "/", 7 * 24 * 3600);

                response.addCookie(accessToken);
                response.addCookie(refreshToken);
            }
            else throw new UserPasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }
        else throw new UserIdNotFoundException("아이디가 존재하지 않습니다.");

    }

    public List<Integer> getTotalSummary() {
        List<MemberEntity> all = memberRepository.findAll();

        List<Integer> result = new ArrayList<>();
        result.add(all.size());

        return result;
    }

    public Page<MemberEntity> getUserInfo(Pageable pageable){
       return memberRepository.findAll(pageable);
    }
    public Page<MemberEntity> searchUserInfo(String keyword,Pageable pageable){
       return memberRepository.searchByUserIdContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrNicknameContainingIgnoreCaseOrUserNumberContainingIgnoreCaseOrUserEmailContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCase(
               keyword,keyword,keyword,keyword,keyword,keyword,keyword,pageable
       );
    }

    public void updateUserState(List<Map<String, String>> updatedList) {

        for(Map<String, String>updated : updatedList){
            String userNumber = updated.get("userNumber");
            String deleteFlag = updated.get("deleteFlag");

            log.info(userNumber);
            log.info(deleteFlag);

            memberRepository.updateUserState(userNumber, deleteFlag, LocalDateTime.now());
        }
    }
}
