package com.stackroute.filetransferservice.repository;

import com.stackroute.filetransferservice.model.Stats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatsRepository extends JpaRepository<Stats, Long> {
    @Query(value = "select * from stats where route_id = :routeId order by stats_id desc limit 10",
    nativeQuery = true)
    List<Stats> findByRouteId(String routeId);
}
