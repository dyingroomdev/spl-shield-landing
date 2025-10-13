#!/bin/bash

# SPL Shield Docker Deployment Script
set -euo pipefail
IFS=$'\n\t'

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
IMAGE_NAME="spl-shield-landing"
CONTAINER_NAME="spl-shield-landing"
HOST_PORT="3000"
CONTAINER_PORT="3000"
DOCKER_COMPOSE_CMD=()

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

# Check if Docker is running
check_docker() {
    print_status "Checking Docker..."
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_success "Docker is running"
}

# Detect docker compose command
detect_compose() {
    if command -v docker-compose > /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD=("docker-compose")
        print_success "Using docker-compose CLI"
    elif docker compose version > /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD=("docker" "compose")
        print_success "Using docker compose plugin"
    else
        print_error "Docker Compose is not installed. Install docker compose or docker-compose."
        exit 1
    fi
}

# Check if required files exist
check_files() {
    print_status "Checking required files..."
    
    required_files=("Dockerfile" "nginx.conf" "docker-entrypoint.sh" "docker-compose.yml" "package.json")
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Required file missing: $file"
            exit 1
        fi
    done
    
    print_success "All required files found"
}

# Stop and remove existing container
cleanup_existing() {
    print_status "Cleaning up existing containers..."
    
    if docker ps -a --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        print_warning "Stopping existing container: ${CONTAINER_NAME}"
        docker stop "$CONTAINER_NAME" || true
        docker rm "$CONTAINER_NAME" || true
    fi
    
    print_success "Cleanup completed"
}

# Build Docker image
build_image() {
    print_status "Building Docker image: ${IMAGE_NAME}"
    
    docker build \
        --target production \
        --tag "${IMAGE_NAME}:latest" \
        --tag "${IMAGE_NAME}:$(date +%Y%m%d_%H%M%S)" \
        .
    
    if [ $? -eq 0 ]; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
}

# Run container
run_container() {
    print_status "Starting container: ${CONTAINER_NAME}"
    
    docker run -d \
        --name "$CONTAINER_NAME" \
        --restart unless-stopped \
        -p "${HOST_PORT}:${CONTAINER_PORT}" \
        --health-cmd="curl -f http://localhost:${CONTAINER_PORT}/health || exit 1" \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        --health-start-period=40s \
        --label "description=SPL Shield Landing Website" \
        --label "version=1.0.0" \
        "$IMAGE_NAME:latest"
    
    if [ $? -eq 0 ]; then
        print_success "Container started successfully"
    else
        print_error "Failed to start container"
        exit 1
    fi
}

# Deploy using docker-compose
deploy_compose() {
    print_status "Deploying with docker-compose..."
    
    if [ ${#DOCKER_COMPOSE_CMD[@]} -eq 0 ]; then
        detect_compose
    fi
    
    # Stop existing services
    "${DOCKER_COMPOSE_CMD[@]}" down --remove-orphans || true
    
    # Build and start services
    "${DOCKER_COMPOSE_CMD[@]}" up -d --build
    
    if [ $? -eq 0 ]; then
        print_success "Docker Compose deployment completed"
    else
        print_error "Docker Compose deployment failed"
        exit 1
    fi
}

# Wait for container to be healthy
wait_for_health() {
    print_status "Waiting for container to be healthy..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        health_status=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "no-container")
        
        case $health_status in
            "healthy")
                print_success "Container is healthy!"
                return 0
                ;;
            "unhealthy")
                print_error "Container is unhealthy"
                docker logs "$CONTAINER_NAME" --tail=20
                return 1
                ;;
            "starting")
                print_status "Container is starting... (attempt $attempt/$max_attempts)"
                ;;
            "no-container")
                print_error "Container not found"
                return 1
                ;;
        esac
        
        sleep 5
        attempt=$((attempt + 1))
    done
    
    print_error "Container failed to become healthy within timeout"
    return 1
}

# Test the deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # Test health endpoint
    if curl -f -s "http://localhost:${HOST_PORT}/health" > /dev/null; then
        print_success "Health check passed"
    else
        print_error "Health check failed"
        return 1
    fi
    
    # Test main page
    if curl -f -s "http://localhost:${HOST_PORT}/" > /dev/null; then
        print_success "Main page accessible"
    else
        print_error "Main page not accessible"
        return 1
    fi
    
    print_success "All tests passed!"
}

# Show deployment info
show_info() {
    echo
    print_success "🎉 SPL Shield deployment completed!"
    echo
    echo -e "${BLUE}📊 Deployment Information:${NC}"
    echo -e "  ${YELLOW}Container Name:${NC} $CONTAINER_NAME"
    echo -e "  ${YELLOW}Image:${NC} $IMAGE_NAME:latest"
    echo -e "  ${YELLOW}Host Port:${NC} $HOST_PORT"
    echo -e "  ${YELLOW}Container Port:${NC} $CONTAINER_PORT"
    echo
    echo -e "${BLUE}🌐 Access URLs:${NC}"
    echo -e "  ${YELLOW}Local:${NC} http://localhost:$HOST_PORT"
    echo -e "  ${YELLOW}Network:${NC} http://$(hostname -I | awk '{print $1}'):$HOST_PORT"
    echo -e "  ${YELLOW}Health Check:${NC} http://localhost:$HOST_PORT/health"
    echo
    echo -e "${BLUE}🔧 Management Commands:${NC}"
    echo -e "  ${YELLOW}View logs:${NC} docker logs $CONTAINER_NAME -f"
    echo -e "  ${YELLOW}Stop container:${NC} docker stop $CONTAINER_NAME"
    echo -e "  ${YELLOW}Restart container:${NC} docker restart $CONTAINER_NAME"
    echo -e "  ${YELLOW}Remove container:${NC} docker rm -f $CONTAINER_NAME"
    echo
    echo -e "${GREEN}✅ Ready for nginx proxy configuration!${NC}"
}

# Main deployment function
main() {
    echo -e "${GREEN}🛡️  SPL Shield Docker Deployment${NC}"
    echo "======================================"
    
    # Deployment method selection
    METHOD=${1:-"compose"}
    
    case $METHOD in
        "docker")
            print_status "Using Docker run deployment method"
            check_docker
            check_files
            cleanup_existing
            build_image
            run_container
            wait_for_health
            test_deployment
            show_info
            ;;
        "compose")
            print_status "Using Docker Compose deployment method"
            check_docker
            check_files
            detect_compose
            deploy_compose
            sleep 10  # Give container time to start
            test_deployment
            show_info
            ;;
        "build")
            print_status "Building image only"
            check_docker
            check_files
            build_image
            ;;
        *)
            echo "Usage: $0 [docker|compose|build]"
            echo "  docker  - Deploy using docker run"
            echo "  compose - Deploy using docker-compose (default)"
            echo "  build   - Build image only"
            exit 1
            ;;
    esac
}

# Error handling
trap 'print_error "Deployment failed at line $LINENO"' ERR

# Run deployment
main "$@"
