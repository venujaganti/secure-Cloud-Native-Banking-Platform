# API Documentation

The API is exposed through the API Gateway on port `8080`.

## Health

`GET /actuator/health`

Public endpoint used by load balancers and monitoring.

## Authentication

### Register

`POST /api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "ChangeMe123!"
}
```

Returns an access token response.

### Login

`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "ChangeMe123!"
}
```

The response contains `accessToken`, `tokenType`, `email`, and `role`.

### Current authenticated token

`GET /api/auth/me`

Header:

```text
Authorization: Bearer <access-token>
```

## Users

### Create user

`POST /api/users`

### Get user

`GET /api/users/{id}`

## Accounts

### Create account

`POST /api/accounts`

```json
{
  "userId": 1,
  "accountNumber": "1000000001",
  "accountType": "SAVINGS",
  "initialBalance": 1000.00
}
```

### Get accounts for user

`GET /api/accounts/user/{userId}`

### Get account

`GET /api/accounts/{id}`

## Transactions

### Transfer

`POST /api/transactions/transfer`

```json
{
  "accountId": 1,
  "amount": 100.00,
  "description": "Test transfer"
}
```

### Account transactions

`GET /api/transactions/account/{accountId}`

A successful transfer publishes a `banking.transactions` Kafka event consumed by the notification and audit services.

## Payments

### Create payment

`POST /api/payments`

```json
{
  "accountId": 1,
  "amount": 50.00,
  "paymentType": "BANK_TRANSFER",
  "reference": "PAY-001"
}
```

## Authentication and security

Protected gateway routes require a valid Bearer token. The gateway validates the JWT signature using the configured `JWT_SECRET`.

Never place real passwords, JWT secrets, API keys, or private keys in the repository.
