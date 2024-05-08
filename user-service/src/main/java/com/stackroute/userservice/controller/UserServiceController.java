package com.stackroute.userservice.controller;


import com.stackroute.userservice.exceptions.EmailIdAlreadyExistException;
import com.stackroute.userservice.exceptions.EmailIdNotExistException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user-service")
public class UserServiceController {


    @Autowired
    private UserServiceImpl userServiceImpl;

    //FOR HOME PAGE, OF USER
    @GetMapping("/")
    public ResponseEntity<?> home(){
        ResponseEntity<?> entity = new ResponseEntity<String>("Welcome to Shield-Share", HttpStatus.OK);
        return entity;
    }

    //GETTING ALL THE USERS
    @GetMapping(value = "/users", produces = "application/json")
    public ResponseEntity<?> getAllUsers(){
        List<User> userList = userServiceImpl.getAllUser();
        ResponseEntity<?> entity = new ResponseEntity<List<User>>(userList,HttpStatus.OK);
        return entity;
    }



    //SIGN UP REGISTRATION PROCESS
    @PostMapping("/register")
    public ResponseEntity<?> registerUer(@RequestBody User user){
        ResponseEntity<?> entity = null;
        String regexPattern = "^(.+)@(\\S+)$";
        try {
            if(user.getEmailId() == null || user.getPassword() == null ){
                return new ResponseEntity<String>("Important Information Missing", HttpStatus.BAD_REQUEST);
            }else if(!user.getEmailId().matches(regexPattern)){
                return new ResponseEntity<String>("Bad Email Id", HttpStatus.BAD_REQUEST);
            }
            userServiceImpl.saveUser(user);
            entity= new ResponseEntity<String>("User Registered Successfully..",HttpStatus.CREATED);
        } catch (EmailIdAlreadyExistException e) {
            entity= new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return entity;
    }



    //FOR CHECKING FETCHING THE DETAILS OF USER VIA EMAIL
    @GetMapping(value="/users/{email}", produces = "application/json")
    public ResponseEntity<?> getUserByEmailId(@PathVariable("email") String emailId) {
        ResponseEntity<?> entity = null;
        User user = null;
        try {
            user = userServiceImpl.getUserByEmail(emailId);
        } catch (EmailIdNotExistException e) {
            throw new RuntimeException(e);
        }
        if(user==null) {
            entity = new ResponseEntity<String>("Email Id Not Exist",HttpStatus.BAD_REQUEST);
        }else {
            entity = new ResponseEntity<User>(user,HttpStatus.OK);
        }
        return entity;
    }


    // DELETING USER IF THEY DIDNT WANTED TO USE OUR SERVICE
    @DeleteMapping("/users/{email}")
    public ResponseEntity<?> deleteUserByEmail(@PathVariable("email") String emailId){
        boolean isDeleted = false;
        try {
            isDeleted = userServiceImpl.deleteUserByEmailId(emailId);
        } catch (EmailIdNotExistException e) {
            throw new RuntimeException(e);
        }
        ResponseEntity<?> entity = new ResponseEntity<String>("Something went Wrong",HttpStatus.BAD_REQUEST);
        if(isDeleted) {
            entity = new ResponseEntity<String>("User deleted Successfully",HttpStatus.OK);
        }
        return entity;
    }


    // USER CAN UPDATE THIER  DETAILS BY EMAIL ID
    @PutMapping("/usersbyemail/{email}")
    public ResponseEntity<?> updateUserByEmail(@PathVariable("email") String emailId, @RequestBody User updateUser) {
        try {
            User updatedUser = userServiceImpl.updateUserByEmailId(emailId, updateUser);
            return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
        } catch (EmailIdNotExistException e) {
            throw new RuntimeException(e);
        }
    }






    //USER CAN ABLE TO UPDATE THEIR DETAILS
    @PutMapping("users/{email}")
    public ResponseEntity<?> updateUser(@PathVariable("email") String emailId, @RequestBody User user) {
        User updateUser;
        try {
            updateUser = userServiceImpl.getUserByEmail(emailId);
        } catch (EmailIdNotExistException e) {
            throw new RuntimeException(e);
        }
        userServiceImpl.updateUser(user, updateUser);
        return new ResponseEntity<User>(updateUser, HttpStatus.CREATED);
    }

    @Data
    class UserEmailAndToken{
        private String emailId;
        private String token;
    }


    // AFTER SIGNING UP, USER CAN ABLE TO LOGIN IN OUR SERVICE
    @PostMapping("/login")
    public ResponseEntity<?> validateUser(@RequestBody User user){
        System.out.println("received payload");
        User user1= userServiceImpl.validateUser(user);
        ResponseEntity<?> entity= new ResponseEntity<String>("Invalid Username/ Password",HttpStatus.NOT_FOUND);
        if(user1!=null) {
            String token= getToken(user.getEmailId());
            UserEmailAndToken userEmailAndToken = new UserEmailAndToken();
            userEmailAndToken.setEmailId(user.getEmailId());
            userEmailAndToken.setToken(token);
            entity=new ResponseEntity<UserEmailAndToken>(userEmailAndToken,HttpStatus.OK);
        }
        return entity;
    }


    //JWT PART
    private String getToken(String emailId) {
        String token = Jwts.builder().setSubject(emailId).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "BATON-SUCCESS").compact();
        System.out.println("from line 133 "+token);
        return token;
    }

    private String validateToken(String token){
        final Claims claims = Jwts.parser().setSigningKey("BATON-SUCCESS").parseClaimsJws(token).getBody();
        return claims.getSubject();
    }


//    @GetMapping(value="/users/verify", produces = "application/json")
//    public ResponseEntity<?> verifyUser(@RequestHeader Map<String, String> header){
//        Claims claims = Jwts.parser().setSigningKey("success").parseClaimsJws(header.get("token").toString()).getBody();
//        ResponseEntity<?> entity = null;
//        User user = null;
//        if(claims.isEmpty()){
//            return new ResponseEntity<String>("Bad JWT Token", HttpStatus.UNAUTHORIZED);
//        }else{
//            try {
//                user = userServiceImpl.getUserByEmail(claims.getSubject());
//            } catch (EmailIdNotExistException e) {
//
//                throw new RuntimeException(e);
//            }
//            if(user==null) {
//                entity = new ResponseEntity<String>("Email Id Not Exist",HttpStatus.BAD_REQUEST);
//            }else {
//                entity = new ResponseEntity<User>(user,HttpStatus.OK);
//            }
//            return entity;
//        }
//    }

    @ExceptionHandler(EmailIdNotExistException.class)
    public ResponseEntity<?> exceptionHandler(Exception e){
        ResponseEntity<?> entity = new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
        return entity;
    }
}