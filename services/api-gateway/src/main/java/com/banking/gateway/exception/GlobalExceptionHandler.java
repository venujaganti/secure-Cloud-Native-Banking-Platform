package com.banking.gateway.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public Map<String, Object> handleResponseStatus(
            ResponseStatusException exception) {

        return Map.of(
                "status", exception.getStatusCode().value(),
                "error", exception.getReason() != null
                        ? exception.getReason()
                        : "Gateway error"
        );
    }

    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleException(Exception exception) {

        return Map.of(
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error", "Internal gateway error"
        );
    }
}