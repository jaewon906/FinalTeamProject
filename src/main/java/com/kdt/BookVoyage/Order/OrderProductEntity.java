package com.kdt.BookVoyage.Order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "orderList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class OrderProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column
    private String title;

    @Column
    private String author;

    @Column(name = "pub_date")
    private String pubDate;


    @Column(name = "price_sales")
    private Integer priceSales;

    @Column(name = "price_std")
    private Integer priceStandard;

    @Column
    private String publisher;

    @Column
    private String isbn13;

    @Column
    private String cover;

    @Column
    private Integer amount;

    @ManyToOne()
    @JoinColumn(name = "order_ID")
    private OrderEntity orderEntity;


}
