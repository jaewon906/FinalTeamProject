package com.kdt.BookVoyage.Admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public void createAdminAccount(){
        adminRepository.createAdminId();
    }
    public void login(AdminDTO adminDTO) {

        AdminEntity adminEntity = AdminEntity.DTOToEntity(adminDTO);


    }
}
