package com.stackroute.filetransferservice.repository;

import com.stackroute.filetransferservice.model.Stats;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@ExtendWith(SpringExtension.class)
public class StatsRepositoryTest {

    @Autowired
    private StatsRepository statsRepository;

    private Stats stats1;
    private Stats stats2;

    @BeforeEach
    void setUp() throws Exception{
        stats1 = new Stats("route123", "innerclass", LocalDateTime.now(), 150);
        stats2 = new Stats("route123", "jpa", LocalDateTime.now(), 180);
        statsRepository.deleteAll();
    }

    @AfterEach
    void tearDown() throws Exception{
        stats1 = null;
        stats2 = null;
    }

    @Test
    void testSave(){
        Stats createdStats = statsRepository.save(stats1);
        assertNotNull(createdStats);
        assertEquals(stats1.getRouteId(), createdStats.getRouteId());
        assertEquals(stats1.getFileName(), createdStats.getFileName());
    }

    @Test
    void testFindByRouteId(){
        List<Stats> expected = new ArrayList<>();
        expected.add(stats2);
        expected.add(stats1);
        statsRepository.save(stats1);
        statsRepository.save(stats2);
        List<Stats> actual = statsRepository.findByRouteId(stats1.getRouteId());
        assertEquals(expected.size(), actual.size());
        assertEquals(expected.get(0).getFileName(),actual.get(0).getFileName());
        assertEquals(expected.get(1).getFileName(),actual.get(1).getFileName());
    }
}
