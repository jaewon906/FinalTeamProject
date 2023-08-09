package com.finalproject.Member;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
public class MemberDTO {
    private Long id; // pk

    @NotNull
    @Pattern(regexp = "^[가-힣]{2,5}$")
    private String username; //사용자 이름

    @NotNull
    @Size(min = 6, max = 12)
    @Pattern(regexp = "^[A-Za-z0-9]{6,12}$")
    private String userId; //사용자 아이디, 특문 & 한글 제외 6~12

    @NotNull
    @Pattern(regexp = "^.*(?=^.{8,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$")
    private String password; //사용자 암호, 숫문특 포함 8~15

    @NotNull
    @Size(min = 4, max = 20)
    @Pattern(regexp = "^[가-힣A-Za-z]{4,20}$")
    private String nickname; //사용자 닉네임, 특문 제외 4~20

    @NotNull
    private String userAddress; //사용자 주소

    @Email
    private String userEmail; //사용자 이메일

    @NotNull
    @Pattern(regexp = "^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$")
    private String userAge; // 사용자 나이, 1~150

    @NotNull
    private String gender; // 사용자 성별

    private String interest; // 사용자 관심사

    @Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$")
    private String userTel; // 사용자 전화번호


//    private MemberRole userRole; // 사용자 권한

    @Pattern(regexp = "^[0-1]$")
    private String deleteFlag;// DB에서 완전 삭제 대신 값이 0일때 비활성화 처리. 추후 계정 복구를 위함
    private String userNumber; //회원 고유번호 (난수)

    public static MemberDTO EntityToDTO(MemberEntity memberEntity) {
        ModelMapper modelMapper=new ModelMapper();
        return modelMapper.map(memberEntity, MemberDTO.class);
    }
}
