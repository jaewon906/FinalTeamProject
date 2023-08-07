package com.finalproject.EmailVerification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "EmailVerificationTable")
public class EmailEntity {
    @Id
    private Long id;
    @Column
    private String verificationCode;

    EmailEntity DTOToEntity(EmailDTO emailDTO) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(emailDTO,EmailEntity.class);
    }
}
