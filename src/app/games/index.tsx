import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Sparkles, BrainCircuit, Gamepad2, ArrowRight } from "lucide-react-native";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../components/BottomTabBar";

export default function GamesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#FAFCFF]">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View 
          className="px-6 pb-6 relative overflow-hidden"
          style={{ paddingTop: Math.max(insets.top, 20) + 16 }}
        >
          <View className="flex-row items-center gap-3 mb-2">
            <View className="w-12 h-12 rounded-full bg-[#F5F9FF] items-center justify-center border border-[#E6F0FA]">
              <Gamepad2 color="#183059" size={24} strokeWidth={2} />
            </View>
            <Text className="text-suhrhit-primary text-[32px]" style={{ fontFamily: 'Georgia' }}>
              Games
            </Text>
          </View>
          <Text className="text-suhrhit-primary/70 text-[16px] leading-[24px] font-medium mt-2">
            Play your way to better mental well-being with our collection of interactive exercises.
          </Text>
        </View>

        <View className="px-6 mt-4 pb-8">
          
          {/* Game 1: Pop the Pessimism */}
          <TouchableOpacity 
            onPress={() => router.push("/games/pop-the-pessimism")} 
            className="bg-white rounded-[32px] p-6 mb-6 border border-[#F0F5FA]"
            style={{ 
              shadowColor: "#183059", 
              shadowOffset: { width: 0, height: 12 }, 
              shadowOpacity: 0.06, 
              shadowRadius: 24, 
              elevation: 8 
            }}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-[#FFF0F5] w-16 h-16 rounded-[20px] items-center justify-center">
                <Sparkles color="#FFB6C1" size={32} strokeWidth={2} />
              </View>
              <View className="bg-suhrhit-primary rounded-full w-10 h-10 items-center justify-center">
                <ArrowRight color="white" size={20} strokeWidth={2.5} />
              </View>
            </View>
            
            <Text className="text-suhrhit-primary font-bold text-[22px] mb-2">Pop the Pessimism</Text>
            <Text className="text-suhrhit-primary/70 text-[15px] leading-[22px] mb-4">
              Practice reframing unhelpful thoughts by popping pessimistic bubbles in this relaxing exercise.
            </Text>
            
            <View className="flex-row items-center gap-2">
              <View className="bg-[#F5F9FF] px-3 py-1.5 rounded-full">
                <Text className="text-suhrhit-primary/70 text-[12px] font-semibold">Cognitive Reframing</Text>
              </View>
              <View className="bg-[#F5F9FF] px-3 py-1.5 rounded-full">
                <Text className="text-suhrhit-primary/70 text-[12px] font-semibold">5 mins</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Game 2: Gratitude Tree */}
          <TouchableOpacity 
            onPress={() => router.push("/games/gratitude-tree")} 
            className="bg-[#E8F3E9] rounded-[32px] p-6 border border-[#CDE5D0]"
            style={{ 
              shadowColor: "#2E5C31", 
              shadowOffset: { width: 0, height: 8 }, 
              shadowOpacity: 0.04, 
              shadowRadius: 16, 
              elevation: 4 
            }}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-white w-16 h-16 rounded-[20px] items-center justify-center shadow-sm border border-[#CDE5D0]">
                <Sparkles color="#4A7B4D" size={32} strokeWidth={2} />
              </View>
              <View className="bg-[#4A7B4D] rounded-full w-10 h-10 items-center justify-center">
                <ArrowRight color="white" size={20} strokeWidth={2.5} />
              </View>
            </View>
            
            <Text className="text-[#2E5C31] font-bold text-[22px] mb-2">Gratitude Tree</Text>
            <Text className="text-[#4A7B4D] text-[15px] leading-[22px] mb-4">
              Cultivate a positive mindset by growing your own beautiful tree through daily gratitude.
            </Text>

            <View className="flex-row items-center gap-2">
              <View className="bg-white/80 px-3 py-1.5 rounded-full border border-[#CDE5D0]">
                <Text className="text-[#2E5C31] text-[12px] font-semibold">Daily Journal</Text>
              </View>
              <View className="bg-white/80 px-3 py-1.5 rounded-full border border-[#CDE5D0]">
                <Text className="text-[#2E5C31] text-[12px] font-semibold">2 mins</Text>
              </View>
            </View>
          </TouchableOpacity>
          
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
