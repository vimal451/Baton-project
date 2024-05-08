package com.stackroute.filetransferservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.stackroute.filetransferservice.enums.RouteStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.filetransferservice.exception.RouteAlreadyExistsException;
import com.stackroute.filetransferservice.exception.RouteNotExistsException;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.repository.SftpRouteRepository;

@Service
public class SftpRouteService {

    @Autowired
    private SftpRouteRepository sftpRouteRepository;

    @Autowired
    private FileTransferService fileTransferService;

    public SftpRoute registerRoute(SftpRoute route, String createdBy) throws Exception {
        if(sftpRouteRepository.existsById(route.getRouteId())){
            throw new RouteAlreadyExistsException("Route with name " + route.getRouteId() + " already exists");
        }
        route.setCreatedBy(createdBy);
        route.setCreatedAt(LocalDateTime.now());
        route.setUpdatedAt(LocalDateTime.now());
        route.setStatus(RouteStatus.INACTIVE);
        SftpRoute registeredRoute = sftpRouteRepository.save(route);
        fileTransferService.createRoute(registeredRoute);
        return registeredRoute;
    }

    public List<SftpRoute> getAllRoutes(String createdBy){
        return sftpRouteRepository.findByCreatedBy(createdBy);
    }

    public SftpRoute getRouteById(String routeId, String createdBy){
        Optional<SftpRoute> optionalRoute = sftpRouteRepository.findByRouteIdAndCreatedBy(routeId, createdBy);
        return optionalRoute.orElse(null);
    }

    public SftpRoute updateRoute(String routeId, SftpRoute route, String createdBy) throws RouteNotExistsException {
        if(!sftpRouteRepository.existsByRouteIdAndCreatedBy(routeId, createdBy)){
            throw new RouteNotExistsException("Route with name " + routeId + " does not exists");
        }
        route.setCreatedBy(createdBy);
        route.setRouteId(routeId);
        route.setUpdatedAt(LocalDateTime.now());
        return sftpRouteRepository.save(route);
    }

    public void deleteRoute(String routeId, String createdBy) throws RouteNotExistsException{
        if(!sftpRouteRepository.existsByRouteIdAndCreatedBy(routeId, createdBy)){
            throw new RouteNotExistsException("Route with name " + routeId + " does not exists");
        }
        sftpRouteRepository.deleteById(routeId);
    }
}
