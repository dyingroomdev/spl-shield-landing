#!/bin/sh
# SPL Shield Docker Entrypoint Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}🛡️  Starting SPL Shield Website...${NC}"

# Check if build files exist
if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    echo -e "${RED}❌ Error: Build files not found!${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Build files found${NC}"

# Test nginx configuration
echo -e "${BLUE}🔧 Testing nginx configuration...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration is invalid${NC}"
    exit 1
fi

# Create necessary directories with proper permissions
mkdir -p /var/cache/nginx/client_temp \
         /var/cache/nginx/proxy_temp \
         /var/cache/nginx/fastcgi_temp \
         /var/cache/nginx/uwsgi_temp \
         /var/cache/nginx/scgi_temp 2>/dev/null || true

# Set proper permissions (only if running as root, otherwise skip)
if [ "$(id -u)" = "0" ]; then
    chown -R nginx:nginx /var/cache/nginx/ 2>/dev/null || true
    chown -R nginx:nginx /var/log/nginx/ 2>/dev/null || true
fi

# Display container information
echo -e "${BLUE}📊 Container Information:${NC}"
echo -e "  ${YELLOW}Container Port:${NC} 3000"
echo -e "  ${YELLOW}Nginx User:${NC} $(whoami)"
echo -e "  ${YELLOW}Document Root:${NC} /usr/share/nginx/html"
echo -e "  ${YELLOW}Available Files:${NC}"
ls -la /usr/share/nginx/html/ | head -10

# Start nginx in foreground
echo -e "${GREEN}🚀 Starting nginx server on port 3000...${NC}"
echo -e "${YELLOW}📱 SPL Shield is now running!${NC}"
echo -e "${BLUE}🌐 Internal URL: http://localhost:3000${NC}"

# Start nginx
exec nginx -g "daemon off;"