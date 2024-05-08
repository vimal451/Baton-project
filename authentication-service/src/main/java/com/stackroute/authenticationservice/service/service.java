package com.stackroute.authenticationservice.service;
import com.stackroute.authenticationservice.model.authmodel;

public interface service {
    authmodel getUserByUsername(String username);
}
