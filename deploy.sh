#!/usr/bin/env bash

# High-level deployment helper for sending the project to a VPS and running the container stack.
set -euo pipefail
IFS=$'\n\t'

# Defaults
VPS_HOST="${VPS_HOST:-}"
VPS_USER="${VPS_USER:-root}"
VPS_PORT="${VPS_PORT:-22}"
REMOTE_PATH="${REMOTE_PATH:-/opt/spl-shield-landing}"
DEPLOY_METHOD="compose"

# Basic styling
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${BLUE}[INFO]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }
good()  { echo -e "${GREEN}[OK]${NC} $1"; }

usage() {
  cat <<'EOF'
Usage: ./deploy.sh -H <host> [options]

Required:
  -H HOST          VPS IP or hostname

Optional:
  -u USER          SSH user (default: root or $VPS_USER)
  -p PORT          SSH port (default: 22 or $VPS_PORT)
  -d PATH          Remote path (default: /opt/spl-shield-landing or $REMOTE_PATH)
  -m METHOD        Deployment method passed to deploy-vps.sh (compose|docker|build)
  -s               Skip rsync sync step (assumes code is already on the server)
  -y               Assume yes for prompts (non-interactive)
  -h               Show this help message

Environment overrides:
  VPS_HOST, VPS_USER, VPS_PORT, REMOTE_PATH can be exported instead of passing flags.

Examples:
  VPS_HOST=203.0.113.10 ./deploy.sh
  ./deploy.sh -h shield.example.com -u deploy -d /srv/spl-shield
EOF
}

SKIP_SYNC=false
ASSUME_YES=false

while getopts ":H:u:p:d:m:syh" opt; do
  case "${opt}" in
    H) VPS_HOST="${OPTARG}" ;;
    u) VPS_USER="${OPTARG}" ;;
    p) VPS_PORT="${OPTARG}" ;;
    d) REMOTE_PATH="${OPTARG}" ;;
    m) DEPLOY_METHOD="${OPTARG}" ;;
    s) SKIP_SYNC=true ;;
    y) ASSUME_YES=true ;;
    h) usage; exit 0 ;;
    \?) usage; exit 1 ;;
    :) error "Option -$OPTARG requires an argument."; usage; exit 1 ;;
  esac
done

# Require host argument/environment
if [[ -z "${VPS_HOST}" ]]; then
  usage
  exit 1
fi

# Validate deploy method
case "${DEPLOY_METHOD}" in
  compose|docker|build) ;; 
  *) error "Unsupported deploy method: ${DEPLOY_METHOD}"; exit 1 ;;
esac

# Confirm action when not using -y
if [[ "${ASSUME_YES}" == false ]]; then
  read -r -p "Deploy to ${VPS_USER}@${VPS_HOST}:${VPS_PORT} (path: ${REMOTE_PATH}) using '${DEPLOY_METHOD}'? [y/N] " answer
  if [[ ! "${answer}" =~ ^[Yy]$ ]]; then
    warn "Deployment cancelled."
    exit 0
  fi
fi

require_cmd() {
  if ! command -v "$1" > /dev/null 2>&1; then
    error "Command '$1' is required but not installed."
    exit 1
  fi
}

info "Checking local prerequisites..."
require_cmd ssh
require_cmd rsync
good "Local prerequisites satisfied"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${REPO_ROOT}"

if [[ ! -f "docker-compose.yml" ]]; then
  error "docker-compose.yml not found in repository root."
  exit 1
fi

info "Ensuring remote directory exists..."
ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "mkdir -p '${REMOTE_PATH}'"
good "Remote directory ready"

if [[ "${SKIP_SYNC}" == false ]]; then
  info "Syncing project files to ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}"
  rsync -az --delete \
    --exclude ".git" \
    --exclude "node_modules" \
    --exclude "dist" \
    --exclude "*.log" \
    --exclude "tmp" \
    --exclude "temp" \
    "${REPO_ROOT}/" "${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/"
  good "Sync complete"
else
  warn "Skipping file sync as requested"
fi

info "Setting execute permissions for deployment scripts..."
ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "chmod +x '${REMOTE_PATH}/deploy-vps.sh' || true"
good "Scripts ready"

info "Triggering remote deployment via deploy-vps.sh (${DEPLOY_METHOD})..."
ssh -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" "cd '${REMOTE_PATH}' && ./deploy-vps.sh '${DEPLOY_METHOD}'"
good "Remote deployment finished"

cat <<EOF

${GREEN}Deployment complete!${NC}

You can verify the stack with:
  ssh -p ${VPS_PORT} ${VPS_USER}@${VPS_HOST} "cd '${REMOTE_PATH}' && docker compose ps || docker ps"

EOF
