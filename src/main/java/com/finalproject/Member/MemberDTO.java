package com.finalproject.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class MemberDTO {
    private Long id; // pk
    private String username; //사용자 이름
    private String userId; //사용자 아이디
    private String password; //사용자 암호
    private String nickname; //사용자 닉네임
    private String userAddress; //사용자 주소
    private String userEmail; //사용자 이메일
    private String userAge; // 사용자 나이
    private String userSex; // 사용자 성별
    private String userTel; // 사용자 전화번호
    private String userRole; // 사용자 권한
    private String deleteFlag;// DB에서 완전 삭제 대신 값이 0일때 비활성화 처리. 추후 계정 복구를 위함
    private String userNumber; //회원 고유번호 (난수)

    public static MemberDTO EntityToDTO(MemberEntity memberEntity) {
        ModelMapper modelMapper=new ModelMapper();
        return modelMapper.map(memberEntity, MemberDTO.class);
    }
}
