package com.stackroute.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailIdAlreadyExistException.class)
    public ResponseEntity<String> exceptionHandler(EmailIdAlreadyExistException exception){
        ResponseEntity<String> entity=new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
        return entity;
    }

}