package com.banking.notification.model;

import java.time.Instant;

public class Notification {

    private Long id;
    private String userId;
    private String title;
    private String message;
    private boolean read;
    private Instant createdAt;

    public Notification() {
    }

    public Notification(
            Long id,
            String userId,
            String title,
            String message) {

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.read = false;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public boolean isRead() {
        return read;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}