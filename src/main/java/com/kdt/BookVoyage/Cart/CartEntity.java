package com.kdt.BookVoyage.Cart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private MemberEntity member;    // 회원

    @OneToMany(mappedBy = "cart")
    private List<CartItemEntity> cartItems = new ArrayList<>();

    private int quantity;   // 카트에 담긴 총 상품 개수

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate create_at;    // 카트 생성 날짜

    @PrePersist
    public void createDate() {
        this.create_at = LocalDate.now();
    }

    public static CartEntity createCart(MemberEntity member) {
        CartEntity cart = new CartEntity();
        cart.setQuantity(0);
        cart.setMember(member);

        return cart;
    }


}
