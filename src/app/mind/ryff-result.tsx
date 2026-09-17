import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { RyffResult } from "../../storage/ryff";

const MAX_SUBSCALE_SCORE = 21; // 3 items * 7 points

const ScoreBar = ({ label, score, color }: { label: string, score: number, color: string }) => {
  const percentage = Math.max(0, Math.min(100, (score / MAX_SUBSCALE_SCORE) * 100));
  
  return (
    <View className="mb-5">
      <View className="flex-row justify-between mb-2">
        <Text className="text-[#1A1A1A] font-semibold text-[14px]">{label}</Text>
        <Text className="text-[#1A1A1A] font-bold text-[14px]">{score} <Text className="text-gray-400 font-normal">/ {MAX_SUBSCALE_SCORE}</Text></Text>
      </View>
      <View className="h-3 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
        <View 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }} 
        />
      </View>
    </View>
  );
};

export default function RyffResultScreen() {
  const { result: resultParam } = useLocalSearchParams<{ result: string }>();
  
  if (!resultParam) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-[18px] font-bold text-center">No result data found.</Text>
          <View className="mt-4 w-full"><Button title="Go Back" onPress={() => router.back()} /></View>
        </View>
      </Screen>
    );
  }

  const result = JSON.parse(decodeURIComponent(resultParam)) as RyffResult;

  return (
    <Screen scroll>
      <View className="px-6 pt-8 pb-12">
        <TouchableOpacity onPress={() => router.push("/mind")} className="-ml-2 mb-6 w-10 p-2">
          <ChevronLeft color="#1A1A1A" size={28} />
        </TouchableOpacity>

        <Text className="text-[#1A1A1A] font-bold text-[28px] leading-[36px] mb-2">
          Your Wellbeing Profile
        </Text>
        <Text className="text-[#4A4A4A] text-[14px] leading-[22px] mb-8">
          Here is a breakdown of your psychological wellbeing across 6 key dimensions. Higher scores indicate greater wellbeing in that area.
        </Text>
        
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#F0F0F0] mb-8">
          <ScoreBar label="Autonomy" score={result.autonomy} color="#9C27B0" />
          <ScoreBar label="Environmental Mastery" score={result.environmentalMastery} color="#FF9800" />
          <ScoreBar label="Personal Growth" score={result.personalGrowth} color="#4CAF50" />
          <ScoreBar label="Positive Relations" score={result.positiveRelations} color="#E91E63" />
          <ScoreBar label="Purpose in Life" score={result.purposeInLife} color="#2196F3" />
          <ScoreBar label="Self-Acceptance" score={result.selfAcceptance} color="#00BCD4" />
        </View>

        <Button title="Done" onPress={() => router.push("/mind")} />
      </View>
    </Screen>
  );
}
