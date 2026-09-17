import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { ChevronLeft, Calendar, Plus } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

export default function BabyHealthScreen() {
  const insets = useSafeAreaInsets();
  
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [head, setHead] = useState("");

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            My Baby's Health
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/baby_health.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-2 leading-[32px]" style={{ fontFamily: 'Georgia' }}>
            Your Baby's{"\n"}First Health Records
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            Track your baby's growth and key information.
          </Text>

          {/* Birth Information */}
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 shadow-sm mb-6">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">Birth Information</Text>
            
            {/* Date of birth */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">Date of birth</Text>
              <TouchableOpacity className="flex-row items-center bg-[#F0F5FA] rounded-xl px-4 py-2">
                <Text className="text-suhrhit-secondary mr-2">{dob || "Select"}</Text>
                <Calendar color="#7293B3" size={18} />
              </TouchableOpacity>
            </View>

            {/* Birth weight */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">Birth weight</Text>
              <View className="flex-row items-center">
                <TextInput 
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">kg</Text>
              </View>
            </View>

            {/* Birth length */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">Birth length</Text>
              <View className="flex-row items-center">
                <TextInput 
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={length}
                  onChangeText={setLength}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">cm</Text>
              </View>
            </View>

            {/* Head circumference */}
            <View className="flex-row items-center justify-between py-3">
              <Text className="text-suhrhit-primary text-[15px]">Head circumference</Text>
              <View className="flex-row items-center">
                <TextInput 
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={head}
                  onChangeText={setHead}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">cm</Text>
              </View>
            </View>
          </View>

          {/* Growth Record */}
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 shadow-sm mb-6">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">Growth Record</Text>
            
            <TouchableOpacity className="flex-row items-center justify-center bg-[#E6F0FA] rounded-[16px] py-4">
              <Plus color="#183059" size={20} className="mr-2" />
              <Text className="text-suhrhit-primary font-bold text-[15px]">Add New Measurement</Text>
            </TouchableOpacity>
          </View>

          {/* Note */}
          <View className="bg-[#FDF9E6] p-4 rounded-xl border border-[#FBE697] mb-8">
            <Text className="text-[#8C6D1F] text-[12px] leading-[18px]">
              Every baby grows at their own pace. SUHRIT does not diagnose growth or developmental problems. If you have concerns about your baby's growth, speak with a pediatrician.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
