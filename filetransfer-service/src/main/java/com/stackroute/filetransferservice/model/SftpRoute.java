package com.stackroute.filetransferservice.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.stackroute.filetransferservice.enums.RouteStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sftp_route")
public class SftpRoute {
    @Id
    @Column(name = "route_id")
    private String routeId;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "local_host")
    private String localHost;
    @Column(name = "local_port")
    private int localPort;
    @Column(name = "local_username")
    private String localUsername;
    @Column(name = "local_password")
    private String localPassword;
    @Column(name = "local_directory")
    private String localDirectory;
    @Column(name = "remote_host")
    private String remoteHost;
    @Column(name = "remote_port")
    private int remotePort;
    @Column(name = "remote_username")
    private String remoteUsername;
    @Column(name = "remote_password")
    private String remotePassword;
    @Column(name = "remote_directory")
    private String remoteDirectory;
    @Column(name = "created_at")
    @JsonSerialize
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    @JsonSerialize
    private LocalDateTime updatedAt;
    private RouteStatus status;

    public SftpRoute(String routeId, String localHost, int localPort, String localUsername, String localPassword, String localDirectory, String remoteHost, int remotePort, String remoteUsername, String remotePassword, String remoteDirectory) {
        this.routeId = routeId;
        this.localHost = localHost;
        this.localPort = localPort;
        this.localUsername = localUsername;
        this.localPassword = localPassword;
        this.localDirectory = localDirectory;
        this.remoteHost = remoteHost;
        this.remotePort = remotePort;
        this.remoteUsername = remoteUsername;
        this.remotePassword = remotePassword;
        this.remoteDirectory = remoteDirectory;
    }
}
