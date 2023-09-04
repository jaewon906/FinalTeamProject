package com.kdt.BookVoyage.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {

    Optional<List<OrderEntity>> findAllByMemberEntityIdOrderByOrderNumberDesc(Long id);

    Optional<OrderEntity> findByOrderNumber(String ordernumber);

    Optional<List<OrderEntity>> findByMemberEntityIdAndOrderNumber(Long id, String orderNumber);

    Page<OrderEntity> searchByOrderNumberContainingIgnoreCaseOrOrderNameContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCaseOrTotalPriceContainingIgnoreCase(
           String orderNumber, String orderName, String username, String address, String tel, Integer totalPrice, Pageable pageable);
}
