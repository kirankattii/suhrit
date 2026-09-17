import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Flower2,
  Baby,
  Users,
  Stethoscope,
  HeartPulse,
  Menu,
  Bell,
  Sparkles,
  Leaf
} from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity, Dimensions, Image, Alert } from "react-native";
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

  const firstName = profile?.name?.split(" ")[0] || "Ahana";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 18) return "Good afternoon,";
    return "Good evening,";
  };

  return (
    <View className="flex-1 bg-[#FAFCFF]">
      <StatusBar style="light" />
      
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        {/* Modern Premium Header */}
        <View 
          className="bg-suhrhit-primary px-6 rounded-b-[48px] relative overflow-hidden pb-[88px]"
          style={{ paddingTop: Math.max(insets.top, 20) + 16 }}
        >
          {/* Subtle Decorative Background */}
          <View className="absolute -right-12 -top-12 opacity-[0.03]">
             <Leaf color="#FFFFFF" size={240} strokeWidth={1} />
          </View>
          <View className="absolute left-10 top-32 opacity-[0.04] transform rotate-45">
             <Sparkles color="#FFFFFF" size={120} strokeWidth={1} />
          </View>
          
          {/* Top Navigation */}
          <View className="flex-row items-center justify-between z-10 mb-6">
            <TouchableOpacity 
              accessibilityRole="button" 
              className="w-12 h-12 rounded-full bg-white/10 items-center justify-center border border-white/20 backdrop-blur-md"
            >
              <Menu color="white" size={24} strokeWidth={2} />
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity 
                accessibilityRole="button" 
                className="w-12 h-12 rounded-full bg-white/10 items-center justify-center border border-white/20 backdrop-blur-md relative"
              >
                <Bell color="white" size={22} strokeWidth={2} />
                <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-suhrhit-accent rounded-full border-2 border-suhrhit-primary" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 items-center justify-center rounded-full bg-suhrhit-accent border-[2px] border-white/20 shadow-sm"
                accessibilityRole="button"
                onPress={() => router.push("/profile?edit=true")}
              >
                <Text className="text-suhrhit-primary text-[18px] font-bold">
                  {firstName[0] || "A"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Text */}
          <View className="mt-4 z-10">
            <Text className="text-white/80 text-[16px] mb-2 font-medium tracking-wide uppercase">
              {getGreeting()}
            </Text>
            <Text className="text-white text-[36px] leading-[44px]" style={{ fontFamily: 'Georgia' }}>
              {firstName} <Text className="text-suhrhit-accent">♥</Text>
            </Text>
            
            <Text className="text-white/70 text-[15px] mt-4 font-medium leading-[22px]">
              A healthier, happier you{"\n"}for every phase of life.
            </Text>
          </View>
        </View>

        {/* Floating Check-in Card */}
        <View className="-mt-16 px-6 z-20">
          <View 
            className="bg-white rounded-[32px] p-6 flex-row items-center justify-between border border-[#F0F5FA]" 
            style={{ 
              shadowColor: "#183059", 
              shadowOffset: { width: 0, height: 12 }, 
              shadowOpacity: 0.06, 
              shadowRadius: 24, 
              elevation: 8 
            }}
          >
            <View className="bg-[#F5F9FF] w-16 h-28 rounded-full items-center justify-center border border-[#E6F0FA]">
               <Sparkles color="#7293B3" size={28} strokeWidth={1.5} />
            </View>
            <View className="flex-1 ml-5">
               <Text className="text-suhrhit-primary/50 font-bold text-[11px] uppercase tracking-widest mb-1.5">Daily Check-in</Text>
               <Text className="text-suhrhit-primary font-bold text-[18px] mb-4 leading-tight">How are you{"\n"}feeling today?</Text>
               <TouchableOpacity 
                 onPress={() => {
                   if (allowDailyCheckin) {
                     router.push("/check-in");
                   } else {
                     Alert.alert("Already checked in!", "You have already completed your daily check-in for today. Come back tomorrow!");
                   }
                 }} 
                 className={`rounded-full py-3 px-6 flex-row items-center justify-center self-start shadow-sm ${allowDailyCheckin ? 'bg-suhrhit-primary' : 'bg-suhrhit-primary/50'}`}
               >
                  <Text className="text-white font-semibold mr-2 text-[14px]">Check-in</Text>
                  <ArrowRight color="white" size={16} strokeWidth={2.5} />
               </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* WHO-5 Assessment Card */}
        <View className="px-6 mt-8">
          <TouchableOpacity 
            onPress={() => {
              if (allowWHO5) {
                router.push("/assessment");
              } else {
                Alert.alert("Already taken!", "You have already taken the WHO-5 assessment this week. You can take it again next Monday.");
              }
            }} 
            className={`rounded-[28px] p-6 border flex-row items-center justify-between ${allowWHO5 ? 'bg-[#F5F9FF] border-[#E6F0FA]' : 'bg-[#F0F0F0] border-[#E0E0E0]'}`}
          >
             <View className="flex-1 mr-5">
                <Text className="text-suhrhit-primary font-bold text-[17px] mb-2">WHO-5 Well-being</Text>
                <Text className="text-suhrhit-primary/70 text-[14px] leading-[20px] mb-2">Take a quick assessment to understand your overall wellness.</Text>
                <View className="bg-white/80 self-start px-2 py-1 rounded-md border border-suhrhit-primary/10">
                  <Text className="text-suhrhit-primary font-bold text-[10px] uppercase">Once in a week</Text>
                </View>
             </View>
             <View 
               className="bg-white w-14 h-14 rounded-full items-center justify-center"
               style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8 }}
             >
                <HeartPulse color="#7293B3" size={24} strokeWidth={2} />
             </View>
          </TouchableOpacity>
        </View>

        {/* Explore Suhrit Grid */}
        <View className="px-6 mt-10 pb-8">
          <Text className="text-suhrhit-primary text-[24px] mb-6" style={{ fontFamily: 'Georgia' }}>
            Explore Suhrit
          </Text>
          
          <View className="flex-row flex-wrap justify-between gap-y-4">
             {/* Card 1 */}
             <TouchableOpacity 
               onPress={() => router.push("/explore/menstrual")} 
               style={{ width: CARD_WIDTH }}
               className="bg-white rounded-[28px] p-5 items-center justify-center aspect-square border border-[#F0F5FA]"
               activeOpacity={0.7}
             >
                <View className="w-16 h-16 rounded-full bg-[#F5F9FF] items-center justify-center mb-4 overflow-hidden">
                  <Image 
                    source={require("../assets/images/explore/menstrual_drop.jpg")} 
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-suhrhit-primary font-semibold text-center leading-[20px] text-[15px]">Menstrual{"\n"}Well-being</Text>
             </TouchableOpacity>
             
             {/* Card 2 */}
             <TouchableOpacity 
               onPress={() => router.push("/explore/pregnancy")} 
               style={{ width: CARD_WIDTH }}
               className="bg-white rounded-[28px] p-5 items-center justify-center aspect-square border border-[#F0F5FA]"
               activeOpacity={0.7}
             >
                <View className="w-16 h-16 rounded-full bg-[#F5F9FF] items-center justify-center mb-4 overflow-hidden">
                  <Image 
                    source={require("../assets/images/explore/pregnancy_icon.jpg")} 
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-suhrhit-primary font-semibold text-center leading-[20px] text-[15px]">Pregnancy &{"\n"}Postpartum</Text>
             </TouchableOpacity>
             
             {/* Card 3 */}
             <TouchableOpacity 
               onPress={() => router.push("/explore/relationships")} 
               style={{ width: CARD_WIDTH }}
               className="bg-white rounded-[28px] p-5 items-center justify-center aspect-square border border-[#F0F5FA]"
               activeOpacity={0.7}
             >
                <View className="w-16 h-16 rounded-full bg-[#F5F9FF] items-center justify-center mb-4 overflow-hidden">
                  <Image 
                    source={require("../assets/images/explore/relationship_hug.jpg")} 
                    className="w-16 h-16"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-suhrhit-primary font-semibold text-center leading-[20px] text-[15px]">Relationships{"\n"}& Social Life</Text>
             </TouchableOpacity>

             {/* Card 4 */}
             <TouchableOpacity 
               onPress={() => router.push("/explore/professional")} 
               style={{ width: CARD_WIDTH }}
               className="bg-white rounded-[28px] p-5 items-center justify-center aspect-square border border-[#F0F5FA]"
               activeOpacity={0.7}
             >
                <View className="w-16 h-16 rounded-full bg-[#F5F9FF] items-center justify-center mb-4">
                  <Stethoscope color="#183059" size={32} strokeWidth={1.5} />
                </View>
                <Text className="text-suhrhit-primary font-semibold text-center leading-[20px] text-[15px]">Professional{"\n"}Support</Text>
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
