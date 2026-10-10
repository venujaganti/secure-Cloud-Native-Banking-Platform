# Local Deployment

## Prerequisites

Install Java 17, Maven 3.9+, Node.js 20+, npm, and Docker with `docker compose`.

## Build the backend

From the repository root:

```bash
mvn -B clean verify
```

This builds all eight Spring Boot services through the root Maven reactor.

## Run the complete platform with Docker

Copy `.env.example` to `.env` and replace the development secrets before use.

Then run:

```bash
docker compose up -d --build
```

The main local endpoints are:

- Frontend: `http://localhost:8089`
- API Gateway: `http://localhost:8080`
- Gateway health: `http://localhost:8080/actuator/health`
- Keycloak: `http://localhost:8088`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- Kafka: `localhost:9092`

The frontend uses `/api` and the Nginx container proxies that path to the gateway.

## Verify

```bash
docker compose ps
curl http://localhost:8080/actuator/health
curl http://localhost:8089/health
```

## Stop the platform

```bash
docker compose down
```

To remove the local PostgreSQL volume as well:

```bash
docker compose down -v
```

Do not use `down -v` when you need to preserve local banking data.
