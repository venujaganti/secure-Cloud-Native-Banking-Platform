package com.banking.payment.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentResponse(
        Long id,
        Long accountId,
        BigDecimal amount,
        String paymentType,
        String status,
        String reference,
        Instant createdAt
) {
}
