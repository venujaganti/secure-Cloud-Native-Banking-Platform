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
echo " Phase 14 - Kubernetes Rollback"
echo "=========================================="

command -v kubectl >/dev/null 2>&1 || {
  echo "ERROR: kubectl is not installed or not available in PATH."
  exit 1
}

kubectl cluster-info >/dev/null

echo
echo "Kubernetes cluster is reachable."

echo
echo "Namespace: $NAMESPACE"

if ! kubectl get namespace "$NAMESPACE" >/dev/null 2>&1; then
  echo "ERROR: Kubernetes namespace '$NAMESPACE' does not exist."
  exit 1
fi

echo
echo "Available deployments:"
kubectl get deployments -n "$NAMESPACE"

echo
read -r -p "Continue with rollback? [y/N]: " CONFIRMATION

if [[ ! "$CONFIRMATION" =~ ^[Yy]$ ]]; then
  echo "Rollback cancelled."
  exit 0
fi

echo
echo "Starting rollback..."

for service in "${SERVICES[@]}"; do

  if ! kubectl get deployment "$service" \
      -n "$NAMESPACE" \
      >/dev/null 2>&1; then

    echo "WARNING: Deployment '$service' does not exist. Skipping."
    continue
  fi

  echo
  echo "Rolling back: $service"

  kubectl rollout undo \
    "deployment/$service" \
    -n "$NAMESPACE"

  kubectl rollout status \
    "deployment/$service" \
    -n "$NAMESPACE" \
    --timeout=300s

  echo "Rollback completed: $service"
done

echo
echo "=========================================="
echo "Rollback completed."
echo "=========================================="

echo
echo "Current deployment status:"
kubectl get deployments -n "$NAMESPACE"

echo
echo "Current pods:"
kubectl get pods -n "$NAMESPACE"