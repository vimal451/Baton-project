package com.stackroute.filetransferservice.controller;

import com.stackroute.filetransferservice.exception.RouteNotExistsException;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.service.SftpRouteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/route")
@CrossOrigin(origins = "http://localhost:3000")
public class SftpRouteController {

    @Autowired
    private SftpRouteService sftpRouteService;

    @PostMapping("/")
    public ResponseEntity<?> registerRoute(@RequestBody SftpRoute route, @RequestAttribute("createdBy") String createdBy) throws Exception {
        return new ResponseEntity<>(sftpRouteService.registerRoute(route, createdBy), HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllRoutes(@RequestAttribute("createdBy") String createdBy){
        return new ResponseEntity<>(sftpRouteService.getAllRoutes(createdBy), HttpStatus.OK);
    }

    @GetMapping("/{routeId}")
    public ResponseEntity<?> getRouteById(@PathVariable String routeId, @RequestAttribute("createdBy") String createdBy) {
        return new ResponseEntity<>(sftpRouteService.getRouteById(routeId, createdBy), HttpStatus.OK);
    }

    @PutMapping("/{routeId}")
    public ResponseEntity<?> updateRoute(@PathVariable String routeId, @RequestBody SftpRoute route, @RequestAttribute("createdBy") String createdBy) throws RouteNotExistsException {
        return new ResponseEntity<>(sftpRouteService.updateRoute(routeId,route, createdBy), HttpStatus.OK);
    }

    @DeleteMapping("/{routeId}")
    public ResponseEntity<?> deleteRoute(@PathVariable String routeId, @RequestAttribute("createdBy") String createdBy) throws RouteNotExistsException {
        sftpRouteService.deleteRoute(routeId, createdBy);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
