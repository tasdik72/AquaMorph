
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Zap, Brain, Shield, Gauge, Network } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary-blue" />,
      title: "Flood Mode Adaptation",
      description: "Structures rise and redirect water flow autonomously when flood risk exceeds 70%",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Droplets className="w-12 h-12 text-orange-400" />,
      title: "Drought Conservation", 
      description: "Pipes contract to preserve pressure and reduce water loss during dry periods",
      gradient: "from-orange-500 to-yellow-400"
    },
    {
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      title: "MorphBrain AI",
      description: "Real-time sensor data analysis for coordinated infrastructure response",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: <Zap className="w-12 h-12 text-green-400" />,
      title: "Instant Response",
      description: "Sub-second infrastructure adaptation powered by smart materials",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <Gauge className="w-12 h-12 text-red-400" />,
      title: "Predictive Analytics",
      description: "Advanced weather prediction and risk assessment algorithms",
      gradient: "from-red-500 to-pink-400"
    },
    {
      icon: <Network className="w-12 h-12 text-teal-400" />,
      title: "Mesh Network",
      description: "Interconnected modules for coordinated regional disaster response",
      gradient: "from-teal-500 to-cyan-400"
    }
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-bg-dark via-bg-card to-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Revolutionary Features</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Advanced AI-controlled infrastructure that adapts to any water-related disaster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-bg-card border-border-color card-hover group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-bg-dark border border-border-color group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
