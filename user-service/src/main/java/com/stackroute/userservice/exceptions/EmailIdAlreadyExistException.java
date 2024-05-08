package com.stackroute.userservice.exceptions;


public class EmailIdAlreadyExistException extends Exception{
    public EmailIdAlreadyExistException(){

    }
    public EmailIdAlreadyExistException(String message){
        super(message);
    }
}