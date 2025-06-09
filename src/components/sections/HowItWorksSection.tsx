
import React, { useEffect, useRef, useState } from 'react';
import { SatelliteDish, Brain, Zap, Link2 } from 'lucide-react';

const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: 1,
      title: 'Data Collection',
      description: 'Environmental sensors monitor rainfall, soil moisture, and weather patterns',
      icon: <SatelliteDish className="w-8 h-8" />
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'MorphBrain analyzes data and predicts optimal infrastructure configuration',
      icon: <Brain className="w-8 h-8" />
    },
    {
      number: 3,
      title: 'Material Activation',
      description: 'Smart materials receive signals and begin physical transformation',
      icon: <Zap className="w-8 h-8" />
    },
    {
      number: 4,
      title: 'Coordinated Response',
      description: 'Mesh-connected units coordinate for regional disaster response',
      icon: <Link2 className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepElements = sectionRef.current?.querySelectorAll('.step-item');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-bg-card via-bg-dark to-bg-card">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">How AquaMorph Works</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From sensor data to infrastructure transformation in minutes
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue via-secondary-cyan to-accent-teal transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className={`step-item relative ${visibleSteps.includes(index) ? 'animate-fade-in' : 'opacity-0'}`}>
                {/* Step Card */}
                <div className="relative bg-bg-card border border-border-color/30 rounded-2xl p-8 group w-full max-w-[320px] h-[320px] mx-auto flex flex-col transition-all duration-300 hover:shadow-md">
                  {/* Step Number Circle */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 lg:relative lg:top-0 lg:left-0 lg:transform-none lg:mb-4">
                    <div className="w-12 h-12 bg-water-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col h-full items-center text-center">
                    <div className="w-16 h-16 bg-water-gradient/10 rounded-full flex items-center justify-center mb-6">
                      <div className="text-3xl text-primary-blue">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-text-secondary leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                </div>

                {/* Arrow for large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-bg-dark border-2 border-primary-blue rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 glassmorphism rounded-xl">
            <div className="text-3xl font-bold gradient-text mb-2">2-5 min</div>
            <div className="text-text-secondary">Response Time</div>
          </div>
          <div className="text-center p-6 glassmorphism rounded-xl">
            <div className="text-3xl font-bold gradient-text mb-2">99.7%</div>
            <div className="text-text-secondary">Prediction Accuracy</div>
          </div>
          <div className="text-center p-6 glassmorphism rounded-xl">
            <div className="text-3xl font-bold gradient-text mb-2">48 hrs</div>
            <div className="text-text-secondary">Advance Warning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
