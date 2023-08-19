package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<MemberEntity,Long> {


    @Modifying
    @Transactional
    @Query(value = "insert into kdt.member_info (" +
            "username, " +
            "user_id, " +
            "password, " +
            "nickname, " +
            "user_address," +
            "user_detail_address," +
            "user_email," +
            "gender," +
            "interest" +
            ",user_tel" +
            ",role" +
            ",delete_flag" +
            ",user_number" +
            ",user_age) " +
            "values(" +
            "'박재원'," +
            " 'admin'," +
            "'rkddkwl1!'," +
            "'재원이야'," +
            "''," +
            "''," +
            "'qwer@naver.com'," +
            "'남자'," +
            "''," +
            "'010-1231-1231'," +
            "'ADMIN'," +
            "'N'," +
            "'0000000000'," +
            "28)", nativeQuery = true)
    void createAdminId();

}
