import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type PhaseTab = "overview" | "food" | "activity";

interface PhaseTabsProps {
  activeTab: PhaseTab;
  onTabChange: (tab: PhaseTab) => void;
}

export default function PhaseTabs({ activeTab, onTabChange }: PhaseTabsProps) {
  return (
    <View className="flex-row bg-[#142340] p-[4px] rounded-[16px] mb-6 mx-5 mt-2">
      <TouchableOpacity 
        onPress={() => onTabChange("overview")}
        className={`flex-1 py-3 items-center justify-center rounded-[12px] ${activeTab === "overview" ? "bg-[#B5CFFE]" : ""}`}
      >
        <Text className={`font-bold text-[13px] ${activeTab === "overview" ? "text-[#0D1B2A]" : "text-[#8B9CBE]"}`}>
          Overview
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => onTabChange("food")}
        className={`flex-1 py-3 items-center justify-center rounded-[12px] ${activeTab === "food" ? "bg-[#B5CFFE]" : ""}`}
      >
        <Text className={`font-bold text-[13px] ${activeTab === "food" ? "text-[#0D1B2A]" : "text-[#8B9CBE]"}`}>
          Food & Nutrition
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => onTabChange("activity")}
        className={`flex-1 py-3 items-center justify-center rounded-[12px] ${activeTab === "activity" ? "bg-[#B5CFFE]" : ""}`}
      >
        <Text className={`font-bold text-[13px] ${activeTab === "activity" ? "text-[#0D1B2A]" : "text-[#8B9CBE]"}`}>
          Activity & Yoga
        </Text>
      </TouchableOpacity>
    </View>
  );
}
