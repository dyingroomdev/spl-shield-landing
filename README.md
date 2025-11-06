# SPL Shield Landing Website 🛡️

A modern, responsive landing website for SPL Shield - the complete Solana security ecosystem. Built with React, Tailwind CSS, and modern web technologies.

## 🚀 Features

- **Modern Design**: Beautiful, responsive design inspired by Solayer.org
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **Performance Optimized**: Fast loading with code splitting and optimization
- **SEO Friendly**: Meta tags, Open Graph, and structured data
- **Accessibility**: WCAG compliant with keyboard navigation
- **Brand Integration**: SPL Shield and TDL token brand colors and themes

## 🎨 Design System

### Brand Colors
- **SPL Shield**: Green gradient (#22c55e to #0d9488)
- **TDL Token**: Purple to orange gradient (#a855f7 to #f97316)
- **Dark Mode**: Optimized color palette for dark theme

### Components
- Hero section with animated stats
- Feature showcase with icons and benefits
- Product overview with external links
- Whitepaper section with download options
- Contact form with multiple channels
- Footer with comprehensive links

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Fonts**: Inter + Space Grotesk

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 16.x or higher
- npm or yarn package manager
- Git for version control

## 🚀 Quick Start

### 1. Clone & Setup
```bash
# Create project directory
mkdir spl-shield-landing
cd spl-shield-landing

# Initialize React project
npm create vite@latest . -- --template react

# Install dependencies
npm install react-router-dom lucide-react framer-motion
npm install -D tailwindcss postcss autoprefixer @types/node
```

### 2. Configure Tailwind CSS
```bash
# Initialize Tailwind
npx tailwindcss init -p
```

### 3. Copy Files
Copy all the provided component files into your project:
- `src/components/` - All React components
- `src/hooks/` - Custom hooks (useDarkMode)
- Configuration files (tailwind.config.js, etc.)

### 4. Project Structure
```
spl-shield-landing/
├── public/
│   ├── index.html
│   └── favicon files
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Products.jsx
│   │   ├── Whitepaper.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useDarkMode.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

### 5. Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Subdomain Setup
Configure your DNS and hosting:

1. **Main site**: `splshield.com` → This landing page
2. **Scanner app**: `app.splshield.com` → SPL Shield Scanner
3. **Presale portal**: `presale.splshield.com` → TDL Presale Access

### Build & Deploy
```bash
# Create production build
npm run build

# Deploy to your hosting provider
# (Vercel, Netlify, AWS S3, etc.)
```

### Environment Configuration
Create `.env` file for any environment variables:
```env
VITE_APP_SCANNER_URL=https://app.splshield.com
VITE_APP_EXCHANGE_URL=https://presale.splshield.com
VITE_APP_API_URL=https://api.splshield.com
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Performance Optimization

- Code splitting with Vite
- Image optimization
- Lazy loading components
- CSS purging with Tailwind
- Minimal bundle size

## 🔧 Customization

### Brand Colors
Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* Your SPL Shield colors */ },
  secondary: { /* Your secondary colors */ },
  tdl: { /* Your TDL token colors */ }
}
```

### Content Updates
- Hero section: `src/components/Hero.jsx`
- Features: `src/components/Features.jsx`
- Products: `src/components/Products.jsx`

### External Links
Update redirect URLs in components:
- Scanner app: `https://app.splshield.com`
- TDL presale: `https://presale.splshield.com`

## 🐛 Troubleshooting

### Common Issues

1. **Tailwind styles not loading**
   ```bash
   # Rebuild Tailwind
   npm run build:css
   ```

2. **Dark mode not working**
   - Check localStorage key: `spl-shield-theme`
   - Verify class toggle in `useDarkMode.js`

3. **Icons not displaying**
   ```bash
   # Reinstall lucide-react
   npm uninstall lucide-react
   npm install lucide-react
   ```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **Email**: support@splshield.com
- **X (Twitter)**: https://x.com/splshield
- **Facebook**: https://www.facebook.com/splshield
- **Instagram**: https://www.instagram.com/splshield
- **Telegram**: https://t.me/splshield

## 🎉 What's Next?

After setup, you can:
1. Customize brand colors and content
2. Add your actual scanner and exchange URLs
3. Deploy to your hosting provider
4. Set up subdomain redirects
5. Add analytics and monitoring
6. Implement contact form backend
7. Add blog/news section
8. Integrate with your actual APIs

---

**Built with ❤️ for the Solana community by SPL Shield Team**
