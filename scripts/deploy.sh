#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

NAMESPACE="${NAMESPACE:-banking}"
KUSTOMIZATION_DIR="$PROJECT_ROOT/deployment/kubernetes"

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
echo " Phase 14 - Kubernetes Deployment"
echo "=========================================="

cd "$PROJECT_ROOT"

command -v kubectl >/dev/null 2>&1 || {
  echo "ERROR: kubectl is not installed or not available in PATH."
  exit 1
}

if [[ ! -d "$KUSTOMIZATION_DIR" ]]; then
  echo "ERROR: Kubernetes directory not found:"
  echo "$KUSTOMIZATION_DIR"
  exit 1
fi

if [[ ! -f "$KUSTOMIZATION_DIR/kustomization.yaml" ]]; then
  echo "ERROR: kustomization.yaml not found:"
  echo "$KUSTOMIZATION_DIR/kustomization.yaml"
  exit 1
fi

echo
echo "Checking Kubernetes connection..."

kubectl cluster-info >/dev/null

echo "Kubernetes cluster is reachable."

echo
echo "Applying Kubernetes manifests..."

kubectl apply -k "$KUSTOMIZATION_DIR"

echo
echo "Waiting for namespace resources..."

kubectl wait \
  --for=condition=available \
  --timeout=300s \
  deployment \
  --all \
  -n "$NAMESPACE"

echo
echo "Checking deployments..."

for service in "${SERVICES[@]}"; do
  echo
  echo "Checking deployment: $service"

  if ! kubectl get deployment "$service" \
      -n "$NAMESPACE" \
      >/dev/null 2>&1; then

    echo "ERROR: Deployment not found: $service"
    exit 1
  fi

  kubectl rollout status \
    "deployment/$service" \
    -n "$NAMESPACE" \
    --timeout=300s
done

echo
echo "=========================================="
echo "Deployment completed successfully."
echo "=========================================="

echo
echo "Namespace:"
kubectl get namespace "$NAMESPACE"

echo
echo "Pods:"
kubectl get pods -n "$NAMESPACE"

echo
echo "Services:"
kubectl get services -n "$NAMESPACE"

echo
echo "Deployments:"
kubectl get deployments -n "$NAMESPACE"