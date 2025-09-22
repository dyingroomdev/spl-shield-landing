# SPL Shield Docker Deployment Guide 🐳

Complete guide to dockerize and deploy SPL Shield to your VPS with Nginx reverse proxy.

## 🎯 Architecture Overview

```
Internet → Nginx (Port 80/443) → SPL Shield Container (Port 80) → React App
```

- **Nginx**: Handles SSL termination, reverse proxy, static file caching
- **Docker Container**: Serves the built React application
- **Internal Network**: Container communicates via Docker network

## 📋 Prerequisites

- ✅ VPS with Docker installed
- ✅ Nginx running in Docker (via Portainer)
- ✅ Domain name pointing to your VPS
- ✅ Ports 80 and 443 accessible

## 🚀 Deployment Steps

### Step 1: Prepare Project Files

Create these files in your project root:

```bash
# In your spl-shield-landing directory
touch Dockerfile
touch docker-compose.yml  
touch nginx.conf
touch nginx-proxy.conf
touch deploy-docker.sh
chmod +x deploy-docker.sh
```

Copy the contents from the artifacts above into each respective file.

### Step 2: Environment Configuration

Create production environment file:

```bash
# .env.production
VITE_SITE_URL=https://splshield.com
VITE_SCANNER_URL=https://app.splshield.com
VITE_EXCHANGE_URL=https://ex.splshield.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Build and Deploy Container

```bash
# Make deployment script executable
chmod +x deploy-docker.sh

# Run deployment
./deploy-docker.sh
```

### Step 4: Configure Nginx Reverse Proxy

#### Option A: Via Portainer UI

1. **Access Portainer Dashboard**
2. **Go to Containers → Your Nginx Container**
3. **Console → Connect**
4. **Create configuration file:**

```bash
# Inside Nginx container
cat > /etc/nginx/conf.d/spl-shield.conf << 'EOF'
# [Paste the nginx-proxy.conf content here]
EOF

# Test configuration
nginx -t

# Reload Nginx
nginx -s reload
```

#### Option B: Via Docker Volume Mount

```bash
# Find your Nginx container name
docker ps | grep nginx

# Copy configuration to Nginx container
docker cp nginx-proxy.conf NGINX_CONTAINER_NAME:/etc/nginx/conf.d/spl-shield.conf

# Reload Nginx configuration
docker exec NGINX_CONTAINER_NAME nginx -s reload
```

#### Option C: Via Host File System

```bash
# If Nginx config is mounted from host
cp nginx-proxy.conf /path/to/nginx/conf.d/spl-shield.conf

# Reload Nginx
docker exec NGINX_CONTAINER_NAME nginx -s reload
```

### Step 5: SSL Certificate Setup

#### Option A: Let's Encrypt with Certbot

```bash
# Install certbot in Nginx container or host
docker exec -it NGINX_CONTAINER_NAME sh

# Install certbot (if not already installed)
apk add certbot certbot-nginx

# Generate SSL certificate
certbot --nginx -d splshield.com -d www.splshield.com
```

#### Option B: Manual SSL Certificate

```bash
# If you have your own SSL certificates
docker cp splshield.com.crt NGINX_CONTAINER_NAME:/etc/ssl/certs/
docker cp splshield.com.key NGINX_CONTAINER_NAME:/etc/ssl/private/

# Set proper permissions
docker exec NGINX_CONTAINER_NAME chmod 644 /etc/ssl/certs/splshield.com.crt
docker exec NGINX_CONTAINER_NAME chmod 600 /etc/ssl/private/splshield.com.key
```

### Step 6: DNS Configuration

Update your DNS records:

```dns
# A Records
splshield.com.           A     YOUR_VPS_IP
www.splshield.com.       A     YOUR_VPS_IP
app.splshield.com.       A     YOUR_VPS_IP  
ex.splshield.com.        A     YOUR_VPS_IP

# CNAME (alternative)
www.splshield.com.       CNAME splshield.com.
app.splshield.com.       CNAME splshield.com.
ex.splshield.com.        CNAME splshield.com.
```

### Step 7: Verification & Testing

#### Check Container Status
```bash
# Check if container is running
docker-compose ps

# View container logs
docker-compose logs -f spl-shield-app

# Check container health
docker-compose exec spl-shield-app curl http://localhost/health
```

#### Test Nginx Configuration
```bash
# Test Nginx configuration
docker exec NGINX_CONTAINER_NAME nginx -t

# Check Nginx status
docker exec NGINX_CONTAINER_NAME nginx -s reload
```

#### Test Application Access
```bash
# Test internal access
curl -H "Host: splshield.com" http://localhost

