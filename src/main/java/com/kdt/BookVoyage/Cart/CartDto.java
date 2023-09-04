package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.CartItem.CartItemDto;
import com.kdt.BookVoyage.Member.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {

    private Long id;
    private int quantity;
    private Long userId;
    private List<CartItemDto> cartItems = new ArrayList<>();
    private LocalDate create_at;

    public static CartDto entityToDto(CartEntity entity) {
        CartDto dto = new CartDto();

        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
        dto.setCreate_at(entity.getCreate_at());
        dto.setUserId(entity.getMember().getId());
        List<CartItemDto> cartItemDtos = entity.getCartItems().stream()
                .map(CartItemDto::entityToDto)
                .collect(Collectors.toList());
        dto.setCartItems(cartItemDtos);
        return dto;
    }
}
