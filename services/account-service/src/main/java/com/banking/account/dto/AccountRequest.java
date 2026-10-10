package com.banking.account.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AccountRequest(
        @NotNull Long userId,
        @NotBlank String accountNumber,
        @NotBlank String accountType,
        BigDecimal initialBalance
) {
}