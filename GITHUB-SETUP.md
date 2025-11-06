# GitHub Setup Guide for SPL Shield

## Step 1: Create GitHub Repository

### 1.1 Create New Repository
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `spl-shield-landing`
4. Description: `SPL Shield - Complete Solana Security Ecosystem Landing Website`
5. Set to **Public** (or Private if you prefer)
6. ✅ Add a README file
7. ✅ Add .gitignore → Choose "Node"
8. ✅ Choose a license → MIT License
9. Click "Create repository"

### 1.2 Clone Repository to Your Local Machine
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/spl-shield-landing.git
cd spl-shield-landing

# If you already have the project files, copy them into this directory
cp -r /path/to/your/spl-shield-landing/* .
```

## Step 2: Prepare Your Project

### 2.1 Create .gitignore File
```bash
# Create .gitignore if it doesn't exist
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
/dist
/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Docker
*.log
docker-compose.override.yml

# Backup files
*.backup
*.bak

# Temporary files
*.tmp
*.temp
EOF
```

### 2.2 Create Production Environment File
```bash
# Create .env.production (this will be committed to git)
cat > .env.production << 'EOF'
# SPL Shield Production Environment
VITE_SITE_URL=https://your-domain.com
VITE_APP_NAME=SPL Shield
VITE_APP_SCANNER_URL=https://app.splshield.com
VITE_APP_EXCHANGE_URL=https://presale.splshield.com
VITE_APP_API_URL=https://api.splshield.com
# Legacy fallbacks (optional)
VITE_SCANNER_URL=https://app.splshield.com
VITE_EXCHANGE_URL=https://presale.splshield.com
VITE_ENABLE_ANALYTICS=true
EOF
```

## Step 3: Add All Files to Git

### 3.1 Add Docker Files
Make sure these files are in your project root:
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `.dockerignore`
- `deploy-vps.sh`

### 3.2 Commit and Push
```bash
# Add all files
git add .

# Commit with a descriptive message
git commit -m "Initial commit: SPL Shield landing website with Docker configuration"

# Push to GitHub
git push origin main
```

## Step 4: Create GitHub Actions (Optional)

### 4.1 Create Workflow Directory
```bash
mkdir -p .github/workflows
```

### 4.2 Create Auto-Deploy Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          cd /path/to/spl-shield-landing
          git pull origin main
          chmod +x deploy-vps.sh
          ./deploy-vps.sh
```

## Step 5: Set Up SSH Keys (For Auto-Deploy)

### 5.1 Generate SSH Key for GitHub Actions
```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions@spl-shield"
# Save as: github_actions_key (no passphrase)
```

### 5.2 Add Public Key to VPS
```bash
# Copy public key to VPS
ssh-copy-id -i github_actions_key.pub user@your-vps-ip

# Or manually add to VPS ~/.ssh/authorized_keys
```

### 5.3 Add Secrets to GitHub
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:
   - `VPS_HOST`: Your VPS IP address
   - `VPS_USERNAME`: Your VPS username
   - `VPS_SSH_KEY`: Contents of `github_actions_key` (private key)

## Step 6: Repository Structure

Your final repository should look like this:
```
spl-shield-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── index.html
│   └── favicon files
├── src/
│   ├── components/
│   └── ... (all your React components)
├── .dockerignore
├── .env.production
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── deploy-vps.sh
├── package.json
├── README.md
└── ... (other project files)
```

## Step 7: Update README.md

Create a comprehensive README for your project:

```markdown
# SPL Shield Landing Website

Complete Solana Security Ecosystem landing website with tokenomics, roadmap, and legal compliance.

## 🚀 Quick Start

### Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### Docker Deployment
\`\`\`bash
docker-compose up -d
\`\`\`

### VPS Deployment
\`\`\`bash
chmod +x deploy-vps.sh
./deploy-vps.sh
\`\`\`

## 🌐 Live Demo
- Main Site: https://splshield.com
- Scanner: https://app.splshield.com
- Exchange: https://ex.splshield.com

## 🛠️ Tech Stack
- React 18 + Vite
- Tailwind CSS
- Docker + Nginx
- Fully responsive design

## 📄 Legal Compliance
- Privacy Policy
- Terms of Service  
- Cookie Policy
- Risk Disclaimers

## 🔧 Features
- Interactive tokenomics visualization
- Development roadmap timeline
- Dark/light mode
- Mobile responsive
- SEO optimized
- Legal compliance suite
\`\`\`

## Next Steps

1. ✅ Repository created
2. ✅ All files committed
3. ✅ Docker configuration ready
4. ⏳ Deploy to VPS (next section)
5. ⏳ Set up domain and SSL

Your GitHub repository is now ready for deployment! 🎉
```

This guide sets up a professional GitHub repository with all the necessary files for Docker deployment to your VPS.
