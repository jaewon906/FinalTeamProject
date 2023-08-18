package com.kdt.BookVoyage.EmailVerification;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "EmailVerification")
@Setter
@Getter
public class EmailEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String userId;

    @Column
    @Email
    private String userEmail;

    @Column
    private String verificationCode;


    public static EmailEntity DTOToEntity(EmailDTO emailDTO) {
        ModelMapper modelMapper=new ModelMapper();
        return modelMapper.map(emailDTO, EmailEntity.class);
    }
}
