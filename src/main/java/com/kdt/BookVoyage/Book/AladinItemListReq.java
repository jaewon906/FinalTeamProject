package com.kdt.BookVoyage.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AladinItemListReq {

    private String ttbkey = "ttbdhzlehzl011603001";
    private String QueryType = "";
    private int MaxResults = 200;
    private int start = 1;
    private String SearchTarget = "Book";
    private String Cover = "Big";
    private String output = "js";
    private String Version = "20131101";
    private String Year = "2023";
    private String Month = "8";
    private String Week = "1";

    public MultiValueMap<String, String> toMultiValueMap() {
        var map = new LinkedMultiValueMap<String, String>();

        map.add("ttbkey", ttbkey);
        map.add("QueryType", QueryType);
        map.add("MaxResults", String.valueOf(MaxResults));
        map.add("start", String.valueOf(start));
        map.add("SearchTarget", SearchTarget);
        map.add("Cover", Cover);
        map.add("Year", Year);
        map.add("Month", Month);
        map.add("Week", Week);
        map.add("output", output);
        map.add("Version", Version);

        return map;
    }

}
