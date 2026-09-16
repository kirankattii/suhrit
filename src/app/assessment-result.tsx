import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View, ActivityIndicator } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import { Heading, SubHeading } from "../components/Typography";
import { saveWHO5Result } from "../storage/wellbeing";
import { generateInsight } from "../ai/client";

export default function AssessmentResultScreen() {
  const { rawScore } = useLocalSearchParams();
  const raw = parseInt(rawScore as string, 10) || 0;
  const percentage = raw * 4;

  const [saving, setSaving] = useState(true);
  const [insight, setInsight] = useState<string | null>(null);

  useEffect(() => {
    const processResult = async () => {
      try {
        await saveWHO5Result({
          date: new Date().toISOString(),
          rawScore: raw,
          percentage,
        });

        const prompt = `I am a user of a well-being app. I just took the WHO-5 Well-being index and scored ${percentage} out of 100. Provide a short (2-3 sentences), encouraging, and personalized supportive insight. Do not diagnose me.`;
        const aiResponse = await generateInsight(prompt);
        
        if (aiResponse) {
          setInsight(aiResponse);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSaving(false);
      }
    };

    processResult();
  }, [raw, percentage]);

  let interpretation = "";
  if (percentage <= 28) {
    interpretation = "Your current well-being score is relatively low. You may benefit from exploring the support and well-being resources available in SUHRIT.";
  } else if (percentage <= 49) {
    interpretation = "Your current well-being score suggests that your well-being may need some attention. Consider exploring the support and activities available in SUHRIT.";
  } else {
    interpretation = "Your current well-being score is in a range generally associated with better well-being. Continue supporting your well-being through healthy routines and activities.";
  }

  return (
    <Screen
      scroll
      footer={
        <View className="gap-3 pt-2">
          {percentage < 50 && (
            <Button title="Explore Support" onPress={() => router.replace("/home")} />
          )}
          <Button 
            title="Continue to Home" 
            onPress={() => router.replace("/home")} 
            variant={percentage < 50 ? "secondary" : "primary"}
          />
        </View>
      }
    >
      <View className="px-6 pt-12 items-center">
        <Text className="text-[13px] font-semibold uppercase tracking-[1.5px] text-suhrhit-secondary mb-4">
          Assessment Complete
        </Text>
        
        <Heading className="mb-8 text-center">Your Well-being Score</Heading>
        
        <View className="bg-[#EEF4F1] h-40 w-40 rounded-full items-center justify-center border-4 border-suhrhit-primary/20 mb-8 shadow-sm">
          <Text className="text-suhrhit-primary text-5xl font-bold font-serif">{percentage}</Text>
          <Text className="text-suhrhit-primary/60 text-lg font-medium mt-1">/ 100</Text>
        </View>
        
        <View className="bg-white p-6 rounded-3xl border border-suhrhit-border w-full mb-6">
          <Text className="text-suhrhit-text text-[15px] leading-[24px] text-center font-medium">
            {interpretation}
          </Text>
        </View>

        {saving ? (
          <View className="items-center justify-center p-4">
            <ActivityIndicator color="#173F35" />
            <Text className="mt-2 text-suhrhit-muted text-[13px]">Generating personalized insight...</Text>
          </View>
        ) : insight ? (
          <View className="bg-[#Fdfcf7] p-6 rounded-3xl border border-suhrhit-accent/30 w-full mb-6 relative overflow-hidden">
            <Text className="absolute top-4 right-4 text-2xl opacity-20">✨</Text>
            <SubHeading className="mb-2 text-suhrhit-primary">AI Insight</SubHeading>
            <Text className="text-suhrhit-text text-[14px] leading-[22px]">
              {insight}
            </Text>
          </View>
        ) : null}

        <View className="bg-gray-50 p-5 rounded-2xl border border-gray-200 w-full mt-4 mb-8">
          <Text className="text-gray-500 text-[12px] leading-[18px] text-center">
            This assessment is not a diagnosis. A lower score does not mean that you have a mental health disorder. If you are concerned about your well-being, consider speaking with a qualified professional.
          </Text>
        </View>

        {percentage < 50 && (
          <Heading className="text-center text-[18px] mb-4">
            Would you like to explore some well-being support?
          </Heading>
        )}

      </View>
    </Screen>
  );
}