# Test external access (replace with your domain)
curl https://splshield.com/health
```

## 🔧 Troubleshooting

### Container Won't Start
```bash
# Check build logs
docker-compose build --no-cache

# Check container logs
docker-compose logs spl-shield-app

# Check available resources
docker system df
```

### Nginx Connection Issues
```bash
# Check if containers can communicate
docker exec NGINX_CONTAINER_NAME ping spl-shield-frontend

# Check network connectivity
docker network ls
docker network inspect spl-shield-network
```

### SSL Certificate Issues
```bash
# Test SSL configuration
openssl s_client -connect splshield.com:443

# Check certificate expiration
echo | openssl s_client -connect splshield.com:443 2>/dev/null | openssl x509 -noout -dates
```

## 📊 Monitoring & Maintenance

### Container Health Monitoring

```bash
# Check container health
docker-compose exec spl-shield-app curl http://localhost/health

# Monitor resource usage
docker stats spl-shield-frontend

# View detailed container info
docker inspect spl-shield-frontend
```

### Log Management

```bash
# View application logs
docker-compose logs -f --tail=100 spl-shield-app

# View Nginx access logs
docker exec NGINX_CONTAINER_NAME tail -f /var/log/nginx/spl-shield-access.log

# View Nginx error logs  
docker exec NGINX_CONTAINER_NAME tail -f /var/log/nginx/spl-shield-error.log
```

### Backup & Recovery

```bash
# Backup container data
docker run --rm -v spl-shield-data:/data -v $(pwd):/backup alpine tar czf /backup/spl-shield-backup.tar.gz -C /data .

# Export container image
docker save spl-shield-frontend:latest | gzip > spl-shield-image.tar.gz

# Create deployment backup
tar czf deployment-backup.tar.gz docker-compose.yml Dockerfile nginx.conf nginx-proxy.conf
```

## 🔄 Updates & Redeployment

### Application Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and deploy
./deploy-docker.sh

# Or manual rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Zero-Downtime Deployment
```bash
# Build new image with different tag
docker-compose build --no-cache -t spl-shield-frontend:new

# Update docker-compose.yml to use new tag
# Then switch:
docker-compose up -d

# Remove old image
docker rmi spl-shield-frontend:old
```

## ⚡ Performance Optimization

### Nginx Optimization

Add to your nginx-proxy.conf:

```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;

# Enable caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=spl_cache:10m max_size=100m;
proxy_cache spl_cache;
proxy_cache_valid 200 1h;
```

### Container Resource Limits

Update docker-compose.yml:

```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
```

## 🔒 Security Hardening

### Container Security
```bash
# Run security scan
docker scout quickview spl-shield-frontend:latest

# Check for vulnerabilities
docker scout cves spl-shield-frontend:latest
```

### Nginx Security Headers

Already included in nginx-proxy.conf:
- ✅ HSTS
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Content-Security-Policy

## 📱 Multi-Environment Setup

### Staging Environment
```yaml
# docker-compose.staging.yml
version: '3.8'
services:
  spl-shield-app:
    build: .
    container_name: spl-shield-staging
    environment:
      - VITE_SITE_URL=https://staging.splshield.com
    ports:
      - "8080:80"  # Exposed for staging access
```

### Production with Load Balancing
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  spl-shield-app-1:
    build: .
    container_name: spl-shield-app-1
  
  spl-shield-app-2:
    build: .
    container_name: spl-shield-app-2

  nginx-lb:
    image: nginx:alpine
    depends_on:
      - spl-shield-app-1
      - spl-shield-app-2
```

## ✅ Final Checklist

Before going live:

- [ ] Container builds successfully
- [ ] Application accessible via HTTP
- [ ] Nginx reverse proxy configured
- [ ] SSL certificates installed and valid
- [ ] DNS records pointing to VPS
- [ ] Health check endpoint responding
- [ ] All routes working (legal pages, etc.)
- [ ] Static assets loading correctly
- [ ] Mobile responsiveness verified
- [ ] Performance testing completed
- [ ] Monitoring and logging configured
- [ ] Backup procedures tested

## 🎉 Success!

Your SPL Shield React application is now:

- ✅ **Dockerized** with optimized multi-stage build
- ✅ **Production Ready** with Nginx serving static files
- ✅ **SSL Secured** with automatic HTTPS redirect
- ✅ **Scalable** with Docker container orchestration
- ✅ **Monitored** with health checks and logging
- ✅ **Maintainable** with automated deployment scripts

**Access your live website at: https://splshield.com** 🚀

---

*For additional support or questions, refer to the troubleshooting section or check the Docker and Nginx logs for detailed error information.*