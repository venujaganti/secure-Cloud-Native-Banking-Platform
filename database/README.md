# Secure Cloud-Native Banking Platform Database

This directory contains the PostgreSQL database schema and migration
scripts for the Secure Cloud-Native Banking Platform.

## Structure

```text
database/
├── postgres/
│   ├── init/
│   │   ├── 01-users.sql
│   │   ├── 02-accounts.sql
│   │   ├── 03-transactions.sql
│   │   ├── 04-payments.sql
│   │   └── 05-audit.sql
│   └── README.md
│
├── migrations/
│   ├── V1__users.sql
│   ├── V2__accounts.sql
│   ├── V3__transactions.sql
│   ├── V4__payments.sql
│   └── V5__audit_logs.sql
│
└── README.md