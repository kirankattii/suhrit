import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Activity, Heart, Wind, Info } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function MovementScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Movement & Mindfulness
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        A stronger, healthier you for an easier tomorrow.
      </Text>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>

        {/* Disclaimer */}
        <View className="bg-[#FEF2F2] rounded-2xl p-4 flex-row items-start mb-6 border border-[#FEE2E2]">
          <Info color="#DC2626" size={20} className="mr-3 mt-0.5" />
          <View className="flex-1">
            <Text className="text-[#DC2626] text-[13px] leading-[18px] mb-2 font-medium">
              These activities are intended for women with uncomplicated pregnancies. If your doctor has advised you to restrict physical activity, do not perform these exercises without professional guidance.
            </Text>
            <Text className="text-[#DC2626] text-[13px] leading-[18px]">
              Stop exercising and seek medical advice if you experience bleeding, dizziness, chest pain, shortness of breath, severe pain, contractions, or fluid leakage.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/explore/pregnancy/journey/gentle-activity")}
          className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
        >
          <View className="w-12 h-12 rounded-full bg-[#FFEAE5] items-center justify-center mr-4">
            <Activity color="#FF6B6B" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">Gentle Physical Activity</Text>
            <Text className="text-suhrhit-secondary text-[13px] pr-2">Walking, stretching and more</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/explore/pregnancy/journey/yoga")}
          className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
        >
          <View className="w-12 h-12 rounded-full bg-[#FCE7F3] items-center justify-center mr-4">
            <Heart color="#EC4899" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">Pregnancy Yoga</Text>
            <Text className="text-suhrhit-secondary text-[13px] pr-2">Safe and gentle poses</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/explore/pregnancy/journey/breathing")}
          className="bg-white rounded-3xl p-5 mb-8 flex-row items-center shadow-sm border border-[#F0F4F8]"
        >
          <View className="w-12 h-12 rounded-full bg-[#E0F2FE] items-center justify-center mr-4">
            <Wind color="#0EA5E9" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">Breathing Practices</Text>
            <Text className="text-suhrhit-secondary text-[13px] pr-2">Calm your mind and body</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
        </TouchableOpacity>

        <View className="bg-[#E6F0FA] rounded-3xl mt-2 mb-8 overflow-hidden relative">
          <View className="flex-row items-center h-48">
            <View className="w-1/2 h-full absolute left-[-20px] bottom-[-10px]">
              <Image 
                source={require("../../../../assets/images/pregnancy_journey/meditation.jpg")}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 ml-[45%] p-4 z-10">
              <Text className="font-bold text-[#3366CC] text-[22px] mb-1 italic" style={{ fontFamily: 'Georgia' }}>Gentle{'\n'}Steps</Text>
              <Text className="font-bold text-[#3366CC] text-[22px] italic" style={{ fontFamily: 'Georgia' }}>Stronger{'\n'}Tomorrows</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
