#!/bin/bash

# SPL Shield VPS Deployment Script
set -e

echo "🚀 SPL Shield VPS Deployment Starting..."

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
PROJECT_NAME="spl-shield-landing"
CONTAINER_NAME="spl-shield-landing"
IMAGE_NAME="spl-shield-web"
HOST_PORT="3001"
DOMAIN="your-domain.com"  # Replace with your domain

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Pull latest code from GitHub
pull_latest_code() {
    print_status "Pulling latest code from GitHub..."
    
    if [ -d ".git" ]; then
        git pull origin main
        print_success "Code updated from GitHub"
    else
        print_warning "Not a git repository. Please clone from GitHub first."
    fi
}

# Stop existing containers
stop_existing_containers() {
    print_status "Stopping existing containers..."
    
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        docker stop $CONTAINER_NAME
        print_success "Stopped existing container"
    fi
    
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        docker rm $CONTAINER_NAME
        print_success "Removed existing container"
    fi
}

# Build and start containers
build_and_start() {
    print_status "Building and starting containers..."
    
    # Build the image
    docker-compose build --no-cache
    
    # Start containers
    docker-compose up -d
    
    print_success "Containers built and started"
}

# Wait for container to be healthy
wait_for_health() {
    print_status "Waiting for container to be healthy..."
    
    for i in {1..30}; do
        if docker-compose ps | grep -q "healthy"; then
            print_success "Container is healthy"
            return 0
        fi
        
        if [ $i -eq 30 ]; then
            print_error "Container failed to become healthy"
            docker-compose logs
            exit 1
        fi
        
        sleep 2
    done
}

# Test the deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # Test health endpoint
    if curl -f -s "http://localhost:$HOST_PORT/health" > /dev/null; then
        print_success "Health check passed"
    else
        print_error "Health check failed"
        return 1
    fi
    
    # Test main page
    if curl -f -s "http://localhost:$HOST_PORT/" > /dev/null; then
        print_success "Main page accessible"
    else
        print_error "Main page not accessible"
        return 1
    fi
}

# Show deployment info
show_deployment_info() {
    print_status "Deployment Information:"
    echo "========================"
    echo "🌐 Website URL: http://localhost:$HOST_PORT"
    echo "🐳 Container: $CONTAINER_NAME"
    echo "📊 Health Check: http://localhost:$HOST_PORT/health"
    echo "📋 View Logs: docker-compose logs -f"
    echo "🛑 Stop: docker-compose down"
    echo "🔄 Restart: docker-compose restart"
    echo "========================"
}

# Main deployment process
main() {
    print_status "Starting SPL Shield deployment to VPS..."
    
    check_docker
    pull_latest_code
    stop_existing_containers
    build_and_start
    wait_for_health
    test_deployment
    show_deployment_info
    
    print_success "🎉 SPL Shield deployed successfully!"
    print_status "Access your website at: http://localhost:$HOST_PORT"
}

# Error handling
trap 'print_error "Deployment failed at line $LINENO"' ERR

# Run deployment
main "$@"