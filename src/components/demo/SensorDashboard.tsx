import React, { SetStateAction, Dispatch } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CloudRain, Thermometer, Droplet, Gauge, AlertTriangle, BarChart2, Sprout, SatelliteDish, Brain, Sliders, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

interface SensorData {
  rainfall: number;
  temperature: number;
  soilMoisture: number;
  waterFlow: number;
  pressure: number;
  riskLevel: number;
}

interface SensorDashboardProps {
  sensorData: SensorData;
  activeScenario: 'normal' | 'flood' | 'drought' | 'emergency';
  setActiveScenario: Dispatch<SetStateAction<'normal' | 'flood' | 'drought' | 'emergency'>>;
  setSensorData: Dispatch<SetStateAction<SensorData>>;
  isEmergencyStopActive: boolean;
  setIsEmergencyStopActive: Dispatch<SetStateAction<boolean>>;
}

const SensorDashboard: React.FC<SensorDashboardProps> = ({ sensorData, activeScenario, setActiveScenario, setSensorData, isEmergencyStopActive, setIsEmergencyStopActive }) => {
  const getRiskColor = (level: number) => {
    if (level < 30) return 'text-status-success';
    if (level < 70) return 'text-status-warning';
    return 'text-status-danger';
  };

  const getProgressColor = (level: number) => {
    if (level < 30) return 'bg-status-success';
    if (level < 70) return 'bg-status-warning';
    return 'bg-status-danger';
  };

  // Determine current sensor data values based on active scenario
  const currentSensorData = (() => {
    switch (activeScenario) {
      case 'normal':
        return {
          rainfall: sensorData.rainfall.toFixed(1),
          temperature: sensorData.temperature.toFixed(1),
          soilMoisture: sensorData.soilMoisture.toFixed(0),
          waterFlow: sensorData.waterFlow.toFixed(1),
        };
      case 'flood':
        return {
          rainfall: '98.0',
          temperature: '22.3',
          soilMoisture: '--',
          waterFlow: '300+',
        };
      case 'drought':
        return {
          rainfall: '0.0',
          temperature: '34.1',
          soilMoisture: '11',
          waterFlow: '--',
        };
      case 'emergency':
        return {
          rainfall: '--',
          temperature: '--',
          soilMoisture: '--',
          waterFlow: '--',
        };
      default:
        return {
          rainfall: '--',
          temperature: '--',
          soilMoisture: '--',
          waterFlow: '--',
        };
    }
  })();

  const sensorMetrics = [
    {
      label: 'Rainfall',
      value: currentSensorData.rainfall,
      unit: 'mm/hr',
      max: 100,
      icon: <CloudRain className="w-5 h-5" />
    },
    {
      label: 'Temperature',
      value: currentSensorData.temperature,
      unit: '°C',
      max: 50,
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      label: 'Soil Moisture',
      value: currentSensorData.soilMoisture,
      unit: '%',
      max: 100,
      icon: <Sprout className="w-5 h-5" />
    },
    {
      label: 'Water Flow',
      value: currentSensorData.waterFlow,
      unit: 'L/s',
      max: 100,
      icon: <Droplet className="w-5 h-5" />
    }
  ];

  const systemStatus = {
    normal: { status: 'Operational', color: 'text-status-success', icon: <CheckCircle2 className="w-5 h-5 text-status-success" /> },
    flood: { status: 'Emergency Mode', color: 'text-status-danger', icon: <AlertTriangle className="w-5 h-5 text-status-danger" /> },
    drought: { status: 'Conservation Mode', color: 'text-status-warning', icon: <AlertCircle className="w-5 h-5 text-status-warning" /> },
    emergency: { status: 'System Halted', color: 'text-status-danger', icon: <Zap className="w-5 h-5 text-status-danger" /> }
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* System Status */}
      <Card className="bg-bg-card border-border-color">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-2xl">{systemStatus[activeScenario].icon}</span>
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Mode:</span>
              <span className={`font-semibold ${systemStatus[activeScenario].color}`}>
                {systemStatus[activeScenario].status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Risk Level:</span>
              <span className={`font-semibold ${getRiskColor(sensorData.riskLevel)}`}>
                {activeScenario === 'emergency' ? '100%' : `${sensorData.riskLevel.toFixed(0)}%`}
              </span>
            </div>
            <Progress 
              value={activeScenario === 'emergency' ? 100 : sensorData.riskLevel} 
              className="w-full h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Manual Override */}
      <Card className="bg-bg-card border-border-color">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Sliders className="w-6 h-6" />
            Manual Override
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-status-danger hover:bg-status-danger-dark text-white font-bold py-2 px-4 rounded transition-all duration-300"
            onClick={() => {
              setIsEmergencyStopActive(true);
              // activeScenario remains as is (e.g., 'flood') to allow water to continue rising
            }}
          >
            Emergency Stop
          </Button>
          <Button 
            className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white font-bold py-2 px-4 rounded transition-all duration-300"
            onClick={() => {
              setIsEmergencyStopActive(false);
              setActiveScenario('normal');
              setSensorData({
                rainfall: 15,
                temperature: 22,
                soilMoisture: 65,
                waterFlow: 45,
                pressure: 2.3,
                riskLevel: 25
              });
            }}
          >
            Reset System
          </Button>
          <Button 
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
            onClick={() => {
              setIsEmergencyStopActive(false);
              setSensorData({
                rainfall: 15,
                temperature: 22,
                soilMoisture: 65,
                waterFlow: 45,
                pressure: 2.3,
                riskLevel: 25
              });
              console.log("Sensors calibrated.");
            }}
          >
            Calibrate Sensors
          </Button>
        </CardContent>
      </Card>

      {/* Environmental Sensors */}
      <Card className="bg-bg-card border-border-color">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <SatelliteDish className="w-6 h-6" />
            Environmental Sensors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sensorMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary flex items-center gap-2">
                    <span className="text-lg">{metric.icon}</span>
                    {metric.label}
                  </span>
                  <span className="font-semibold text-white">
                    {metric.value} {metric.unit}
                  </span>
                </div>
                {/* Only show progress bar if value is not '--' */}
                {metric.value !== '--' && metric.value !== '300+' && (
                <Progress 
                  value={(parseFloat(metric.value) / metric.max) * 100} 
                  className="w-full h-1"
                />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Status */}
      <Card className="bg-bg-card border-border-color">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Brain className="w-6 h-6" />
            MorphBrain AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Processing:</span>
              <span className="text-status-success font-semibold">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Response Time:</span>
              <span className="text-white font-semibold">2.3s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Accuracy:</span>
              <span className="text-status-success font-semibold">99.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Next Update:</span>
              <span className="text-secondary-cyan font-semibold">3s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance History */}
      <Card className="bg-bg-card border-border-color">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart2 className="w-6 h-6" />
            Performance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">24h Avg Response:</span>
              <span className="text-status-success font-semibold">2.1s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Events Handled:</span>
              <span className="text-white font-semibold">847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Success Rate:</span>
              <span className="text-status-success font-semibold">99.9%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorDashboard;
