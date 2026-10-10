package com.banking.audit.model;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    @Column(nullable = false)
    private String action;

    private String resource;

    private String ipAddress;

    @Column(nullable = false)
    private Instant createdAt;

    public AuditLog() {
    }

    public AuditLog(
            String userId,
            String action,
            String resource,
            String ipAddress) {

        this.userId = userId;
        this.action = action;
        this.resource = resource;
        this.ipAddress = ipAddress;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getAction() {
        return action;
    }

    public String getResource() {
        return resource;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}