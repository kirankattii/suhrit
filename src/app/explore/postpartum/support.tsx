import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, Phone, AlertTriangle } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const MOTHER_RED_FLAGS = [
  "Heavy vaginal bleeding (soaking more than one pad an hour or passing large clots)",
  "Fever or chills",
  "Severe abdominal pain or worsening pain",
  "Foul-smelling vaginal discharge",
  "Difficulty breathing or chest pain",
  "Pain, swelling, or redness in your legs",
  "Feelings of wanting to harm yourself or your baby",
  "Severe headache or vision changes"
];

const BABY_RED_FLAGS = [
  "Fever",
  "Difficulty breathing or breathing very fast",
  "Not feeding well or refusing to feed",
  "Yellowing of the skin or eyes (jaundice) that is worsening",
  "Unusually sleepy, difficult to wake up, or continuous high-pitched crying",
  "Very few wet diapers"
];

export default function SupportScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            Support & Help
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/support.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>
            When to Seek Support
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            Know the warning signs. If you experience any of these, please seek medical help immediately.
          </Text>

          {/* Mother Red Flags */}
          <View className="bg-[#FFF0F0] rounded-[24px] p-6 border border-[#FFE0E0] mb-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <AlertTriangle color="#D32F2F" size={20} className="mr-2" />
              <Text className="text-[#D32F2F] font-bold text-[18px]">Red Flags for the Mother</Text>
            </View>
            <View>
              {MOTHER_RED_FLAGS.map((flag, index) => (
                <View key={index} className="flex-row items-start mb-3 last:mb-0">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] mt-2 mr-3" />
                  <Text className="text-[#D32F2F] text-[14px] leading-[20px] flex-1">{flag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Baby Red Flags */}
          <View className="bg-[#FFF0F0] rounded-[24px] p-6 border border-[#FFE0E0] mb-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <AlertTriangle color="#D32F2F" size={20} className="mr-2" />
              <Text className="text-[#D32F2F] font-bold text-[18px]">Red Flags for the Baby</Text>
            </View>
            <View>
              {BABY_RED_FLAGS.map((flag, index) => (
                <View key={index} className="flex-row items-start mb-3 last:mb-0">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] mt-2 mr-3" />
                  <Text className="text-[#D32F2F] text-[14px] leading-[20px] flex-1">{flag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Button */}
          <TouchableOpacity className="flex-row items-center justify-center bg-[#D32F2F] rounded-[16px] py-4 mb-8 shadow-sm">
            <Phone color="#FFFFFF" size={20} className="mr-2" />
            <Text className="text-white font-bold text-[15px]">Contact Healthcare Provider</Text>
          </TouchableOpacity>

          {/* Closing Message */}
          <View className="bg-[#E6F0FA] p-6 rounded-[24px] mb-8">
            <Text className="text-[#183059] text-[16px] leading-[24px] text-center font-medium italic" style={{ fontFamily: 'Georgia' }}>
              "The postpartum period is a time of immense change. Take it one day at a time, listen to your body, and don't hesitate to ask for help when you need it."
            </Text>
          </View>

        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
