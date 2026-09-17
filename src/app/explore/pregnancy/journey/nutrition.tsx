import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Droplet, Info } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Tab = "Nutrients" | "Hydration" | "Food Safety";

export default function NutritionScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Nutrients");

  const nutrients = [
    { id: "iron", title: "Iron", subtitle: "Supports increased blood production.", emoji: "🥬" },
    { id: "calcium", title: "Calcium & Vitamin D", subtitle: "Helps build strong bones and teeth.", emoji: "🥛" },
    { id: "protein", title: "Protein", subtitle: "Supports your and your baby's growth.", emoji: "🥜" },
    { id: "folate", title: "Folate", subtitle: "Important for early brain and spine development.", emoji: "🌿" },
    { id: "iodine", title: "Iodine", subtitle: "Supports brain development.", emoji: "🧂" },
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
          Nutrition
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        Good food nourishes you and your baby.
      </Text>

      {/* Tabs */}
      <View className="px-6 flex-row mb-6">
        {(["Nutrients", "Hydration", "Food Safety"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-3 px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-[#3366CC]" : "bg-[#F0F4F8]"
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
        {activeTab === "Nutrients" && (
          <View>
            {nutrients.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/explore/pregnancy/journey/nutrient-detail?id=${item.id}`)}
                className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
              >
                <View className="w-12 h-12 rounded-full bg-[#F5F9FF] items-center justify-center mr-4">
                  <Text className="text-[24px]">{item.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{item.title}</Text>
                  <Text className="text-suhrhit-secondary text-[13px] pr-2">{item.subtitle}</Text>
                </View>
                <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
              </TouchableOpacity>
            ))}
            
            <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-2 flex-row mb-8">
              <Info color="#3366CC" size={20} className="mr-3" />
              <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
                These are general food sources, not a personalized diet plan. Nutritional requirements vary between individuals.
              </Text>
            </View>
          </View>
        )}

        {activeTab === "Hydration" && (
          <View className="bg-white rounded-3xl p-6 mb-8 border border-[#F0F4F8]">
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 rounded-full bg-[#E6F0FA] items-center justify-center mr-4">
                <Droplet color="#3366CC" size={24} />
              </View>
              <Text className="text-suhrhit-primary font-bold text-[20px]">Hydration</Text>
            </View>
            
            <Text className="text-suhrhit-primary text-[15px] mb-4 font-semibold">Suggested options:</Text>
            {["Water", "Milk", "Buttermilk", "Soups", "Coconut water", "Water-rich fruits"].map((item, idx) => (
              <View key={idx} className="flex-row items-center mb-3">
                <View className="w-2 h-2 rounded-full bg-[#3366CC] mr-3" />
                <Text className="text-suhrhit-secondary text-[15px]">{item}</Text>
              </View>
            ))}
            
            <View className="bg-[#F5F9FF] rounded-2xl p-4 mt-6">
              <Text className="text-[#3366CC] text-[13px] leading-[18px]">
                Your fluid requirements may vary depending on your health, activity, climate and pregnancy-related symptoms.
              </Text>
            </View>
          </View>
        )}

        {activeTab === "Food Safety" && (
          <View className="mb-8">
            <View className="bg-white rounded-3xl p-6 mb-4 border border-[#FEE2E2]">
              <Text className="text-[#DC2626] font-bold text-[18px] mb-4 flex-row items-center">
                🚫 Avoid
              </Text>
              {[
                "Alcohol", 
                "Tobacco/smoking", 
                "Second-hand smoke", 
                "Unpasteurized milk/products", 
                "Raw or undercooked meat", 
                "Raw/undercooked eggs", 
                "High-risk raw seafood"
              ].map((item, idx) => (
                <View key={idx} className="flex-row items-center mb-3">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mr-3" />
                  <Text className="text-suhrhit-secondary text-[15px]">{item}</Text>
                </View>
              ))}
            </View>

            <View className="bg-white rounded-3xl p-6 mb-6 border border-[#FEF3C7]">
              <Text className="text-[#D97706] font-bold text-[18px] mb-4 flex-row items-center">
                ⚠️ Limit
              </Text>
              {[
                "Excess caffeine", 
                "Highly processed foods", 
                "Excessively sugary foods/drinks"
              ].map((item, idx) => (
                <View key={idx} className="flex-row items-center mb-3">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#D97706] mr-3" />
                  <Text className="text-suhrhit-secondary text-[15px]">{item}</Text>
                </View>
              ))}
            </View>

            <View className="bg-[#FEF2F2] rounded-2xl p-4">
              <Text className="text-[#DC2626] text-[13px] leading-[18px]">
                Avoid taking medicines, supplements or herbal/Ayurvedic preparations without discussing them with your healthcare provider.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
