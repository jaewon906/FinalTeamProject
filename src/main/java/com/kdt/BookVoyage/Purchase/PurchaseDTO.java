package com.kdt.BookVoyage.Purchase;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PurchaseDTO {
    private List<String> isbnList;
    private Map<String,String>purchasedList;
}
