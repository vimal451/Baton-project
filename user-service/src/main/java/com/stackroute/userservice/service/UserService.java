package com.stackroute.userservice.service;

import com.stackroute.userservice.exceptions.EmailIdAlreadyExistException;
import com.stackroute.userservice.exceptions.EmailIdNotExistException;
import com.stackroute.userservice.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public interface UserService {

    //registering user
    public User saveUser(User user) throws EmailIdAlreadyExistException;

    //Fetching all the users who is registered
    public List<User> getAllUser();

    //Getting User Details By the Email
    public User getUserByEmail(String email) throws EmailIdNotExistException;

    //Deleteing User By EmailId
    public boolean deleteUserByEmailId(String email) throws EmailIdNotExistException;

    //Updating User details
    public User updateUser(User user, User updateUser);

    //Updating User By EmailId
    User updateUserByEmailId(String email, User updateUser) throws EmailIdNotExistException;

    public User validateUser(User user);

    void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException;
}