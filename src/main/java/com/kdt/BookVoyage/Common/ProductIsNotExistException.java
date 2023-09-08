package com.kdt.BookVoyage.Common;

public class ProductIsNotExistException extends RuntimeException{

    public ProductIsNotExistException(String msg){
        super(msg);
    }
}
