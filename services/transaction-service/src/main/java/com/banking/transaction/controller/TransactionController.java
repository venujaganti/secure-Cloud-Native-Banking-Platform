package com.banking.transaction.controller;

import java.util.List;

import com.banking.transaction.dto.TransactionResponse;
import com.banking.transaction.dto.TransferRequest;
import com.banking.transaction.service.TransactionService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping("/transfer")
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse transfer(
            @Valid @RequestBody TransferRequest request) {

        return service.createTransfer(request);
    }

    @GetMapping("/account/{accountId}")
    public List<TransactionResponse> byAccount(
            @PathVariable Long accountId) {

        return service.findByAccount(accountId);
    }
}