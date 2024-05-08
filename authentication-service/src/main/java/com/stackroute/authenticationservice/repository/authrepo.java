package com.stackroute.authenticationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface authrepo extends JpaRepository<authrepo,String> {
    authrepo findByUsername(String username);

}
