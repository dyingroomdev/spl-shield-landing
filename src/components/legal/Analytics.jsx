import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

// Track page views
const trackPageView = (path, title) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title
  });
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, {
    event_category: parameters.category || 'engagement',
    event_label: parameters.label || '',
    value: parameters.value || 0,
    ...parameters
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    category: 'user_interaction',
    label: buttonName,
    button_location: location
  });
};

// Track external link clicks
export const trackExternalLink = (url, linkText = '') => {
  trackEvent('external_link_click', {
    category: 'outbound_link',
    label: linkText,
    external_url: url
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submission', {
    category: 'form_interaction',
    label: formName,
    submission_success: success
  });
};

// Track legal page views
export const trackLegalPageView = (pageName) => {
  trackEvent('legal_page_view', {
    category: 'compliance',
    label: pageName
  });
};

// Track tokenomics interactions
export const trackTokenomicsInteraction = (action, section = '') => {
  trackEvent('tokenomics_interaction', {
    category: 'product_engagement',
    label: action,
    section: section
  });
};

// Track roadmap interactions
export const trackRoadmapInteraction = (quarter, action = 'view') => {
  trackEvent('roadmap_interaction', {
    category: 'product_engagement',
    label: `${quarter}_${action}`,
    roadmap_quarter: quarter
  });
};

// Main Analytics Component
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on component mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    const pageTitle = document.title;
    const pagePath = location.pathname + location.search;
    
    trackPageView(pagePath, pageTitle);
    
    // Track specific page types
    if (location.pathname.includes('/privacy-policy')) {
      trackLegalPageView('Privacy Policy');
    } else if (location.pathname.includes('/terms-of-service')) {
      trackLegalPageView('Terms of Service');
    } else if (location.pathname.includes('/cookie-policy')) {
      trackLegalPageView('Cookie Policy');
    } else if (location.pathname.includes('/disclaimer')) {
      trackLegalPageView('Disclaimer');
    }
  }, [location]);

  // Track user engagement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track milestone scroll percentages
      if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
        trackEvent('scroll_depth', {
          category: 'user_engagement',
          label: `${scrollPercent}%`,
          scroll_depth: scrollPercent
        });
      }
    };

    const handleTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - window.pageLoadTime) / 1000);
      
      // Track time milestones (30s, 60s, 2min, 5min)
      if ([30, 60, 120, 300].includes(timeSpent)) {
        trackEvent('time_on_page', {
          category: 'user_engagement',
          label: `${timeSpent}s`,
          time_spent: timeSpent
        });
      }
    };

    // Set page load time
    window.pageLoadTime = Date.now();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Track time on page
    const timeTracker = setInterval(handleTimeOnPage, 30000); // Check every 30s
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeTracker);
    };
  }, [location]);

  return null; // This component doesn't render anything
};

// Hook for easy analytics access
export const useAnalytics = () => {
  return {
    trackEvent,
    trackButtonClick,
    trackExternalLink,
    trackFormSubmission,
    trackLegalPageView,
    trackTokenomicsInteraction,
    trackRoadmapInteraction
  };
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        trackEvent('core_web_vitals', {
          category: 'performance',
          label: 'LCP',
          value: Math.round(entry.startTime)
        });
      }
      
      if (entry.entryType === 'first-input') {
        trackEvent('core_web_vitals', {
          category: 'performance',
          label: 'FID',
          value: Math.round(entry.processingStart - entry.startTime)
        });
      }
      
      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        trackEvent('core_web_vitals', {
          category: 'performance',
          label: 'CLS',
          value: Math.round(entry.value * 1000)
        });
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Browser doesn't support these metrics
    console.log('Performance metrics not supported');
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  trackEvent('javascript_error', {
    category: 'error',
    label: error.message || 'Unknown error',
    error_stack: error.stack || '',
    error_component: errorInfo.componentStack || '',
    fatal: errorInfo.fatal || false
  });
};

export default Analytics;