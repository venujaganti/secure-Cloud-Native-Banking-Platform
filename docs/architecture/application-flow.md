# Application Flow

## 1. User Access

The application flow begins when a user accesses the banking frontend.

```text
User
 |
 v
Frontend
 |
 v
API Gateway
 |
 v
Authentication
 |
 v
JWT Validation
 |
 v
Requested Microservice

2. Authentication Flow
User
 |
 | Username + Password
 v
Frontend
 |
 v
API Gateway
 |
 v
Auth Service
 |
 v
Keycloak / Identity Provider
 |
 v
Credential Validation
 |
 v
JWT Access Token
 |
 v
Frontend

The frontend uses the access token for authenticated API requests.

3. Account Flow
User
 |
 v
Frontend
 |
 v
API Gateway
 |
 v
JWT Validation
 |
 v
Account Service
 |
 v
PostgreSQL
 |
 v
Account Response
 |
 v
Frontend
4. Transaction Flow
User
 |
 v
Transfer Request
 |
 v
API Gateway
 |
 v
Transaction Service
 |
 v
Account Validation
 |
 v
Transaction Processing
 |
 v
PostgreSQL
 |
 v
Kafka Event
 |
 +----------------------+
 |                      |
 v                      v
Notification Service   Audit Service
 |                      |
 v                      v
Notification           Audit Log
5. Payment Flow
User
 |
 v
Payment Request
 |
 v
API Gateway
 |
 v
Payment Service
 |
 v
Payment Validation
 |
 v
Database
 |
 v
Kafka Event
 |
 +---------------------+
 |                     |
 v                     v
Notification        Audit Service
6. Security Event Flow
Application
 |
 v
Security Event
 |
 v
Audit Service
 |
 v
Audit Storage
 |
 v
Monitoring
 |
 v
Alertmanager
 |
 v
Security Response
7. Error Handling

Errors are handled through:

API Gateway exception handling
Service-level exception handlers
HTTP status codes
Structured application logs
Audit logging
Monitoring alerts

Sensitive information must not be returned in API error responses.

8. Request Lifecycle

A typical request follows:

Client
  |
  v
Ingress
  |
  v
API Gateway
  |
  v
Security Filters
  |
  v
Microservice
  |
  v
Business Logic
  |
  v
Database / Kafka / Redis
  |
  v
Response
  |
  v
Client