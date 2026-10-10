package com.banking.account.controller;

import java.util.List;

import com.banking.account.dto.AccountRequest;
import com.banking.account.dto.AccountResponse;
import com.banking.account.service.AccountService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AccountResponse create(
            @Valid @RequestBody AccountRequest request) {

        return service.create(request);
    }

    @GetMapping("/user/{userId}")
    public List<AccountResponse> findByUser(
            @PathVariable Long userId) {

        return service.findByUser(userId);
    }

    @GetMapping("/{id}")
    public AccountResponse findById(
            @PathVariable Long id) {

        return service.findById(id);
    }
}