package com.kdt.BookVoyage.Book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AladinBookSearchReq {

    private String TTBKey = "ttbdhzlehzl011603001";
    private String Query = "";
    private String QueryType = "Keyword";
    private String SearchTarget = "Book";
    private int start = 1;
    private int MaxResults = 10;
    private String InputEncoding = "utf-8";
    private String output = "js";
    private String Version = "20131101";

    public MultiValueMap<String, String> toMultiValueMap() {
        var map = new LinkedMultiValueMap<String, String>();

        map.add("ttbkey", TTBKey);
        map.add("query", Query);
        map.add("QueryType", QueryType);
        map.add("MaxResults", String.valueOf(MaxResults));
        map.add("start", String.valueOf(start));
        map.add("SearchTarget", SearchTarget);
        map.add("output", output);
        map.add("Version", Version);

        return map;
    }
}
