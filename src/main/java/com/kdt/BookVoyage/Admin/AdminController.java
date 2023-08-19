package com.kdt.BookVoyage.Admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/createAdminAccount")
    public void createAdminAccount() {
        adminService.createAdminAccount();
    }

    @GetMapping("/login")
    public void login(AdminDTO adminDTO) {
        adminService.login(adminDTO);
    }


}
