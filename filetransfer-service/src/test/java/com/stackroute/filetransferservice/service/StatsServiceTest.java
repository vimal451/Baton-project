package com.stackroute.filetransferservice.service;

import com.stackroute.filetransferservice.enums.RouteStatus;
import com.stackroute.filetransferservice.exception.RouteAlreadyExistsException;
import com.stackroute.filetransferservice.exception.RouteNotExistsException;
import com.stackroute.filetransferservice.model.SftpRoute;
import com.stackroute.filetransferservice.model.Stats;
import com.stackroute.filetransferservice.repository.SftpRouteRepository;
import com.stackroute.filetransferservice.repository.StatsRepository;
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
public class StatsServiceTest {

    @InjectMocks
    private StatsService statsService;

    @Mock
    private StatsRepository statsRepository;

    private Stats stats1;
    private Stats stats2;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        stats1 = new Stats("route123", "innerclass", LocalDateTime.now(), 150);
        stats2 = new Stats("route123", "jpa", LocalDateTime.now(), 180);
    }

    @AfterEach
    void tearDown() throws Exception {
        stats1 = null;
        stats2 = null;
    }

    @Test
    void testSaveStats() {
        when(statsRepository.save(stats1)).thenReturn(stats1);
        Stats createdStats = statsService.saveStats(stats1);
        assertEquals(stats1.toString(), createdStats.toString());
    }


    @Test
    void testGetStatsByRouteId() {
        List<Stats> expected = new ArrayList<>();
        expected.add(stats1);
        expected.add(stats2);
        when(statsRepository.findByRouteId(stats1.getRouteId())).thenReturn(expected);

        List<Stats> actual = statsService.getStatsByRouteId(stats1.getRouteId());

        assertEquals(expected.size(), actual.size());
        assertEquals(expected.get(0).getRouteId(), actual.get(0).getRouteId());
        assertEquals(expected.get(0).getFileName(), actual.get(0).getFileName());
    }

}