package com.kdt.BookVoyage.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminBookSearchRes {

    private List<BookDetails> item;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookDetails {
        private String title;   // 도서 제목
        private String author;  // 도서 저자
        private String pubDate; // 출간일
        private String priceSales;  // 판매가
        private String isbn13;
        private BookSubDetails subInfo; // 부가 정보

    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookSubDetails {
        private List<String> previewImgList;
    }
}
