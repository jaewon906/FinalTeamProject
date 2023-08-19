package com.kdt.BookVoyage.Admin;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<AdminEntity,Long> {

    @Modifying
    @Transactional
    @Query(value = "insert into kdt.admin_info (admin_id, password, role) values('a', 'aaa', 'ADMIN')", nativeQuery = true)
    public void createAdminId();

}
