package com.banking.user.service;

import com.banking.user.dto.UserRequest;
import com.banking.user.dto.UserResponse;
import com.banking.user.model.User;
import com.banking.user.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserResponse create(UserRequest request) {

        User user = new User(
                request.email(),
                request.firstName(),
                request.lastName(),
                request.phone()
        );

        return toResponse(repository.save(user));
    }

    public UserResponse getById(Long id) {

        User user = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found."
                        ));

        return toResponse(user);
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone()
        );
    }
}