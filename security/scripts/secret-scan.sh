#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
GITLEAKS_CONFIG="${PROJECT_ROOT}/security/gitleaks/gitleaks.toml"

echo "=========================================="
echo " Secret Detection"
echo "=========================================="

if ! command -v gitleaks >/dev/null 2>&1; then
    echo "ERROR: Gitleaks is not installed."
    exit 1
fi

if [ ! -f "${GITLEAKS_CONFIG}" ]; then
    echo "ERROR: Gitleaks configuration not found:"
    echo "${GITLEAKS_CONFIG}"
    exit 1
fi

gitleaks detect \
    --source "${PROJECT_ROOT}" \
    --config "${GITLEAKS_CONFIG}" \
    --redact \
    --verbose

echo
echo "Secret scan completed successfully."