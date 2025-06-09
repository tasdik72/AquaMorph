
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ImpactSection from '@/components/sections/ImpactSection';
import DemoSection from '@/components/sections/DemoSection';
import GetStartedSection from '@/components/sections/GetStartedSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ImpactSection />
        <DemoSection />
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
