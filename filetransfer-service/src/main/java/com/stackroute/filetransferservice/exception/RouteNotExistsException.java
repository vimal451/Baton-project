package com.stackroute.filetransferservice.exception;

public class RouteNotExistsException extends Exception{
    public RouteNotExistsException(){}

    public RouteNotExistsException(String message){
        super(message);
    }
}
