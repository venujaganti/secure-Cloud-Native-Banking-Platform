package com.banking.account.repository;

import java.util.List;

import com.banking.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository
        extends JpaRepository<Account, Long> {

    List<Account> findByUserId(Long userId);
}