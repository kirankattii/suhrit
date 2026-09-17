import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Square, CheckSquare } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const NUTRIENT_DATA = {
  iron: {
    title: "Iron",
    subtitle: "Supports increased blood production during pregnancy.",
    vegetarian: ["Dal / lentils", "Chickpeas", "Rajma", "Green leafy vegetables", "Sesame seeds", "Nuts and seeds", "Iron-fortified foods"],
    nonVegetarian: ["Eggs", "Fish", "Chicken", "Lean meat"],
    tip: "Pair plant-based iron sources with vitamin C-rich foods like citrus fruits to improve absorption.",
    image: require("../../../../assets/images/pregnancy_journey/iron_foods.jpg")
  },
  calcium: {
    title: "Calcium & Vitamin D",
    subtitle: "Helps build strong bones and teeth.",
    vegetarian: ["Milk", "Curd / yogurt", "Paneer", "Ragi", "Sesame seeds", "Calcium-fortified foods", "Safe sunlight exposure (Vit D)"],
    nonVegetarian: ["Fish with edible bones", "Egg yolk (Vit D)", "Fatty fish (Vit D)"],
    image: require("../../../../assets/images/pregnancy_journey/nutrition_calcium.jpg") // Fallback
  },
  protein: {
    title: "Protein",
    subtitle: "Supports your and your baby's growth.",
    vegetarian: ["Dal", "Beans", "Chickpeas", "Rajma", "Soy / tofu", "Paneer", "Milk / curd", "Nuts / seeds"],
    nonVegetarian: ["Eggs", "Chicken", "Fish", "Lean meat"],
    image: require("../../../../assets/images/pregnancy_journey/nutrition_protein.jpg")
  },
  folate: {
    title: "Folate",
    subtitle: "Important for early brain and spine development.",
    vegetarian: ["Green leafy vegetables", "Beans / lentils", "Chickpeas", "Peanuts", "Citrus fruits", "Fortified cereals / grains"],
    nonVegetarian: [],
    image: require("../../../../assets/images/pregnancy_journey/nutrition_folate.jpg")
  },
  iodine: {
    title: "Iodine",
    subtitle: "Supports brain development.",
    vegetarian: ["Iodized salt", "Milk / dairy"],
    nonVegetarian: ["Eggs", "Fish / seafood"],
    tip: "Avoid excessive salt intake.",
    image: require("../../../../assets/images/pregnancy_journey/nutrition_iodine.jpg")
  }
};

export default function NutrientDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<"vegetarian" | "nonVegetarian">("vegetarian");

  const data = NUTRIENT_DATA[id as keyof typeof NUTRIENT_DATA] || NUTRIENT_DATA.iron;

  const currentList = data[activeTab];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="w-10">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[20px] font-bold" style={{ fontFamily: 'Georgia' }}>
          {data.title}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View className="items-center mt-2 mb-6">
           <Image 
             source={data.image}
             className="w-full h-40"
             resizeMode="contain"
           />
        </View>

        <Text className="text-suhrhit-primary text-[16px] text-center mb-6 px-4 font-medium leading-[22px]">
          {data.subtitle}
        </Text>

        {/* Tabs for Veg/Non-Veg (only if Non-Veg exists) */}
        {data.nonVegetarian.length > 0 && (
          <View className="flex-row bg-[#F0F4F8] rounded-full p-1 mb-6">
            <TouchableOpacity 
              onPress={() => setActiveTab("vegetarian")}
              className={`flex-1 py-2.5 rounded-full items-center ${activeTab === "vegetarian" ? "bg-[#3366CC]" : ""}`}
            >
              <Text className={`font-semibold text-[14px] ${activeTab === "vegetarian" ? "text-white" : "text-[#5C728E]"}`}>
                Vegetarian
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab("nonVegetarian")}
              className={`flex-1 py-2.5 rounded-full items-center ${activeTab === "nonVegetarian" ? "bg-[#3366CC]" : ""}`}
            >
              <Text className={`font-semibold text-[14px] ${activeTab === "nonVegetarian" ? "text-white" : "text-[#5C728E]"}`}>
                Non-Vegetarian
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* List of Sources */}
        <View className="mb-6">
          {currentList.map((item, index) => (
            <View 
              key={index} 
              className="flex-row items-center py-3 border-b border-[#F0F4F8]"
            >
              <View className="w-2 h-2 rounded-full bg-[#3366CC] mr-4 ml-2" />
              <Text className="text-suhrhit-primary text-[15px]">{item}</Text>
            </View>
          ))}
          {currentList.length === 0 && (
            <Text className="text-suhrhit-secondary text-center italic py-4">No specific sources listed.</Text>
          )}
        </View>

        {/* Tip Box */}
        {data.tip && (
          <View className="bg-[#FEF3C7] rounded-2xl p-4 flex-row items-start mb-8">
            <Text className="text-[20px] mr-3">💡</Text>
            <View className="flex-1">
              <Text className="font-bold text-[#D97706] mb-1">Tip:</Text>
              <Text className="text-[#92400E] text-[13px] leading-[18px]">{data.tip}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
