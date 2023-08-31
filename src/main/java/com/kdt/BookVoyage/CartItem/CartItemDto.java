package com.kdt.BookVoyage.CartItem;

import com.kdt.BookVoyage.Book.BookDto;
import com.kdt.BookVoyage.Cart.CartDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

    private Long id;
    private int quantity;
//  private BookDto book;
    private Long bookId;
    private CartDto cart;

    public static CartItemDto entityToDto(CartItemEntity entity) {

        CartItemDto dto = new CartItemDto();

        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
//      dto.setBook(BookDto.entityToDto(entity.getBook()));
        dto.setBookId(entity.getBook().getBookId());
//        dto.setCart(CartDto.entityToDto(entity.getCart()));

        return dto;
    }
}
