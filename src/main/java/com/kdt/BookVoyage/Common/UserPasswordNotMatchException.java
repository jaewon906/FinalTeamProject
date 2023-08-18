package com.kdt.BookVoyage.Common;

public class UserPasswordNotMatchException extends RuntimeException{
    public UserPasswordNotMatchException(String message){
        super(message);
    }
}
