import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Info } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Tab = "Common Changes" | "Positive Support";

const CHANGES = [
  { title: "Growing Belly", subtitle: "Your baby is growing.", emoji: "🤰" },
  { title: "Weight Changes", subtitle: "A natural part of pregnancy.", emoji: "⚖️" },
  { title: "Breast Changes", subtitle: "Your body is preparing.", emoji: "🩷" },
  { title: "Stretch Marks", subtitle: "Common and normal.", emoji: "🌸" },
  { title: "Skin Changes", subtitle: "Due to hormonal changes.", emoji: "✨" },
  { title: "Hair Changes", subtitle: "May look or feel different.", emoji: "💇‍♀️" },
  { title: "Swelling", subtitle: "Can occur, particularly later on.", emoji: "🦶" },
];

export default function BodyChangesScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Common Changes");

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Body Changes & Self-Image
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        A changing body. A stronger you.
      </Text>

      {/* Tabs */}
      <View className="px-6 flex-row bg-[#F0F4F8] rounded-full p-1 mb-6">
        {(["Common Changes", "Positive Support"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full items-center ${
              activeTab === tab ? "bg-[#3366CC]" : ""
            }`}
          >
            <Text
              className={`font-semibold text-[13px] ${
                activeTab === tab ? "text-white" : "text-[#5C728E]"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {activeTab === "Common Changes" && (
          <View>
            {CHANGES.map((item, index) => (
              <View
                key={index}
                className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
              >
                <View className="w-12 h-12 rounded-full bg-[#FFEAE5] items-center justify-center mr-4">
                  <Text className="text-[24px]">{item.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{item.title}</Text>
                  <Text className="text-suhrhit-secondary text-[13px] pr-2 leading-[18px]">{item.subtitle}</Text>
                </View>
              </View>
            ))}

            <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-2 flex-row items-start mb-8">
              <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
              <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
                Sudden or significant swelling should be discussed with your healthcare provider.
              </Text>
            </View>
          </View>
        )}

        {activeTab === "Positive Support" && (
          <View className="bg-white rounded-3xl p-6 border border-[#F0F4F8] mb-8">
            <Text className="text-[40px] text-center mb-4">❤️</Text>
            <Text className="text-suhrhit-primary font-bold text-[18px] text-center mb-4">
              Pregnancy Body
            </Text>
            <Text className="text-suhrhit-secondary text-[15px] leading-[22px] text-center mb-4">
              "There is no single way a pregnant body should look."
            </Text>
            <Text className="text-suhrhit-secondary text-[15px] leading-[22px] text-center">
              "Your body does not need to look perfect to be doing something extraordinary."
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
