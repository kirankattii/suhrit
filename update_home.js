const fs = require('fs');

const newContent = `import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Brain,
  Droplet,
  Baby,
  Users,
  Stethoscope,
  Leaf
} from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity, Dimensions, Alert, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../components/BottomTabBar";
import { getProfile, ProfileData } from "../storage/onboarding";
import { canTakeDailyCheckin, canTakeWHO5 } from "../storage/wellbeing";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 16) / 2; // 48 for px-6, 16 for gap

export default function HomeScreen() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [allowDailyCheckin, setAllowDailyCheckin] = useState(true);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      const checkAvailability = async () => {
        const canDaily = await canTakeDailyCheckin();
        setAllowDailyCheckin(canDaily);
      };
      checkAvailability();
    }, [])
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  const firstName = profile?.name?.split(" ")[0] || "Srishti";

  return (
    <View className="flex-1 bg-[#FAFCFF]">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Header */}
        <View 
          className="bg-[#C6E8D3] px-6 rounded-b-[40px] relative overflow-hidden pb-12"
          style={{ paddingTop: Math.max(insets.top, 20) + 20 }}
        >
          <View className="flex-row justify-between items-start">
            <Text className="text-[#1E3A2F] text-[32px] leading-[40px] font-bold w-[60%]">
              Good morning{"\n"}{firstName}!
            </Text>
            {/* Plant Illustration Placeholder */}
            <View className="absolute right-[-10px] bottom-[-20px] opacity-80">
              <Leaf size={100} color="#2A5C43" strokeWidth={1} />
            </View>
          </View>
        </View>

        {/* Daily Check-in Floating Card */}
        <View className="-mt-8 px-6 z-20">
          <View 
            className="bg-white rounded-3xl p-5 flex-row items-center justify-between shadow-sm"
            style={{ 
              shadowColor: "#000", 
              shadowOffset: { width: 0, height: 4 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 12, 
              elevation: 5 
            }}
          >
            <View className="flex-1 mr-4">
              <Text className="text-gray-500 font-semibold text-[11px] uppercase tracking-wider mb-1">
                Daily Check-in
              </Text>
              <Text className="text-[#1A1A1A] font-medium text-[17px] leading-[22px]">
                How are you feeling{"\n"}today?
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => {
                if (allowDailyCheckin) {
                  router.push("/check-in");
                } else {
                  Alert.alert("Already checked in!", "You have already completed your daily check-in for today.");
                }
              }}
              className="bg-[#78A49C] rounded-full py-2.5 px-4 flex-row items-center"
            >
              <Text className="text-white font-medium mr-1 text-[14px]">Check-in</Text>
              <ArrowRight color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Explore Suhrit Section */}
        <View className="px-6 mt-8">
          <Text className="text-[#1A1A1A] text-[22px] font-bold mb-5">
            Explore Suhrit
          </Text>
          
          {/* Mental Well-being */}
          <TouchableOpacity 
            className="bg-[#C9E4FA] w-full rounded-3xl p-5 flex-row items-center mb-4"
            activeOpacity={0.7}
          >
            <Brain size={28} color="#1A1A1A" strokeWidth={1.5} />
            <Text className="ml-4 text-[#1A1A1A] font-bold text-[17px]">
              Mental Well-being
            </Text>
          </TouchableOpacity>
          
          {/* 2x2 Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {/* Menstrual Well-being */}
            <TouchableOpacity 
              onPress={() => router.push("/explore/menstrual")} 
              style={{ width: CARD_WIDTH }}
              className="bg-[#F3C7CB] rounded-[24px] p-5 items-center justify-center aspect-square"
              activeOpacity={0.7}
            >
              <Droplet size={32} color="#1A1A1A" strokeWidth={1.5} className="mb-3" />
              <Text className="text-[#1A1A1A] font-bold text-center leading-[20px] text-[15px]">
                Menstrual{"\n"}Well-being
              </Text>
            </TouchableOpacity>
            
            {/* Pregnancy Journey */}
            <TouchableOpacity 
              onPress={() => router.push("/explore/pregnancy")} 
              style={{ width: CARD_WIDTH }}
              className="bg-[#C6E8D3] rounded-[24px] p-5 items-center justify-center aspect-square"
              activeOpacity={0.7}
            >
              <Baby size={32} color="#1A1A1A" strokeWidth={1.5} className="mb-3" />
              <Text className="text-[#1A1A1A] font-bold text-center leading-[20px] text-[15px]">
                Pregnancy{"\n"}Journey
              </Text>
            </TouchableOpacity>
            
            {/* Social Relationship */}
            <TouchableOpacity 
              onPress={() => router.push("/explore/relationships")} 
              style={{ width: CARD_WIDTH }}
              className="bg-[#D3C7F3] rounded-[24px] p-5 items-center justify-center aspect-square"
              activeOpacity={0.7}
            >
              <Users size={32} color="#1A1A1A" strokeWidth={1.5} className="mb-3" />
              <Text className="text-[#1A1A1A] font-bold text-center leading-[20px] text-[15px]">
                Social{"\n"}Relationship &...
              </Text>
            </TouchableOpacity>

            {/* Professional Support */}
            <TouchableOpacity 
              onPress={() => router.push("/explore/professional")} 
              style={{ width: CARD_WIDTH }}
              className="bg-[#F9E0A2] rounded-[24px] p-5 items-center justify-center aspect-square"
              activeOpacity={0.7}
            >
              <Stethoscope size={32} color="#1A1A1A" strokeWidth={1.5} className="mb-3" />
              <Text className="text-[#1A1A1A] font-bold text-center leading-[20px] text-[15px]">
                Professional{"\n"}Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Check-out Card (Fixed at bottom above tab bar) */}
      <View 
        className="absolute bottom-[90px] left-6 right-6 z-30"
      >
        <View 
          className="bg-white rounded-3xl p-5 flex-row items-center justify-between shadow-sm"
          style={{ 
            shadowColor: "#000", 
            shadowOffset: { width: 0, height: -2 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 12, 
            elevation: 10 
          }}
        >
          <Text className="text-[#1A1A1A] font-bold text-[15px] uppercase leading-[22px] tracking-wider w-[60%]">
            READY TO COMPLETE{"\n"}YOUR DAY?
          </Text>
          <TouchableOpacity 
            className="bg-[#78A49C] rounded-full py-2.5 px-4 flex-row items-center"
          >
            <Text className="text-white font-medium mr-1 text-[14px]">Check-out</Text>
            <ArrowRight color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar />
    </View>
  );
}
\`;

fs.writeFileSync('src/app/home.tsx', newContent);
console.log('home.tsx updated');
