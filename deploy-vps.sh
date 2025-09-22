#!/bin/bash

# SPL Shield Docker Deployment Script
set -e

echo "🚀 SPL Shield Docker Deployment Starting..."

# Colors
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
APP_NAME="spl-shield-landing"
CONTAINER_NAME="spl-shield-landing"
IMAGE_NAME="spl-shield/landing"
PORT="3000"

# Check if Docker is running
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker is not running"
        exit 1
    fi

    print_success "Docker is running"
}

# Check if port 3000 is available
check_port() {
    print_status "Checking if port $PORT is available..."
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        print_warning "Port $PORT is already in use"
        read -p "Do you want to stop the existing container? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker stop $CONTAINER_NAME 2>/dev/null || true
            docker rm $CONTAINER_NAME 2>/dev/null || true
            print_success "Existing container stopped"
        else
            print_error "Cannot deploy - port $PORT is in use"
            exit 1
        fi
    fi
}

# Build the Docker image
build_image() {
    print_status "Building Docker image..."
    
    # Check if Dockerfile exists
    if [ ! -f "Dockerfile" ]; then
        print_error "Dockerfile not found in current directory"
        exit 1
    fi

    # Check if nginx.conf exists
    if [ ! -f "nginx.conf" ]; then
        print_error "nginx.conf not found in current directory"
        exit 1
    fi

    # Build the image
    docker build -t $IMAGE_NAME:latest . --no-cache

    print_success "Docker image built successfully"
}

# Deploy with Docker Compose
deploy_with_compose() {
    print_status "Deploying with Docker Compose..."
    
    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found"
        exit 1
    fi

    # Stop existing containers
    docker-compose down 2>/dev/null || true

    # Start new containers
    docker-compose up -d

    print_success "Application deployed with Docker Compose"
}

# Deploy with Docker run (alternative)
deploy_with_docker() {
    print_status "Deploying with Docker run..."
    
    # Remove existing container if it exists
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true

    # Run new container
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p $PORT:80 \
        -e NODE_ENV=production \
        -e VITE_SITE_URL=https://splshield.com \
        -e VITE_SCANNER_URL=https://app.splshield.com \
        -e VITE_EXCHANGE_URL=https://ex.splshield.com \
        $IMAGE_NAME:latest

    print_success "Container deployed successfully"
}

# Check deployment health
check_deployment() {
    print_status "Checking deployment health..."
    
    # Wait for container to start
    sleep 10

    # Check if container is running
    if ! docker ps | grep -q $CONTAINER_NAME; then
        print_error "Container is not running"
        docker logs $CONTAINER_NAME
        exit 1
    fi

    # Check if app is responding
    for i in {1..30}; do
        if curl -f -s http://localhost:$PORT/health > /dev/null; then
            print_success "Application is healthy and responding"
            return 0
        fi
        print_status "Waiting for application to start... ($i/30)"
        sleep 2
    done

    print_error "Application failed to start or is not responding"
    docker logs $CONTAINER_NAME
    exit 1
}

# Update Nginx configuration
update_nginx() {
    print_status "Nginx configuration update needed..."
    print_warning "Please update your host Nginx configuration:"
    echo ""
    echo "1. Copy the splshield.conf to your Nginx config directory:"
    echo "   sudo cp splshield.conf /etc/nginx/sites-available/"
    echo "   sudo ln -s /etc/nginx/sites-available/splshield.conf /etc/nginx/sites-enabled/"
    echo ""
    echo "2. Update SSL certificate paths in the config file"
    echo ""
    echo "3. Test and reload Nginx:"
    echo "   sudo nginx -t"
    echo "   sudo systemctl reload nginx"
    echo ""
}

# Cleanup old images
cleanup() {
    print_status "Cleaning up old Docker images..."
    docker image prune -f
    print_success "Cleanup completed"
}

# Main deployment function
main() {
    echo "🛡️  SPL Shield Docker Deployment"
    echo "=================================="
    echo "App: $APP_NAME"
    echo "Port: $PORT"
    echo "Container: $CONTAINER_NAME"
    echo "=================================="
    echo

    check_docker
    check_port
    build_image
    
    # Choose deployment method
    if [ -f "docker-compose.yml" ]; then
        deploy_with_compose
    else
        deploy_with_docker
    fi
    
    check_deployment
    update_nginx
    cleanup

    echo
    echo "🎉 Deployment Summary"
    echo "===================="
    print_success "✅ Docker image built: $IMAGE_NAME:latest"
    print_success "✅ Container running: $CONTAINER_NAME"
    print_success "✅ Application accessible at: http://localhost:$PORT"
    print_success "✅ Health check: http://localhost:$PORT/health"
    echo
    print_status "Next steps:"
    echo "1. Update your Nginx configuration with SSL certificates"
    echo "2. Configure your domain DNS to point to this server"
    echo "3. Test the full HTTPS setup"
    echo "4. Set up monitoring and backups"
    echo
    print_success "🚀 SPL Shield is ready for production!"
}

# Handle script arguments
case "${1:-}" in
    --build-only)
        check_docker
        build_image
        ;;
    --deploy-only)
        check_docker
        check_port
        if [ -f "docker-compose.yml" ]; then
            deploy_with_compose
        else
            deploy_with_docker
        fi
        check_deployment
        ;;
    --cleanup)
        cleanup
        ;;
    *)
        main
        ;;
esac