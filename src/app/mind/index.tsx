import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Brain, HeartPulse, Sparkles, Activity } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import BottomTabBar from "../../components/BottomTabBar";
import Screen from "../../components/Screen";
import { Heading, SubHeading } from "../../components/Typography";
import { canTakeWHO5 } from "../../storage/wellbeing";

export default function MindScreen() {
  const [allowWHO5, setAllowWHO5] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const checkAvailability = async () => {
        const canW5 = await canTakeWHO5();
        setAllowWHO5(canW5);
      };
      checkAvailability();
    }, [])
  );

  return (
    <Screen scroll bottomBar={<BottomTabBar />}>
      <View className="px-6 pt-12 pb-12">
        <Heading className="mb-2">Mental Well-being</Heading>
        <SubHeading className="mb-8 text-suhrhit-muted">
          Explore tools to help you understand and nurture your mental and emotional health.
        </SubHeading>

        <Text className="text-[#1A1A1A] text-[20px] font-bold mb-5">
          Assessments
        </Text>

        {/* WHO-5 Assessment Card */}
        <TouchableOpacity 
          onPress={() => {
            if (allowWHO5) {
              router.push("/assessment");
            } else {
              alert("You have already taken the WHO-5 assessment this week. You can take it again next Monday.");
            }
          }} 
          className={`w-full rounded-3xl p-5 flex-row items-center justify-between mb-4 border ${allowWHO5 ? 'bg-[#C9E4FA] border-[#B8DAF7]' : 'bg-[#F0F0F0] border-[#E0E0E0]'}`}
          activeOpacity={0.7}
        >
          <View className="flex-1 mr-4">
            <Text className="text-[#1A1A1A] font-bold text-[17px] mb-1">WHO-5 Well-being</Text>
            <Text className="text-gray-600 text-[13px] leading-[18px] mb-2">Take a quick assessment to understand your overall wellness.</Text>
            <View className="bg-white/60 self-start px-2 py-1 rounded-md border border-[#1A1A1A]/10">
              <Text className="text-[#1A1A1A] font-bold text-[10px] uppercase">Once in a week</Text>
            </View>
          </View>
          <View 
            className="bg-white w-14 h-14 rounded-full items-center justify-center"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 }}
          >
            <HeartPulse color="#1A1A1A" size={24} strokeWidth={1.5} />
          </View>
        </TouchableOpacity>

        {/* Ryff Scale Card */}
        <TouchableOpacity 
          onPress={() => router.push("/mind/ryff")} 
          className="w-full rounded-3xl p-5 flex-row items-center justify-between mb-4 border bg-[#E8F5E9] border-[#C8E6C9]"
          activeOpacity={0.7}
        >
          <View className="flex-1 mr-4">
            <Text className="text-[#1A1A1A] font-bold text-[17px] mb-1">Psychological Wellbeing</Text>
            <Text className="text-gray-600 text-[13px] leading-[18px] mb-2">Explore 6 key dimensions of psychological functioning.</Text>
            <View className="bg-white/60 self-start px-2 py-1 rounded-md border border-[#1A1A1A]/10">
              <Text className="text-[#1A1A1A] font-bold text-[10px] uppercase">18 Questions</Text>
            </View>
          </View>
          <View 
            className="bg-white w-14 h-14 rounded-full items-center justify-center"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 }}
          >
            <Sparkles color="#4CAF50" size={24} strokeWidth={1.5} />
          </View>
        </TouchableOpacity>

        {/* Triguna Scale Card */}
        <TouchableOpacity 
          onPress={() => router.push("/mind/triguna")} 
          className="w-full rounded-3xl p-5 flex-row items-center justify-between mb-8 border bg-[#FFF3E0] border-[#FFE0B2]"
          activeOpacity={0.7}
        >
          <View className="flex-1 mr-4">
            <Text className="text-[#1A1A1A] font-bold text-[17px] mb-1">NIMHANS Triguna Scale</Text>
            <Text className="text-gray-600 text-[13px] leading-[18px] mb-2">Discover your dominant behavioral and energy traits.</Text>
            <View className="bg-white/60 self-start px-2 py-1 rounded-md border border-[#1A1A1A]/10">
              <Text className="text-[#1A1A1A] font-bold text-[10px] uppercase">30 Questions</Text>
            </View>
          </View>
          <View 
            className="bg-white w-14 h-14 rounded-full items-center justify-center"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 }}
          >
            <Activity color="#FF9800" size={24} strokeWidth={1.5} />
          </View>
        </TouchableOpacity>

      </View>
    </Screen>
  );
}
