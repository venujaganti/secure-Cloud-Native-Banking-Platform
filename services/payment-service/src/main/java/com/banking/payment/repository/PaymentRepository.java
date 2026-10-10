package com.banking.payment.repository;

import java.util.List;

import com.banking.payment.model.Payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    List<Payment> findByAccountIdOrderByCreatedAtDesc(
            Long accountId
    );
}