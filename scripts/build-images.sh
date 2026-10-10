#!/usr/bin/env bash
set -Eeuo pipefail
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGISTRY="${REGISTRY:-banking}"
IMAGE_TAG="${IMAGE_TAG:-1.0.0}"
SERVICES=(gateway auth user account transaction payment notification audit)
echo "=========================================="
echo " Secure Cloud-Native Banking Platform"
echo " Docker Image Build"
echo "=========================================="
cd "$PROJECT_ROOT"
command -v docker >/dev/null 2>&1 || { echo "ERROR: Docker is not installed or not available in PATH." >&2; exit 1; }
docker --version
for service in "${SERVICES[@]}"; do
  DOCKERFILE="$PROJECT_ROOT/deployment/docker/Dockerfile.$service"
  [[ -f "$DOCKERFILE" ]] || { echo "ERROR: Dockerfile not found: $DOCKERFILE" >&2; exit 1; }
  IMAGE_NAME="${REGISTRY}/banking-${service}:${IMAGE_TAG}"
  echo "Building image: $IMAGE_NAME"
  docker build --file "$DOCKERFILE" --tag "$IMAGE_NAME" "$PROJECT_ROOT"
done
echo "All Docker images built successfully."
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}" | grep "banking-" || true
