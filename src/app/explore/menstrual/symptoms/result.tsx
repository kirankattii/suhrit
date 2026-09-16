import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DarkScreen from "../../../../components/menstrual/DarkScreen";

interface ScoreInfo {
  level: string;
  description: string;
  color: string;
}

const getScoreInterpretation = (score: number): ScoreInfo => {
  if (score >= 17) {
    return {
      level: "Higher symptom burden",
      description: "Several symptoms are reported at greater severity. Consider tracking these symptoms across cycles and seeking professional support if they are persistent or interfering with daily life.",
      color: "#F87171" // Red
    };
  } else if (score >= 9) {
    return {
      level: "Moderate symptom burden",
      description: "Some symptoms are present and may be worth monitoring across the menstrual cycle.",
      color: "#FBBF24" // Yellow
    };
  } else {
    return {
      level: "Low symptom burden",
      description: "Few or minimal symptoms reported.",
      color: "#34D399" // Green
    };
  }
};

export default function SymptomsResultScreen() {
  const { emotionalScore, physicalScore } = useLocalSearchParams<{ emotionalScore: string; physicalScore: string }>();

  const eScore = parseInt(emotionalScore || "4", 10);
  const pScore = parseInt(physicalScore || "4", 10);

  useEffect(() => {
    // Save these results so the index page knows we took the assessment
    const saveResults = async () => {
      try {
        await AsyncStorage.setItem('JDRSP_EMOTIONAL', eScore.toString());
        await AsyncStorage.setItem('JDRSP_PHYSICAL', pScore.toString());
      } catch (e) {
        console.error("Error saving assessment results", e);
      }
    };
    saveResults();
  }, [eScore, pScore]);

  const emotionalResult = getScoreInterpretation(eScore);
  const physicalResult = getScoreInterpretation(pScore);

  return (
    <DarkScreen
      header={
        <View className="flex-row items-center justify-between pb-4 px-5">
          <TouchableOpacity onPress={() => router.replace("/explore/menstrual/symptoms")} className="-ml-2 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
          <Text className="text-white font-bold text-[20px]" style={{ fontFamily: 'Georgia' }}>
            Your Results
          </Text>
          <View className="w-10" />
        </View>
      }
    >
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}>
        
        {/* Emotional Section */}
        <Text className="text-white font-bold text-[18px] mb-4">Emotional & Psychological</Text>
        <View className="bg-[#142340] rounded-2xl p-5 border border-[#1E335A] mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#8B9CBE] text-[15px]">Score</Text>
            <Text className="text-white font-bold text-[24px]">{eScore} <Text className="text-[14px] text-[#8B9CBE] font-normal">/ 24</Text></Text>
          </View>
          <View className="flex-row items-center mb-4">
            <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: emotionalResult.color }} />
            <Text className="text-white font-medium text-[16px]">{emotionalResult.level}</Text>
          </View>
          <Text className="text-[#8B9CBE] text-[14px] leading-[22px]">
            {emotionalResult.description}
          </Text>
        </View>

        {/* Physical Section */}
        <Text className="text-white font-bold text-[18px] mb-4">Physical Well-being</Text>
        <View className="bg-[#142340] rounded-2xl p-5 border border-[#1E335A] mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#8B9CBE] text-[15px]">Score</Text>
            <Text className="text-white font-bold text-[24px]">{pScore} <Text className="text-[14px] text-[#8B9CBE] font-normal">/ 24</Text></Text>
          </View>
          <View className="flex-row items-center mb-4">
            <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: physicalResult.color }} />
            <Text className="text-white font-medium text-[16px]">{physicalResult.level}</Text>
          </View>
          <Text className="text-[#8B9CBE] text-[14px] leading-[22px]">
            {physicalResult.description}
          </Text>
        </View>

        {/* Disclaimers */}
        <View className="bg-[#1E335A]/50 rounded-xl p-4 mb-4">
          <Text className="text-white font-bold text-[14px] mb-2">Important Note</Text>
          <Text className="text-[#8B9CBE] text-[13px] leading-[20px]">
            These ranges are descriptive app ranges, not validated diagnostic cut-offs. The J-DRSP-SF itself should not be used to diagnose PMS/PMDD.
          </Text>
        </View>

        <View className="bg-[#1E335A]/50 rounded-xl p-4 mb-8">
          <Text className="text-white font-bold text-[14px] mb-2">Safety Note</Text>
          <Text className="text-[#8B9CBE] text-[13px] leading-[20px]">
            If you experience severe, persistent or worsening symptoms, or symptoms that interfere with your daily life, consider speaking with a qualified healthcare professional.
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.replace("/explore/menstrual/symptoms")}
          className="bg-[#82A9F9] py-4 rounded-[25px] items-center shadow-sm"
        >
          <Text className="text-[#0D1B2A] font-bold text-[16px]">Keep Observing</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </DarkScreen>
  );
}
