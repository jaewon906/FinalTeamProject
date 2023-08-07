package com.finalproject.EmailVerification;

import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class EmailDTO {
    private Long id;
    private String verificationCode;

    EmailDTO EntityToDTO(EmailEntity emailEntity) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(emailEntity,EmailDTO.class);
    }

}
