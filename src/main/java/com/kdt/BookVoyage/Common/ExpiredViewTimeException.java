package com.kdt.BookVoyage.Common;

public class ExpiredViewTimeException extends RuntimeException{

    public ExpiredViewTimeException(String msg){
        super(msg);
    }
}
