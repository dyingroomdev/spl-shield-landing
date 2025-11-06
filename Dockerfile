# SPL Shield Landing Website Dockerfile
# Multi-stage build for optimized production image

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set production environment variables
ENV NODE_ENV=production
ENV VITE_SITE_URL=https://splshield.com
ENV VITE_APP_SCANNER_URL=https://app.splshield.com
ENV VITE_APP_EXCHANGE_URL=https://presale.splshield.com
ENV VITE_APP_API_URL=https://api.splshield.com
ENV VITE_SCANNER_URL=https://app.splshield.com
ENV VITE_EXCHANGE_URL=https://presale.splshield.com
ENV VITE_API_URL=https://api.splshield.com
ENV VITE_DOCUMENTS_URL=https://docs.splshield.com
# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install runtime dependencies
RUN apk add --no-cache dumb-init curl

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy startup script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Ensure nginx directories exist and set proper permissions
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port 3000 (internal container port)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start nginx
CMD ["/docker-entrypoint.sh"]
