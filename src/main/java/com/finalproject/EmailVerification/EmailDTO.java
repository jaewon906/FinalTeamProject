package com.finalproject.EmailVerification;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@Builder
public class EmailDTO {
    private Long id;
    private String userId;
    private String userEmail;
    private String verificationCode;


}
