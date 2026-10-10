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
echo " Phase 14 - Build"
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

echo
echo "Java version:"
java -version

echo
echo "Maven version:"
mvn -version

echo
echo "Building services..."
echo

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

  echo "------------------------------------------"
  echo "Building: $service"
  echo "------------------------------------------"

  cd "$SERVICE_DIR"

  mvn -B clean package -DskipTests=false

  echo "SUCCESS: $service"
  echo
done

cd "$PROJECT_ROOT"

echo "=========================================="
echo "Build completed successfully."
echo "=========================================="