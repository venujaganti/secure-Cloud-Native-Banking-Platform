package com.banking.notification.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(NotificationConsumer.class);

    @KafkaListener(
            topics = "${kafka.topic.transactions:banking.transactions}",
            groupId = "${spring.application.name}"
    )
    public void consume(String message) {

        log.info(
                "Transaction event received: {}",
                message
        );
    }
}