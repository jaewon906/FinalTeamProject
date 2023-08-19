package com.kdt.BookVoyage.Admin;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/createAdminAccount")
    public void createAdminAccount() {
        adminService.createAdminAccount();
    }

    @GetMapping("/login")
    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        adminService.login(adminDTO, response);
    }

    @GetMapping("/manage")
    public void loadUserInfo(){
        log.info("gkdlgkdl");
    }


}
