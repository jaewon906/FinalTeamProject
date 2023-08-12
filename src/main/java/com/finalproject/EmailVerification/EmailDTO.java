package com.finalproject.EmailVerification;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmailDTO {
    private Long id;
    private String userId;
    @Pattern(regexp = "[a-z0-9]+@[a-z]+\\.(com|org|net)$")
    private String userEmail;
    private String verificationCode;


}
