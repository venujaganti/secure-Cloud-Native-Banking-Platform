# Network Architecture

## 1. Overview

The platform uses layered network segmentation.

```text
Internet
   |
   v
Route 53
   |
   v
Application Load Balancer
   |
   v
Kubernetes Ingress
   |
   v
API Gateway
   |
   +-----------------------------+
   |                             |
   v                             v
Application Services          Keycloak
   |
   +----------------+----------------+
   |                |                |
   v                v                v
PostgreSQL         Redis           Kafka