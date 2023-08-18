package com.kdt.BookVoyage.Common;

public class TokenNotValidateException extends RuntimeException{
    public TokenNotValidateException(String message){
        super(message);
    }
}
