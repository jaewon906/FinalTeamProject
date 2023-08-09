package com.finalproject.Common;

import lombok.extern.slf4j.Slf4j;

import java.util.Base64;

@Slf4j
public class Based64Decoder {
    public String based64Decoder(String token) {
        byte[] decodedBytes = Base64.getDecoder().decode(token);
        String decodedString = new String(decodedBytes);

        log.info(decodedString);

        return decodedString;
    }
}
