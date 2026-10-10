package com.banking.transaction.kafka;

import java.math.BigDecimal;

public record TransactionEvent(
        Long transactionId,
        Long accountId,
        BigDecimal amount,
        String type,
        String status
) {
}