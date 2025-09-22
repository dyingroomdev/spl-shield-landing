# Complete SPL Shield Deployment Guide for Beginners 🚀

This guide will take you from a working local SPL Shield website to a live, secure website on your VPS with SSL.

## 📋 What We'll Accomplish

By the end of this guide, you'll have:
- ✅ Your website Dockerized and on GitHub
- ✅ SPL Shield running on your VPS (port 3001)
- ✅ Nginx reverse proxy with SSL certificate
- ✅ Automatic HTTPS redirect
- ✅ Professional domain setup
- ✅ Monitoring and auto-restart

## 🎯 Step-by-Step Process

### Phase 1: Prepare Your Local Project (10 minutes)

#### 1.1 Add Docker Files to Your Project

In your `spl-shield-landing` directory, create these files:

**Create `Dockerfile`:**
```bash
nano Dockerfile
# Copy the Dockerfile content from the artifacts above
```

**Create `docker-compose.yml`:**
```bash
nano docker-compose.yml
# Copy the docker-compose.yml content from the artifacts above
```

**Create `nginx.conf`:**
```bash
nano nginx.conf
# Copy the nginx.conf content from the artifacts above
```

**Create `.dockerignore`:**
```bash
nano .dockerignore
# Copy the .dockerignore content from the artifacts above
```

**Create `deploy-vps.sh`:**
```bash
nano deploy-vps.sh
# Copy the deploy-vps.sh content from the artifacts above
chmod +x deploy-vps.sh
```

#### 1.2 Test Local Docker Build

```bash
# Test if Docker build works locally
docker-compose build

# Test if container runs locally
docker-compose up -d

# Check if it's working
curl http://localhost:3001/health

# Stop the test container
docker-compose down
```

### Phase 2: Set Up GitHub Repository (10 minutes)

#### 2.1 Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `spl-shield-landing`
4. Description: `SPL Shield - Complete Solana Security Ecosystem`
5. Public repository
6. ✅ Add a README file
7. ✅ Add .gitignore (Node)
8. ✅ Choose MIT license
9. Click "Create repository"

#### 2.2 Upload Your Code

```bash
# Clone the new repository
cd ~
git clone https://github.com/YOUR_USERNAME/spl-shield-landing.git
cd spl-shield-landing

# Copy your project files (adjust path as needed)
cp -r /path/to/your/local/spl-shield-landing/* .

# Add all files
git add .

# Commit
git commit -m "Initial commit: SPL Shield with Docker configuration"

# Push to GitHub
git push origin main
```

### Phase 3: Prepare Your VPS (15 minutes)

#### 3.1 Connect to Your VPS

```bash
# SSH to your VPS (replace with your details)
ssh your-username@your-vps-ip
```

#### 3.2 Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git and utilities
sudo apt install git curl wget nano -y

# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Log out and back in for Docker permissions
exit
ssh your-username@your-vps-ip
```

#### 3.3 Clone Your Repository

```bash
# Clone from GitHub
cd ~
git clone https://github.com/YOUR_USERNAME/spl-shield-landing.git
cd spl-shield-landing

# Make deploy script executable
chmod +x deploy-vps.sh
```

### Phase 4: Deploy SPL Shield Container (5 minutes)

#### 4.1 Deploy the Container

```bash
# Run the deployment script
./deploy-vps.sh
```

#### 4.2 Verify Container is Running

```bash
# Check if container is running
docker ps

# Test the health endpoint
curl http://localhost:3001/health

# Test the main page
curl http://localhost:3001/
```

✅ **Checkpoint:** Your website should now be accessible at `http://YOUR_VPS_IP:3001`

### Phase 5: Configure Nginx Reverse Proxy (15 minutes)

#### 5.1 Create Nginx Configuration

```bash
# Create configuration directory
sudo mkdir -p /etc/nginx/conf.d

# Create SPL Shield configuration
sudo nano /etc/nginx/conf.d/splshield.conf
```

**Add this configuration (replace `splshield.com` with your domain):**

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name splshield.com www.splshield.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name splshield.com www.splshield.com;

    # SSL certificates (will be created in next step)
    ssl_certificate /etc/letsencrypt/live/splshield.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/splshield.com/privkey.pem;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Proxy to SPL Shield
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 5.2 Configure Portainer Nginx Container

Since your Nginx is in Portainer:

1. **Go to Portainer dashboard**
2. **Find your Nginx container**
3. **Edit the container**
4. **Add volume mount:**
   - Container path: `/etc/nginx/conf.d`
   - Host path: `/etc/nginx/conf.d`
   - Access mode: Read-only

5. **Restart the Nginx container**

### Phase 6: Set Up SSL Certificate (10 minutes)

#### 6.1 Create Certbot Directory

```bash
# Create directory for Let's Encrypt challenges
sudo mkdir -p /var/www/certbot
```

#### 6.2 Get SSL Certificate

```bash
# Replace with your actual domain and email
sudo certbot certonly --webroot \
    -w /var/www/certbot \
    -d splshield.com \
    -d www.splshield.com \
    --email your-email@example.com \
    --agree-tos \
    --non-interactive
```

