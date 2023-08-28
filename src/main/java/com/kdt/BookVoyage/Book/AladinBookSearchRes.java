package com.kdt.BookVoyage.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AladinBookSearchRes {

    private String title;
    private List<SearchBook> item;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchBook {
        private String title;
        private String author;
        private String publisher;
        private String pubDate;
        private String description;
        private String isbn13;
        private String priceSales;
        private String priceStandard;
        private String cover;
//        private String customerReviewRank;
    }
}
