package com.kdt.BookVoyage.CartItem;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Cart.CartEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItemEntity {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")   
    private CartEntity cart;    // 장바구니

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookEntity book;    // 상품

    private int quantity;   // 상품 개수

    public static CartItemEntity createCartItem(CartEntity cart, BookEntity book, int count) {
        CartItemEntity cartItem = new CartItemEntity();
        cartItem.setCart(cart);
        cartItem.setBook(book);
        cartItem.setQuantity(count);

        return cartItem;
    }
}
