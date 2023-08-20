package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.List;

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
    public List<MemberEntity> loadUserInfo(){
       return  adminService.getUserInfo();
    }
}
