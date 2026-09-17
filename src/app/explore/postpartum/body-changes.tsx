import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const CHANGES = [
  {
    id: "stomach",
    title: "Stomach area and skin",
    content: "It is normal for your stomach to look and feel different after birth. The skin may be looser, and stretch marks, if present, are a natural part of the journey. Over time, your body will recover at its own pace."
  },
  {
    id: "hair",
    title: "Hair changes",
    content: "You might experience increased hair shedding in the months following delivery due to hormonal changes. This is temporary and hair growth typically returns to its normal cycle."
  },
  {
    id: "shape",
    title: "Changes in shape",
    content: "Your hips and ribs might be slightly wider than before. Give yourself grace. The priority right now is healing and nourishing your body, not 'bouncing back'."
  }
];

export default function BodyChangesScreen() {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string>("stomach"); // First one expanded by default

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
            Body Changes
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/body_changes.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>
            Your Body is Healing
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            Your body went through a remarkable journey. Be patient and kind to yourself as it recovers and changes.
          </Text>

          {/* Accordions */}
          <View className="mb-6">
            {CHANGES.map((item) => {
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

          <View className="bg-[#E6F0FA] p-5 rounded-[24px] mb-8">
            <Text className="text-[#183059] text-[15px] leading-[22px] text-center font-medium italic" style={{ fontFamily: 'Georgia' }}>
              "Your body created and sustained life. It deserves patience, respect and time to heal."
            </Text>
          </View>

        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
