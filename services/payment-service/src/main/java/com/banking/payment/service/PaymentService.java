package com.banking.payment.service;

import com.banking.payment.dto.PaymentRequest;
import com.banking.payment.dto.PaymentResponse;
import com.banking.payment.model.Payment;
import com.banking.payment.repository.PaymentRepository;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public PaymentResponse create(
            PaymentRequest request) {

        Payment payment = new Payment(
                request.accountId(),
                request.amount(),
                request.paymentType() != null
                        ? request.paymentType()
                        : "BANK_TRANSFER",
                "COMPLETED",
                request.reference()
        );

        return toResponse(repository.save(payment));
    }

    private PaymentResponse toResponse(Payment payment) {

        return new PaymentResponse(
                payment.getId(),
                payment.getAccountId(),
                payment.getAmount(),
                payment.getPaymentType(),
                payment.getStatus(),
                payment.getReference(),
                payment.getCreatedAt()
        );
    }
}