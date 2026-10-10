package com.banking.transaction.service;

import java.util.List;

import com.banking.transaction.dto.TransactionResponse;
import com.banking.transaction.dto.TransferRequest;
import com.banking.transaction.kafka.TransactionProducer;
import com.banking.transaction.model.Transaction;
import com.banking.transaction.repository.TransactionRepository;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository repository;
    private final TransactionProducer producer;

    public TransactionService(
            TransactionRepository repository,
            TransactionProducer producer) {

        this.repository = repository;
        this.producer = producer;
    }

    public TransactionResponse createTransfer(
            TransferRequest request) {

        Transaction transaction = new Transaction(
                request.accountId(),
                request.amount(),
                "TRANSFER",
                "COMPLETED",
                request.description()
        );

        Transaction saved = repository.save(transaction);

        producer.publish(saved);

        return toResponse(saved);
    }

    public List<TransactionResponse> findByAccount(
            Long accountId) {

        return repository
                .findByAccountIdOrderByCreatedAtDesc(accountId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private TransactionResponse toResponse(
            Transaction transaction) {

        return new TransactionResponse(
                transaction.getId(),
                transaction.getAccountId(),
                transaction.getAmount(),
                transaction.getTransactionType(),
                transaction.getStatus(),
                transaction.getDescription(),
                transaction.getCreatedAt()
        );
    }
}