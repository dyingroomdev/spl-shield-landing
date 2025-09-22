import React from 'react';
import { Shield, ExternalLink, Github, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SPLShieldLogo from './SPLShieldLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleExternalRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const footerLinks = {
    products: [
      { name: 'SPL Shield Scanner', url: 'https://app.splshield.com', external: true },
      { name: 'TDL Token Exchange', url: 'https://ex.splshield.com', external: true },
      { name: 'API Documentation', url: '#', external: false },
      { name: 'Developer Tools', url: '#', external: false }
    ],
    resources: [
      { name: 'Whitepaper', url: '/whitepaper', external: false },
      { name: 'Security Guide', url: '#', external: false },
      { name: 'Community', url: '#', external: false },
      { name: 'Blog', url: '#', external: false }
    ],
    support: [
      { name: 'Help Center', url: '#', external: false },
      { name: 'Contact Us', url: '/contact', external: false },
      { name: 'Bug Reports', url: '#', external: false },
      { name: 'Feature Requests', url: '#', external: false }
    ],
    legal: [
      { name: 'Privacy Policy', url: '/privacy-policy', external: false },
      { name: 'Terms of Service', url: '/terms-of-service', external: false },
      { name: 'Cookie Policy', url: '/cookie-policy', external: false },
      { name: 'Disclaimer', url: '/disclaimer', external: false }
    ]
  };

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com/splshield', name: 'Twitter' },
    { icon: Github, url: 'https://github.com/splshield', name: 'GitHub' },
    { icon: Mail, url: 'mailto:support@splshield.com', name: 'Email' }
  ];

  const handleLinkClick = (url, external) => {
    if (external && url.startsWith('http')) {
      handleExternalRedirect(url);
    } else if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (url.startsWith('mailto:')) {
      window.location.href = url;
    }
    // For internal routes, Link component handles the routing
  };

  const renderLink = (link) => {
    if (link.external || link.url.startsWith('#') || link.url.startsWith('mailto:')) {
      return (
        <button
          onClick={() => handleLinkClick(link.url, link.external)}
          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
        >
          <span>{link.name}</span>
          {link.external && <ExternalLink className="w-3 h-3" />}
        </button>
      );
    } else {
      return (
        <Link
          to={link.url}
          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
        >
          {link.name}
        </Link>
      );
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-custom">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-glow-green">
                  <SPLShieldLogo className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xl font-bold font-display">SPL Shield</span>
                  <div className="text-sm text-gray-400 -mt-1">Security First</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                The complete Solana security ecosystem. Protecting your investments 
                with advanced AI-powered risk analysis and secure trading solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.url)}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} SPL Shield. All rights reserved.
            </div>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the Solana community</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => handleExternalRedirect('https://app.splshield.com')}
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;