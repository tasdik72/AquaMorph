import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Settings, Zap } from 'lucide-react';

const GetStartedSection = () => {
  return (
    <section id="get-started" className="section-padding bg-gradient-to-br from-bg-card via-bg-dark to-bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Get Started with AquaMorph</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Transform your infrastructure with our adaptive water management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-primary-blue/50 transition-all hover:shadow-lg hover:shadow-primary-blue/10">
            <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-primary-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
            <p className="text-text-secondary">
              Live sensor data processing and visualization
            </p>
          </Card>

          {/* Card 2 */}
          <Card className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-secondary-cyan/50 transition-all hover:shadow-lg hover:shadow-secondary-cyan/10">
            <div className="w-12 h-12 rounded-xl bg-secondary-cyan/10 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-secondary-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Controls</h3>
            <p className="text-text-secondary">
              Manual override and scenario simulation
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="bg-bg-card border border-border-color rounded-xl p-6 hover:border-status-warning/50 transition-all hover:shadow-lg hover:shadow-status-warning/10">
            <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-status-warning" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Response</h3>
            <p className="text-text-secondary">
              Sub-second building adaptation
            </p>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="glassmorphism p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">Ready to Transform Your Infrastructure?</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Experience the future of intelligent infrastructure management with our cutting-edge solutions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
              <Button className="relative overflow-hidden group flex-1 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="relative z-10">Watch Full Demo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button className="relative overflow-hidden group flex-1 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="relative z-10">Check Demo by Yourself</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button className="relative overflow-hidden group flex-1 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="relative z-10">Download Presentation</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
