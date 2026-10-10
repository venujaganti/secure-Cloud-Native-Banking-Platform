package com.banking.gateway.filters;

import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class RateLimitFilter implements GlobalFilter, Ordered {

    private static final int MAX_REQUESTS_PER_MINUTE = 100;
    private static final long WINDOW_MILLIS = 60_000L;

    private final ConcurrentHashMap<String, Counter> counters =
            new ConcurrentHashMap<>();

    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain) {

        String client =
                exchange.getRequest()
                        .getRemoteAddress() != null
                        ? exchange.getRequest()
                            .getRemoteAddress()
                            .getAddress()
                            .getHostAddress()
                        : "unknown";

        long now = Instant.now().toEpochMilli();

        Counter counter = counters.compute(client, (key, current) -> {
            if (current == null || now - current.windowStart >= WINDOW_MILLIS) {
                return new Counter(now, new AtomicInteger(1));
            }
            current.requests.incrementAndGet();
            return current;
        });

        if (counter.requests.get() > MAX_REQUESTS_PER_MINUTE) {
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -150;
    }

    private static final class Counter {
        private final long windowStart;
        private final AtomicInteger requests;

        private Counter(long windowStart, AtomicInteger requests) {
            this.windowStart = windowStart;
            this.requests = requests;
        }
    }
}
