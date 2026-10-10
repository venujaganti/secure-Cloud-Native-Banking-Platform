package com.banking.transaction.kafka;

import com.banking.transaction.model.Transaction;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class TransactionProducer {

    private final KafkaTemplate<String, TransactionEvent> kafkaTemplate;
    private final String topic;

    public TransactionProducer(
            KafkaTemplate<String, TransactionEvent> kafkaTemplate,
            @Value("${kafka.topic.transactions:banking.transactions}")
            String topic) {

        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void publish(Transaction transaction) {

        TransactionEvent event = new TransactionEvent(
                transaction.getId(),
                transaction.getAccountId(),
                transaction.getAmount(),
                transaction.getTransactionType(),
                transaction.getStatus()
        );

        kafkaTemplate.send(
                topic,
                String.valueOf(transaction.getId()),
                event
        );
    }
}