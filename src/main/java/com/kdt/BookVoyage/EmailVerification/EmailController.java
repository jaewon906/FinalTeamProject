package com.kdt.BookVoyage.EmailVerification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("signUp/deleteExpiredVerificationCode")
    public void deleteExpiredVerificationCode(EmailDTO emailDTO) {
        emailService.deleteExpiredVerificationCode(emailDTO);
    }
}
