import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Flower2,
  Baby,
  Users,
  Stethoscope,
  Home,
  Sprout,
  BookOpen,
  UserRound,
  Leaf,
  HeartPulse,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../components/BottomTabBar";
import { getProfile, ProfileData } from "../storage/onboarding";

export default function HomeScreen() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const insets = useSafeAreaInsets();

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

  const firstName = profile?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 18) return "Good afternoon,";
    return "Good evening,";
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        {/* Dark Green Header Section */}
        <View 
          className="bg-suhrhit-primary px-6 rounded-b-[40px] relative overflow-hidden pb-[72px]"
          style={{ paddingTop: Math.max(insets.top, 20) + 16 }}
        >
          {/* Decorative Background Leaves */}
          <View className="absolute -right-6 top-10 opacity-30">
             <Leaf color="#255547" size={140} strokeWidth={1} />
          </View>
          <View className="absolute right-10 top-32 opacity-20 transform -rotate-45">
             <Leaf color="#255547" size={100} strokeWidth={1} />
          </View>
          
          {/* Top Navigation */}
          <View className="flex-row items-center justify-end z-10">
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/30"
                accessibilityRole="button"
                accessibilityLabel="Profile"
                onPress={() => router.push("/profile?edit=true")}
              >
                <Text className="text-white text-[16px]" style={{ fontFamily: 'Georgia' }}>
                  {firstName[0] || "A"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Text */}
          <View className="mt-10 z-10">
            <Text className="text-white text-[32px] leading-[40px]" style={{ fontFamily: 'Georgia' }}>
              {getGreeting()}{'\n'}{firstName} <Text className="text-suhrhit-accent">♥</Text>
            </Text>
            
            <Text className="text-white/80 text-[16px] mt-3 italic" style={{ fontFamily: 'Georgia' }}>
              A healthier, happier you{'\n'}for every phase of life.
            </Text>
          </View>
        </View>

        {/* Check-in Card */}
        <View className="-mt-12 px-6 z-20">
          <View className="bg-white rounded-[24px] p-5 flex-row items-center justify-between" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 5 }}>
            <View className="bg-suhrhit-background w-16 h-20 rounded-2xl items-center justify-center">
               <Leaf color="#173F35" size={32} strokeWidth={1.5} />
            </View>
            <View className="flex-1 ml-4">
               <Text className="text-suhrhit-primary font-bold text-[14px]">Take a moment for yourself</Text>
               <Text className="text-suhrhit-primary/80 text-[13px] mt-0.5 mb-3 font-medium">How are you feeling today?</Text>
               <TouchableOpacity onPress={() => router.push("/check-in")} className="bg-suhrhit-primary rounded-[20px] py-2.5 px-4 flex-row items-center justify-center w-36">
                  <Text className="text-white font-semibold mr-2 text-[14px]">Check-in</Text>
                  <ArrowRight color="white" size={16} strokeWidth={2.5} />
               </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* WHO-5 Assessment Card */}
        <View className="px-6 mt-8">
          <TouchableOpacity onPress={() => router.push("/assessment")} className="bg-[#EEF4F1] rounded-3xl p-5 border border-suhrhit-primary/10 flex-row items-center justify-between">
             <View className="flex-1 mr-4">
                <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">WHO-5 Well-being</Text>
                <Text className="text-suhrhit-primary/80 text-[13px] leading-[18px]">Take a quick assessment to understand your overall well-being.</Text>
             </View>
             <View className="bg-white p-3 rounded-full border border-suhrhit-border">
                <HeartPulse color="#173F35" size={24} strokeWidth={2} />
             </View>
          </TouchableOpacity>
        </View>

        {/* Explore Suhrit Grid */}
        <View className="px-6 mt-8 pb-10">
          <Text className="text-suhrhit-primary text-[22px] mb-5" style={{ fontFamily: 'Georgia' }}>
            Explore Suhrit
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
             {/* Card 1 */}
             <TouchableOpacity onPress={() => router.push("/explore/menstrual")} className="w-[48%] bg-white rounded-[24px] p-5 mb-4 items-center justify-center h-40">
                <Flower2 color="#173F35" size={38} className="mb-4" strokeWidth={1.5} />
                <Text className="text-suhrhit-primary font-medium text-center leading-tight text-[15px]">Menstrual{'\n'}Well-being</Text>
             </TouchableOpacity>
             
             {/* Card 2 */}
             <TouchableOpacity onPress={() => router.push("/explore/pregnancy")} className="w-[48%] bg-white rounded-[24px] p-5 mb-4 items-center justify-center h-40">
                <Baby color="#173F35" size={38} className="mb-4" strokeWidth={1.5} />
                <Text className="text-suhrhit-primary font-medium text-center leading-tight text-[15px]">Pregnancy &{'\n'}Postpartum</Text>
             </TouchableOpacity>
             
             {/* Card 3 */}
             <TouchableOpacity onPress={() => router.push("/explore/relationships")} className="w-[48%] bg-white rounded-[24px] p-5 mb-4 items-center justify-center h-40">
                <Users color="#173F35" size={38} className="mb-4" strokeWidth={1.5} />
                <Text className="text-suhrhit-primary font-medium text-center leading-tight text-[15px]">Relationships{'\n'}& Social Life</Text>
             </TouchableOpacity>

             {/* Card 4 */}
             <TouchableOpacity onPress={() => router.push("/explore/professional")} className="w-[48%] bg-white rounded-[24px] p-5 mb-4 items-center justify-center h-40">
                <Stethoscope color="#173F35" size={38} className="mb-4" strokeWidth={1.5} />
                <Text className="text-suhrhit-primary font-medium text-center leading-tight text-[15px]">Professional{'\n'}Support</Text>
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
