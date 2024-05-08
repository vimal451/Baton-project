package com.stackroute.filetransferservice.exception;

public class RouteAlreadyExistsException extends Exception {
    public RouteAlreadyExistsException(){}

    public RouteAlreadyExistsException(String message){
        super(message);
    }
}
