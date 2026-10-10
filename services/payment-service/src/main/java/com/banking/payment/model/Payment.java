package com.banking.payment.model;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long accountId;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String paymentType;

    @Column(nullable = false)
    private String status;

    private String reference;

    @Column(nullable = false)
    private Instant createdAt;

    public Payment() {
    }

    public Payment(
            Long accountId,
            BigDecimal amount,
            String paymentType,
            String status,
            String reference) {

        this.accountId = accountId;
        this.amount = amount;
        this.paymentType = paymentType;
        this.status = status;
        this.reference = reference;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Long getAccountId() {
        return accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public String getStatus() {
        return status;
    }

    public String getReference() {
        return reference;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}