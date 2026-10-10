#!/usr/bin/env bash

set -Eeuo pipefail

NAMESPACE="${NAMESPACE:-banking}"

SERVICES=(
  "gateway"
  "auth"
  "user"
  "account"
  "transaction"
  "payment"
  "notification"
  "audit"
)

echo "=========================================="
echo " Secure Cloud-Native Banking Platform"
echo " Phase 14 - Health Check"
echo "=========================================="

command -v kubectl >/dev/null 2>&1 || {
  echo "ERROR: kubectl is not installed or not available in PATH."
  exit 1
}

kubectl cluster-info >/dev/null

echo
echo "Kubernetes cluster: AVAILABLE"

if ! kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
  echo "ERROR: Namespace '$NAMESPACE' does not exist."
  exit 1
fi

echo "Namespace '$NAMESPACE': AVAILABLE"

echo
echo "=========================================="
echo "Deployment Health"
echo "=========================================="

FAILED=0

for service in "${SERVICES[@]}"; do

  if ! kubectl get deployment "$service" \
      -n "$NAMESPACE" \
      >/dev/null 2>&1; then

    echo "FAIL: $service deployment not found."
    FAILED=$((FAILED + 1))
    continue
  fi

  READY="$(kubectl get deployment "$service" \
    -n "$NAMESPACE" \
    -o jsonpath='{.status.readyReplicas}')"

  DESIRED="$(kubectl get deployment "$service" \
    -n "$NAMESPACE" \
    -o jsonpath='{.spec.replicas}')"

  READY="${READY:-0}"
  DESIRED="${DESIRED:-0}"

  if [[ "$READY" == "$DESIRED" && "$DESIRED" != "0" ]]; then
    echo "PASS: $service ($READY/$DESIRED ready)"
  else
    echo "FAIL: $service ($READY/$DESIRED ready)"
    FAILED=$((FAILED + 1))
  fi
done

echo
echo "=========================================="
echo "Pod Health"
echo "=========================================="

kubectl get pods \
  -n "$NAMESPACE" \
  -o wide

echo
echo "=========================================="
echo "Service Health"
echo "=========================================="

kubectl get services \
  -n "$NAMESPACE"

echo
echo "=========================================="
echo "Health Summary"
echo "=========================================="

if [[ "$FAILED" -eq 0 ]]; then
  echo "All banking services are healthy."
  exit 0
else
  echo "ERROR: $FAILED service(s) are not healthy."
  exit 1
fi