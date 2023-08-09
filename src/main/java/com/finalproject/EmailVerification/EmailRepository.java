package com.finalproject.EmailVerification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<EmailEntity, Long> {
    Optional<EmailEntity> findByUserEmail(String email);
    void deleteByUserEmail(String email);


}
