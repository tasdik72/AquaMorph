import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SensorDashboard from '@/components/demo/SensorDashboard';
import InfrastructureVisualization from '@/components/3d/InfrastructureVisualization';
import { BarChart3, Zap, Settings, Droplets, CloudRain, Sun, CheckCircle, Thermometer, Gauge, Waves, GitFork, Wind, Monitor, Activity, BatteryCharging, Shield, Route, Lightbulb, Power, Lock, Home, Brain, Link, Leaf, Sunset, Blinds, Recycle, Sprout, Users, Cloud } from 'lucide-react';

const DemoSection = () => {
  const [activeScenario, setActiveScenario] = useState<'normal' | 'flood' | 'drought' | 'emergency'>('normal');
  const [isEmergencyStopActive, setIsEmergencyStopActive] = useState(false);
  const [sensorData, setSensorData] = useState({
    rainfall: 15,
    temperature: 22,
    soilMoisture: 65,
    waterFlow: 45,
    pressure: 2.3,
    riskLevel: 25
  });

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => {
        const baseRainfall = activeScenario === 'flood' ? 80 : activeScenario === 'drought' ? 2 : 15;
        const baseTemperature = activeScenario === 'drought' ? 35 : activeScenario === 'flood' ? 18 : 22;
        const baseMoisture = activeScenario === 'drought' ? 20 : activeScenario === 'flood' ? 90 : 65;
        
        return {
          rainfall: Math.max(0, baseRainfall + (Math.random() - 0.5) * 10),
          temperature: baseTemperature + (Math.random() - 0.5) * 3,
          soilMoisture: Math.max(0, Math.min(100, baseMoisture + (Math.random() - 0.5) * 15)),
          waterFlow: Math.max(0, (baseRainfall * 2) + (Math.random() - 0.5) * 20),
          pressure: Math.max(0, 2.3 + (Math.random() - 0.5) * 0.5),
          riskLevel: activeScenario === 'flood' ? 85 : activeScenario === 'drought' ? 60 : 25
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeScenario]);

  const scenarios = [
    { 
      id: 'normal' as const, 
      name: 'Normal Operations', 
      color: 'bg-status-success', 
      description: 'Standard monitoring',
      icon: <Droplets className="h-6 w-6" />,
      details: {
        title: "Normal Monitoring Mode: Adaptive Readiness",
        subtitle: "Passive observation. Active preparation.",
        mainDescription: "In Normal Mode, AquaMorph remains in its baseline structural state. The environment poses no immediate threat, so no morphing is activated.",
        sections: [
          {
            title: "Key Monitoring & Readiness",
            items: [
              { text: "Environmental sensors continuously track key variables: Rainfall (10–20 mm/hr), Temperature (20–28 °C), Soil Moisture (40–60%), Water Flow (10–30 L/s)", icon: <Gauge className="w-5 h-5" /> },
              { text: "The AI control center, MorphBrain, stays alert — processing data every 3 seconds to detect potential anomalies.", icon: <Brain className="w-5 h-5" /> },
              { text: "Internal actuators and the morphing frame remain idle but powered, ready to respond instantly.", icon: <Settings className="w-5 h-5" /> },
              { text: "Pipes and underground drainage are closed off to conserve energy.", icon: <GitFork className="w-5 h-5" /> },
              { text: "External surface vents are passively opened to ensure ventilation.", icon: <Wind className="w-5 h-5" /> }
            ]
          },
          {
            title: "Unique Highlights",
            items: [
              { text: "Real-time status dashboard remains green.", icon: <Monitor className="w-5 h-5" /> },
              { text: "Auto-diagnostics run every 60s to test morph hardware silently.", icon: <Activity className="w-5 h-5" /> },
              { text: "Low-energy mode saves up to 80% power compared to active states.", icon: <BatteryCharging className="w-5 h-5" /> }
            ]
          }
        ]
      }
    },
    { 
      id: 'flood' as const, 
      name: 'Flood Emergency', 
      color: 'bg-primary-blue', 
      description: 'Flood protection active',
      icon: <CloudRain className="h-6 w-6" />,
      details: {
        title: "Flood Response Mode: Smart Elevation & Drainage",
        subtitle: "Water rises — AquaMorph rises faster.",
        mainDescription: "Triggered when rainfall exceeds 80 mm/hr and water flow reaches over 250 L/s, AquaMorph enters emergency Flood Mode.",
        sections: [
          {
            title: "Adaptive Strategies",
            items: [
              { text: "The entire building lifts up to 1.5 meters using hydraulic actuators to prevent base submersion.", icon: <Home className="w-5 h-5" /> },
              { text: "Ground-level flood sensors deploy secondary drainage tunnels.", icon: <Route className="w-5 h-5" /> },
              { text: "Overflow water is redirected using an intelligent pump system toward surrounding bio-swales or emergency reservoirs.", icon: <Waves className="w-5 h-5" /> },
              { text: "Doors and vent seals activate automatically to prevent water ingress.", icon: <Shield className="w-5 h-5" /> },
              { text: "Warning strobes on the base illuminate red to alert nearby personnel.", icon: <Lightbulb className="w-5 h-5" /> }
            ]
          },
          {
            title: "Emergency Mechanisms",
            items: [
              { text: "Water-level sensors sync with city flood APIs to anticipate urban overflows.", icon: <Cloud className="w-5 h-5" /> },
              { text: "MorphBrain enters \"Hydraulic Priority Mode\" — pausing non-essential systems.", icon: <Brain className="w-5 h-5" /> },
              { text: "Communication uplink sends data to central monitoring for regional flood mapping.", icon: <Link className="w-5 h-5" /> },
              { text: "Building switches to internal power grid for isolation.", icon: <Power className="w-5 h-5" /> },
              { text: "AI executes redundancy checks to prevent hydraulic lock.", icon: <Lock className="w-5 h-5" /> }
            ]
          }
        ]
      }
    },
    { 
      id: 'drought' as const, 
      name: 'Drought Mode', 
      color: 'bg-status-warning', 
      description: 'Water conservation',
      icon: <Sun className="h-6 w-6" />,
      details: {
        title: "Drought Adaptation Mode: Survival Engineering",
        subtitle: "Where there's no rain, AquaMorph innovates.",
        mainDescription: "The building activates its underground water extraction system and deploys passive cooling features.",
        sections: [
          {
            title: "Smart Features",
            items: [
              { text: "Rooftop misting nozzles spray fine water vapor to cool down the surroundings.", icon: <Droplets className="w-5 h-5" /> },
              { text: "Solar-reflective panels unfold or rotate to reduce heat absorption.", icon: <Sunset className="w-5 h-5" /> },
              { text: "Internal humidity chambers maintain air moisture.", icon: <Thermometer className="w-5 h-5" /> },
              { text: "Ground-level vents open to pull cooler underground air upwards.", icon: <Wind className="w-5 h-5" /> }
            ]
          },
          {
            title: "Water Conservation & AI Behavior",
            items: [
              { text: "These are slow, steady physical actions — not as dramatic as lifting, but essential for survival in extreme heat.", icon: <Sprout className="w-5 h-5" /> },
              { text: "Water reclamation from indoor systems (e.g., HVAC condensate) boosts internal supply.", icon: <Recycle className="w-5 h-5" /> },
              { text: "Soil regeneration sequence initiates: minerals stored in sub-tanks mix into irrigation.", icon: <Sprout className="w-5 h-5" /> },
              { text: "MorphBrain enters \"Sustainability Mode,\" balancing water usage with internal temperature and soil readings.", icon: <Brain className="w-5 h-5" /> },
              { text: "Periodic alerts advise human occupants on conservation strategies.", icon: <Users className="w-5 h-5" /> }
            ]
          }
        ]
      }
    },
    {
      id: 'emergency' as const,
      name: 'Emergency Halt',
      color: 'bg-status-danger',
      description: 'System operations halted',
      icon: <Zap className="h-6 w-6" />,
      details: {
        title: "Emergency System Halt: All Operations Suspended",
        subtitle: "Immediate shutdown for critical safety.",
        mainDescription: "Manual override initiated. All system operations are halted to ensure safety and prevent further damage. Controls are disabled.",
        sections: [
          {
            title: "Halt Status",
            items: [
              { text: "All adaptive systems are deactivated.", icon: <Lock className="w-5 h-5" /> },
              { text: "Sensor data is static, reflecting the moment of halt.", icon: <BarChart3 className="w-5 h-5" /> },
              { text: "External communications are maintained for reporting.", icon: <Link className="w-5 h-5" /> }
            ]
          }
        ]
      }
    }
  ];

  const currentScenarioDetails = scenarios.find(s => s.id === activeScenario)?.details;

  return (
    <section id="demo" className="section-padding bg-gradient-to-br from-bg-card via-bg-dark to-bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Interactive Building Demo</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Watch how AquaMorph transforms buildings in real-time to handle water disasters
          </p>
        </div>

        {/* Demo Interface */}
        <div className="bg-bg-card border-2 border-primary-blue rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow">
          {/* Control Panel Header */}
          <div className="bg-bg-dark border-b border-border-color p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Building Control System</h3>
                <p className="text-text-secondary">Real-time adaptive infrastructure management</p>
              </div>
              
              {/* Scenario Selector */}
              <div className="flex flex-wrap gap-3">
                {scenarios.filter(s => s.id !== 'emergency').map((scenario) => (
                  <Button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`${
                      activeScenario === scenario.id
                        ? `${scenario.color} text-white`
                        : 'bg-bg-card border border-border-color text-text-secondary hover:text-white'
                    } transition-all duration-300`}
                  >
                    <span className="flex items-center gap-2">
                      {scenario.icon}
                      {scenario.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Demo Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Control Panel - Left Side */}
            <div className="lg:col-span-1 bg-bg-dark border-r border-border-color">
              <SensorDashboard 
                sensorData={sensorData} 
                activeScenario={activeScenario}
                setActiveScenario={setActiveScenario}
                setSensorData={setSensorData}
                isEmergencyStopActive={isEmergencyStopActive}
                setIsEmergencyStopActive={setIsEmergencyStopActive}
              />
            </div>

            {/* Building Visualization - Right Side */}
            <div className="lg:col-span-2 bg-bg-card flex flex-col">
              <div className="flex-grow flex items-center justify-center p-6 h-[550px]">
                <InfrastructureVisualization 
                  currentState={activeScenario} 
                  sensorData={{
                    rainfall: `${sensorData.rainfall} mm/hr`,
                    temp: `${sensorData.temperature.toFixed(1)} °C`,
                    soilMoisture: `${sensorData.soilMoisture.toFixed(0)}%`,
                    waterFlow: `${sensorData.waterFlow.toFixed(1)} L/s`,
                  }}
                  isEmergencyStopActive={isEmergencyStopActive}
                />
              </div>
              
              {/* AquaMorph Demo Description Panel */}
              <div className="w-full p-6 bg-bg-dark rounded-b-xl text-white border-t border-border-color">
                <h3 className="text-xl font-bold mb-3 text-primary-blue">AquaMorph Demo Description Panel</h3>
                {currentScenarioDetails && (
                  <div className="space-y-6">
                    {currentScenarioDetails.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-4">
                        <h5 className="text-xl font-semibold text-white border-b border-border-color/50 pb-2">{section.title}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {section.items.map((item, itemIndex) => (
                            <Card 
                              key={itemIndex} 
                              className="bg-bg-card border border-border-color rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-blue/10 flex flex-col items-center justify-center relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-water-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                              <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-primary-blue to-accent-teal rounded-full flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                              </div>
                              <p className="relative z-10 text-sm text-text-secondary font-medium leading-tight">{item.text}</p>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
