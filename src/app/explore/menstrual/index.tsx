import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { ChevronLeft, Calendar, BarChart2, BookOpen, Sparkles, Bell, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import DarkScreen from "../../../components/menstrual/DarkScreen";

interface MenstrualMenuItemProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconColor?: string;
}

function MenstrualMenuItem({ icon: Icon, title, subtitle, onPress, iconColor = "#82A9F9" }: MenstrualMenuItemProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center bg-[#142340] rounded-[24px] p-5 mb-4 border border-[#1E335A]"
    >
      <View className="w-12 h-12 rounded-full bg-[#1A2C50] items-center justify-center mr-4">
        <Icon color={iconColor} size={24} />
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-[16px] mb-1">{title}</Text>
        <Text className="text-[#8B9CBE] text-[13px]">{subtitle}</Text>
      </View>
      <ChevronRight color="#8B9CBE" size={20} />
    </TouchableOpacity>
  );
}

export default function MenstrualHome() {
  return (
    <DarkScreen 
      scroll
      header={
        <View className="px-5 pt-1 pb-2 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Bell color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
      }
    >
      <View className="px-6 pt-2 pb-6 relative">
        {/* Title Section */}
        <Text className="text-[#A2B8D9] font-medium text-[14px] uppercase tracking-wider mb-2">SUHRIT</Text>
        <Text className="text-[#A2B8D9] font-medium text-[12px] mb-6">For a kinder you</Text>
        
        <View className="flex-row justify-between relative mb-8">
          <View className="flex-1 z-10 pt-4">
            <Text className="text-white text-[32px] font-bold leading-[38px] mb-4" style={{ fontFamily: 'Georgia' }}>
              Menstrual{"\n"}Well-being
            </Text>
            <Text className="text-[#8B9CBE] text-[14px] leading-[22px] pr-8">
              Understand. Track.{"\n"}Learn. Feel Empowered.
            </Text>
          </View>
          
          {/* Illustration - We'll use the existing menstrual image or a placeholder if none fits */}
          <View className="absolute -right-6 -top-12 w-48 h-48 opacity-80 z-0">
             <Image 
               source={require("../../../../assets/images/explore/menstrual.jpg")} 
               className="w-full h-full rounded-full"
               style={{ opacity: 0.7 }}
             />
          </View>
        </View>

        {/* Menu Items */}
        <MenstrualMenuItem 
          icon={Calendar} 
          title="Cycle Tracking" 
          subtitle="Know where you are in your cycle"
          iconColor="#FF8FA3"
          onPress={() => router.push("/explore/menstrual/tracking")} 
        />
        <MenstrualMenuItem 
          icon={BarChart2} 
          title="Symptoms & Patterns" 
          subtitle="Understand your emotional and physical health"
          iconColor="#82A9F9"
          onPress={() => router.push("/explore/menstrual/symptoms")} 
        />
        <MenstrualMenuItem 
          icon={BookOpen} 
          title="Cycle Education" 
          subtitle="Learn about each phase of your cycle"
          iconColor="#FFB347"
          onPress={() => router.push("/explore/menstrual/education")} 
        />
        <MenstrualMenuItem 
          icon={Sparkles} 
          title="Personalised Tips" 
          subtitle="Get AI-powered suggestions just for you"
          iconColor="#CBA6F7"
          onPress={() => router.push("/explore/menstrual/tips")} 
        />
      </View>
    </DarkScreen>
  );
}
