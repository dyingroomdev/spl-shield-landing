# SPL Shield Docker Deployment Guide 🐳

Complete guide to dockerize and deploy SPL Shield to your VPS with existing Nginx setup.

## 🎯 Architecture Overview

```
Internet → Nginx Proxy (80/443) → SPL Shield Container (3000) → React App
```

- **Nginx Proxy**: Your existing nginx on ports 80/443 with SSL
- **SPL Shield Container**: Runs on port 3000 internally
- **No Port Conflicts**: SPL Shield uses port 3000, nginx proxies to it

## 📋 Prerequisites

- ✅ Docker installed on your VPS
- ✅ Docker Compose installed
- ✅ Nginx running on ports 80/443 (already done)
- ✅ SSL certificates configured
- ✅ Domain DNS pointing to your VPS

## 🚀 Quick Deployment

### Option 1: Using Docker Compose (Recommended)

```bash
# 1. Make deployment script executable
chmod +x docker-deploy.sh

# 2. Deploy with docker-compose
./docker-deploy.sh compose

# 3. Verify deployment
curl http://localhost:3000/health
```

### Option 2: Using Plain Docker

```bash
# Deploy with docker run
./docker-deploy.sh docker
```

### Option 3: Via Portainer Stack

1. Copy `docker-compose.yml` content
2. Go to Portainer → Stacks → Add Stack
3. Paste the compose file
4. Deploy

## 📁 Required Files

Ensure these files are in your project directory:

```
spl-shield-landing/
├── Dockerfile              # Multi-stage build configuration
├── docker-compose.yml      # Portainer-ready compose file
├── nginx.conf              # Internal nginx config (port 3000)
├── docker-entrypoint.sh    # Container startup script
├── docker-deploy.sh        # Deployment automation script
├── nginx-proxy.conf        # Proxy config for main nginx
└── (your React app files)
```

## 🔧 Nginx Proxy Setup

### Step 1: Configure Your Main Nginx

Add this configuration to your main nginx (the one running on 80/443):

```bash
# Edit your nginx configuration
sudo nano /etc/nginx/sites-available/splshield.com

# Or if using nginx in Docker:
# Add to your nginx config files
```

### Step 2: Add Proxy Configuration

Copy the content from `nginx-proxy.conf` artifact and add to your nginx config:

```nginx
# Upstream for SPL Shield
upstream spl_shield_backend {
    server 127.0.0.1:3000;
    keepalive 32;
}

# Main site configuration
server {
    listen 443 ssl http2;
    server_name splshield.com www.splshield.com;
    
    # Your existing SSL configuration
    ssl_certificate /path/to/your/ssl/cert.crt;
    ssl_private_key /path/to/your/ssl/cert.key;
    
    # Proxy to SPL Shield container
    location / {
        proxy_pass http://spl_shield_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 3: Test and Reload Nginx

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo nginx -s reload

# Or if using Docker nginx:
docker exec nginx-container nginx -t
docker exec nginx-container nginx -s reload
```

## 🐳 Docker Configuration Details

### Container Specifications

- **Base Image**: node:18-alpine (build) + nginx:alpine (runtime)
- **Port**: 3000 (internal), mapped to host 3000
- **Health Check**: `/health` endpoint every 30 seconds
- **Resources**: 512MB RAM limit, 0.5 CPU limit
- **Restart Policy**: unless-stopped

### Environment Variables

```yaml
environment:
  - NODE_ENV=production
  - VITE_SITE_URL=https://splshield.com
  - VITE_APP_SCANNER_URL=https://app.splshield.com
  - VITE_APP_EXCHANGE_URL=https://presale.splshield.com
  - VITE_APP_API_URL=https://api.splshield.com
  - VITE_SCANNER_URL=https://app.splshield.com
  - VITE_EXCHANGE_URL=https://presale.splshield.com
  - VITE_API_URL=https://api.splshield.com
```

### Volume Mounts (Optional)

```yaml
volumes:
  - nginx-logs:/var/log/nginx
  - app-data:/usr/share/nginx/html
```

## 📊 Portainer Stack Deployment

### Step 1: Create Stack in Portainer

1. Login to Portainer
2. Go to **Stacks** → **Add Stack**
3. Name: `spl-shield-website`
4. Paste the `docker-compose.yml` content

### Step 2: Configure Networks

Make sure your existing nginx container and SPL Shield can communicate:

