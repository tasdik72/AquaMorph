
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold gradient-text mb-4">Legal Information</h1>
            <p className="text-text-secondary">Privacy Policy, Terms of Service, and Cookie Policy</p>
          </div>

          <div className="space-y-12">
            {/* Privacy Policy */}
            <Card className="bg-bg-card border-border-color">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    At AquaMorph, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
                  </p>
                  <h3 className="text-lg font-semibold text-white">Information We Collect</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact information (name, email address) when you subscribe to our newsletter</li>
                    <li>Usage data and analytics to improve our website performance</li>
                    <li>Technical information such as IP address, browser type, and device information</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-white">How We Use Your Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and improve our services</li>
                    <li>To send you updates about AquaMorph developments</li>
                    <li>To analyze website usage and optimize user experience</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-white">Data Protection</h3>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms of Service */}
            <Card className="bg-bg-card border-border-color">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Terms of Service</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    By accessing and using the AquaMorph website, you agree to comply with and be bound by the following terms and conditions.
                  </p>
                  <h3 className="text-lg font-semibold text-white">Acceptable Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the website only for lawful purposes</li>
                    <li>Do not attempt to gain unauthorized access to our systems</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-white">Intellectual Property</h3>
                  <p>
                    All content on this website, including text, graphics, logos, and software, is the property of AquaMorph and is protected by copyright and other intellectual property laws.
                  </p>
                  <h3 className="text-lg font-semibold text-white">Limitation of Liability</h3>
                  <p>
                    AquaMorph shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Policy */}
            <Card className="bg-bg-card border-border-color">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Cookie Policy</h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    This website uses cookies to enhance your browsing experience and provide personalized content.
                  </p>
                  <h3 className="text-lg font-semibold text-white">Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-white">Managing Cookies</h3>
                  <p>
                    You can control and delete cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
                  </p>
                  <h3 className="text-lg font-semibold text-white">Third-Party Cookies</h3>
                  <p>
                    We may use third-party services that set cookies, such as Google Analytics for website analytics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
