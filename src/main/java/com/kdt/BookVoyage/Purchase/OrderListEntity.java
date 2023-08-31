package com.kdt.BookVoyage.Purchase;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "orderList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderListEntity {
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
    private String priceSales;

    @Column(name = "price_std")
    private String priceStandard;

    @Column
    private String publisher;

    @Column
    private String isbn13;

    @Column
    private String cover;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "order_ID")
    private OrderEntity orderEntity;


}
