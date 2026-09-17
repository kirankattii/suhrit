import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, G, Line } from "react-native-svg";
import { CyclePhase } from "../../utils/menstrualCalculations";

interface CircularProgressProps {
  currentDay: number; // 1 to 28
  currentPhase: CyclePhase;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({ 
  currentDay, 
  currentPhase, 
  size = 280, 
  strokeWidth = 16 
}: CircularProgressProps) {
  const center = size / 2;
  const radius = (size - strokeWidth - 20) / 2; // Leave room for thumb
  const circumference = 2 * Math.PI * radius;

  // Assuming 28-day cycle:
  // Menstrual: days 1-5 (5 days)
  // Follicular: days 6-13 (8 days)
  // Ovulation: day 14 (1 day)
  // Luteal: days 15-28 (14 days)
  
  const phases = [
    { name: 'Menstrual', days: 5, color: '#FF8FA3' },
    { name: 'Follicular', days: 8, color: '#A7E3A1' },
    { name: 'Ovulation', days: 1, color: '#F9E076' },
    { name: 'Luteal', days: 14, color: '#CBA6F7' },
  ];

  let cumulativeDays = 0;
  
  // Calculate angle for current day (starting from top, so -90 deg)
  const dayAngle = (currentDay / 28) * 360 - 90;
  const thumbX = center + radius * Math.cos((dayAngle * Math.PI) / 180);
  const thumbY = center + radius * Math.sin((dayAngle * Math.PI) / 180);

  return (
    <View className="items-center justify-center relative">
      <Svg width={size} height={size}>
        {/* Rotate so that day 1 starts at the top */}
        <G rotation="-90" origin={`${center}, ${center}`}>
          {phases.map((phase, index) => {
            const phaseFraction = phase.days / 28;
            const strokeDasharray = `${circumference * phaseFraction} ${circumference}`;
            const strokeDashoffset = -(cumulativeDays / 28) * circumference;
            
            cumulativeDays += phase.days;

            return (
              <Circle
                key={phase.name}
                cx={center}
                cy={center}
                r={radius}
                stroke={phase.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap={index === phases.length - 1 ? "round" : "butt"} 
                fill="none"
              />
            );
          })}
        </G>
        
        {/* Thumb indicating current day */}
        <Circle 
          cx={thumbX} 
          cy={thumbY} 
          r={strokeWidth / 2 + 4} 
          fill="#FFFFFF" 
          stroke="#0A1128"
          strokeWidth={2}
        />
        <Circle 
          cx={thumbX} 
          cy={thumbY} 
          r={3} 
          fill={phases.find(p => p.name === currentPhase)?.color || "#FFFFFF"} 
        />
      </Svg>

      {/* Inner Content */}
      <View className="absolute items-center justify-center pointer-events-none">
        <Text className="text-[#8B9CBE] text-[14px] mb-1">You are on</Text>
        <Text className="text-white text-[24px] font-bold mb-4">Cycle Day {currentDay}</Text>
        
        <Text className="text-[#8B9CBE] text-[12px] mb-1 uppercase tracking-wider">Current Phase</Text>
        <Text className="text-white text-[16px] font-bold">{currentPhase} Phase</Text>
      </View>
    </View>
  );
}
