import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface ResultScreenProps {
  title: string;
  score: number;
  maxScore: number;
  bandLabel: string;
  interpretation: string;
  disclaimer?: string;
  onContinue: () => void;
  continueText?: string;
  icon?: React.ReactNode;
}

export default function ResultScreen({
  title,
  score,
  maxScore,
  bandLabel,
  interpretation,
  disclaimer = "This is not a diagnostic tool and does not determine whether your relationship is healthy, safe or suitable.",
  onContinue,
  continueText = "Explore Further",
  icon
}: ResultScreenProps) {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <SafeAreaView className="flex-1 bg-suhrhit-surface" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      <View className="px-4 py-2 flex-row items-center justify-between bg-suhrhit-surface z-10 border-b border-suhrhit-border/20">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <Text className="text-suhrhit-primary font-bold text-[16px]" numberOfLines={1}>{title}</Text>
        </View>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-8 mb-10">
          <Text className="text-suhrhit-primary text-[24px] font-bold text-center mb-10" style={{ fontFamily: 'Georgia' }}>{title}</Text>
          
          <View className="relative items-center justify-center mb-8">
            <View className="w-48 h-48 rounded-full border-[6px] border-[#F0F5FA] items-center justify-center">
               <View className="w-48 h-48 rounded-full border-[6px] border-suhrhit-primary absolute opacity-20" style={{ transform: [{ rotate: '-90deg' }] }} />
               {/* Proper circular progress requires SVG, using a stylized placeholder for now */}
               {icon && <View className="mb-2">{icon}</View>}
               <Text className="text-suhrhit-primary text-[36px] font-bold" style={{ fontFamily: 'Georgia' }}>
                 {score} <Text className="text-[20px] text-suhrhit-primary/60">/ {maxScore}</Text>
               </Text>
               <Text className="text-suhrhit-primary/60 text-[14px] mt-1 font-medium">({percentage}%)</Text>
            </View>
          </View>

          <View className="bg-[#E6F0FA] px-6 py-2.5 rounded-full border border-suhrhit-primary/10">
            <Text className="text-suhrhit-primary font-bold text-[15px]">{bandLabel}</Text>
          </View>
        </View>

        <View className="bg-[#F5F9FF] rounded-[24px] p-6 mb-8 border border-[#E6F0FA]">
          <Text className="text-suhrhit-primary font-bold text-[16px] mb-2">What this means</Text>
          <Text className="text-suhrhit-primary/80 text-[14px] leading-[22px] mb-4">
            {interpretation}
          </Text>
          <View className="flex-row items-start">
            <Text className="text-suhrhit-primary/40 mr-2 mt-0.5">ℹ</Text>
            <Text className="text-suhrhit-primary/60 text-[12px] leading-[18px] flex-1">
              {disclaimer}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={onContinue}
          className="bg-suhrhit-primary rounded-full py-4 items-center justify-center mb-10 shadow-sm"
        >
          <Text className="text-white font-bold text-[16px]">{continueText}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
