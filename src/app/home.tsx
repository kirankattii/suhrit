import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Brain,
  Droplet,
  Baby,
  Users,
  Stethoscope,
  Leaf,
  HeartPulse
} from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../components/BottomTabBar";
import { getProfile, ProfileData } from "../storage/onboarding";
import { canTakeDailyCheckin, canTakeWHO5 } from "../storage/wellbeing";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 16) / 2; // 48 for px-6, 16 for gap

export default function HomeScreen() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [allowDailyCheckin, setAllowDailyCheckin] = useState(true);
  const [allowWHO5, setAllowWHO5] = useState(true);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      const checkAvailability = async () => {
        const canDaily = await canTakeDailyCheckin();
        const canW5 = await canTakeWHO5();
        setAllowDailyCheckin(canDaily);
        setAllowWHO5(canW5);
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
      
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
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
          
          {/* WHO-5 Assessment Card */}
          <TouchableOpacity 
            onPress={() => {
              if (allowWHO5) {
                router.push("/assessment");
              } else {
                Alert.alert("Already taken!", "You have already taken the WHO-5 assessment this week. You can take it again next Monday.");
              }
            }} 
            className={`w-full rounded-3xl p-5 flex-row items-center justify-between mb-4 border ${allowWHO5 ? 'bg-[#C9E4FA] border-[#B8DAF7]' : 'bg-[#F0F0F0] border-[#E0E0E0]'}`}
            activeOpacity={0.7}
          >
             <View className="flex-1 mr-4">
                <Text className="text-[#1A1A1A] font-bold text-[17px] mb-1">WHO-5 Well-being</Text>
                <Text className="text-gray-600 text-[13px] leading-[18px] mb-2">Take a quick assessment to understand your overall wellness.</Text>
                <View className="bg-white/60 self-start px-2 py-1 rounded-md border border-[#1A1A1A]/10">
                  <Text className="text-[#1A1A1A] font-bold text-[10px] uppercase">Once in a week</Text>
                </View>
             </View>
             <View 
               className="bg-white w-14 h-14 rounded-full items-center justify-center"
               style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 }}
             >
                <HeartPulse color="#1A1A1A" size={24} strokeWidth={1.5} />
             </View>
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

        {/* Floating Check-out Card (Now inside scroll view) */}
        <View className="px-6 mt-6 z-30">
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
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
