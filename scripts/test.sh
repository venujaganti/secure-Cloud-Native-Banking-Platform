#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

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

echo "=========================================="
echo " Secure Cloud-Native Banking Platform"
echo " Phase 14 - Tests"
echo "=========================================="

cd "$PROJECT_ROOT"

command -v java >/dev/null 2>&1 || {
  echo "ERROR: Java is not installed or not available in PATH."
  exit 1
}

command -v mvn >/dev/null 2>&1 || {
  echo "ERROR: Maven is not installed or not available in PATH."
  exit 1
}

TOTAL=0
PASSED=0

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$PROJECT_ROOT/services/$service"

  if [[ ! -d "$SERVICE_DIR" ]]; then
    echo "ERROR: Service directory not found: $SERVICE_DIR"
    exit 1
  fi

  if [[ ! -f "$SERVICE_DIR/pom.xml" ]]; then
    echo "ERROR: pom.xml not found for service: $service"
    exit 1
  fi

  TOTAL=$((TOTAL + 1))

  echo
  echo "------------------------------------------"
  echo "Testing: $service"
  echo "------------------------------------------"

  cd "$SERVICE_DIR"

  if mvn -B test; then
    PASSED=$((PASSED + 1))
    echo "SUCCESS: Tests passed for $service"
  else
    echo "ERROR: Tests failed for $service"
    exit 1
  fi
done

cd "$PROJECT_ROOT"

echo
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo "Services tested : $TOTAL"
echo "Services passed : $PASSED"
echo "=========================================="

if [[ "$TOTAL" -eq "$PASSED" ]]; then
  echo "All tests passed successfully."
else
  echo "ERROR: One or more services failed."
  exit 1
fi