package com.stackroute.filetransferservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.filetransferservice.model.SftpRoute;

import java.util.List;
import java.util.Optional;

@Repository
public interface SftpRouteRepository extends JpaRepository<SftpRoute, String>{

    List<SftpRoute> findByCreatedBy(String createdBy);
    Optional<SftpRoute> findByRouteIdAndCreatedBy(String routeId, String createdBy);
    boolean existsByRouteIdAndCreatedBy(String routeId, String createdBy);
}
