import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight, Droplet, Leaf, Sun, Moon } from "lucide-react-native";
import { router } from "expo-router";
import DarkScreen from "../../../../components/menstrual/DarkScreen";

export default function CycleEducationScreen() {
  const phases = [
    { 
      id: "menstrual", 
      title: "Menstrual Phase", 
      subtitle: "During your period",
      icon: Droplet,
      color: "#FF8FA3",
      bg: "bg-[#FF8FA3]/10",
      border: "border-[#FF8FA3]/20"
    },
    { 
      id: "follicular", 
      title: "Follicular Phase", 
      subtitle: "After your period",
      icon: Leaf,
      color: "#A7E3A1",
      bg: "bg-[#A7E3A1]/10",
      border: "border-[#A7E3A1]/20"
    },
    { 
      id: "ovulation", 
      title: "Ovulation Phase", 
      subtitle: "Around the middle of your cycle",
      icon: Sun,
      color: "#F9E076",
      bg: "bg-[#F9E076]/10",
      border: "border-[#F9E076]/20"
    },
    { 
      id: "luteal", 
      title: "Luteal Phase", 
      subtitle: "After ovulation",
      icon: Moon,
      color: "#CBA6F7",
      bg: "bg-[#CBA6F7]/10",
      border: "border-[#CBA6F7]/20"
    }
  ];

  return (
    <DarkScreen 
      scroll
      header={
        <View className="px-5 py-2 flex-row items-center border-b border-[#1E335A]">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 w-10 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
        </View>
      }
    >
      <View className="px-6 pt-6">
        <Text className="text-white text-[28px] font-bold mb-4" style={{ fontFamily: 'Georgia' }}>
          Cycle Education
        </Text>
        <Text className="text-[#8B9CBE] text-[15px] leading-[24px] mb-8 pr-4">
          Learn about the four phases of your menstrual cycle and how to support your well-being.
        </Text>

        <View className="mb-10">
          {phases.map((phase) => (
            <TouchableOpacity 
              key={phase.id}
              onPress={() => router.push(`/explore/menstrual/education/${phase.id}`)}
              className={`flex-row items-center rounded-[24px] p-5 mb-4 border ${phase.bg} ${phase.border}`}
            >
              <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-4">
                <phase.icon color={phase.color} size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-[16px] mb-1">{phase.title}</Text>
                <Text className="text-[#8B9CBE] text-[13px]">{phase.subtitle}</Text>
              </View>
              <ChevronRight color="#8B9CBE" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </DarkScreen>
  );
}
