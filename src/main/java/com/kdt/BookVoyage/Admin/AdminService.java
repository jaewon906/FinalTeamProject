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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AdminRepository adminRepository;
    private final MemberRepository memberRepository;
    private final TokenConfig tokenConfig;
    private final CookieConfig cookieConfig;

    @PostConstruct
    public void createAdminAccount() {

        adminRepository.deleteByUserId("admin");
        adminRepository.createAdminId();

        Optional<MemberEntity> admin = memberRepository.findByUserId("admin");

        admin.ifPresent(memberEntity -> log.info("INITIAL ADMIN ID, PW : {} {}", memberEntity.getUserId(), memberEntity.getPassword()));

    }

    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        String userId = adminDTO.getAdminId();
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(userId);

        if (byUserId.isPresent()) {
            if (byUserId.get().getPassword().equals(adminDTO.getPassword()) && byUserId.get().getRole().equals("ADMIN")) {

                MemberDTO memberDTO = MemberDTO.EntityToDTO(byUserId.get());

                TokenDTO generateAccessToken = tokenConfig.generateAccessToken(memberDTO);
                TokenDTO generateRefreshToken = tokenConfig.generateRefreshToken(memberDTO);

                Cookie accessToken = cookieConfig.setCookie(generateAccessToken.getAccessToken(), "accessToken", false, "/", 3600);
                Cookie refreshToken = cookieConfig.setCookie(generateRefreshToken.getRefreshToken(), "refreshToken", true, "/", 7 * 24 * 3600);

                response.addCookie(accessToken);
                response.addCookie(refreshToken);
            } else throw new UserPasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        } else throw new UserIdNotFoundException("아이디가 존재하지 않습니다.");

    }

    public int getTotalSummary() {

        List<MemberEntity> all = memberRepository.findAll();

        return all.size();
    }
    public Map<String, Integer> getNewUserPerDaySummary() {

        List<MemberEntity> all = memberRepository.findAll();
        Map<String, Integer> result = new HashMap<>();

        long eightDays = 15 * 24 * 3600 * 1000;
        long oneDay = 24 * 3600 * 1000;

        int a[] = new int[15];

        long now = new Timestamp(System.currentTimeMillis()).getTime();
        long sevenDaysAgo = now - eightDays; // 현재 기준 15일 전

        String split = new Timestamp(sevenDaysAgo).toString().split(" ")[0];

        long sevenDaysAgo_0Hour = Timestamp.valueOf(split + " " + "00:00:00").getTime(); // 현재 기준 7일 전 00시 00분 00초

        for (int i = 1; i <= 15; i++) {

            for (int j = 0; j < all.size() - 1; j++) {

                long signUpDate = all.get(j).getTimeBaseEntity().getCreatedTime().getTime();


                if (signUpDate >= i * oneDay + sevenDaysAgo_0Hour && signUpDate < (i + 1) * oneDay + sevenDaysAgo_0Hour) {// 2주전 00시 00분 00초 ~ 23시 59분 59초
                    a[i - 1]++;
                }

            }
            String timestamp1 = new Timestamp(i * oneDay + sevenDaysAgo_0Hour).toString();
            String date = timestamp1.split(" ")[0];

            result.put(date, a[i-1]);
        }

        log.info("{}", all.size());

        return result;
    }

    public Page<MemberEntity> getUserInfo(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    public Page<MemberEntity> searchUserInfo(String keyword, Pageable pageable) {
        return memberRepository.searchByUserIdContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrNicknameContainingIgnoreCaseOrUserNumberContainingIgnoreCaseOrUserEmailContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCase(
                keyword, keyword, keyword, keyword, keyword, keyword, keyword, pageable
        );
    }

    public void updateUserState(List<Map<String, String>> updatedList) {

        for (Map<String, String> updated : updatedList) {

            String userNumber = updated.get("userNumber");
            String deleteFlag = updated.get("deleteFlag");

            memberRepository.updateUserState(userNumber, deleteFlag, LocalDateTime.now());
        }
    }
}
