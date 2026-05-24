import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: 'Interior Ministry', href: '#' },
      { label: 'Health Ministry', href: '#' },
      { label: 'Education Ministry', href: '#' },
      { label: 'View All Services', href: '/services' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Status Page', href: '#' },
    ],
    Company: [
      { label: 'About Sheba', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-primary-500 dark:bg-primary-900 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ш</span>
              </div>
              <span className="font-bold text-xl">Sheba</span>
            </div>
            <p className="text-white/80 text-sm mb-6">
              A unified gateway connecting citizens with government services through secure digital identity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-white/10 mt-12 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-accent-400 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm">Email Support</p>
                <p className="font-semibold">support@sheba.gov</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-accent-400 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm">Call Center</p>
                <p className="font-semibold">+971 123 456 789</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-accent-400 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm">Main Office</p>
                <p className="font-semibold">Downtown, National City</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-primary-600 dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} National Digital Government Platform. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
