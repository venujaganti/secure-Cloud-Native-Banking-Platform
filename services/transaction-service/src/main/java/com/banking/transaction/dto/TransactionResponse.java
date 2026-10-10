package com.banking.transaction.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionResponse(
        Long id,
        Long accountId,
        BigDecimal amount,
        String transactionType,
        String status,
        String description,
        Instant createdAt
) {
}