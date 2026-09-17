import { router } from "expo-router";
import { ChevronLeft, Info } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function GentleActivityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Gentle Physical Activity
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-2 mb-8">
           <Image 
             source={require("../../../../assets/images/pregnancy_journey/gentle_activity.jpg")}
             className="w-full h-48"
             resizeMode="contain"
           />
        </View>

        {/* 🚶 Walking */}
        <View className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]">
          <View className="w-12 h-12 rounded-full bg-[#E6F0FA] items-center justify-center mr-4">
            <Text className="text-[24px]">🚶‍♀️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">Walking</Text>
            <Text className="text-suhrhit-secondary text-[13px] pr-2 leading-[18px]">
              Comfortable / moderate-paced walking.
            </Text>
          </View>
        </View>

        {/* 🧘 Pelvic Floor Contractions */}
        <View className="bg-white rounded-3xl p-5 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]">
          <View className="w-12 h-12 rounded-full bg-[#F3E8FF] items-center justify-center mr-4">
            <Text className="text-[24px]">🧘‍♀️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px]">Pelvic Floor Contractions</Text>
          </View>
        </View>

        {/* 🤸 Gentle Stretching */}
        <View className="bg-white rounded-3xl p-5 mb-8 flex-row items-center shadow-sm border border-[#F0F4F8]">
          <View className="w-12 h-12 rounded-full bg-[#FFEAE5] items-center justify-center mr-4">
            <Text className="text-[24px]">🤸‍♀️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">Gentle Stretching</Text>
            <Text className="text-suhrhit-secondary text-[13px] pr-2 leading-[18px]">
              Pregnancy-appropriate gentle stretching.
            </Text>
          </View>
        </View>

        <View className="bg-[#E6F0FA] rounded-2xl p-4 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            Keep your body moving safely. Always listen to your body and don't push past your comfort level.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
