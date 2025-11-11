import React, { useState } from 'react';
import {
  Mail,
  Send,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { TELEGRAM_URL, DISCORD_URL } from '../config/communityLinks';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const formatCommunityHandle = (url) => url.replace(/^https?:\/\//, '');

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get in touch with our team',
      contact: 'support@splshield.com',
      action: 'Send Email',
      href: 'mailto:support@splshield.com'
    },
    {
      icon: Send,
      title: 'Telegram Community',
      description: 'Chat with our moderators in real-time',
      contact: formatCommunityHandle(TELEGRAM_URL),
      action: 'Join Telegram',
      href: TELEGRAM_URL
    },
    {
      icon: MessageCircle,
      title: 'Discord Server',
      description: 'Collaborate with builders & get product updates',
      contact: formatCommunityHandle(DISCORD_URL),
      action: 'Join Discord',
      href: DISCORD_URL
    },
    {
      icon: Twitter,
      title: 'X (Twitter)',
      description: 'Follow product updates & announcements',
      contact: '@splshield',
      action: 'Visit X Profile',
      href: 'https://x.com/splshield'
    }
  ];

  const socialLinks = [
    { icon: Twitter, name: 'X (Twitter)', url: 'https://x.com/splshield' },
    { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/splshield' },
    { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/splshield' },
    { icon: MessageCircle, name: 'Discord', url: DISCORD_URL },
    { icon: Send, name: 'Telegram', url: TELEGRAM_URL }
  ];

  const handleExternalLink = (href) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Get in <span className="text-gradient-spl">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our security tools or want to contribute to the project? 
            We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="heading-sm mb-6 text-gray-900 dark:text-white">
              Send us a Message
            </h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div>
              <h3 className="heading-sm mb-6 text-gray-900 dark:text-white">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExternalLink(method.href)}
                    className="card p-6 group hover:shadow-glow-green transition-all duration-300 text-left w-full"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                        <method.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {method.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                            {method.contact}
                          </span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="heading-sm mb-6 text-gray-900 dark:text-white">
                Follow Our Updates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExternalLink(social.url)}
                    className="card p-4 group hover:shadow-glow-green transition-all duration-300 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <social.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {social.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Community Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">8.5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Scans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
