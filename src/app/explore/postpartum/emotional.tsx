import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronDown, ChevronRight, Activity } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const EMOTIONS = [
  {
    id: "blues",
    title: "Baby blues",
    content: "Many new mothers experience mood swings, crying spells, anxiety and difficulty sleeping. These typically begin within the first few days after delivery and usually resolve within two weeks."
  },
  {
    id: "ppd",
    title: "Postpartum depression (PPD)",
    content: "If feelings of extreme sadness, anxiety or exhaustion last longer than two weeks or interfere with your ability to care for yourself or your baby, it may be PPD. This is a medical condition and support is available."
  },
  {
    id: "ppa",
    title: "Postpartum anxiety",
    content: "Excessive worrying, racing thoughts, or feeling overwhelmed by fears about your baby's health or safety can also occur."
  }
];

export default function EmotionalScreen() {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string>("blues");

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? "" : id);
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            Emotional Well-being
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/emotional.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>
            It's Okay to Feel More Than One Thing
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            The postpartum period brings a mix of emotions. Understanding what you are feeling is the first step.
          </Text>

          <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">Understanding Your Emotions</Text>

          {/* Accordions */}
          <View className="mb-8">
            {EMOTIONS.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <View key={item.id} className="mb-3 overflow-hidden rounded-[24px] border border-suhrhit-border/50 bg-white">
                  <TouchableOpacity 
                    onPress={() => toggleExpand(item.id)}
                    className="p-5 flex-row items-center justify-between"
                  >
                    <Text className="text-suhrhit-primary font-bold text-[16px]">{item.title}</Text>
                    {isExpanded ? <ChevronDown color="#7293B3" size={20} /> : <ChevronRight color="#7293B3" size={20} />}
                  </TouchableOpacity>
                  
                  {isExpanded && (
                    <View className="px-5 pb-5">
                      <Text className="text-gray-600 text-[14px] leading-[22px]">{item.content}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* WHO-5 Button */}
          <TouchableOpacity 
            onPress={() => router.push("/assessment")}
            className="flex-row items-center justify-center bg-[#183059] rounded-[16px] py-4 mb-8 shadow-sm"
          >
            <Activity color="#FFFFFF" size={20} className="mr-2" />
            <Text className="text-white font-bold text-[15px]">Take WHO-5 Well-being Assessment</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
