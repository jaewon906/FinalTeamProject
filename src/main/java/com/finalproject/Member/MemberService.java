package com.finalproject.Member;

import java.util.List;

public interface MemberService {
    void signUp(MemberDTO memberDTO) throws Exception;

    void withdrawal(MemberDTO memberDTO);

    boolean idDuplicateValidation(MemberDTO memberDTO);
    boolean nicknameDuplicateValidation(MemberDTO memberDTO);
    boolean emailDuplicateValidation(MemberDTO memberDTO);
}
