package com.banking.auth.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        String email,
        String role
) {
}