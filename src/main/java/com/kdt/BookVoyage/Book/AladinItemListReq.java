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
    private String SearchTarget = "Foreign";
    private String output = "js";
    private String Version = "20131101";

    public MultiValueMap<String, String> toMultiValueMap() {
        var map = new LinkedMultiValueMap<String, String>();

        map.add("ttbkey", ttbkey);
        map.add("QueryType", QueryType);
        map.add("MaxResults", String.valueOf(MaxResults));
        map.add("start", String.valueOf(start));
        map.add("SearchTarget", SearchTarget);
        map.add("output", output);
        map.add("Version", Version);

        return map;
    }

}
