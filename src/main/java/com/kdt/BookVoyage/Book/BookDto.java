package com.kdt.BookVoyage.Book;

import com.kdt.BookVoyage.CartItem.CartItemDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private Long bookId;
    private String title;
    private String author;
    private String pubDate;
    private String fullDescription;
    private String fullDescription2;
    private String priceSales;
    private String priceStandard;
    private String publisher;
    private String isbn13;
    private String cover;
    private String categoryName;
    private String toc;
    private int itemPage;
    private String previewImgList;
    private String authorName;
    private String authorTypeDesc;
    private String authorInfo;
    private String authorPhoto;
    private List<Long> cartItemIds;

    public static BookDto entityToDto(BookEntity entity) {

        BookDto dto = new BookDto();

        dto.setBookId(entity.getBookId());
        dto.setTitle(entity.getTitle());
        dto.setAuthor(entity.getAuthor());
        dto.setPubDate(entity.getPubDate());
        dto.setFullDescription(entity.getFullDescription());
        dto.setFullDescription2(entity.getFullDescription2());
        dto.setPriceSales(entity.getPriceSales());
        dto.setPriceStandard(entity.getPriceStandard());
        dto.setPublisher(entity.getPublisher());
        dto.setIsbn13(entity.getIsbn13());
        dto.setCover(entity.getCover());
        dto.setCategoryName(entity.getCategoryName());
        dto.setPreviewImgList(entity.getPreviewImgList());
        dto.setAuthorName(entity.getAuthorName());
        dto.setAuthorInfo(entity.getAuthorInfo());
        dto.setAuthorTypeDesc(entity.getAuthorTypeDesc());
        dto.setAuthorPhoto(entity.getAuthorPhoto());
        dto.setCartItemIds(entity.getCartItems().stream()
                .map(cartItem -> cartItem.getId())
                .collect(Collectors.toList())
        );
        //        dto.setCartItems(entity.getCartItems().stream()
//                .map(CartItemDto::entityToDto)
//                .collect(Collectors.toList())
//        );


        return dto;
    }
}
