package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Member.MemberEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PurchaseDTO {
    private List<String> isbnList;
//    private List<Map<String,String>> purchasedList;
    private List<String> purchasedList;
    private List<Integer> amount;
    private String orderNumber;
    private String userNumber;

}
