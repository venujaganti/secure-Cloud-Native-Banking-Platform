package com.banking.auth.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String, Object> handleBadRequest(
            IllegalArgumentException exception) {

        return Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", exception.getMessage()
        );
    }

    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleException(
            Exception exception) {

        return Map.of(
                "status",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error",
                "Authentication service error"
        );
    }
}