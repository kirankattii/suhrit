import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { ChevronRight, ChevronDown, ChevronLeft, Droplets, Ban } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const NUTRIENTS = [
  {
    id: "protein",
    name: "Protein",
    icon: "🥚",
    why: "Supports tissue repair and recovery.",
    veg: ["Dal", "Chickpeas (chana)", "Rajma", "Moong", "Soy / Tofu", "Paneer", "Milk", "Curd", "Nuts and seeds"],
    nonVeg: ["Eggs", "Fish", "Chicken", "Lean meat"]
  },
  {
    id: "iron",
    name: "Iron",
    icon: "🩸",
    why: "Helps support healthy blood formation and recovery of iron stores.",
    veg: ["Lentils and dal", "Chickpeas", "Rajma", "Green leafy vegetables", "Ragi", "Sesame seeds (til)", "Peas"],
    nonVeg: ["Eggs", "Fish", "Chicken", "Lean meat"],
    note: "Pair plant-based iron-rich foods with vitamin-C-rich foods such as amla, guava, oranges or tomatoes to help your body absorb iron."
  },
  {
    id: "calcium",
    name: "Calcium",
    icon: "⭐",
    why: "Supports bones, teeth and normal muscle function.",
    veg: ["Milk", "Curd", "Paneer", "Ragi", "Sesame seeds", "Calcium-fortified foods"],
    nonVeg: ["Sardines and other small fish eaten with bones", "Other suitable fish"]
  },
  {
    id: "vitamin_d",
    name: "Vitamin D",
    icon: "🌿",
    why: "Helps your body absorb calcium and supports bone health.",
    veg: ["Vitamin-D-fortified milk or foods", "Appropriate sunlight exposure"],
    nonVeg: ["Egg yolk", "Fatty fish such as sardines and salmon"],
    note: "Vitamin D needs differ between individuals. Supplements should only be taken according to professional advice."
  },
  {
    id: "folate",
    name: "Folate",
    icon: "✨",
    why: "Supports normal cell growth and blood formation.",
    veg: ["Spinach and other leafy vegetables", "Dal", "Beans", "Chickpeas", "Peas", "Citrus fruits", "Avocado"],
    nonVeg: ["Eggs", "Fish", "Chicken"]
  },
  {
    id: "iodine",
    name: "Iodine",
    icon: "💧",
    why: "Supports normal thyroid function.",
    veg: ["Iodized salt", "Milk", "Curd"],
    nonVeg: ["Eggs", "Fish and seafood"],
    note: "Choose iodized salt for regular household use while keeping overall salt intake moderate."
  },
  {
    id: "fibre",
    name: "Fibre",
    icon: "🥬",
    why: "Supports healthy digestion and may help prevent constipation.",
    veg: ["Whole grains", "Oats", "Millets", "Dal", "Beans", "Fruits", "Vegetables", "Nuts and seeds"],
    nonVeg: []
  }
];

