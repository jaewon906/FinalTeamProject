package com.kdt.BookVoyage.CartItem;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Cart.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    // 카트 아이디와 상품 아이디를 이용해서 상품이 장바구니에 들어있는지 조회한다.
    Optional<CartItemEntity> findByCartAndBook(CartEntity cart, BookEntity book);
}
