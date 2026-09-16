import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Check, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export interface IssueOption {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface IssueSelectionScreenProps {
  title: string;
  subtitle: string;
  options: IssueOption[];
  onSelect: (optionId: string) => void;
  onSkip?: () => void;
}

export default function IssueSelectionScreen({
  title,
  subtitle,
  options,
  onSelect,
  onSkip
}: IssueSelectionScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-suhrhit-surface" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      <View className="px-4 py-2 flex-row items-center bg-suhrhit-surface z-10 border-b border-suhrhit-border/20">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-6 mb-10">
          <View className="w-16 h-16 rounded-full bg-[#F5F9FF] border border-[#E6F0FA] items-center justify-center mb-6">
            <Text className="text-[28px]">🤔</Text> 
          </View>
          <Text className="text-suhrhit-primary text-[24px] font-bold text-center mb-3 leading-tight" style={{ fontFamily: 'Georgia' }}>
            {title}
          </Text>
          <Text className="text-suhrhit-primary/70 text-[15px] text-center leading-[22px] px-2">
            {subtitle}
          </Text>
        </View>

        <View className="mb-8">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              onPress={() => onSelect(opt.id)}
              className="bg-white border border-suhrhit-border/40 rounded-[20px] p-4 mb-3 flex-row items-center justify-between"
              style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 }}
            >
              <View className="flex-row items-center flex-1 mr-4">
                {opt.icon && (
                  <View className="w-10 h-10 rounded-full bg-[#F5F9FF] border border-[#E6F0FA] items-center justify-center mr-3">
                    {opt.icon}
                  </View>
                )}
                <Text className="text-suhrhit-primary font-bold text-[15px] flex-1">{opt.title}</Text>
              </View>
              <ChevronRight color="#A6B9C7" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {onSkip && (
          <TouchableOpacity 
            onPress={onSkip}
            className="py-4 items-center justify-center mb-10"
          >
            <Text className="text-suhrhit-primary/60 font-bold text-[16px]">Skip for now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
