import { router } from "expo-router";
import { ChevronLeft, Info, Wind } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const PRACTICES = [
  { name: "Anulom-Vilom / Nadi Shodhana", subtitle: "Alternate nostril breathing." },
  { name: "Bhramari Pranayama", subtitle: "Humming bee breath for deep relaxation." },
  { name: "Sectional / Diaphragmatic Breathing", subtitle: "Deep belly breathing." },
  { name: "Sheetali Pranayama", subtitle: "Cooling breath practice." },
  { name: "Dirgha / Deep Breathing", subtitle: "Three-part deep breathing." },
];

export default function BreathingPracticesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Breathing Practices
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-4">
        Calm your mind and body.
      </Text>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-2 mb-8">
           <Image 
             source={require("../../../../assets/images/pregnancy_journey/breathing.jpg")}
             className="w-full h-48"
             resizeMode="contain"
           />
        </View>

        <View className="mb-6">
          {PRACTICES.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
            >
              <View className="w-12 h-12 rounded-full bg-[#E0F2FE] items-center justify-center mr-4">
                <Wind color="#0EA5E9" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{item.name}</Text>
                <Text className="text-suhrhit-secondary text-[13px] pr-2 leading-[18px]">
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-[#E6F0FA] rounded-2xl p-4 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            Avoid holding your breath (Kumbhaka) during pregnancy. Focus on smooth, continuous, and relaxing breaths. Stop if you feel dizzy or lightheaded.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