```yaml
networks:
  proxy-network:
    external: true
    name: your-existing-nginx-network  # Adjust this name
```

### Step 3: Deploy Stack

1. Click **Deploy the Stack**
2. Wait for deployment to complete
3. Check container logs for any errors

### Step 4: Verify Deployment

```bash
# Check if container is running
docker ps | grep spl-shield

# Check container health
docker inspect spl-shield-landing | grep -A 5 "Health"

# Test internal endpoint
curl http://localhost:3000/health

# Check logs
docker logs spl-shield-landing -f
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use
```bash
# Check what's using port 3000
sudo netstat -tulpn | grep :3000

# Kill process if needed
sudo kill -9 <PID>
```

#### 2. Container Won't Start
```bash
# Check container logs
docker logs spl-shield-landing

# Check if build files exist
docker exec spl-shield-landing ls -la /usr/share/nginx/html/
```

#### 3. Nginx Proxy Not Working
```bash
# Test nginx config
sudo nginx -t

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test direct connection to container
curl -v http://localhost:3000/
```

#### 4. SSL Issues
```bash
# Check SSL certificate
openssl x509 -in /path/to/cert.crt -text -noout

# Test SSL connection
openssl s_client -connect splshield.com:443
```

### Health Check Commands

```bash
# Container health
curl http://localhost:3000/health

# Full site test
curl -I http://localhost:3000/

# Through nginx proxy
curl -I https://splshield.com/
```

## 📈 Performance Optimization

### 1. Nginx Caching

Add to your main nginx config:

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=spl_cache:10m inactive=60m;

location / {
    proxy_pass http://spl_shield_backend;
    proxy_cache spl_cache;
    proxy_cache_valid 200 1h;
    proxy_cache_valid 404 1m;
}
```

### 2. Compression

Already enabled in container nginx config:
- Gzip compression for text files
- Static asset caching
- Optimized buffer sizes

### 3. Resource Limits

Adjust in `docker-compose.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'        # Increase if needed
      memory: 1G         # Increase if needed
    reservations:
      cpus: '0.5'
      memory: 512M
```

## 🔒 Security Considerations

### 1. Container Security

- ✅ Runs as non-root user (nginx)
- ✅ Multi-stage build (smaller attack surface)
- ✅ Health checks enabled
- ✅ Resource limits configured

### 2. Network Security

```yaml
networks:
  spl-shield-network:
    driver: bridge
    internal: true  # Internal network only
```

### 3. Nginx Security Headers

Already configured:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy

## 🚀 CI/CD Integration

### GitHub Actions (Optional)

```yaml
name: Deploy SPL Shield
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to VPS
        run: |
          ssh user@your-vps.com "cd /path/to/spl-shield && ./docker-deploy.sh compose"
```

### Manual Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
./docker-deploy.sh compose

# Or just rebuild
docker-compose up -d --build
```

## 📊 Monitoring

### Container Stats

```bash
# Resource usage
docker stats spl-shield-landing

# Live logs
docker logs spl-shield-landing -f

# Container info
docker inspect spl-shield-landing
```

### Website Monitoring

```bash
# Setup monitoring script
curl -s http://localhost:3000/health | grep "healthy" || echo "ALERT: Site down"

# Add to crontab for monitoring
*/5 * * * * curl -s http://localhost:3000/health | grep "healthy" || mail -s "SPL Shield Down" admin@splshield.com
```

## 🎯 Next Steps

After successful deployment:

1. **Configure DNS**: Point splshield.com to your VPS IP
2. **SSL Setup**: Ensure SSL certificates are properly configured
3. **Monitoring**: Set up monitoring and alerting
4. **Backups**: Configure automated backups
5. **Scaling**: Consider load balancing for high traffic

## 📞 Support

If you encounter issues:

1. Check container logs: `docker logs spl-shield-landing`
2. Verify nginx config: `nginx -t`
3. Test connectivity: `curl http://localhost:3000/health`
4. Check resource usage: `docker stats`

---

## 🎉 Success!

Your SPL Shield website should now be:
- ✅ Running in Docker container on port 3000
- ✅ Accessible via nginx proxy on ports 80/443
- ✅ SSL-secured and production-ready
- ✅ Monitored with health checks
- ✅ Ready for high traffic

**Visit https://splshield.com to see your deployed website!** 🛡️🚀
