import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SensorDataDisplayProps {
  rainfall: string;
  temp: string;
  soilMoisture: string;
  waterFlow: string;
}

interface InfrastructureVisualizationProps {
  currentState: 'normal' | 'flood' | 'drought' | 'emergency';
  sensorData: SensorDataDisplayProps;
  isEmergencyStopActive: boolean;
}

const InfrastructureVisualization: React.FC<InfrastructureVisualizationProps> = ({ currentState, sensorData, isEmergencyStopActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  const latestCurrentStateRef = useRef(currentState);
  const latestSensorDataRef = useRef(sensorData);
  const floodStartTimeRef = useRef(0);
  const prevStateRef = useRef<'normal' | 'flood' | 'drought' | 'emergency'>(currentState);
  const frozenBuildingYRef = useRef<number | null>(null); // To freeze building position

  // Utility function to convert hex to RGB
  const hexToRgb = useCallback((hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }, []);

  const rainParticlesRef = useRef<Array<{ x: number; y: number; speed: number; length: number; }>>([]);
  const createRainParticles = useCallback((width: number, height: number) => {
    rainParticlesRef.current = [];
    for (let i = 0; i < 200; i++) {
      rainParticlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 5 + 5,
        length: Math.random() * 15 + 10,
      });
    }
  }, []);

  // Update the refs whenever the props change
  useEffect(() => {
    latestCurrentStateRef.current = currentState;
    latestSensorDataRef.current = sensorData;
    console.log("Props updated refs:", { currentState, sensorData });
  }, [currentState, sensorData]);

  // This useEffect ensures prevStateRef is updated correctly for transitions and sets flood start time
  useEffect(() => {
    if (currentState === 'flood' && prevStateRef.current !== 'flood') {
      floodStartTimeRef.current = timeRef.current; // Capture time when flood starts
      console.log("Flood started at time:", timeRef.current);
      createRainParticles(canvasRef.current?.width / window.devicePixelRatio || 0, canvasRef.current?.height / window.devicePixelRatio || 0); // Recreate rain particles
    }
    prevStateRef.current = currentState; // Update prevStateRef to current state for the *next* render cycle
    console.log("Current state changed:", currentState);
  }, [currentState, createRainParticles]);

  const waterFlowParticlesRef = useRef<Array<{ x: number; y: number; }>>([]);
  const groundwaterParticlesRef = useRef<Array<{ x: number; y: number; }>>([]);

  // Helper drawing functions (now receive building dimensions as arguments)
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, state: 'normal' | 'flood' | 'drought' | 'emergency') => {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    if (state === 'normal') {
      ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.fillRect(0, 0, width, height);
    } else if (state === 'drought') {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#FBBF24');
      gradient.addColorStop(1, '#FDE68A');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else if (state === 'emergency') {
      // Dark, somber background for emergency
      ctx.fillStyle = 'rgba(20, 20, 20, 0.8)'; 
      ctx.fillRect(0, 0, width, height);
    }
  }, []);

  const drawBasePlatform = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number, state: 'normal' | 'flood' | 'drought' | 'emergency') => {
    // Define properties for the hydraulic supports and underground base
    const supportWidth = buildingWidth * 0.25; // Increased width of the hydraulic supports
    const supportColor = '#3B82F6'; // Blue for hydraulic machinery
    const glowColor = '#93C5FD'; // Lighter blue for glow
    const baseGroundY = height * 0.9; // The fixed underground anchor point
    const groundLevelIndicatorY = height * 0.85; // A visual line to represent the ground surface

    // --- Always Draw Permanent Underground Structure ---
    // Draw the strong, connecting base plate deep underground
    ctx.fillStyle = 'rgba(40, 50, 70, 0.7)'; // Darker, solid color for the underground base
    ctx.fillRect(width * 0.1, baseGroundY, width * 0.8, height * 0.05);

    // Draw lines to indicate the ground level and underground section
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.8)'; // Slate gray for ground lines
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, groundLevelIndicatorY);
    ctx.lineTo(width, groundLevelIndicatorY);
    ctx.stroke();

    // Add some "underground texture" or layers below the ground line
    ctx.fillStyle = 'rgba(55, 65, 81, 0.5)'; // Darker gray for subsurface
    ctx.fillRect(0, groundLevelIndicatorY, width, baseGroundY - groundLevelIndicatorY);

    ctx.fillStyle = 'rgba(31, 41, 55, 0.5)'; // Even darker for deeper ground
    ctx.fillRect(0, baseGroundY + height * 0.05, width, height - (baseGroundY + height * 0.05));

    // --- Hydraulic Supports Drawing Logic ---
    let supportDrawTopY = buildingY + buildingHeight; // Supports always start at the bottom of the building
    let supportDrawHeight = baseGroundY - supportDrawTopY; // Supports always extend to the fixed underground base
    let pulseAlpha = Math.abs(Math.sin(time * 3)) * 0.6 + 0.4; // More prominent and consistent glow across all states

    // Disable glow and ensure supports are static in emergency mode
    if (state === 'emergency') {
      pulseAlpha = 0; // No glow
      // Optionally, change support color to a neutral/off state color
      ctx.fillStyle = 'rgba(50, 50, 50, 0.7)'; // Darker, less vibrant color
    } else {
      ctx.fillStyle = supportColor; // Revert to normal support color
    }

    // Draw supports (left and right)
    ctx.fillRect(buildingX + buildingWidth * 0.15 - supportWidth / 2, supportDrawTopY, supportWidth, supportDrawHeight);
    ctx.fillRect(buildingX + buildingWidth * 0.85 - supportWidth / 2, supportDrawTopY, supportWidth, supportDrawHeight);

    // Apply glow to supports
    const rgbGlowColor = hexToRgb(glowColor);
    ctx.shadowColor = `rgba(${rgbGlowColor.r}, ${rgbGlowColor.g}, ${rgbGlowColor.b}, ${pulseAlpha})`;
    ctx.shadowBlur = 10;
    // Redraw supports with glow for the effect (this is common practice for glow)
    ctx.fillRect(buildingX + buildingWidth * 0.15 - supportWidth / 2, supportDrawTopY, supportWidth, supportDrawHeight);
    ctx.fillRect(buildingX + buildingWidth * 0.85 - supportWidth / 2, supportDrawTopY, supportWidth, supportDrawHeight);
    ctx.shadowBlur = 0; // Reset shadow

    // --- Draw the Normal Platform (Visible only when not in flood) ---
    // The normal platform now sits *on top* of the supports/ground, and will be hidden during flood
    if (state !== 'flood') {
      const platformHeight = height * 0.1; // Keep original height
      const platformY = buildingY + buildingHeight; // Position at the bottom of the building
      ctx.fillStyle = 'rgba(40, 50, 70, 0.7)';
      ctx.fillRect(width * 0.1, platformY, width * 0.8, platformHeight);

      // Draw details on the normal platform (like lines and indicators)
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.15, platformY + platformHeight * 0.3);
      ctx.lineTo(width * 0.85, platformY + platformHeight * 0.3);
      ctx.moveTo(width * 0.25, platformY + platformHeight * 0.7);
      ctx.lineTo(width * 0.75, platformY + platformHeight * 0.7);
      ctx.stroke();

      const indicatorRadius = 5;
      const normalPulseAlpha = Math.abs(Math.sin(time * 3)) * 0.7 + 0.3;
      ctx.fillStyle = `rgba(0, 255, 255, ${normalPulseAlpha})`;
      ctx.beginPath();
      ctx.arc(width * 0.3, platformY + platformHeight * 0.5, indicatorRadius, 0, Math.PI * 2);
      ctx.arc(width * 0.7, platformY + platformHeight * 0.5, indicatorRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [hexToRgb]);

  const drawBuilding = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, state: 'normal' | 'flood' | 'drought' | 'emergency', time: number, buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number) => {
    ctx.fillStyle = '#38BDF8';
    // Change building color in emergency mode
    if (state === 'emergency') {
      ctx.fillStyle = 'rgba(60, 60, 60, 0.8)'; // Darker, deactivated color
    }
    ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillRect(buildingX + 10 + j * (buildingWidth / 2 - 15), buildingY + 10 + i * (buildingHeight / 4 - 15), buildingWidth / 2 - 20, (buildingHeight / 4) - 20);
      }
    }

    // Apply glow and outline only in flood state, disable in emergency
    if (state === 'flood') {
      const glowAlpha = Math.abs(Math.sin(time * 2)) * 0.4 + 0.2;
      ctx.shadowColor = `rgba(0, 255, 255, ${glowAlpha})`;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = `rgba(0, 255, 255, ${glowAlpha * 1.5})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(buildingX, buildingY, buildingWidth, buildingHeight);
      ctx.shadowBlur = 0; // Reset shadow after drawing
    }

    if (state === 'flood') {
      const floodSkirtHeight = buildingHeight * 0.2;
      const floodSkirtY = buildingY + buildingHeight - floodSkirtHeight;
      ctx.fillStyle = 'rgba(96, 165, 250, 0.6)';
      ctx.fillRect(buildingX - 10, floodSkirtY, buildingWidth + 20, floodSkirtHeight + 10);
    }
  }, []);

  const drawNormalModeElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, particles: { x: number; y: number; }[], buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number) => {
    const pipeGlowAlpha = Math.abs(Math.sin(time * 2)) * 0.2 + 0.1; // Make glow more prominent for idle
    ctx.strokeStyle = `rgba(96, 165, 250, ${pipeGlowAlpha})`;
    ctx.lineWidth = 2;

    const groundLevelIndicatorY = height * 0.85;
    const buildingBaseXLeft = buildingX + buildingWidth * 0.15;
    const buildingBaseXRight = buildingX + buildingWidth * 0.85;

    // Pipe glow lines representing idle flow in normal mode
    ctx.beginPath();
    ctx.moveTo(buildingBaseXLeft, groundLevelIndicatorY - 5); // Start slightly above ground
    ctx.lineTo(buildingBaseXLeft, groundLevelIndicatorY + 10); // Extend slightly below ground
    ctx.moveTo(buildingBaseXRight, groundLevelIndicatorY - 5);
    ctx.lineTo(buildingBaseXRight, groundLevelIndicatorY + 10);
    ctx.stroke();

    // Sensor dots pulse around corners of the building
    const sensorPulseAlpha = Math.abs(Math.sin(time * 2)) * 0.7 + 0.3; // More prominent sensor dots
    ctx.fillStyle = `rgba(0, 255, 255, ${sensorPulseAlpha})`; // Cyan pulse
    ctx.beginPath();
    ctx.arc(buildingX, buildingY, 5, 0, Math.PI * 2); // Top-left
    ctx.arc(buildingX + buildingWidth, buildingY, 5, 0, Math.PI * 2); // Top-right
    ctx.arc(buildingX, buildingY + buildingHeight, 5, 0, Math.PI * 2); // Bottom-left
    ctx.arc(buildingX + buildingWidth, buildingY + buildingHeight, 5, 0, Math.PI * 2); // Bottom-right
    ctx.fill();
  }, []);

  const drawFloodModeElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, rainParticles: { x: number; y: number; speed: number; length: number; }[], buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number, waterLevel: number) => {
    // Draw rain particles
    ctx.fillStyle = 'rgba(173, 216, 230, 0.7)'; // Light blue rain
    rainParticles.forEach(p => {
      ctx.fillRect(p.x, p.y, 2, p.length);
      p.y += p.speed; // Update particle position
      if (p.y > height) {
        p.y = -p.length; // Reset to top
        p.x = Math.random() * width; // Randomize x position
      }
    });

    // Draw rising water level
    ctx.fillStyle = 'rgba(0, 191, 255, 0.5)'; // Semi-transparent blue water
    ctx.fillRect(0, waterLevel, width, height - waterLevel);

    // Draw water ripple effect
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.8)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const rippleY = waterLevel - 10 + Math.sin(time * 3 + i * 0.5) * 5;
      ctx.beginPath();
      ctx.arc(width / 2, rippleY, 50 + i * 20, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, []);

  const drawBuildingFloodElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number, waterLevel: number) => {
    // Draw elevated base platform
    const elevatedBaseY = buildingY + buildingHeight;
    ctx.fillStyle = 'rgba(70, 80, 100, 0.8)'; // Darker base
    ctx.fillRect(buildingX - 10, elevatedBaseY - 5, buildingWidth + 20, 10); // Simple elevated platform

    // Draw drainage channels (simplified)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)'; // Cyan for drainage
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(buildingX + buildingWidth * 0.2, elevatedBaseY);
    ctx.lineTo(buildingX + buildingWidth * 0.2 - 20, elevatedBaseY + 30);
    ctx.moveTo(buildingX + buildingWidth * 0.8, elevatedBaseY);
    ctx.lineTo(buildingX + buildingWidth * 0.8 + 20, elevatedBaseY + 30);
    ctx.stroke();
  }, []);

  const drawGlobalFloodElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, rainParticles: { x: number; y: number; speed: number; length: number; }[], waterLevel: number) => {
    drawFloodModeElements(ctx, width, height, time, rainParticles, 0, 0, 0, 0, waterLevel); // Pass relevant args for flood elements
  }, [drawFloodModeElements]);

  const drawDroughtModeElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, particles: { x: number; y: number; }[], buildingX: number, buildingY: number, buildingWidth: number, buildingHeight: number) => {
    // Draw cracks in the ground
    ctx.strokeStyle = 'rgba(100, 70, 30, 0.8)'; // Brownish color for cracks
    ctx.lineWidth = 2;

    const groundLevelY = height * 0.85;

    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      const startX = Math.random() * width;
      const startY = groundLevelY + Math.random() * (height * 0.05);
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (Math.random() - 0.5) * 50, startY + (Math.random() - 0.5) * 50);
      ctx.stroke();
    }

    // Draw desaturated landscape elements
    ctx.fillStyle = 'rgba(150, 150, 150, 0.3)'; // Desaturated gray-green
    ctx.fillRect(0, groundLevelY + height * 0.05, width, height * 0.1);

    // Draw sun
    ctx.fillStyle = '#FFD700'; // Gold color for sun
    ctx.beginPath();
    const sunRadius = 40;
    const sunX = width - sunRadius - 30; // Position in top-right corner
    const sunY = sunRadius + 30;
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw sun rays with a subtle pulse
    const numRays = 8;
    const rayLength = sunRadius * 0.6 + Math.sin(time * 3) * 5; // Pulsing effect
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    for (let i = 0; i < numRays; i++) {
      const angle = (Math.PI * 2 / numRays) * i;
      ctx.beginPath();
      ctx.moveTo(sunX + sunRadius * Math.cos(angle), sunY + sunRadius * Math.sin(angle));
      ctx.lineTo(sunX + (sunRadius + rayLength) * Math.cos(angle), sunY + (sunRadius + rayLength) * Math.sin(angle));
      ctx.stroke();
    }

  }, []);

  const drawUIElements = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, state: 'normal' | 'flood' | 'drought' | 'emergency', sensorData: SensorDataDisplayProps, time: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';

    // Risk level indicator (simple) (removed text)
    const riskLevel = parseFloat(sensorData.waterFlow) > 100 ? 90 : (parseFloat(sensorData.rainfall) > 50 ? 70 : 20);
    const riskColor = riskLevel > 70 ? 'red' : (riskLevel > 40 ? 'orange' : 'green');

    ctx.fillStyle = riskColor;
    // Removed text for risk level as well.
    // ctx.fillRect(textX, textY + 5, riskLevel, 10);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    // ctx.fillText(`Risk: ${riskLevel}%`, textX + riskLevel + 5, textY + 15);

    if (state === 'emergency') {
      ctx.fillStyle = 'red';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTEM HALTED', width / 2, height / 2);
    }

  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
        console.log("Canvas ref is null in resizeCanvas");
        return;
    }

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    console.log(`Canvas client dimensions: ${displayWidth}x${displayHeight}`);

    if (canvas.width !== displayWidth * window.devicePixelRatio || canvas.height !== displayHeight * window.devicePixelRatio) {
      canvas.width = displayWidth * window.devicePixelRatio;
      canvas.height = displayHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        console.log("Canvas resized and scaled:", canvas.width, canvas.height);
      } else {
        console.log("Could not get 2D context after resize.");
      }
    }
  }, [canvasRef]);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
        console.log("Canvas ref is null in animate");
        animationFrameRef.current = requestAnimationFrame(animate); // Keep trying to animate if ref is null
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log("Could not get 2D context in animate");
        animationFrameRef.current = requestAnimationFrame(animate); // Keep trying to animate if context is null
        return;
    }

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    timeRef.current += 0.01; // Increment time for animations
    const time = timeRef.current;

    // Directly access the current values from refs
    const currentRenderState = latestCurrentStateRef.current;
    const currentRenderSensorData = latestSensorDataRef.current;

    console.log(`Animating for state: ${currentRenderState}, Time: ${time.toFixed(2)}, Canvas dimensions: ${width}x${height}`);

    // Set building dimensions based on canvas size
    const buildingWidth = width * 0.4;
    const buildingHeight = height * 0.65; // Further increased building height
    const buildingX = (width - buildingWidth) / 2;
    const initialBuildingY = height * 0.2; // Adjusted initial Y for taller building
    let buildingY = initialBuildingY;

    // Determine water level based on flood state
    let waterLevelSurfaceY = height; // Y-coordinate of the water surface (starts at bottom, moves up)
    const finalFloodWaterLevelY = height * 0.57; // Water rises up to 57% from the top (calculated to sync with building lift)
    const maxBuildingLiftY = initialBuildingY - (height * 0.15); // Max lift: move up by 15% of canvas height

    let renderStateForDrawing = currentRenderState;

    if (isEmergencyStopActive) {
      if (frozenBuildingYRef.current === null) {
        frozenBuildingYRef.current = buildingY; // Freeze building Y at the moment of emergency stop
      }
      buildingY = frozenBuildingYRef.current; // Use frozen building Y
      renderStateForDrawing = prevStateRef.current; // Use previous state for drawing context

      // Continue water rise and rain if it was in flood mode before emergency stop
      if (prevStateRef.current === 'flood') {
        const floodDuration = (time - floodStartTimeRef.current);
        const waterRiseDuration = 10; // seconds for water to fully rise
        const waterRiseProgress = Math.min(1, floodDuration / waterRiseDuration);
        waterLevelSurfaceY = height - (height - finalFloodWaterLevelY) * waterRiseProgress;
        waterLevelSurfaceY = Math.max(waterLevelSurfaceY, finalFloodWaterLevelY); // Explicitly cap
      }
    } else {
      // Reset frozenBuildingYRef if not in emergency stop
      if (frozenBuildingYRef.current !== null) {
        frozenBuildingYRef.current = null;
      }

      if (currentRenderState === 'flood') {
          const floodDuration = (time - floodStartTimeRef.current);
          const waterRiseDuration = 10; // seconds for water to fully rise
          const waterRiseProgress = Math.min(1, floodDuration / waterRiseDuration);

          // Calculate current water surface Y-coordinate
          waterLevelSurfaceY = height - (height - finalFloodWaterLevelY) * waterRiseProgress;
          // Explicitly cap water level at its final position
          waterLevelSurfaceY = Math.max(waterLevelSurfaceY, finalFloodWaterLevelY);

          // Building lifts to maintain a partial submersion (e.g., 20% submerged)
          const submergedPercentage = 0.2; // 20% of building height will be submerged
          let targetBuildingY = waterLevelSurfaceY - (buildingHeight * (1 - submergedPercentage));

          // Ensure building does not go above its max lift height and not below its initial position
          buildingY = Math.max(targetBuildingY, maxBuildingLiftY);
          buildingY = Math.min(buildingY, initialBuildingY); // Ensure it doesn't go below initial Y

      } else if (currentRenderState === 'emergency') {
          // In emergency mode, ensure water is off-screen and rain stops
          waterLevelSurfaceY = height;
          rainParticlesRef.current = [];
          buildingY = initialBuildingY; // Ensure building is at initial position
      } else {
          // When not in flood, building returns to initial position and water is off-screen
          buildingY = initialBuildingY;
          waterLevelSurfaceY = height;
      }

      // Ensure water level and rain particles are reset when changing from flood to normal/drought
      if (prevStateRef.current === 'flood' && currentRenderState !== 'flood') {
          waterLevelSurfaceY = height; // Immediately reset water level to off-screen
          rainParticlesRef.current = []; // Clear rain particles
      }
    }

    // Clear canvas and draw background based on current state, or the renderStateForDrawing during emergency
    drawBackground(ctx, width, height, renderStateForDrawing);

    // Draw base platform and hydraulic supports (adjusts based on state)
    drawBasePlatform(ctx, width, height, time, buildingX, buildingY, buildingWidth, buildingHeight, renderStateForDrawing);

    // Draw the main building structure
    drawBuilding(ctx, width, height, renderStateForDrawing, time, buildingX, buildingY, buildingWidth, buildingHeight);

    // Draw scenario-specific elements based on renderStateForDrawing
    if (renderStateForDrawing === 'normal') {
      drawNormalModeElements(ctx, width, height, time, [], buildingX, buildingY, buildingWidth, buildingHeight);
    } else if (renderStateForDrawing === 'flood') {
      drawFloodModeElements(ctx, width, height, time, rainParticlesRef.current, buildingX, buildingY, buildingWidth, buildingHeight, waterLevelSurfaceY);
    } else if (renderStateForDrawing === 'drought') {
      drawDroughtModeElements(ctx, width, height, time, [], buildingX, buildingY, buildingWidth, buildingHeight);
    }
    // If in emergency state, no other scenario-specific elements are drawn here, but the background and building/supports are drawn

    // Draw UI elements like sensor data overlay
    drawUIElements(ctx, width, height, currentRenderState, currentRenderSensorData, time);

    // Apply subtle emergency overlay if active
    if (isEmergencyStopActive) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'; // Faint red tint
      ctx.fillRect(0, 0, width, height);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    drawBackground, drawBasePlatform, drawBuilding, drawNormalModeElements, 
    drawFloodModeElements, drawDroughtModeElements, drawUIElements, createRainParticles, resizeCanvas,
    latestCurrentStateRef.current, latestSensorDataRef.current, timeRef.current, floodStartTimeRef.current, rainParticlesRef.current, prevStateRef.current, isEmergencyStopActive, frozenBuildingYRef
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
        console.log("Initial useEffect: Canvas ref is null");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log("Initial useEffect: Could not get 2D context");
        return;
    }

    const handleResize = () => {
      resizeCanvas();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
      console.log("Window resized, animation restarted.");
    };

    // Initial resize and animation start
    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);
    console.log("Initial animation frame requested.");

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        console.log("Animation frame cancelled on unmount.");
      }
    };
  }, [animate, resizeCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Implement pan logic here if needed
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Implement zoom logic here if needed
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    />
  );
};

export default InfrastructureVisualization;