package com.kdt.BookVoyage.Cart;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequest {

    private String userNumber;
    private Long bookId;
    private int quantity;
}
