package com.finalproject.Member;

import lombok.Builder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    @Modifying
    @Query(value = "update MemberEntity m set m.deleteFlag='Y' where m.userNumber=:userNumber")
    void updateDeleteFlag(@Param("userNumber") String userNumber);

    @Modifying
    @Query(value = "update MemberEntity m set m.deleteFlag='N' where m.userId=:userId")
    void updateDeleteFlag1(@Param("userId") String userId);

    @Modifying
    @Query(value = "update MemberEntity m set m.password=:password where m.userNumber=:userNumber")
    void updatePassword(@Param("userNumber") String userNumber, @Param("password") String password);

    @Modifying
    @Query(value ="update MemberEntity m set " +
            "m.username=:username, " +
            "m.password=:password, " +
            "m.nickname=:nickname, " +
            "m.userAddress=:userAddress, " +
            "m.interest=:interest, " +
            "m.userTel=:userTel " +
            "where m.userNumber=:userNumber"
            )
    void updateMyInfo(@Param("username")String username,
                      @Param("password")String password,
                      @Param("nickname")String nickname,
                      @Param("userAddress")String userAddress,
                      @Param("interest")String interest,
                      @Param("userTel")String userTel,
                      @Param("userNumber")String userNumber);

    Optional<MemberEntity> findByUserId(String userId);
    Optional<MemberEntity> findByNickname(String nickname);
    Optional<MemberEntity> findByUserEmail(String email);
    Optional<MemberEntity> findByUserNumber(String number);
    Optional<MemberEntity> findAllByUserNumber(String userNumber);
    Optional<MemberEntity> findByUserEmailAndUserId(String userEmail, String userId);
}
