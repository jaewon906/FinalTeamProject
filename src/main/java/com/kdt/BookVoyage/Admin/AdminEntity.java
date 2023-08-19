package com.kdt.BookVoyage.Admin;

import jakarta.persistence.*;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "ADMIN_INFO")
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String adminId;

    @Column
    private String password;

    @Column
    private String role;

    public static AdminEntity DTOToEntity(AdminDTO adminDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(adminDTO, AdminEntity.class);
    }

}
