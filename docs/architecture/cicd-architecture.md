# CI/CD Architecture

## 1. Overview

The platform uses Jenkins and GitHub Actions for continuous integration and continuous delivery.

---

## 2. CI/CD Flow

```text
Developer
   |
   v
Git Repository
   |
   +-----------------------+
   |                       |
   v                       v
GitHub Actions           Jenkins
   |                       |
   v                       v
Build                    Build
   |                       |
   v                       v
Tests                    Tests
   |                       |
   v                       v
Security Scan            Security Scan
   |                       |
   +-----------+-----------+
               |
               v
        Container Build
               |
               v
        Container Scan
               |
               v
        Deployment
               |
               v
          Kubernetes
               |
               v
        Health Check