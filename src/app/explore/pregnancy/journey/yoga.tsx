import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Info } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Tab = "All Poses" | "By Trimester";

export default function YogaScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("All Poses");

  const categories = [
    {
      id: "grounding",
      number: "1.",
      title: "Gentle & Grounding",
      subtitle: "Tadasana, Sukhasana, Vajrasana and more",
      emoji: "🧘‍♀️",
    },
    {
      id: "mobility",
      number: "2.",
      title: "Mobility & Flexibility",
      subtitle: "Cat-Cow, Baddha Konasana and more",
      emoji: "🌸",
    },
    {
      id: "strength",
      number: "3.",
      title: "Strength & Balance",
      subtitle: "Trikonasana, Warrior I & II",
      emoji: "🤸‍♀️",
    },
    {
      id: "modified",
      number: "4.",
      title: "Modified Poses",
      subtitle: "Modified Malasana and relaxation poses",
      emoji: "🛋️",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Pregnancy Yoga
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        Gentle poses for a stronger, calmer you.
      </Text>

      {/* Tabs */}
      <View className="px-6 flex-row bg-[#F0F4F8] rounded-full p-1 mb-6">
        {(["All Poses", "By Trimester"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full items-center ${
              activeTab === tab ? "bg-[#3366CC]" : ""
            }`}
          >
            <Text
              className={`font-semibold text-[14px] ${
                activeTab === tab ? "text-white" : "text-[#5C728E]"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
          >
            <View className="w-12 h-12 rounded-full bg-[#E6F0FA] items-center justify-center mr-4">
              <Text className="text-[24px]">{cat.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">
                {cat.number} {cat.title}
              </Text>
              <Text className="text-suhrhit-secondary text-[13px] pr-2 leading-[18px]">
                {cat.subtitle}
              </Text>
            </View>
            <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
          </TouchableOpacity>
        ))}

        <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-4 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            These poses are for women with uncomplicated pregnancies. Follow your doctor's advice and stop if you feel discomfort.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
