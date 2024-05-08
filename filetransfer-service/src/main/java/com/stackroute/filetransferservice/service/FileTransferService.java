package com.stackroute.filetransferservice.service;

import com.stackroute.filetransferservice.enums.RouteStatus;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.model.Stats;
import com.stackroute.filetransferservice.repository.SftpRouteRepository;
import io.micrometer.core.instrument.Meter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.search.RequiredSearch;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.spring.boot.SpringBootCamelContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Timer;
import java.util.concurrent.TimeUnit;

@Service
public class FileTransferService {

    @Autowired
    private CamelContext camelContext;

    @Autowired
    private SftpRouteRepository sftpRouteRepository;

    @Autowired
    private StatsService statsService;
//    @Autowired
//    private SpringBootCamelContext springBootCamelContext;

    @Autowired
    private ProducerTemplate producerTemplate;

    public void createRoute(SftpRoute route) throws Exception {
        RouteBuilder routeBuilder = new RouteBuilder() {
            @Override
            public void configure() throws Exception {
//                String fromUrl = "sftp://baton@171.16.0.10/sftp?password=Chennai@123&sortBy=file:modified&recursive=true";
//                String toUrl = "sftp://vimal.kthomas@192.168.1.58/Outgoing?password=Spring@boot4";
                String fromUrl = "sftp://" + route.getLocalUsername() + "@" + route.getLocalHost() + "/" + route.getLocalDirectory() + "?password=" + route.getLocalPassword() + "&sortBy=file:modified&recursive=true";
                String toUrl = "sftp://" + route.getRemoteUsername() + "@" + route.getRemoteHost() + "/" + route.getRemoteDirectory() + "?password=" + route.getRemotePassword();
                String routeId = "sftp-route-" + route.getRouteId();
                from(fromUrl)
                        .routeId(routeId)
                        .process( exchange -> {

                            long startTime = System.currentTimeMillis();
                            exchange.setProperty("startTime", startTime);
                        })
                        .log("route id added")
                        .autoStartup(false)
                        .to(toUrl)
                        .process(exchange -> {
                            Stats stats = new Stats();
                            String fileName = exchange.getIn().getHeader("CamelFileName", String.class);
                            System.out.println("File: " + fileName);
                            long transferTime = System.currentTimeMillis() - (long) exchange.getProperty("startTime");
                            stats.setRouteId(route.getRouteId());
                            stats.setFileName(fileName);
                            stats.setTransferDurationInMillis(transferTime);
                            stats.setTransferredAt(LocalDateTime.now());
                            statsService.saveStats(stats);
                        });

            }
        };
        camelContext.addRoutes(routeBuilder);
    }

    public void startRoute(String routeId) throws Exception {
         String endpointUri = "controlbus:route?routeId=sftp-route-"  + routeId + "&action=start";
         producerTemplate.sendBody(endpointUri, null);
         SftpRoute route = sftpRouteRepository.findById(routeId).get();
        route.setUpdatedAt(LocalDateTime.now());
         route.setStatus(RouteStatus.ACTIVE);
         sftpRouteRepository.save(route);
    }

    public void stopRoute(String routeId) throws Exception {
        String endpointUri = "controlbus:route?routeId=sftp-route-"  + routeId + "&action=stop";
        producerTemplate.sendBody(endpointUri, null);
        SftpRoute route = sftpRouteRepository.findById(routeId).get();
        route.setUpdatedAt(LocalDateTime.now());
        route.setStatus(RouteStatus.INACTIVE);
        sftpRouteRepository.save(route);
    }

    public void restartRoute(String routeId) throws Exception{
        producerTemplate.sendBody("controlbus:route?routeId=sftp-route-"  + routeId + "&action=stop", null);
        producerTemplate.sendBody("controlbus:route?routeId=sftp-route-"  + routeId + "&action=start", null);
    }


}
