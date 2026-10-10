package com.banking.audit.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class AuditEventConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(AuditEventConsumer.class);

    @KafkaListener(
            topics = "${kafka.topic.transactions:banking.transactions}",
            groupId = "${spring.application.name}"
    )
    public void consume(String message) {

        log.info(
                "Audit event received: {}",
                message
        );
    }
}