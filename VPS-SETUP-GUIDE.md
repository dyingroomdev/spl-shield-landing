# SPL Shield Docker Deployment Guide 🐳

Complete guide to deploy SPL Shield website using Docker with Nginx reverse proxy on your private VPS.

## 🏗️ Architecture Overview

```
Internet → Nginx (80/443) → Docker Container (3000) → React App
```

- **Nginx**: Handles SSL termination, reverse proxy, security headers
- **Docker Container**: Runs React app on port 3000 (internal)
- **React App**: SPL Shield website served by internal Nginx

## 📋 Prerequisites

- ✅ Private VPS with Docker installed
- ✅ Nginx running in Docker (Portainer) on ports 80/443
- ✅ Domain name pointing to your VPS (splshield.com)
- ✅ SSL certificate for your domain

## 🚀 Quick Deployment

### Step 1: Prepare Files
```bash
# Make sure you have these files in your project directory:
ls -la
# Should show:
# - Dockerfile
# - docker-compose.yml
# - nginx.conf
# - .dockerignore
# - deploy-docker.sh
# - splshield.conf
```

### Step 2: Make Deploy Script Executable
```bash
chmod +x deploy-docker.sh
```

### Step 3: Deploy Application
```bash
# Full deployment (recommended)
./deploy-docker.sh

# Or step by step:
./deploy-docker.sh --build-only    # Build image only
./deploy-docker.sh --deploy-only   # Deploy only
```

### Step 4: Configure Host Nginx
```bash
# Copy Nginx config to your host system
sudo cp splshield.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/splshield.conf /etc/nginx/sites-enabled/

# Update SSL certificate paths in splshield.conf
sudo nano /etc/nginx/sites-available/splshield.conf

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 📁 File Structure

```
spl-shield-landing/
├── Dockerfile                    # React app container
├── docker-compose.yml           # Container orchestration
├── nginx.conf                   # Container Nginx config
├── splshield.conf               # Host Nginx config
├── .dockerignore               # Docker build exclusions
├── deploy-docker.sh            # Deployment automation
├── src/                        # React source code
├── package.json               # Dependencies
└── dist/                      # Built assets (generated)
```

## 🐳 Docker Configuration Details

### Dockerfile Stages

**Stage 1: Builder**
- Uses Node.js 18 Alpine
- Installs dependencies
- Builds React application

**Stage 2: Production**
- Uses Nginx Alpine
- Copies built assets
- Serves on port 80 (internal)

### Container Features
- ✅ Multi-stage build for minimal image size
- ✅ Health checks for monitoring
- ✅ Gzip compression enabled
- ✅ Security headers configured
- ✅ SPA routing support
- ✅ Static asset caching

## 🔧 Configuration Options

### Environment Variables
```bash
# In docker-compose.yml or docker run
NODE_ENV=production
VITE_SITE_URL=https://splshield.com
VITE_SCANNER_URL=https://app.splshield.com
VITE_EXCHANGE_URL=https://ex.splshield.com
```

### Port Configuration
```yaml
# Default: Container port 80 → Host port 3000
ports:
  - "3000:80"

# Custom port:
ports:
  - "3001:80"  # Use port 3001 instead
```

## 🔒 SSL Certificate Setup

### Option 1: Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d splshield.com -d www.splshield.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Custom Certificate
```bash
# Update paths in splshield.conf:
ssl_certificate /path/to/your/certificate.crt;
ssl_certificate_key /path/to/your/private.key;
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
```bash
# Container health
curl http://localhost:3000/health

# Through Nginx proxy
curl https://splshield.com/health
```

### Docker Monitoring
```bash
# Check container status
docker ps | grep spl-shield

# View logs
docker logs spl-shield-landing

# Monitor resources
docker stats spl-shield-landing
```

### Nginx Monitoring
```bash
# Check Nginx status
sudo systemctl status nginx

# View access logs
sudo tail -f /var/log/nginx/splshield.access.log

# View error logs
sudo tail -f /var/log/nginx/splshield.error.log
```

