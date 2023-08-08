package com.finalproject.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    @Modifying
    @Query(value = "update MemberEntity m set m.deleteFlag='0' where m.id=:id")
    void updateDeleteFlag(@Param("id") Long id);

    Optional<MemberEntity> findByUserId(String userId);
    Optional<MemberEntity> findByNickname(String nickname);
    Optional<MemberEntity> findByUserEmail(String email);
}
