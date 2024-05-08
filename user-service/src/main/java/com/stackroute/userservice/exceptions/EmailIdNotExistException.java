package com.stackroute.userservice.exceptions;


public class EmailIdNotExistException extends  Exception{
    public EmailIdNotExistException(){

    }
    public EmailIdNotExistException(String message){
        super(message);
    }
}