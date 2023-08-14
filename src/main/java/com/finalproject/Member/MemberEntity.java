package com.finalproject.Member;

import com.finalproject.Common.TimeBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Entity
@Table(name = "MEMBER_INFO")
@Getter
@Setter
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // pk
    @Column(nullable = false)
    private String username; //사용자 이름
    @Column(nullable = false)
    private String password; //사용자 암호
    @Column(nullable = false, unique = true)
    private String userId; //사용자 아이디
    @Column(nullable = false, unique = true)
    private String nickname; //사용자 닉네임
    @Column(nullable = false)
    private String userAddress; //사용자 주소
    @Column(nullable = false, unique = true)
    private String userEmail; //사용자 이메일
    @Column(nullable = false)
    private String userAge; // 사용자 나이
    @Column(nullable = false)
    private String gender; // 사용자 성별
    @Column(nullable = false)
    private String userTel; // 사용자 전화번호
    @Column
    private String userRole; // 사용자 권한
    @Column
    private String interest; //사용자 관심사
    @Column(nullable = false)
    private String deleteFlag;// DB에서 완전 삭제 대신 값이 0일때 비활성화 처리. 추후 계정 복구를 위함
    @Column(nullable = false, unique = true)
    private String userNumber; //회원 고유번호 (난수)

    @Embedded
    private TimeBaseEntity timeBaseEntity;

    public static MemberEntity DTOToEntity(MemberDTO memberDTO) {
        ModelMapper modelMapper = new ModelMapper();

        try {
            memberDTO.setPassword(BCrypt.hashpw(memberDTO.getPassword(), BCrypt.gensalt()));
        } catch (Exception ignored) {
        }
        memberDTO.setDeleteFlag("N");
        memberDTO.setUserRole(MemberRole.USER.getRoleName());

        return modelMapper.map(memberDTO, MemberEntity.class);
    }

}
