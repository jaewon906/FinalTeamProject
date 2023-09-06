package com.kdt.BookVoyage.Book;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AladinBookDetailRes {

    private String title;
    private List<BookDetails> item;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookDetails {
        private String title;   // 도서 제목
        private String author;  // 저자
        private String pubDate; // 출간일
        private String fullDescription; // 책소개
        private String fullDescription2;    // 출판사 제공 책 소개
        private Integer priceSales;  // 판매가
        private Integer priceStandard;   // 정가
        private String publisher;   // 출판사
        private String isbn13;  // isbn 13 자리
        private String cover;   // 표지(저화질)
        private String categoryName;    // 카테고리(풀, 대분류만 필요)
        private String mallType;    // 몰타입, 국내도서, 외서, 전자책 등
        private String stockstatus; // 재고 상태
        private BookSubDetails subInfo; // 부가 정보
        @Pattern(regexp = "0,1")
        private String remain;
        }
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookSubDetails {
        private String toc;
        private int itemPage;
        private List<String> previewImgList;
        private List<Authors> authors;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Authors {
        private String authorName;
        private String authorTypeDesc;
        private String authorInfo;
        private String authorPhoto;
    }

}
