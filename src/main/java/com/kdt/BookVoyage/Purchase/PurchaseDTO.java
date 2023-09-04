package com.kdt.BookVoyage.Purchase;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PurchaseDTO {
    private List<String> isbnList;
    private List<String> purchasedList;
    private List<Integer> amount;
    private String totalPrice;
    private String orderNumber;
    private String userNumber;

}
