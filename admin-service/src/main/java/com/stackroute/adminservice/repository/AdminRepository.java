package com.stackroute.adminservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.adminservice.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {

	Admin findByUserName(String userName);
}
