package com.kdt.BookVoyage.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProductEntity,Long> {
}
