package com.kdt.BookVoyage.Common;

public class OrderProductNotFoundException extends RuntimeException{

    public OrderProductNotFoundException(String msg){
        super(msg);
    }
}
