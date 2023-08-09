package com.finalproject.Member;

import com.finalproject.EmailVerification.EmailDTO;
import jakarta.mail.AuthenticationFailedException;

import java.util.List;

public interface MemberService {
    boolean signUp(MemberDTO memberDTO) throws Exception;

    boolean modifyInfo(MemberDTO memberDTO) throws Exception;

    MemberDTO showMyInfo(MemberDTO memberDTO);

    void withdrawal(MemberDTO memberDTO);

    boolean idDuplicateValidation(MemberDTO memberDTO);
    boolean nicknameDuplicateValidation(MemberDTO memberDTO);
    boolean emailDuplicateValidation(EmailDTO emailDTO) throws Exception;
    boolean emailAuthentication(EmailDTO emailDTO) throws AuthenticationFailedException;
}
