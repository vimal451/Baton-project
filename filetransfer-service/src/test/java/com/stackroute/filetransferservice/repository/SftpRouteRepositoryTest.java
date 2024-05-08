package com.stackroute.filetransferservice.repository;

import com.stackroute.filetransferservice.enums.RouteStatus;
import com.stackroute.filetransferservice.model.SftpRoute;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SftpRouteRepositoryTest {

    @Autowired
    private SftpRouteRepository sftpRouteRepository;

    private SftpRoute route1;
    private SftpRoute route2;

    @BeforeEach
    void setUp() throws Exception{
        route1 = new SftpRoute("route117","example@example.com", "192.168.142.17",22,"baton", "Chennai@123", "baton", "Chennai@123", 22, "192.168.142.67", "sftp4", "Outgoing", LocalDateTime.now(),LocalDateTime.now(), RouteStatus.INACTIVE);
        route2 = new SftpRoute("route118","example@example.com", "192.168.142.67",22,"baton", "Chennai@123", "baton", "Chennai@123", 22, "192.168.142.17", "Outgoing", "sftp4", LocalDateTime.now(),LocalDateTime.now(), RouteStatus.INACTIVE);
        sftpRouteRepository.deleteAll();
    }

    @AfterEach
    void tearDown() throws Exception{
        route1 = null;
        route2 = null;
    }

    @Test
    void testSave(){
        SftpRoute createdRoute = sftpRouteRepository.save(route1);
        assertNotNull(createdRoute);
        assertEquals(route1.toString(), createdRoute.toString());
    }

    @Test
    void testFindByRouteIdAndCreatedBy(){
        SftpRoute createdRoute = sftpRouteRepository.save(route1);
        Optional<SftpRoute> optional = sftpRouteRepository.findByRouteIdAndCreatedBy(createdRoute.getRouteId(), createdRoute.getCreatedBy());
        if(optional.isPresent()){
            assertEquals(createdRoute.getRouteId(), optional.get().getRouteId());
        }else{
            fail();
        }
    }

    @Test
    void testFindByCreatedBy(){
        List<SftpRoute> expected = new ArrayList<>();
        expected.add(route1);
        expected.add(route2);
        sftpRouteRepository.save(route1);
        sftpRouteRepository.save(route2);
        List<SftpRoute> actual = sftpRouteRepository.findByCreatedBy(route1.getCreatedBy());
        assertEquals(expected.size(), actual.size());
        assertEquals(expected.get(0).getRouteId(), actual.get(0).getRouteId());
    }

    @Test
    void testExistsByRouteIdAndCreatedBy(){
        sftpRouteRepository.save(route1);
        assertTrue(sftpRouteRepository.existsByRouteIdAndCreatedBy(route1.getRouteId(), route1.getCreatedBy()));
        assertFalse(sftpRouteRepository.existsByRouteIdAndCreatedBy(route2.getRouteId(), route2.getCreatedBy()));
    }

    @Test
    void testDeleteByRouteId(){
        sftpRouteRepository.save(route1);
        sftpRouteRepository.deleteById(route1.getRouteId());
        assertFalse(sftpRouteRepository.existsById(route1.getRouteId()));
    }

}
