import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, Camera } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const MILESTONES = [
  {
    age: "1-2 Months",
    items: [
      "Start to smile at people",
      "Coo or make gurgling sounds",
      "Turn their head toward sounds"
    ]
  },
  {
    age: "3-4 Months",
    items: [
      "Smile spontaneously",
      "Copy some movements and facial expressions",
      "Babble",
      "Reach for toys with one hand"
    ]
  },
  {
    age: "5-6 Months",
    items: [
      "Recognize familiar faces",
      "Respond to their own name",
      "Bring things to their mouth",
      "Begin to sit without support"
    ]
  },
  {
    age: "7-9 Months",
    items: [
      "May be afraid of strangers",
      "Understand \"no\"",
      "Copy sounds and gestures of others",
      "Crawl"
    ]
  },
  {
    age: "10-12 Months",
    items: [
      "Say \"mama\" and \"dada\"",
      "Play games like \"peek-a-boo\"",
      "Pull up to stand",
      "Walk holding on to furniture"
    ]
  }
];

export default function MilestonesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(MILESTONES[0].age);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setChecks(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const activeData = MILESTONES.find(m => m.age === activeTab);

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            Baby's Little Moments
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/milestone.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-2" style={{ fontFamily: 'Georgia' }}>
            Every Moment is a Milestone
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-6">
            These are general signs of development. Every child develops at their own pace.
          </Text>

          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-6 px-6">
            <View className="flex-row pr-12">
              {MILESTONES.map((item) => (
                <TouchableOpacity
                  key={item.age}
                  onPress={() => setActiveTab(item.age)}
                  className={`py-2 px-5 mr-3 rounded-full border ${activeTab === item.age ? 'bg-[#7293B3] border-[#7293B3]' : 'bg-white border-[#D1D9E6]'}`}
                >
                  <Text className={`font-bold text-[13px] ${activeTab === item.age ? 'text-white' : 'text-suhrhit-secondary'}`}>
                    {item.age}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Checklist */}
          {activeData && (
            <View className="bg-white rounded-[24px] p-5 border border-suhrhit-border/50 shadow-sm mb-6">
              {activeData.items.map((item, index) => (
                <View key={index} className="flex-row items-center py-3 border-b border-[#F0F5FA] last:border-0">
                  <TouchableOpacity
                    onPress={() => toggleCheck(item)}
                    className={`w-6 h-6 rounded-md border-2 mr-4 items-center justify-center ${checks[item] ? 'bg-[#7293B3] border-[#7293B3]' : 'bg-transparent border-[#D1D9E6]'}`}
                  >
                    {checks[item] && <Text className="text-white text-[12px]">✓</Text>}
                  </TouchableOpacity>
                  <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">{item}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Photo Button */}
          <TouchableOpacity className="flex-row items-center justify-center bg-[#E6F0FA] rounded-[16px] py-4 mb-8">
            <Camera color="#183059" size={20} className="mr-2" />
            <Text className="text-suhrhit-primary font-bold text-[15px]">Take a Photo</Text>
          </TouchableOpacity>

          {/* Note */}
          <View className="bg-[#FDF9E6] p-4 rounded-xl border border-[#FBE697] mb-8">
            <Text className="text-[#8C6D1F] text-[12px] leading-[18px]">
              Developmental milestones are only a general guide. If you have any concerns about your baby's development, always discuss them with your pediatrician.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
