package com.stackroute.userservice.repository;


import com.stackroute.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  UserRepository  extends JpaRepository<User, String> {

    Optional<User> findByEmailIdAndPassword(String emailId, String password);
}
