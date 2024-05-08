package com.stackroute.filetransferservice.service;

import com.stackroute.filetransferservice.enums.RouteStatus;
import com.stackroute.filetransferservice.exception.RouteAlreadyExistsException;
import com.stackroute.filetransferservice.exception.RouteNotExistsException;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.repository.SftpRouteRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SftpRouteServiceTest {

    @InjectMocks
    private SftpRouteService sftpRouteService;

    @Mock
    private SftpRouteRepository sftpRouteRepository;

    @Mock
    private FileTransferService fileTransferService;

    private SftpRoute route1;
    private SftpRoute route2;

    @BeforeEach
    void setUp() throws Exception{
        MockitoAnnotations.openMocks(this);
        route1 = new SftpRoute("route117", "example@example.com", "192.168.142.17",22,"baton", "Chennai@123", "sftp4","192.168.142.67",22,"baton", "Chennai@123",  "Outgoing", LocalDateTime.now(), LocalDateTime.now(),RouteStatus.INACTIVE);
        route2 = new SftpRoute("route118","example@example.com", "192.168.142.67",22,"baton", "Chennai@123", "Outgoing", "192.168.142.17", 22, "baton", "Chennai@123", "sftp4", LocalDateTime.now(), LocalDateTime.now(),RouteStatus.INACTIVE);
    }

    @AfterEach
    void tearDown() throws Exception{
        route1 = null;
        route2 = null;
    }

    @Test
    void testRegisterRoute() {
        when(sftpRouteRepository.existsById(route1.getRouteId())).thenReturn(false);
        when(sftpRouteRepository.save(route1)).thenReturn(route1);
        try{
            SftpRoute createdRoute = sftpRouteService.registerRoute(route1, route1.getCreatedBy());
            assertNotNull(createdRoute);
            assertEquals(route1.getRouteId(), createdRoute.getRouteId());
        } catch (Exception e) {
            fail();
        }
    }

    @Test
    void testRegisterRouteAlreadyExists(){
        when(sftpRouteRepository.existsById(route1.getRouteId())).thenReturn(true);
        assertThrows(RouteAlreadyExistsException.class, () -> sftpRouteService.registerRoute(route1, route1.getCreatedBy()));
    }

    @Test
    void testGetAllRoutes(){
        List<SftpRoute> expected = new ArrayList<>();
        expected.add(route1);
        expected.add(route2);
        when(sftpRouteRepository.findByCreatedBy(route1.getCreatedBy())).thenReturn(expected);

        List<SftpRoute> actual = sftpRouteService.getAllRoutes(route1.getCreatedBy());

        assertEquals(expected.size(), actual.size());
        assertEquals(expected.get(0).getRouteId(), actual.get(0).getRouteId());
    }

    @Test
    void testGetRouteById(){
        when(sftpRouteRepository.findByRouteIdAndCreatedBy(route1.getRouteId(), route1.getCreatedBy())).thenReturn(Optional.ofNullable(route1));
        SftpRoute route = sftpRouteService.getRouteById(route1.getRouteId(), route1.getCreatedBy());
        assertEquals(route.getRouteId(),route1.getRouteId());
    }

    @Test
    void testUpdateRoute(){
        SftpRoute updatedRoute = new SftpRoute("route117", "example@example.com", "192.168.142.17",22,"baton", "Chennai432@123", "sftp4","192.168.142.67",22,"baton", "Chennai@123",  "Outgoing", LocalDateTime.now(), LocalDateTime.now(),RouteStatus.INACTIVE);
        when(sftpRouteRepository.existsByRouteIdAndCreatedBy(route1.getRouteId(), route1.getCreatedBy())).thenReturn(true);
        when(sftpRouteRepository.save(updatedRoute)).thenReturn(updatedRoute);
        try{
            SftpRoute actual = sftpRouteService.updateRoute(route1.getRouteId(), updatedRoute, route1.getCreatedBy());
            assertEquals(updatedRoute, actual);
        }catch (Exception e){
            fail();
        }
    }

    @Test
    void testUpdateRouteNotExists(){
        SftpRoute updatedRoute = new SftpRoute("route117", "example@example.com", "192.168.142.17",22,"baton", "Chennai432@123", "sftp4","192.168.142.67",22,"baton", "Chennai@123",  "Outgoing", LocalDateTime.now(), LocalDateTime.now(),RouteStatus.INACTIVE);
        when(sftpRouteRepository.existsByRouteIdAndCreatedBy(route2.getRouteId(), route2.getCreatedBy())).thenReturn(false);
        assertThrows(RouteNotExistsException.class, () -> sftpRouteService.updateRoute(route2.getRouteId(), updatedRoute, route2.getCreatedBy()));
    }

    @Test
    void testDeleteRoute(){
        when(sftpRouteRepository.existsByRouteIdAndCreatedBy(route1.getRouteId(), route1.getCreatedBy())).thenReturn(true);
        doNothing().when(sftpRouteRepository).deleteById(route1.getRouteId());
        try{
            sftpRouteService.deleteRoute(route1.getRouteId(), route1.getCreatedBy());
        }catch (Exception e){
            fail();
        }
    }

    @Test
    void testDeleteRouteNotExists(){
        when(sftpRouteRepository.existsByRouteIdAndCreatedBy(route1.getRouteId(), route1.getCreatedBy())).thenReturn(false);
        assertThrows(RouteNotExistsException.class, () -> sftpRouteService.deleteRoute(route1.getRouteId(), route1.getCreatedBy()));
    }
}
