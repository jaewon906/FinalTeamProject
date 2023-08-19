package com.kdt.BookVoyage.Admin;

import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class AdminDTO {
    private String adminId;
    private String password;
    private String role;

    public static AdminDTO entityToDto(AdminEntity adminEntity) {
        ModelMapper modelMapper = new ModelMapper();
       return modelMapper.map(adminEntity, AdminDTO.class);
    }
}
