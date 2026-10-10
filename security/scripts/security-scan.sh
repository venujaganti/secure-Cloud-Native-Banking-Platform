#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "=========================================="
echo " Secure Banking Platform Security Scan"
echo "=========================================="

echo
echo "[1/4] Running Gitleaks..."

if command -v gitleaks >/dev/null 2>&1; then
    gitleaks detect \
        --source "${PROJECT_ROOT}" \
        --config "${PROJECT_ROOT}/security/gitleaks/gitleaks.toml" \
        --redact
else
    echo "ERROR: Gitleaks is not installed."
    exit 1
fi

echo
echo "[2/4] Running Semgrep..."

if command -v semgrep >/dev/null 2>&1; then
    semgrep scan \
        --config "${PROJECT_ROOT}/security/semgrep/semgrep.yml" \
        "${PROJECT_ROOT}/services" \
        "${PROJECT_ROOT}/frontend/src"
else
    echo "ERROR: Semgrep is not installed."
    exit 1
fi

echo
echo "[3/4] Running Trivy filesystem scan..."

if command -v trivy >/dev/null 2>&1; then
    trivy fs \
        --config "${PROJECT_ROOT}/security/trivy/trivy.yaml" \
        "${PROJECT_ROOT}"
else
    echo "ERROR: Trivy is not installed."
    exit 1
fi

echo
echo "[4/4] Running Maven security verification..."

if command -v mvn >/dev/null 2>&1; then
    cd "${PROJECT_ROOT}"

    mvn -B -ntp \
        org.owasp:dependency-check-maven:12.1.8:check \
        -DfailBuildOnCVSS=7 \
        -DskipTestScope=true
else
    echo "ERROR: Maven is not installed."
    exit 1
fi

echo
echo "=========================================="
echo " Security scan completed successfully."
echo "=========================================="