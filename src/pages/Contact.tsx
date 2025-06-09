
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Facebook, Youtube, Linkedin, X } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8 text-primary-blue" />,
      title: "Email Us",
      content: (
        <a 
          href="mailto:aquamorph.info@gmail.com" 
          className="text-text-secondary hover:text-white transition-colors duration-300"
        >
          aquamorph.info@gmail.com
        </a>
      )
    },
    {
      icon: <MapPin className="w-8 h-8 text-secondary-cyan" />,
      title: "Our Location",
      content: "Dhaka, Bangladesh"
    },
    {
      icon: (
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/aquamorph.2025" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#1877F2] transition-colors">
            <Facebook className="w-8 h-8" />
          </a>
          <a href="https://www.youtube.com/@aquamorph.2025" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#FF0000] transition-colors">
            <Youtube className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/aquamorph/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#0A66C2] transition-colors">
            <Linkedin className="w-8 h-8" />
          </a>
          <a href="https://x.com/aquamorph2025" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-black transition-colors">
            <X className="w-8 h-8" />
          </a>
        </div>
      ),
      title: "Connect With Us"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">Get In Touch</h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Reach out to us for inquiries, collaborations, or just to say hello. We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactInfo.map((item, index) => (
              <Card key={index} className="bg-bg-card border-border-color hover:border-primary-blue/30 transition-all duration-300 h-full">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <div className="text-text-secondary mt-auto">
                    {item.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
