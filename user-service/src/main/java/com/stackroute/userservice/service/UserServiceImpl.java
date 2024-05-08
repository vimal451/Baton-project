package com.stackroute.userservice.service;


import com.stackroute.userservice.exceptions.EmailIdAlreadyExistException;
import com.stackroute.userservice.exceptions.EmailIdNotExistException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    public UserRepository userRepository;


    @Override
    public User saveUser(User user) throws EmailIdAlreadyExistException {
        Optional<User> optionalUser =  userRepository.findById(user.getEmailId());
        if(optionalUser.isPresent()) {
            throw new EmailIdAlreadyExistException("Invalid Email Id. Email Id Already Exist.");
        }
        User savedUser = userRepository.save(user);
        return savedUser;
    }


    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) throws EmailIdNotExistException {
        Optional<User> optionalUser = userRepository.findById(email);
        User user = optionalUser.isEmpty()?null:optionalUser.get();
        if(user == null){
            throw new EmailIdNotExistException("Email Id Not exist");
        }
        return user;
    }


    @Override
    public boolean deleteUserByEmailId(String email) throws EmailIdNotExistException {
        Optional<User> optionalUser = userRepository.findById(email);
        User user = optionalUser.isEmpty()?null:optionalUser.get();
        if(user==null) {
            throw new EmailIdNotExistException("Email Id Not exist");
        }
        userRepository.deleteById(email);
        return true;
    }



    @Override
    public User updateUser(User user, User updateUser) {
        updateUser.setEmailId(user.getEmailId());
        updateUser.setLocation(user.getLocation());
        updateUser.setUserName(user.getUserName());
        updateUser.setPassword(user.getPassword());
        updateUser.setMobileNumber(user.getMobileNumber());

        User updatedUser = userRepository.save(user);
        return updatedUser;
    }

    @Override
    public User updateUserByEmailId(String email, User updateUser) throws EmailIdNotExistException {
        Optional<User> optionalUser = userRepository.findById(email);
        if (optionalUser.isEmpty()) {
            throw new EmailIdNotExistException("Email ID does not exist");
        }
        User existingUser = optionalUser.get();
        existingUser.setEmailId(updateUser.getEmailId());
        existingUser.setLocation(updateUser.getLocation());
        existingUser.setUserName(updateUser.getUserName());
        existingUser.setPassword(updateUser.getPassword());
        existingUser.setMobileNumber(updateUser.getMobileNumber());

        User updatedUser = userRepository.save(existingUser);
        return updatedUser;
    }




    @Override
    public User validateUser(User user) {
        Optional<User> optional =userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
        User validateuser=optional.isPresent()?optional.get():null;
        return validateuser;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

    }

}
