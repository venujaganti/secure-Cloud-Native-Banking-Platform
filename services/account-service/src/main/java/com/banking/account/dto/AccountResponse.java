package com.banking.account.dto;

import java.math.BigDecimal;

public record AccountResponse(
        Long id,
        Long userId,
        String accountNumber,
        String accountType,
        BigDecimal balance
) {
}