package com.stackroute.filetransferservice.controller;

import com.stackroute.filetransferservice.service.FileTransferService;
import com.stackroute.filetransferservice.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/v1/routecontroller/")
@RestController
public class FileTransferController{
    @Autowired
    private FileTransferService fileTransferService;

    @Autowired
    private StatsService statsService;

    @GetMapping("start/{routeId}")
    public ResponseEntity<?> startRoute(@PathVariable String routeId) throws Exception {
        fileTransferService.startRoute(routeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("stop/{routeId}")
    public ResponseEntity<?> stopRoute(@PathVariable String routeId) throws Exception {
        fileTransferService.stopRoute(routeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("restart/{routeId}")
    public ResponseEntity<?> restartRoute(@PathVariable String routeId) throws Exception {
        fileTransferService.restartRoute(routeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("stats/{routeId}")
    public ResponseEntity<?> getStats(@PathVariable String routeId){
        return new ResponseEntity<>(statsService.getStatsByRouteId(routeId), HttpStatus.OK);
    }


}