## 🔄 Updating & Maintenance

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and redeploy
./deploy-docker.sh

# Or manual update:
docker-compose down
docker-compose up -d --build
```

### Database Backup (if applicable)
```bash
# Backup container data
docker run --rm -v spl_shield_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```

### Log Rotation
```bash
# Add to /etc/logrotate.d/nginx
/var/log/nginx/splshield.*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 nginx nginx
    postrotate
        systemctl reload nginx
    endscript
}
```

## 🚨 Troubleshooting

### Common Issues

**1. Port 3000 Already in Use**
```bash
# Find process using port
sudo lsof -i :3000

# Kill process or change port in docker-compose.yml
```

**2. Container Won't Start**
```bash
# Check logs
docker logs spl-shield-landing

# Common causes:
# - Missing files during build
# - Incorrect nginx.conf syntax
# - Port conflicts
```

**3. Nginx Configuration Errors**
```bash
# Test configuration
sudo nginx -t

# Check syntax of splshield.conf
# Ensure SSL certificate paths are correct
```

**4. SSL Certificate Issues**
```bash
# Check certificate expiration
openssl x509 -in /path/to/cert.crt -text -noout | grep "Not After"

# Verify certificate chain
openssl verify -CApath /etc/ssl/certs /path/to/cert.crt
```

**5. Application Not Loading**
```bash
# Check if container is running
docker ps

# Check if Nginx proxy is working
curl -I http://localhost:3000

# Check host Nginx configuration
sudo nginx -t && sudo systemctl reload nginx
```

## 📈 Performance Optimization

### Docker Optimizations
```bash
# Use specific Node version for consistent builds
FROM node:18.17-alpine

# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
```

### Nginx Optimizations
```nginx
# Add to splshield.conf
client_max_body_size 10M;
keepalive_timeout 65;
gzip_comp_level 6;
```

### React Build Optimizations
```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer dist/static/js/*.js
```

## 🔐 Security Best Practices

### Container Security
- ✅ Non-root user (nginx user)
- ✅ Minimal base image (Alpine)
- ✅ No unnecessary packages
- ✅ Regular security updates

### Nginx Security
- ✅ SSL/TLS configuration
- ✅ Security headers
- ✅ Rate limiting (optional)
- ✅ Access controls

### Network Security
```bash
# Optional: Create custom network
docker network create spl-shield-network --driver bridge

# Use in docker-compose.yml
networks:
  default:
    external:
      name: spl-shield-network
```

## 🎯 Production Checklist

### Pre-Deployment
- [ ] SSL certificates configured
- [ ] Domain DNS pointing to server
- [ ] Firewall rules configured
- [ ] Backup procedures in place

### Post-Deployment
- [ ] Health checks passing
- [ ] SSL grade A+ (test with ssllabs.com)
- [ ] Performance tests completed
- [ ] Monitoring alerts configured
- [ ] Documentation updated

## 📞 Support Commands

### Quick Commands Reference
```bash
# Deploy application
./deploy-docker.sh

# Check status
docker ps | grep spl-shield

# View logs
docker logs spl-shield-landing

# Update application
git pull && ./deploy-docker.sh

# Restart container
docker restart spl-shield-landing

# Clean up
docker system prune -f
```

### Emergency Recovery
```bash
# Stop and remove everything
docker-compose down
docker rmi spl-shield/landing

# Clean rebuild
./deploy-docker.sh

# Restore from backup (if needed)
docker run --rm -v spl_shield_data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /
```

---

## 🎉 Success!

Your SPL Shield website is now:
- ✅ **Dockerized** for consistent deployments
- ✅ **Secured** with SSL and security headers
- ✅ **Optimized** for production performance
- ✅ **Monitored** with health checks
- ✅ **Scalable** with Docker orchestration

**Access your website at: https://splshield.com** 🚀🛡️

For additional support, check the troubleshooting section or container logs for specific error messages.