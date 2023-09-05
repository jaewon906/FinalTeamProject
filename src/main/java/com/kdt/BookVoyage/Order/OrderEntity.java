package com.kdt.BookVoyage.Order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kdt.BookVoyage.Common.TimeBaseEntity;
import com.kdt.BookVoyage.Member.MemberEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
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
    private String orderName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String userAddress;

    @Column(nullable = false)
    private String userTel;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String totalPrice;

    @Column(nullable = false)
    private String orderState;

    @Column(nullable = false)
    private Integer isRead; // 관리자가 읽지 않은 주문들을 표기하기 위한 플래그

    @Column(nullable = false)
    private Integer orderNoticed; // 결제완료 시 해당 페이지를 한 번만 띄우기 위한 플래그

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp orderedTime;

    @Column(updatable = false)
    private String deliveryStart;

    @Column(updatable = false)
    private String deliveryEnd;

    @ManyToOne()
    @JoinColumn(name = "member_ID")
    private MemberEntity memberEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "orderEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProductEntity> orderProductEntity;

    public static OrderEntity setOrderEntity(
            String orderNumber,
            String orderName,
            String deliveryStart,
            String deliveryEnd,
            String username,
            String email,
            String addr,
            String tel,
            String totalPrice,
            String orderState,
            Integer isRead,
            Integer orderNoticed,
            MemberEntity memberEntity) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setOrderNumber(orderNumber);
        orderEntity.setOrderName(orderName);
        orderEntity.setDeliveryStart(deliveryStart);
        orderEntity.setDeliveryEnd(deliveryEnd);
        orderEntity.setUsername(username);
        orderEntity.setUserEmail(email);
        orderEntity.setUserAddress(addr);
        orderEntity.setUserTel(tel);
        orderEntity.setTotalPrice(totalPrice);
        orderEntity.setOrderState(orderState);
        orderEntity.setIsRead(isRead);
        orderEntity.setOrderNoticed(orderNoticed);
        orderEntity.setMemberEntity(memberEntity);

        return orderEntity;
    }
}
