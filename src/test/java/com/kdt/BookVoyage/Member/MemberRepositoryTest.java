package com.kdt.BookVoyage.Member;

import org.junit.jupiter.api.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberRepositoryTest extends JpaRepository<MemberEntity, Long> {

//    @Test
//    @Query(value = "select * from book.member_info where created_time >= :startTime and created_time <= :endTime", nativeQuery = true)
//    List<MemberEntity> 멤버수찾기(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);
}
