package com.stackroute.adminservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.adminservice.service.AdminServiceImpl;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	AdminServiceImpl adminService;
	
@GetMapping("/")
public ResponseEntity<?> dashboard(){
	return null;
}
	

@GetMapping("/history")
public ResponseEntity<?> history()
{
	return null;
}

@GetMapping("/user")
public ResponseEntity<?> userListPage()
{
	return null;
}


@PostMapping("/{username}/mail")
public ResponseEntity<?> sendMail()
{
	return null;
}
}