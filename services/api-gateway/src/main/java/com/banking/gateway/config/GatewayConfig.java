package com.banking.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator gatewayRoutes(
            RouteLocatorBuilder builder,
            Environment environment) {

        return builder.routes()
                .route("auth-service", route -> route
                        .path("/api/auth/**")
                        .uri(environment.getProperty("AUTH_SERVICE_URL", "http://localhost:8081")))

                .route("user-service", route -> route
                        .path("/api/users/**")
                        .uri(environment.getProperty("USER_SERVICE_URL", "http://localhost:8082")))

                .route("account-service", route -> route
                        .path("/api/accounts/**")
                        .uri(environment.getProperty("ACCOUNT_SERVICE_URL", "http://localhost:8083")))

                .route("transaction-service", route -> route
                        .path("/api/transactions/**")
                        .uri(environment.getProperty("TRANSACTION_SERVICE_URL", "http://localhost:8084")))

                .route("payment-service", route -> route
                        .path("/api/payments/**")
                        .uri(environment.getProperty("PAYMENT_SERVICE_URL", "http://localhost:8085")))

                .route("notification-service", route -> route
                        .path("/api/notifications/**")
                        .uri(environment.getProperty("NOTIFICATION_SERVICE_URL", "http://localhost:8086")))

                .route("audit-service", route -> route
                        .path("/api/audit/**")
                        .uri(environment.getProperty("AUDIT_SERVICE_URL", "http://localhost:8087")))

                .build();
    }
}