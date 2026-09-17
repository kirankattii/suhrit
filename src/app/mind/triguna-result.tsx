import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { TrigunaResult, TrigunaProfile } from "../../storage/triguna";

const GUIDANCE: Record<TrigunaProfile, { headline: string; description: string; color: string }> = {
  "Sattva Dominant": {
    headline: "Balanced & Centered",
    description: "High clarity, calm, and emotional resilience. Focus on sustaining this state through mindful daily routines, gentle movement, and creative activities.",
    color: "#4CAF50"
  },
  "Rajas Dominant": {
    headline: "Active & Restless",
    description: "Highly action-driven but prone to stress, anxiety, and burnout. Focus on grounding exercises, slow breathing techniques, and unplugging from work before bed.",
    color: "#FF9800"
  },
  "Tamas Dominant": {
    headline: "Inertial & Low Energy",
    description: "Experiencing mental heaviness, low motivation, or fatigue. Focus on light physical activity, daylight exposure, dynamic movement, and low-effort habit building.",
    color: "#2196F3"
  },
  "Dual Dominance": {
    headline: "Dynamic Transition",
    description: "Balancing contrasting energy patterns. Focus on stabilizing daily routines and monitoring sleep quality to reduce swings in mental energy.",
    color: "#9C27B0"
  }
};

export default function TrigunaResultScreen() {
  const { result: resultParam } = useLocalSearchParams<{ result: string }>();
  
  if (!resultParam) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-[18px] font-bold text-center">No result data found.</Text>
          <View className="mt-4 w-full"><Button title="Go Back" onPress={() => router.back()} /></View>
        </View>
      </Screen>
    );
  }

  const result = JSON.parse(decodeURIComponent(resultParam)) as TrigunaResult;
  const guidance = GUIDANCE[result.dominantProfile];

  // Donut Chart logic
  const size = 200;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const sattvaPct = result.sattva / result.total;
  const rajasPct = result.rajas / result.total;
  const tamasPct = result.tamas / result.total;

  const sattvaStroke = sattvaPct * circumference;
  const rajasStroke = rajasPct * circumference;
  const tamasStroke = tamasPct * circumference;

  const sattvaOffset = 0;
  const rajasOffset = -sattvaStroke;
  const tamasOffset = -(sattvaStroke + rajasStroke);

  return (
    <Screen scroll>
      <View className="px-6 pt-8 pb-12">
        <TouchableOpacity onPress={() => router.push("/mind")} className="-ml-2 mb-6 w-10 p-2">
          <ChevronLeft color="#1A1A1A" size={28} />
        </TouchableOpacity>

        <Text className="text-[#1A1A1A] font-bold text-[28px] leading-[36px] mb-2">
          Your Triguna Profile
        </Text>
        
        {/* Dominant Card */}
        <View 
          className="rounded-3xl p-6 mt-6 mb-8"
          style={{ backgroundColor: guidance.color + "15", borderColor: guidance.color + "30", borderWidth: 1 }}
        >
          <Text className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: guidance.color }}>
            Dominant Profile
          </Text>
          <Text className="font-bold text-[22px] text-[#1A1A1A] mb-3">
            {guidance.headline}
          </Text>
          <Text className="text-[#4A4A4A] text-[14px] leading-[22px]">
            {guidance.description}
          </Text>
        </View>

        {/* Donut Chart */}
        <View className="bg-white rounded-3xl p-6 items-center shadow-sm border border-[#F0F0F0] mb-8">
          <Text className="text-[#1A1A1A] font-bold text-[18px] mb-6 self-start">Energy Distribution</Text>
          
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mb-6">
            <G rotation="-90" origin={`${size/2}, ${size/2}`}>
              {/* Sattva */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#4CAF50"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${sattvaStroke} ${circumference}`}
                strokeDashoffset={sattvaOffset}
              />
              {/* Rajas */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#FF9800"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${rajasStroke} ${circumference}`}
                strokeDashoffset={rajasOffset}
              />
              {/* Tamas */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#2196F3"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${tamasStroke} ${circumference}`}
                strokeDashoffset={tamasOffset}
              />
            </G>
          </Svg>

          <View className="flex-row justify-between w-full">
            <View className="items-center">
              <View className="w-4 h-4 rounded-full bg-[#4CAF50] mb-2" />
              <Text className="font-bold text-[16px] text-[#1A1A1A]">{Math.round(sattvaPct * 100)}%</Text>
              <Text className="text-[12px] text-gray-500">Sattva</Text>
            </View>
            <View className="items-center">
              <View className="w-4 h-4 rounded-full bg-[#FF9800] mb-2" />
              <Text className="font-bold text-[16px] text-[#1A1A1A]">{Math.round(rajasPct * 100)}%</Text>
              <Text className="text-[12px] text-gray-500">Rajas</Text>
            </View>
            <View className="items-center">
              <View className="w-4 h-4 rounded-full bg-[#2196F3] mb-2" />
              <Text className="font-bold text-[16px] text-[#1A1A1A]">{Math.round(tamasPct * 100)}%</Text>
              <Text className="text-[12px] text-gray-500">Tamas</Text>
            </View>
          </View>
        </View>

        <Button title="Done" onPress={() => router.push("/mind")} />
      </View>
    </Screen>
  );
}
