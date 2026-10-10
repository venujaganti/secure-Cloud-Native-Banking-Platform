#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=========================================="
echo " Secure Cloud-Native Banking Platform"
echo " Phase 14 - Security Scan"
echo "=========================================="

cd "$PROJECT_ROOT"

echo
echo "Checking security tools..."

command -v gitleaks >/dev/null 2>&1 || {
  echo "ERROR: Gitleaks is not installed or not available in PATH."
  exit 1
}

command -v semgrep >/dev/null 2>&1 || {
  echo "ERROR: Semgrep is not installed or not available in PATH."
  exit 1
}

command -v trivy >/dev/null 2>&1 || {
  echo "ERROR: Trivy is not installed or not available in PATH."
  exit 1
}

command -v mvn >/dev/null 2>&1 || {
  echo "ERROR: Maven is not installed or not available in PATH."
  exit 1
}

echo
echo "=========================================="
echo "1. Gitleaks Secret Scan"
echo "=========================================="

gitleaks detect \
  --source "$PROJECT_ROOT" \
  --config "$PROJECT_ROOT/security/gitleaks/gitleaks.toml" \
  --redact \
  --verbose

echo
echo "Gitleaks scan completed successfully."

echo
echo "=========================================="
echo "2. Semgrep SAST Scan"
echo "=========================================="

semgrep scan \
  --config "$PROJECT_ROOT/security/semgrep/semgrep.yml" \
  "$PROJECT_ROOT"

echo
echo "Semgrep scan completed successfully."

echo
echo "=========================================="
echo "3. Trivy Filesystem Scan"
echo "=========================================="

trivy fs \
  --config "$PROJECT_ROOT/security/trivy/trivy.yaml" \
  "$PROJECT_ROOT"

echo
echo "Trivy scan completed successfully."

echo
echo "=========================================="
echo "4. Maven Dependency Scan"
echo "=========================================="

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

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$PROJECT_ROOT/services/$service"

  if [[ ! -f "$SERVICE_DIR/pom.xml" ]]; then
    echo "ERROR: pom.xml not found for $service"
    exit 1
  fi

  echo
  echo "Dependency scan: $service"

  cd "$SERVICE_DIR"

  mvn -B org.owasp:dependency-check-maven:check \
    -DskipTest=false \
    -DfailBuildOnCVSS=7

done

cd "$PROJECT_ROOT"

echo
echo "=========================================="
echo "Security scanning completed successfully."
echo "=========================================="