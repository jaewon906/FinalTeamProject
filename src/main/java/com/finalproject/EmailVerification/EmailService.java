package com.finalproject.EmailVerification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailService {
    private final EmailRepository emailRepository;
}
