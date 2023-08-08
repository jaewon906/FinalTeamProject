package com.finalproject.EmailVerification;

import com.finalproject.Common.TimeBaseEntity;
import com.finalproject.Member.MemberDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "EmailVerification")
@Setter
@Getter
public class EmailEntity extends TimeBaseEntity {
    @Id
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
