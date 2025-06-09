
import React, { useEffect, useState, useRef } from 'react';
import { Shield, Droplet, Zap, Link2, Leaf, Fish, AlertTriangle, Construction, DollarSign, Wrench, TrendingUp, Users, Building2 } from 'lucide-react';

const ImpactSection = () => {
  const [counters, setCounters] = useState({ floodReduction: 0, waterSaved: 0, responseTime: 0, modules: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetValues = {
    floodReduction: 85,
    waterSaved: 40,
    responseTime: 100,
    modules: 100
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Animate counters
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setCounters({
              floodReduction: Math.round(targetValues.floodReduction * progress),
              waterSaved: Math.round(targetValues.waterSaved * progress),
              responseTime: Math.round(targetValues.responseTime * progress),
              modules: Math.round(targetValues.modules * progress)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, stepTime);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const impactStats = [
    {
      value: counters.floodReduction,
      suffix: '%',
      label: 'Flood Damage Reduction',
      description: 'Reduced infrastructure damage and property loss',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-status-success'
    },
    {
      value: counters.waterSaved,
      suffix: '%',
      label: 'Water Loss Prevention',
      description: 'Improved water conservation during droughts',
      icon: <Droplet className="w-5 h-5" />,
      color: 'text-secondary-cyan'
    },
    {
      value: counters.responseTime,
      suffix: '',
      label: 'Real-time Response',
      description: 'Immediate AI-powered infrastructure adaptation',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-status-warning'
    },
    {
      value: counters.modules,
      suffix: '+',
      label: 'Connected Modules',
      description: 'Scalable mesh network infrastructure',
      icon: <Link2 className="w-5 h-5" />,
      color: 'text-accent-teal'
    }
  ];

  const environmentalBenefits = [
    { title: 'Carbon Footprint Reduction', value: '30%', icon: <Leaf className="w-5 h-5" /> },
    { title: 'Ecosystem Protection', value: '95%', icon: <Fish className="w-5 h-5" /> },
    { title: 'Emergency Response Improvement', value: '200%', icon: <AlertTriangle className="w-5 h-5" /> },
    { title: 'Infrastructure Lifespan', value: '+50%', icon: <Construction className="w-5 h-5" /> }
  ];

  const economicImpact = [
    { title: 'Infrastructure Cost Savings', value: '$2.5B', icon: <DollarSign className="w-5 h-5" /> },
    { title: 'Maintenance Reduction', value: '60%', icon: <Wrench className="w-5 h-5" /> },
    { title: 'ROI Timeline', value: '3 years', icon: <TrendingUp className="w-5 h-5" /> },
    { title: 'Job Creation', value: '15K+', icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <section id="impact" className="section-padding bg-gradient-to-br from-bg-dark via-bg-card to-bg-dark" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Real World Impact</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Measurable results that protect communities and preserve resources
          </p>
        </div>

        {/* Main Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-bg-card border border-border-color rounded-2xl p-8 text-center card-hover group relative overflow-hidden">
              <div className="absolute inset-0 bg-water-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${stat.color} transition-all duration-300`}>
                  {stat.value}{stat.suffix}
                </div>
                
                <div className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-water-gradient transition-all duration-300">
                  {stat.label}
                </div>
                
                <div className="text-sm text-text-secondary leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Impact Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Environmental Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text text-center lg:text-left">Environmental Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {environmentalBenefits.map((benefit, index) => (
                <div key={index} className="glassmorphism p-6 rounded-xl card-hover group h-[120px]">  {/* Added fixed height */}
                  <div className="flex items-center space-x-4 h-full">
                    <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300 text-status-success">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-status-success">{benefit.value}</div>
                      <div className="text-sm text-text-secondary">{benefit.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Impact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text text-center lg:text-left">Economic Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {economicImpact.map((impact, index) => (
                <div key={index} className="glassmorphism p-6 rounded-xl card-hover group h-[120px]">  {/* Added fixed height */}
                  <div className="flex items-center space-x-4 h-full">
                    <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300 text-status-warning">
                      {impact.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-status-warning">{impact.value}</div>
                      <div className="text-sm text-text-secondary">{impact.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
