package com.banking.account.service;

import java.math.BigDecimal;
import java.util.List;

import com.banking.account.dto.AccountRequest;
import com.banking.account.dto.AccountResponse;
import com.banking.account.model.Account;
import com.banking.account.repository.AccountRepository;

import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository repository;

    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }

    public AccountResponse create(AccountRequest request) {

        BigDecimal balance =
                request.initialBalance() != null
                        ? request.initialBalance()
                        : BigDecimal.ZERO;

        Account account = new Account(
                request.userId(),
                request.accountNumber(),
                request.accountType(),
                balance
        );

        return toResponse(repository.save(account));
    }

    public List<AccountResponse> findByUser(Long userId) {

        return repository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public AccountResponse findById(Long id) {

        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Account not found."
                        ));
    }

    private AccountResponse toResponse(Account account) {

        return new AccountResponse(
                account.getId(),
                account.getUserId(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getBalance()
        );
    }
}