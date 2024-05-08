package com.stackroute.filetransferservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stackroute.filetransferservice.enums.RouteStatus;
import com.stackroute.filetransferservice.exception.GlobalExceptionHandler;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.service.SftpRouteService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(SftpRouteController.class)
public class SftpRouteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SftpRouteService sftpRouteService;

    @InjectMocks
    private SftpRouteController sftpRouteController;

    private SftpRoute route1;
    private SftpRoute route2;

    @BeforeEach
    void setUp() throws Exception{
        MockitoAnnotations.openMocks(this);
        route1 = new SftpRoute("route117", "192.168.142.17",22,"baton", "Chennai@123", "baton", "Chennai@123", 22, "192.168.142.67", "sftp4", "Outgoing");
        route2 = new SftpRoute("route118", "192.168.142.67",22,"baton", "Chennai@123", "baton", "Chennai@123", 22, "192.168.142.17", "Outgoing", "sftp4");
        mockMvc = MockMvcBuilders.standaloneSetup(sftpRouteController).setControllerAdvice(new GlobalExceptionHandler()).build();
    }

    @AfterEach
    void tearDown() throws Exception{
        route1 = null;
        route2 = null;
    }

    @Test
    void testRegisterRoute() throws Exception {
        when(sftpRouteService.registerRoute(route1, "example@example.com")).thenReturn(route1);
        String routeString = new ObjectMapper().writeValueAsString(route1);
        mockMvc.perform(post("/api/v1/route/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(routeString))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].routeId").value(route1.getRouteId()));

    }

}
