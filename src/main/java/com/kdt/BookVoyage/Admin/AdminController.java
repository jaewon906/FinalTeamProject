package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/autoLogin")
    public void autoLogin() {
        log.info("(admin)자동 로그인 되셨습니다.");
    }

    @GetMapping("/login")
    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        adminService.login(adminDTO, response);
    }

    @GetMapping("/manage")
    public List<Integer> loadSummary(){
        return adminService.getTotalSummary();
    }


    @GetMapping("manage/user")
    public Page<MemberEntity> loadUserInfo(Pageable pageable){
        log.info("pageable : {}",pageable);
       return adminService.getUserInfo(pageable);
    }

    @GetMapping("manage/user/search")
    public Page<MemberEntity> searchUserInfo(String keyword, Pageable pageable){
        log.info("keyword : {}",keyword);
        log.info("pageable : {}",pageable);
        return adminService.searchUserInfo(keyword,pageable);
    }

    @PostMapping("manage/user/update")
    public void updateUserState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateUserState(updatedList);


    }

}
