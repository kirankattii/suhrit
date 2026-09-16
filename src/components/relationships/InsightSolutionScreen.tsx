import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface InsightSolutionScreenProps {
  title: string;
  introText: string;
  showsUpList: string[];
  improveList: string[];
  icon?: React.ReactNode;
  onFinish: () => void;
}

export default function InsightSolutionScreen({
  title,
  introText,
  showsUpList,
  improveList,
  icon,
  onFinish
}: InsightSolutionScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-suhrhit-surface" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      <View className="px-4 py-2 flex-row items-center justify-between bg-suhrhit-surface z-10 border-b border-suhrhit-border/20">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center flex-1">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="text-suhrhit-primary font-bold text-[16px]" numberOfLines={1}>{title}</Text>
        </View>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-8 mb-8">
          <Text className="text-suhrhit-primary/80 text-[15px] leading-[24px]">
            {introText}
          </Text>
        </View>

        <View className="bg-[#F5F9FF] rounded-[24px] p-6 mb-6 border border-[#E6F0FA]">
          <Text className="text-suhrhit-primary font-bold text-[17px] mb-4" style={{ fontFamily: 'Georgia' }}>How it shows up</Text>
          {showsUpList.map((item, idx) => (
            <View key={idx} className="flex-row items-start mb-3">
              <View className="w-1.5 h-1.5 rounded-full bg-suhrhit-accent mt-2 mr-3" />
              <Text className="text-suhrhit-primary/80 text-[14px] leading-[22px] flex-1">{item}</Text>
            </View>
          ))}
        </View>

        <View className="bg-[#F5F9FF] rounded-[24px] p-6 mb-10 border border-[#E6F0FA]">
          <Text className="text-suhrhit-primary font-bold text-[17px] mb-4" style={{ fontFamily: 'Georgia' }}>Here are some ways to improve:</Text>
          {improveList.map((item, idx) => (
            <View key={idx} className="flex-row items-start mb-3">
              <View className="w-1.5 h-1.5 rounded-full bg-suhrhit-primary mt-2 mr-3" />
              <Text className="text-suhrhit-primary/80 text-[14px] leading-[22px] flex-1">{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          onPress={onFinish}
          className="bg-suhrhit-primary rounded-full py-4 items-center justify-center mb-10 shadow-sm"
        >
          <Text className="text-white font-bold text-[16px]">Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
