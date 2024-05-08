package com.stackroute.filetransferservice.service;

import com.stackroute.filetransferservice.model.Stats;
import com.stackroute.filetransferservice.repository.StatsRepository;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    @Autowired
    private StatsRepository statsRepository;

    public Stats saveStats(Stats stats){
        return statsRepository.save(stats);
    }

    public List<Stats> getStatsByRouteId(String routeId){
        return statsRepository.findByRouteId(routeId);
    }

}
