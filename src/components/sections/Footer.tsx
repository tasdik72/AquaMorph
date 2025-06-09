import React from 'react';
import { Facebook, Youtube, Linkedin, Mail, Phone, MapPin, X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
  }
}

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/aquamorph.2025", label: "Facebook" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@aquamorph.2025", label: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/aquamorph/", label: "LinkedIn" },
    { icon: <X className="w-5 h-5" />, href: "https://x.com/aquamorph2025", label: "X (Twitter)" }
  ];

  const productLinks = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Impact", href: "/#impact" },
    { name: "Demo", href: "/demo" }
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Legal", href: "/legal" }
  ];

  return (
    <footer className="bg-bg-dark border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                <img 
                  src="/aquamorph-logo.svg" 
                  alt="AquaMorph Logo" 
                  className="w-full h-full"
                  width="64"
                  height="64"
                />
              </div>
              <h3 className="text-3xl font-bold gradient-text">AquaMorph</h3>
            </div>
            <p className="text-text-secondary text-sm">
              AI-Controlled Shape-Shifting Infrastructure for Water Disasters
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-text-secondary hover:text-primary-blue transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="group">
                <a 
                  href="mailto:aquamorph.info@gmail.com"
                  className="flex items-center space-x-2 text-text-secondary hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">aquamorph.info@gmail.com</span>
                </a>
              </div>
              <div className="flex items-start space-x-2 text-text-secondary">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-color">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © 2025 AquaMorph. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="/legal" className="text-text-secondary hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/legal" className="text-text-secondary hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/legal" className="text-text-secondary hover:text-white text-sm transition-colors duration-300">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
