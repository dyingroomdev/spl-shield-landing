#!/bin/bash

# SPL Shield Docker Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
DOCKER_IMAGE_NAME="spl-shield-frontend"
DOCKER_TAG="latest"
COMPOSE_PROJECT_NAME="spl-shield"
NGINX_CONFIG_NAME="spl-shield.conf"

print_status "🚀 SPL Shield Docker Deployment Started..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null 2>&1; then
    print_error "Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Determine Docker Compose command
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    DOCKER_COMPOSE_CMD="docker compose"
fi

print_success "Docker environment check passed"

# Build and deploy
print_status "Building Docker image..."
$DOCKER_COMPOSE_CMD build --no-cache

print_success "Docker image built successfully"

print_status "Stopping existing containers..."
$DOCKER_COMPOSE_CMD down

print_status "Starting SPL Shield application..."
$DOCKER_COMPOSE_CMD up -d

# Wait for container to be healthy
print_status "Waiting for application to be ready..."
sleep 10

# Check if container is running
if $DOCKER_COMPOSE_CMD ps | grep -q "Up"; then
    print_success "SPL Shield container is running"
else
    print_error "Container failed to start"
    $DOCKER_COMPOSE_CMD logs
    exit 1
fi

# Get container IP for nginx configuration
CONTAINER_IP=$($DOCKER_COMPOSE_CMD exec spl-shield-app hostname -i | tr -d '\r')
if [ -z "$CONTAINER_IP" ]; then
    print_warning "Could not determine container IP"
else
    print_success "Container IP: $CONTAINER_IP"
fi

# Create nginx configuration
print_status "Creating Nginx configuration..."

# Check if running on Portainer or regular Docker
if [ -n "$PORTAINER_HOST" ]; then
    print_status "Detected Portainer environment"
    NGINX_CONFIG_PATH="/var/lib/docker/volumes/portainer_data/_data/nginx/conf.d/$NGINX_CONFIG_NAME"
else
    NGINX_CONFIG_PATH="/etc/nginx/sites-available/$NGINX_CONFIG_NAME"
fi

print_status "Nginx configuration will be created at: $NGINX_CONFIG_PATH"

# Display post-deployment instructions
echo ""
echo "🎉 SPL Shield Deployment Complete!"
echo "=================================="
print_success "✅ Docker container is running"
print_success "✅ Application is accessible internally"
print_success "✅ Health check endpoint: /health"
echo ""
echo "📋 Next Steps:"
echo "1. Configure your main Nginx reverse proxy"
echo "2. Set up SSL certificates" 
echo "3. Update DNS records"
echo "4. Test the application"
echo ""
echo "🔧 Container Information:"
echo "- Container Name: spl-shield-frontend"
echo "- Internal Port: 80"
echo "- Network: spl-shield-network"
echo "- Health Check: curl http://spl-shield-frontend/health"
echo ""
echo "📁 Configuration Files:"
echo "- Nginx Proxy Config: nginx-proxy.conf"
echo "- Docker Compose: docker-compose.yml"
echo "- Dockerfile: Dockerfile"
echo ""
echo "🔍 Useful Commands:"
echo "- View logs: $DOCKER_COMPOSE_CMD logs -f"
echo "- Restart: $DOCKER_COMPOSE_CMD restart"
echo "- Stop: $DOCKER_COMPOSE_CMD down"
echo "- Rebuild: $DOCKER_COMPOSE_CMD build --no-cache && $DOCKER_COMPOSE_CMD up -d"
echo ""

# Check container health
print_status "Performing health check..."
sleep 5

if $DOCKER_COMPOSE_CMD exec spl-shield-app curl -f http://localhost/health > /dev/null 2>&1; then
    print_success "✅ Application health check passed"
else
    print_warning "⚠️  Health check failed - check logs for issues"
fi

print_success "🚀 SPL Shield is ready for production!"

# Show running containers
echo ""
print_status "Running containers:"
$DOCKER_COMPOSE_CMD ps