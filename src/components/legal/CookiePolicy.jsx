import React, { useState } from 'react';
import { Cookie, Settings, BarChart3, Shield, Globe, ArrowLeft, ToggleLeft, ToggleRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiePolicy = () => {
  const navigate = useNavigate();
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always enabled
    analytics: true,
    marketing: false,
    functional: true
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: Shield,
      required: true,
      description: 'These cookies are necessary for the website to function properly and cannot be disabled.',
      examples: [
        'User authentication and session management',
        'Security and fraud prevention',
        'Website functionality and navigation',
        'Dark/light mode preferences'
      ],
      duration: 'Session or 1 year',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: BarChart3,
      required: false,
      description: 'Help us understand how users interact with our website to improve our services.',
      examples: [
        'Page views and user behavior tracking',
        'Performance monitoring and optimization',
        'Error tracking and debugging',
        'Usage statistics and reporting'
      ],
      duration: '2 years',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: Settings,
      required: false,
      description: 'Enable enhanced functionality and personalization features.',
      examples: [
        'Language and region preferences',
        'Customized user interface settings',
        'Saved filters and search preferences',
        'Accessibility features'
      ],
      duration: '1 year',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Globe,
      required: false,
      description: 'Used to deliver relevant advertisements and measure campaign effectiveness.',
      examples: [
        'Personalized advertisements',
        'Social media integration',
        'Campaign tracking and attribution',
        'Retargeting and remarketing'
      ],
      duration: '30 days to 2 years',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const handleToggle = (cookieType) => {
    if (cookieType === 'essential') return; // Cannot disable essential cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save the preferences
    localStorage.setItem('spl-shield-cookie-preferences', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved successfully!');
  };

  const acceptAll = () => {
    const newSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setCookieSettings(newSettings);
    localStorage.setItem('spl-shield-cookie-preferences', JSON.stringify(newSettings));
    alert('All cookies accepted!');
  };

  const thirdPartyServices = [
    { name: 'Google Analytics', purpose: 'Website analytics and performance monitoring', category: 'Analytics' },
    { name: 'Cloudflare', purpose: 'Security and performance optimization', category: 'Essential' },
    { name: 'PostHog', purpose: 'User behavior analytics and feature usage', category: 'Analytics' },
    { name: 'Discord Widget', purpose: 'Community integration and support', category: 'Functional' }
  ];

  const lastUpdated = 'December 15, 2024';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface pt-20">
      <div className="container-custom py-12">
        
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-spl-gradient rounded-xl flex items-center justify-center shadow-glow-green">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="heading-lg text-gray-900 dark:text-white">Cookie Policy</h1>
              <p className="text-gray-600 dark:text-gray-400">SPL Shield - Cookie Usage</p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This Cookie Policy explains how SPL Shield uses cookies and similar technologies to recognize you when you visit our website. 
              It explains what these technologies are, why we use them, and your rights to control our use of them.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {lastUpdated}
            </div>
          </div>
        </div>

        {/* What are Cookies */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-8">
            <h2 className="heading-sm text-gray-900 dark:text-white mb-4">What are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              They are widely used by website owners to make their websites work more efficiently and to provide reporting information.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use both first-party cookies (set by SPL Shield) and third-party cookies (set by other services we use) 
              to enhance your browsing experience, analyze website traffic, and deliver personalized content.
            </p>
          </div>
        </div>

        {/* Cookie Management */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm text-gray-900 dark:text-white">Manage Your Cookie Preferences</h2>
              <div className="flex space-x-3">
                <button
                  onClick={acceptAll}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Accept All
                </button>
                <button
                  onClick={savePreferences}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {cookieTypes.map((type) => (
                <div key={type.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <type.icon className={`w-6 h-6 ${type.color}`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
                        {type.required && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">Required</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(type.id)}
                      disabled={type.required}
                      className={`transition-colors ${
                        type.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                      }`}
                    >
                      {cookieSettings[type.id] ? (
                        <ToggleRight className="w-8 h-8 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {type.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-300 text-sm flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Duration:</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{type.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-8">
            <h2 className="heading-sm text-gray-900 dark:text-white mb-6">Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We use various third-party services that may set cookies on your device. Below are the main services we use:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {thirdPartyServices.map((service, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.category === 'Essential' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      service.category === 'Analytics' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{service.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Browser Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Browser Cookie Controls</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Most web browsers allow you to control cookies through their settings. You can usually find these options in the 
              'Settings' or 'Preferences' menu of your browser.
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Block all cookies</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Block third-party cookies only</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Delete cookies when closing browser</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Get notifications before cookies are set</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <p><strong>Email:</strong> privacy@splshield.com</p>
              <p><strong>Subject:</strong> Cookie Policy Inquiry</p>
              <p><strong>Response Time:</strong> Within 72 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;