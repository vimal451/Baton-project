package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.service.serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.authenticationservice.model.authmodel;
//import com.stackroute.userservice.service.UserService;

@RestController
@RequestMapping("/api/users")
public class authcontroller {

    @Autowired
    private serviceimpl authservice ;

    @PostMapping("/authenticate")
    public ResponseEntity<?> registerUser(@RequestBody authmodel Authmodel) {
        // Perform manual validation
        if (Authmodel == null || Authmodel.getUsername() == null || Authmodel.getUsername().isEmpty() ||
                Authmodel.getPassword() == null || Authmodel.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("User information is incomplete");
        }

    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        // Call the service to retrieve user by username
        authmodel Authmodel = authservice.getUserByUsername(username);
        if (Authmodel == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Authmodel);
    }
}
