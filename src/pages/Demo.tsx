
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import DemoSection from '@/components/sections/DemoSection';

const Demo = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <DemoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
