package com.kdt.BookVoyage.Common;

public class DuplicatedIdException extends RuntimeException{

    public DuplicatedIdException(String msg){
        super(msg);
    }
}
