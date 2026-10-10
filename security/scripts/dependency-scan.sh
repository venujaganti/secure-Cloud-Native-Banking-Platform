#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

SERVICES=(
  "api-gateway"
  "auth-service"
  "user-service"
  "account-service"
  "transaction-service"
  "payment-service"
  "notification-service"
  "audit-service"
)

cd "${PROJECT_ROOT}"

command -v mvn >/dev/null 2>&1 || {
  echo "ERROR: Maven is not installed."
  exit 1
}

for service in "${SERVICES[@]}"; do
  echo "Checking dependencies: ${service}"
  (
    cd "${PROJECT_ROOT}/services/${service}"
    mvn -B -ntp dependency:tree
    mvn -B -ntp       org.owasp:dependency-check-maven:12.1.8:check       -DfailBuildOnCVSS=7       -DskipTestScope=true
  )
done

echo "Dependency security scan completed successfully."
