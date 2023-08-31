package com.kdt.BookVoyage.Order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kdt.BookVoyage.Common.TimeBaseEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "order_table")
@Setter
@Getter
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String orderNumber;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String userAddress;

    @Column(nullable = false)
    private String userTel;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private Integer totalPrice;

    @Embedded
    private TimeBaseEntity timeBaseEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_ID")
    private MemberEntity memberEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "orderEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProductEntity> orderProductEntity;

    public static OrderEntity setOrderEntity(String orderNumber,String username, String email, String addr, String tel, Integer totalPrice, MemberEntity memberEntity) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setOrderNumber(orderNumber);
        orderEntity.setUsername(username);
        orderEntity.setUserEmail(email);
        orderEntity.setUserAddress(addr);
        orderEntity.setUserTel(tel);
        orderEntity.setTotalPrice(totalPrice);
        orderEntity.setMemberEntity(memberEntity);

        return orderEntity;
    }
}
