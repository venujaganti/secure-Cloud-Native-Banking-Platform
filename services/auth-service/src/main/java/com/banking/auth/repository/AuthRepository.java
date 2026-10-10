package com.banking.auth.repository;

import java.util.Optional;

import com.banking.auth.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository
        extends JpaRepository<UserCredential, Long> {

    Optional<UserCredential> findByEmail(String email);

    boolean existsByEmail(String email);
}