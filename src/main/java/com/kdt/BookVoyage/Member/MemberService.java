package com.kdt.BookVoyage.Member;

import com.kdt.BookVoyage.EmailVerification.EmailDTO;
import com.kdt.BookVoyage.Order.OrderDetailDTO;
import com.kdt.BookVoyage.Order.OrderProductDTO;
import jakarta.mail.AuthenticationFailedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface MemberService {
    boolean signUp(MemberDTO memberDTO) throws Exception;

    Object login(MemberDTO memberDTO, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException;

    boolean modifyInfo(MemberDTO memberDTO, HttpServletResponse response) throws Exception;

    MemberDTO showMyInfo(MemberDTO memberDTO);

    void withdrawal(MemberDTO memberDTO);

    boolean idDuplicateValidation(MemberDTO memberDTO);

    boolean nicknameDuplicateValidation(MemberDTO memberDTO);

    boolean emailDuplicateValidation(EmailDTO emailDTO) throws Exception;

    boolean emailAuthentication(EmailDTO emailDTO) throws AuthenticationFailedException;

    void logout(HttpServletResponse response);

    void withdrawal1(MemberDTO memberDTO);

    boolean myInfoAuth(MemberDTO memberDTO);

    OrderDetailDTO showMyOrderDetail(String orderNumber);
}