export default function NutritionScreen() {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
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
            Nutrition & Recovery
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/nutrition.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-center text-[24px] font-bold mb-2" style={{ fontFamily: 'Georgia' }}>
            Nourish Yourself.{"\n"}Recover Gently.
          </Text>
          <Text className="text-suhrhit-primary/80 text-center text-[15px] leading-[22px] mb-8">
            Good nutrition supports your healing, energy and well-being.
          </Text>

          {/* Section 1: Key Nutrients */}
          <Text className="text-suhrhit-primary font-bold text-[20px] mb-4 mt-2">Key Nutrients</Text>
          <View className="mb-8">
            {NUTRIENTS.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <View key={item.id} className="mb-3 overflow-hidden rounded-[24px] border border-suhrhit-border/50 bg-white shadow-sm">
                  <TouchableOpacity 
                    onPress={() => toggleExpand(item.id)}
                    className="p-5 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center flex-1 pr-4">
                      <Text className="text-[24px] mr-4">{item.icon}</Text>
                      <View className="flex-1">
                        <Text className="text-suhrhit-primary font-bold text-[16px]">{item.name}</Text>
                        {!isExpanded && <Text className="text-suhrhit-secondary text-[13px] mt-1" numberOfLines={1}>{item.why}</Text>}
                      </View>
                    </View>
                    {isExpanded ? <ChevronDown color="#7293B3" size={20} /> : <ChevronRight color="#7293B3" size={20} />}
                  </TouchableOpacity>
                  
                  {isExpanded && (
                    <View className="px-5 pb-5 pt-2">
                      <Text className="text-[#1A1A1A] font-bold text-[14px] mb-1">Why it matters</Text>
                      <Text className="text-gray-600 text-[14px] mb-5 leading-[20px]">{item.why}</Text>

                      {item.veg.length > 0 && (
                        <>
                          <Text className="text-[#1A1A1A] font-bold text-[14px] mb-3">Vegetarian sources</Text>
                          <View className="flex-row flex-wrap gap-2 mb-5">
                            {item.veg.map((food, i) => (
                              <View key={i} className="bg-[#F5F9FF] px-3 py-1.5 rounded-full border border-[#E6F0FA]">
                                <Text className="text-suhrhit-primary text-[13px]">{food}</Text>
                              </View>
                            ))}
                          </View>
                        </>
                      )}

                      {item.nonVeg.length > 0 && (
                        <>
                          <Text className="text-[#1A1A1A] font-bold text-[14px] mb-3">Non-vegetarian sources</Text>
                          <View className="flex-row flex-wrap gap-2 mb-5">
                            {item.nonVeg.map((food, i) => (
                              <View key={i} className="bg-[#FFF0F0] px-3 py-1.5 rounded-full border border-[#FFE0E0]">
                                <Text className="text-suhrhit-primary text-[13px]">{food}</Text>
                              </View>
                            ))}
                          </View>
                        </>
                      )}

                      {item.note && (
                        <View className="bg-[#FFF9E6] p-4 rounded-xl border border-[#FFE4A0] mt-2">
                          <Text className="text-[#8C6D1F] text-[13px] leading-[18px]">{item.note}</Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Section 2: Hydration */}
          <Text className="text-suhrhit-primary font-bold text-[20px] mb-4">Hydration</Text>
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 mb-8 shadow-sm">
            <View className="bg-[#E6F0FA] w-12 h-12 rounded-full items-center justify-center mb-4">
              <Droplets color="#183059" size={24} />
            </View>
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-3">Stay Hydrated</Text>
            <Text className="text-gray-600 text-[15px] leading-[22px] mb-6">
              Regular fluid intake is important during postpartum recovery.
            </Text>
            
            <View className="flex-row flex-wrap gap-3 mb-6">
              {["Water", "Milk", "Buttermilk", "Soups", "Coconut water", "Other suitable fluids"].map((item, i) => (
                <View key={i} className="bg-[#F5F9FF] px-4 py-2 rounded-full border border-[#E6F0FA]">
                  <Text className="text-suhrhit-primary text-[14px]">{item}</Text>
                </View>
              ))}
            </View>
            
            <View className="bg-[#F0F5FA] p-4 rounded-xl border border-suhrhit-border/50">
              <Text className="text-suhrhit-primary font-bold text-[13px] mb-1">Breastfeeding Note</Text>
              <Text className="text-gray-600 text-[13px] leading-[18px]">
                If you are breastfeeding, your fluid and nutritional needs may be different. Drink regularly according to your thirst and follow individual advice from your healthcare professional.
              </Text>
            </View>
          </View>

          {/* Section 3: Foods to Avoid */}
          <Text className="text-suhrhit-primary font-bold text-[20px] mb-4">Foods & Drinks to Limit</Text>
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 mb-8 shadow-sm">
            <View className="mb-6">
              <View className="flex-row items-start mb-4">
                <View className="bg-[#FFF0F0] w-10 h-10 rounded-full items-center justify-center mr-4 border border-[#FFE0E0]">
                  <Ban color="#E53935" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-[#D32F2F] font-bold text-[15px] mb-1">Alcohol</Text>
                  <Text className="text-gray-600 text-[14px] leading-[20px]">Avoid alcohol, particularly if you are breastfeeding.</Text>
                </View>
              </View>

              <View className="flex-row items-start mb-6">
                <View className="bg-[#FFF0F0] w-10 h-10 rounded-full items-center justify-center mr-4 border border-[#FFE0E0]">
                  <Ban color="#E53935" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-[#D32F2F] font-bold text-[15px] mb-1">Tobacco & nicotine</Text>
                  <Text className="text-gray-600 text-[14px] leading-[20px]">Avoid smoking, tobacco and nicotine exposure.</Text>
                </View>
              </View>

              <Text className="text-[#F57C00] font-bold text-[16px] mb-4 mt-2">Limit These Items</Text>
              
              <View className="flex-row items-start mb-4">
                <View className="w-10 h-10 items-center justify-center mr-4 bg-[#F5F9FF] rounded-full border border-[#E6F0FA]">
                  <Text className="text-[18px]">☕</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">Excess caffeine</Text>
                  <Text className="text-gray-600 text-[14px] leading-[20px]">Keep caffeine intake moderate, particularly while breastfeeding.</Text>
                </View>
              </View>

              <View className="flex-row items-start mb-4">
                <View className="w-10 h-10 items-center justify-center mr-4 bg-[#F5F9FF] rounded-full border border-[#E6F0FA]">
                  <Text className="text-[18px]">🍟</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">Highly processed foods</Text>
                  <Text className="text-gray-600 text-[14px] leading-[20px]">Limit foods high in added sugar, salt and unhealthy fats.</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-10 h-10 items-center justify-center mr-4 bg-[#F5F9FF] rounded-full border border-[#E6F0FA]">
                  <Text className="text-[18px]">🐟</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">High-mercury fish</Text>
                  <Text className="text-gray-600 text-[14px] leading-[20px]">Avoid fish known to contain high levels of mercury and choose safer fish varieties instead.</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View className="bg-suhrhit-primary/5 p-4 rounded-xl border border-suhrhit-primary/10 mb-8">
            <Text className="text-suhrhit-primary font-bold text-[12px] uppercase mb-1">Important Disclaimer</Text>
            <Text className="text-suhrhit-secondary text-[12px] leading-[18px]">
              Food practices differ across families and cultures. These are general nutritional information and are not a prescribed diet. Individual nutritional needs may differ. Consult a qualified healthcare professional or dietitian when needed.
            </Text>
          </View>

        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
