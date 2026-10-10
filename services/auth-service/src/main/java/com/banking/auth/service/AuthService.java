package com.banking.auth.service;

import com.banking.auth.dto.LoginRequest;
import com.banking.auth.dto.LoginResponse;
import com.banking.auth.dto.RegisterRequest;
import com.banking.auth.model.UserCredential;
import com.banking.auth.repository.AuthRepository;
import com.banking.auth.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AuthRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse register(RegisterRequest request) {

        if (repository.existsByEmail(request.email())) {
            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        UserCredential user = new UserCredential(
                request.email(),
                passwordEncoder.encode(request.password()),
                "USER"
        );

        repository.save(user);

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(
                token,
                "Bearer",
                user.getEmail(),
                user.getRole()
        );
    }

    public LoginResponse login(LoginRequest request) {

        UserCredential user =
                repository.findByEmail(request.email())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid credentials."
                                ));

        if (!passwordEncoder.matches(
                request.password(),
                user.getPasswordHash())) {

            throw new IllegalArgumentException(
                    "Invalid credentials."
            );
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(
                token,
                "Bearer",
                user.getEmail(),
                user.getRole()
        );
    }
}