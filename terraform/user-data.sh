#!/bin/bash

set -euo pipefail

exec > >(tee /var/log/secure-banking-user-data.log | logger -t secure-banking-user-data -s 2>/dev/console) 2>&1

echo "Starting Secure Cloud-Native Banking Platform bootstrap..."

dnf update -y

dnf install -y \
  git \
  curl \
  wget \
  unzip \
  jq \
  ca-certificates \
  java-17-amazon-corretto \
  docker

systemctl enable --now docker

mkdir -p /opt/banking
chown ec2-user:ec2-user /opt/banking

if [ ! -d "/opt/banking/application/.git" ]; then
  git clone \
    --branch "${app_repository_branch}" \
    --single-branch \
    "${app_repository_url}" \
    /opt/banking/application
else
  cd /opt/banking/application
  git fetch origin
  git checkout "${app_repository_branch}"
  git pull origin "${app_repository_branch}"
fi

chown -R ec2-user:ec2-user /opt/banking

cat > /etc/systemd/system/banking-docker.service <<'EOF'
[Unit]
Description=Secure Cloud-Native Banking Platform Docker Compose
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=ec2-user
WorkingDirectory=/opt/banking/application
ExecStart=/usr/bin/docker compose up -d --build
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

chmod 644 /etc/systemd/system/banking-docker.service

systemctl daemon-reload

echo "Bootstrap completed."

echo "Repository:"
echo "${app_repository_url}"

echo "Application port:"
echo "${app_port}"