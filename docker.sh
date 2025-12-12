#!/usr/bin/env bash
set -euo pipefail

echo "==> Removing conflicting packages..."
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
    sudo apt-get remove -y "$pkg" 2>/dev/null || true
done

echo "==> Updating package index..."
sudo apt-get update -qq

echo "==> Installing prerequisites..."
sudo apt-get install -y -qq ca-certificates curl

echo "==> Setting up Docker GPG key..."
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "==> Adding Docker repository..."
echo "Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc" | sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null

echo "==> Updating package index..."
sudo apt-get update -qq

echo "==> Installing Docker packages..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "==> Docker installation complete!"
docker --version
