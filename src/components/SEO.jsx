import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "SPL Shield - Complete Solana Security Ecosystem",
  description = "Advanced AI-powered token scanning, risk analysis, and secure trading for Solana DeFi. Protect your investments with SPL Shield's comprehensive security suite.",
  keywords = "solana security, defi protection, token scanner, risk analysis, crypto safety, spl token, blockchain security, TDL token",
  canonical,
  image = "https://splshield.com/og-image.png",
  type = "website",
  author = "SPL Shield Team",
  publishedTime,
  modifiedTime
}) => {
  const siteUrl = "https://splshield.com";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SPL Shield" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@splshield" />
      <meta name="twitter:creator" content="@splshield" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta property="article:author" content={author} />
      <meta property="article:section" content="Technology" />
      <meta property="article:tag" content="Solana" />
      <meta property="article:tag" content="DeFi" />
      <meta property="article:tag" content="Security" />
      <meta property="article:tag" content="Blockchain" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="msapplication-TileColor" content="#22c55e" />
      <meta name="application-name" content="SPL Shield" />
      <meta name="apple-mobile-web-app-title" content="SPL Shield" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SPL Shield",
          "description": description,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "sameAs": [
            "https://x.com/splshield",
            "https://www.facebook.com/splshield",
            "https://www.instagram.com/splshield",
            "https://t.me/splshield"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@splshield.com",
            "contactType": "Customer Support"
          },
          "founder": {
            "@type": "Organization",
            "name": "SPL Shield Team"
          }
        })}
      </script>
      
      {/* Structured Data - Software Application */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SPL Shield Scanner",
          "description": "AI-powered security scanning for Solana tokens and wallets",
          "url": "https://app.splshield.com",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "SPL Shield"
          }
        })}
      </script>
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SPL Shield",
          "description": description,
          "url": siteUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://app.splshield.com/scan?token={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
