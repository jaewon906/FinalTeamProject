package com.finalproject.Member;

import lombok.Builder;
import org.hibernate.annotations.SQLSelect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    @Modifying
    @Query(value = "update MemberEntity m set m.deleteFlag='Y', m.timeBaseEntity.DeletedTime=:dateTime where m.userNumber=:userNumber")
    void updateDeleteFlag(@Param("userNumber") String userNumber, LocalDateTime dateTime);

    @Modifying
    @Query(value = "update MemberEntity m set m.deleteFlag='N', m.timeBaseEntity.DeletedTime=null where m.userId=:userId")
    void updateDeleteFlag1(@Param("userId") String userId);

    @Modifying
    @Query(value = "update MemberEntity m set m.password=:password where m.userNumber=:userNumber")
    void updatePassword(@Param("userNumber") String userNumber, @Param("password") String password);


    void deleteByUserNumber(String userNumber);

    @Modifying
    @Query(value ="update MemberEntity m set " +
            "m.username=:username, " +
            "m.password=:password, " +
            "m.nickname=:nickname, " +
            "m.userAddress=:userAddress, " +
            "m.interest=:interest, " +
            "m.timeBaseEntity.UpdatedTime=:updateTime, " +
            "m.userTel=:userTel " +
            "where m.userNumber=:userNumber"
            )
    void updateMyInfo(@Param("username")String username,
                      @Param("password")String password,
                      @Param("nickname")String nickname,
                      @Param("userAddress")String userAddress,
                      @Param("interest")String interest,
                      @Param("userTel")String userTel,
                      @Param("userNumber")String userNumber,
                      LocalDateTime updateTime);

    List<MemberEntity> findByDeleteFlag(String deleteFlag);
    Optional<MemberEntity> findByUserId(String userId);
    Optional<MemberEntity> findByNickname(String nickname);
    Optional<MemberEntity> findByUserEmail(String email);
    Optional<MemberEntity> findByUserNumber(String number);
    Optional<MemberEntity> findAllByUserNumber(String userNumber);
    Optional<MemberEntity> findByUserEmailAndUserId(String userEmail, String userId);


}