#### 6.3 Restart Nginx

```bash
# Test nginx configuration
sudo nginx -t

# Restart nginx (in Portainer or host)
sudo systemctl reload nginx
# OR restart the container in Portainer
```

### Phase 7: Configure Domain DNS (5 minutes)

#### 7.1 Update DNS Records

In your domain registrar (Namecheap, GoDaddy, etc.):

```dns
Type    Name                Value
A       splshield.com      YOUR_VPS_IP
A       www.splshield.com  YOUR_VPS_IP
```

#### 7.2 Wait for DNS Propagation

```bash
# Check if DNS has propagated (may take up to 24 hours)
nslookup splshield.com
dig splshield.com
```

### Phase 8: Test Your Live Website (5 minutes)

#### 8.1 Test HTTP to HTTPS Redirect

```bash
curl -I http://splshield.com
# Should return: 301 Moved Permanently
```

#### 8.2 Test HTTPS Access

```bash
curl -I https://splshield.com
# Should return: 200 OK
```

#### 8.3 Test in Browser

1. Visit `https://splshield.com`
2. Check for the SSL lock icon
3. Test all functionality:
   - Dark/light mode toggle
   - Navigation links
   - Contact form
   - Legal pages
   - External app links

### Phase 9: Set Up Monitoring (10 minutes)

#### 9.1 Create Auto-Renewal for SSL

```bash
# Add cron job for SSL renewal
sudo crontab -e

# Add this line (choose nano as editor if prompted):
0 12 * * * /usr/bin/certbot renew --quiet --post-hook "docker exec nginx-container nginx -s reload"
```

#### 9.2 Create Health Monitoring

```bash
# Create monitoring script
nano ~/monitor-spl-shield.sh
```

**Add this content:**

```bash
#!/bin/bash
# SPL Shield Health Monitor

echo "$(date): Checking SPL Shield health..."

# Check container status
if ! docker ps | grep -q "spl-shield-landing"; then
    echo "❌ Container not running, restarting..."
    cd ~/spl-shield-landing
    docker-compose up -d
    exit 1
fi

# Check website response
if curl -f -s https://splshield.com/health > /dev/null; then
    echo "✅ SPL Shield is healthy"
else
    echo "❌ Website not responding"
    cd ~/spl-shield-landing
    docker-compose restart
fi
```

```bash
# Make executable
chmod +x ~/monitor-spl-shield.sh

# Add to cron (check every 5 minutes)
crontab -e

# Add this line:
*/5 * * * * /home/$USER/monitor-spl-shield.sh >> /home/$USER/spl-shield-monitor.log 2>&1
```

## 🎉 Success! Your Website is Live!

### What You've Accomplished:

✅ **Professional Website**: `https://splshield.com`
✅ **Secure HTTPS**: SSL certificate with auto-renewal
✅ **Docker Containerized**: Easy updates and scaling
✅ **GitHub Repository**: Version control and backup
✅ **Nginx Reverse Proxy**: Professional web server setup
✅ **Monitoring**: Automatic health checks and restarts
✅ **Legal Compliance**: Privacy policy, terms, disclaimers

### Useful Commands for Maintenance:

```bash
# Update your website
cd ~/spl-shield-landing
git pull origin main
./deploy-vps.sh

# Check status
docker ps
curl https://splshield.com/health

# View logs
docker-compose logs -f

# Restart if needed
docker-compose restart

# Check SSL certificate
sudo certbot certificates
```

## 🚨 Troubleshooting

### Common Issues:

**1. Website not accessible:**
```bash
# Check if container is running
docker ps
# If not running:
cd ~/spl-shield-landing && docker-compose up -d
```

**2. SSL certificate issues:**
```bash
# Check certificate status
sudo certbot certificates
# Renew if needed:
sudo certbot renew
```

**3. Nginx errors:**
```bash
# Test configuration
sudo nginx -t
# Check error logs
sudo tail -f /var/log/nginx/error.log
```

**4. Domain not pointing to VPS:**
```bash
# Check DNS resolution
nslookup your-domain.com
dig your-domain.com
```

## 🎯 Next Steps

1. **Set up subdomains** for scanner and exchange apps
2. **Configure monitoring alerts** (email/Discord notifications)
3. **Set up automated backups** of your data
4. **Add analytics** (Google Analytics, etc.)
5. **Plan for scaling** if traffic grows

---

## 🎊 Congratulations!

You now have a **professional, secure, production-ready website** running on your VPS!

Your SPL Shield website is:
- 🌐 **Live** at your domain with HTTPS
- 🔒 **Secure** with SSL encryption
- 🚀 **Fast** with Nginx caching
- 📱 **Responsive** on all devices
- ⚖️ **Compliant** with legal requirements
- 🔄 **Monitored** with auto-restart
- 🛡️ **Professional** and ready for users

**Welcome to the world of professional web deployment!** 🚀🛡️