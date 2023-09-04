package com.kdt.BookVoyage.Order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProductEntity,Long> {
    List<OrderProductEntity> findAllByOrderEntityId(Long Id);

    void deleteAllByOrderEntityId(Long id);
}
