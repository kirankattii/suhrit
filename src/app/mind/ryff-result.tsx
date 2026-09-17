import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import { generateInsight } from "../../ai/client";

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

  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      const prompt = `
You are an empathetic, professional psychological counselor analyzing a user's results from the Ryff Scale of Psychological Wellbeing. 
The user's scores across 6 dimensions are (max 21 for each):
- Autonomy: ${result.autonomy}
- Environmental Mastery: ${result.environmentalMastery}
- Personal Growth: ${result.personalGrowth}
- Positive Relations: ${result.positiveRelations}
- Purpose in Life: ${result.purposeInLife}
- Self-Acceptance: ${result.selfAcceptance}

Provide a short, supportive, and personalized paragraph summarizing their strengths and one area where they might gently focus on improving. Be warm and encouraging. Do not use markdown bullet points, just write 3-4 flowing sentences.
`;
      const feedback = await generateInsight(prompt);
      setAiFeedback(feedback || "I'm sorry, but I couldn't generate personalized feedback right now. Please try again later.");
      setLoadingFeedback(false);
    }
    fetchFeedback();
  }, []);

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

        {/* AI Feedback Section */}
        <View className="bg-[#F3E8FF] rounded-3xl p-6 shadow-sm border border-[#E9D5FF] mb-8">
          <Text className="text-[#6B21A8] font-bold text-[18px] mb-3">AI Insights</Text>
          {loadingFeedback ? (
            <View className="py-4 items-center justify-center">
              <ActivityIndicator size="small" color="#9333EA" />
              <Text className="text-[#9333EA] mt-2 text-[13px]">Analyzing your wellbeing profile...</Text>
            </View>
          ) : (
            <Text className="text-[#581C87] text-[15px] leading-[24px]">
              {aiFeedback}
            </Text>
          )}
        </View>

        <Button title="Done" onPress={() => router.push("/mind")} />
      </View>
    </Screen>
  );
}
