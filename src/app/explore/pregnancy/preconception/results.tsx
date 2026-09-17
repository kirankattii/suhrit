import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight, Leaf, Shield, AlertCircle, Info, BookOpen, MessageCircle } from "lucide-react-native";
import { CHECKIN_QUESTIONS } from "./check-in";
import { useEffect, useState, useMemo } from "react";
import { getPreconceptionHistory, PreconceptionResult } from "../../../../storage/wellbeing";

export default function CheckInResultsScreen() {
  const insets = useSafeAreaInsets();
  const { answersData } = useLocalSearchParams<{ answersData: string }>();
  
  const [historyResult, setHistoryResult] = useState<PreconceptionResult | null>(null);
  const [isLoading, setIsLoading] = useState(!answersData);

  useEffect(() => {
    if (!answersData) {
      getPreconceptionHistory().then(history => {
        if (history && history.length > 0) {
          setHistoryResult(history[history.length - 1]);
        }
        setIsLoading(false);
      });
    }
  }, [answersData]);

  const answers: Record<number, boolean> | null = useMemo(() => {
    if (answersData) {
      try {
        return JSON.parse(answersData);
      } catch (e) {
        return null;
      }
    } else if (historyResult) {
      return historyResult.answers;
    }
    return null;
  }, [answersData, historyResult]);

  if (isLoading) return null;

  if (!answers) {
    return (
      <View className="flex-1 bg-[#FAFAFA]" style={{ paddingTop: insets.top }}>
        <View className="px-6 py-4 flex-row items-center border-b border-[#F0F0F0]">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ChevronLeft color="#183059" size={28} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary font-bold text-[18px]" style={{ fontFamily: 'Georgia' }}>
            Your Check-in Result
          </Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 bg-[#FCE7F3] rounded-full items-center justify-center mb-6">
            <AlertCircle color="#DB2777" size={32} />
          </View>
          <Text className="text-suhrhit-primary font-bold text-[20px] text-center mb-3" style={{ fontFamily: 'Georgia' }}>
            No Results Yet
          </Text>
          <Text className="text-suhrhit-secondary text-center text-[15px] leading-[22px] mb-8">
            Take a test and get your results to see which areas you may want to focus on before conception.
          </Text>
          <TouchableOpacity 
            className="bg-[#FFB6C1] rounded-full py-4 px-8 items-center justify-center shadow-sm"
            onPress={() => router.replace("/explore/pregnancy/preconception/check-in")}
          >
            <Text className="text-[#183059] font-bold text-[16px]">Take a Test</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const score = Object.values(answers).filter(val => val === true).length;
  
  let scoreTitle = "";
  let scoreDescription = "";
  
  if (score <= 2) {
    scoreTitle = "Few areas identified";
    scoreDescription = "Your responses identified relatively few areas that may need attention before conception. You can continue preparing and consider routine preconception guidance.";
  } else if (score <= 5) {
    scoreTitle = "Some areas may need attention";
    scoreDescription = "Your responses suggest that a few areas may be worth reviewing before trying to conceive.";
  } else {
    scoreTitle = "Several areas identified";
    scoreDescription = "Your responses identified several areas that may benefit from attention before conception. Consider discussing these areas with a healthcare professional.";
  }

  const flaggedQuestions = CHECKIN_QUESTIONS.filter((_, idx) => answers[idx] === true);

  return (
    <View className="flex-1 bg-[#FAFAFA]" style={{ paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-[#F0F0F0]">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary font-bold text-[18px]" style={{ fontFamily: 'Georgia' }}>
          Your Check-in Result
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-8" showsVerticalScrollIndicator={false}>
        {/* Score Circle */}
        <View className="items-center justify-center mb-8">
          <View className="w-32 h-32 rounded-full border-8 border-[#FFB6C1] items-center justify-center bg-white shadow-sm">
            <View className="flex-row items-baseline">
              <Text className="text-suhrhit-primary font-bold text-[48px]">{score}</Text>
              <Text className="text-suhrhit-secondary font-medium text-[20px] ml-1">/10</Text>
            </View>
          </View>
        </View>

        <Text className="text-suhrhit-primary font-bold text-[22px] text-center mb-3" style={{ fontFamily: 'Georgia' }}>
          {scoreTitle}
        </Text>
        
        <Text className="text-suhrhit-secondary text-center text-[15px] leading-[22px] mb-8">
          {scoreDescription}
        </Text>

        <View className="bg-[#F5F9FF] rounded-2xl p-4 flex-row mb-10">
          <View className="w-6 h-6 rounded-full bg-[#E6F0FA] items-center justify-center mr-3 mt-0.5">
            <Info color="#7293B3" size={14} />
          </View>
          <Text className="flex-1 text-[#7293B3] text-[13px] leading-[20px]">
            This is a starting point to help you focus on your health. It does not determine whether you are medically ready for pregnancy.
          </Text>
        </View>

        {flaggedQuestions.length > 0 && (
          <View className="mb-10">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">
              Areas you may want to look into:
            </Text>
            
            {flaggedQuestions.map((q) => (
              <View key={q.id} className="bg-white rounded-2xl p-5 mb-3 border border-[#F0F0F0] shadow-sm">
                <Text className="text-suhrhit-primary font-bold text-[15px] mb-2">{q.flagCategory}</Text>
                <Text className="text-suhrhit-secondary text-[14px] leading-[20px]">{q.flagText}</Text>
              </View>
            ))}

            <View className="bg-[#FFF4E5] rounded-2xl p-4 flex-row mt-2">
              <AlertCircle color="#FF9800" size={20} className="mr-3" />
              <Text className="flex-1 text-[#D84315] text-[13px] leading-[20px]">
                These are general suggestions. If you have concerns, consider speaking with a healthcare professional.
              </Text>
            </View>
          </View>
        )}

        <Text className="text-suhrhit-primary font-bold text-[20px] mb-6" style={{ fontFamily: 'Georgia' }}>
          What would you like to do next?
        </Text>

        <TouchableOpacity 
          className="bg-white rounded-[20px] p-4 flex-row items-center mb-3 border border-[#F0F0F0] shadow-sm"
          onPress={() => router.push("/explore/pregnancy/preconception/prepare-together")}
        >
          <View className="w-12 h-12 rounded-full bg-[#E8F5E9] items-center justify-center mr-4">
            <Leaf color="#4CAF50" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">Explore Preparation</Text>
            <Text className="text-suhrhit-secondary text-[13px]">Go back to view tips and guidance on all areas.</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white rounded-[20px] p-4 flex-row items-center mb-10 border border-[#F0F0F0] shadow-sm"
          onPress={() => router.push("/explore/professional")}
        >
          <View className="w-12 h-12 rounded-full bg-[#F3E5F5] items-center justify-center mr-4">
            <MessageCircle color="#9C27B0" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">Connect With Professional Support</Text>
            <Text className="text-suhrhit-secondary text-[13px]">If you have concerns, you can explore speaking with a healthcare professional.</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
