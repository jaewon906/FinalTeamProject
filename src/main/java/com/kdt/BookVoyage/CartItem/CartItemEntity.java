package com.kdt.BookVoyage.CartItem;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Cart.CartEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_item")
public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @ToString.Exclude
    private CartEntity cart;    // 장바구니


    @ManyToOne
    @JoinColumn(name = "prod_id")
    @ToString.Exclude
    private BookEntity book;    // 상품

    private int quantity;   // 상품 개수

    public static CartItemEntity createCartItem(CartEntity cart, BookEntity book, int count) {
        CartItemEntity cartItem = new CartItemEntity();
        cartItem.setCart(cart);
        cartItem.setBook(book);
        cartItem.setQuantity(count);

        return cartItem;
    }

    // 이미 담겨있는 물건을 또 담을 경우 수량만 증가
    public void addCount(int count) {
        this.quantity += count;
    }
}
