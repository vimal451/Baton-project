package com.stackroute.filetransferservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Stats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stats_id")
    private long statsId;
    @Column(name = "route_id")
    private String routeId;
    @Column(name = "file_name")
    private String fileName;
    @Column(name = "transferred_at")
    private LocalDateTime transferredAt;
    @Column(name = "transfer_duration_in_millis")
    private long transferDurationInMillis;

    public Stats(String routeId, String fileName, LocalDateTime transferredAt, long transferDurationInMillis) {
        this.routeId = routeId;
        this.fileName = fileName;
        this.transferredAt = transferredAt;
        this.transferDurationInMillis = transferDurationInMillis;
    }
}
