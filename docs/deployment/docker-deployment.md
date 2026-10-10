# Docker Deployment

## 1. Overview

Docker is used as the container runtime for the Secure Cloud-Native Banking Platform.

Docker is not required for the documented container workflow.

---

# 2. Container Architecture

The backend contains eight service containers:

```text
Gateway
Auth
User
Account
Transaction
Payment
Notification
Audit