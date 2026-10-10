package com.banking.user.controller;

import com.banking.user.dto.UserRequest;
import com.banking.user.dto.UserResponse;
import com.banking.user.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(
            @Valid @RequestBody UserRequest request) {

        return service.create(request);
    }

    @GetMapping("/{id}")
    public UserResponse getById(
            @PathVariable Long id) {

        return service.getById(id);
    }
}