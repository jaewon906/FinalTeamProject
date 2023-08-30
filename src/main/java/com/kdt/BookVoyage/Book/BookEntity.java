package com.kdt.BookVoyage.Book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "book")
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    private String title;

    private String author;

    @Column(name = "pub_date")
    private String pubDate;

    @Column(name = "full_desc", length = 5000)
    private String fullDescription;

    @Column(name = "full_desc2", columnDefinition = "MEDIUMTEXT")
    private String fullDescription2;

    @Column(name = "price_sales")
    private String priceSales;

    @Column(name = "price_std")
    private String priceStandard;

    private String publisher;

    private String isbn13;

    private String cover;

    @Column(name = "c_name")
    private String categoryName;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String toc;

    @Column(name = "item_page")
    private int itemPage;

    @Column(name = "p_img_list", columnDefinition = "JSON")
    private String previewImgList;

    @Column(name = "author_name")
    private String authorName;

    @Column(name = "author_type")
    private String authorTypeDesc;

    @Column(name = "author_info", columnDefinition = "MEDIUMTEXT")
    private String authorInfo;

    @Column(name = "author_photo")
    private String authorPhoto;

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private List<CartItemEntity> cartItems = new ArrayList<>(); // cart item
}
