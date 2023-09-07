package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByMember(MemberEntity member);

}
