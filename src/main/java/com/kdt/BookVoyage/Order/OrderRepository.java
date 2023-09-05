package com.kdt.BookVoyage.Order;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {

    Optional<List<OrderEntity>> findAllByMemberEntityIdOrderByOrderNumberDesc(Long id);

    Optional<OrderEntity> findByOrderNumber(String ordernumber);

    Optional<List<OrderEntity>> findByMemberEntityIdAndOrderNumber(Long id, String orderNumber);

    Page<OrderEntity> searchByOrderNumberContainingIgnoreCaseOrOrderNameContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCaseOrTotalPriceContainingIgnoreCase(
           String orderNumber, String orderName, String username, String address, String tel, String totalPrice, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "update OrderEntity o set o.orderState=:orderState where o.orderNumber=:orderNumber")
    void updateUserState(@Param("orderNumber") String orderNumber, @Param("orderState") String orderState);

    @Modifying
    @Transactional
    @Query(value = "update OrderEntity o set o.orderState=:orderState, o.deliveryStart=:dateTime where o.orderNumber=:orderNumber")
    void updateDeliveryStart(@Param("orderState") String orderState, @Param("orderNumber")String orderNumber, @Param("dateTime") String dateTime);

    @Modifying
    @Transactional
    @Query(value = "update OrderEntity o set o.orderState=:orderState, o.deliveryEnd=:dateTime where o.orderNumber=:orderNumber")
    void updateDeliveryEnd(@Param("orderState") String orderState, @Param("orderNumber")String orderNumber, @Param("dateTime") String dateTime);
}
