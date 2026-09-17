import { router } from "expo-router";
import { ChevronLeft, Info, AlertTriangle } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const WARNING_SIGNS = [
  "Heavy vaginal bleeding",
  "Severe / persistent abdominal or pelvic pain",
  "Severe headache with visual changes",
  "Fainting or severe dizziness",
  "Difficulty breathing",
  "Chest pain",
  "Sudden significant swelling",
  "Fluid leakage",
  "Regular painful contractions before expected time",
  "Significant reduction / change in fetal movement",
  "Any severe or concerning symptom",
];

export default function SafetyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[20px] font-bold" style={{ fontFamily: 'Georgia' }}>
          When Something Doesn't Feel Right
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        Know the signs. Seek help early.
      </Text>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-3xl p-6 border border-[#FEE2E2] mb-8 shadow-sm">
          {WARNING_SIGNS.map((item, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mr-4" />
              <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">{item}</Text>
            </View>
          ))}
          
          <TouchableOpacity className="bg-[#DC2626] rounded-full py-4 flex-row items-center justify-center mt-4">
            <AlertTriangle color="white" size={20} className="mr-2" strokeWidth={2.5} />
            <Text className="text-white font-bold text-[16px]">Seek Medical Help</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-[#FEF2F2] rounded-2xl p-5 mb-4 items-center">
          <Text className="text-[#DC2626] text-[15px] leading-[22px] text-center font-bold italic mb-2">
            You know your body.
          </Text>
          <Text className="text-[#DC2626] text-[14px] leading-[20px] text-center italic">
            If something feels seriously wrong, don't wait for the app to tell you what to do.
          </Text>
        </View>

        <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-2 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            SUHRIT cannot assess emergencies or determine whether your pregnancy is safe. If you experience severe or concerning symptoms, contact your healthcare provider or seek urgent medical care.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
