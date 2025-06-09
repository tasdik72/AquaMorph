
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import InfrastructureVisualization from '@/components/3d/InfrastructureVisualization';

const HeroSection = () => {
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particleContainerRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'water-particle';
      particle.style.left = '-10px';
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      
      particleContainerRef.current.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Particles */}
      <div 
        ref={particleContainerRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-card to-bg-dark opacity-90" />
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="gradient-text">AquaMorph</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-text-secondary leading-snug">
                AI-Controlled Shape-Shifting Infrastructure for Water Disasters
              </h2>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Adaptive infrastructure that physically transforms to protect against floods and 
              optimize for droughts using AI-powered memory materials.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="water-button text-lg px-8 py-4"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Watch Demo
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white text-lg px-8 py-4 transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-color">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">85%</div>
                <div className="text-sm text-text-secondary">Flood Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">40%</div>
                <div className="text-sm text-text-secondary">Water Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100+</div>
                <div className="text-sm text-text-secondary">Modules</div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Visualization */}
          <div className="relative h-80 sm:h-96 lg:h-[500px] mt-8 lg:mt-0 animate-fade-in animation-delay-300">
            <div className="absolute inset-0 glassmorphism rounded-2xl overflow-hidden animate-pulse-glow">
              <InfrastructureVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
