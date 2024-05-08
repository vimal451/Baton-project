package com.stackroute.authenticationservice.exceptions;

public class PasswordMismatch extends RuntimeException{
    public PasswordMismatch(String message){super(message);}
}
