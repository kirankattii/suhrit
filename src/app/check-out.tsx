import { router } from "expo-router";
import { ChevronLeft, Sparkles } from "lucide-react-native";
import { useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import KeyboardSpacer from "../components/KeyboardSpacer";
import { Heading, SubHeading } from "../components/Typography";
import { generateInsight } from "../ai/client";

const ActivitySelector = ({
  options,
  value,
  onChange,
}: {
  options: { title: string; description: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <View className="mb-8 mt-2">
    {options.map((opt, idx) => {
      const selected = value === opt.title;
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => onChange(opt.title)}
          className={`mb-3 rounded-xl border p-4 ${
            selected
              ? "border-suhrhit-primary bg-[#E6F0FA]"
              : "border-suhrhit-border bg-white"
          }`}
        >
          <Text
            className={`text-[16px] font-bold mb-1 ${
              selected ? "text-suhrhit-primary" : "text-suhrhit-text"
            }`}
          >
            {opt.title}
          </Text>
          <Text
            className={`text-[13px] ${
              selected ? "text-suhrhit-primary font-medium" : "text-suhrhit-muted"
            }`}
          >
            {opt.description}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function CheckOutScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [activity, setActivity] = useState("");
  const [screenTime, setScreenTime] = useState("");
  const [meals, setMeals] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const prompt = `The user has completed their evening check-out in a health and wellness app.
Physical Activity: ${activity || "None specified"}
Social Media Screen Time: ${screenTime || "None specified"}
Meals and Diet: ${meals || "None specified"}

Provide a short, encouraging, and empathetic 2-3 sentence summary analyzing their day. Offer a gentle tip for tomorrow. Keep it very concise. Do not use markdown or bold text.`;
    
    const result = await generateInsight(prompt);
    setAiResult(result || "Great job completing your check-out! Reflecting on your day is a wonderful step towards better health.");
    setIsAnalyzing(false);
  };

  const handleFinish = () => {
    router.replace("/games/gratitude-tree");
  };

  const renderFooter = () => {
    if (aiResult) {
      return <Button title="Complete your day with gratitude tree" onPress={handleFinish} />;
    }
    return (
      <Button 
        title={isAnalyzing ? "Analyzing..." : "Submit Check-out"} 
        onPress={handleAnalyze} 
        disabled={isAnalyzing} 
      />
    );
  };

  return (
    <Screen
      scroll
      scrollViewRef={scrollViewRef}
      footer={renderFooter()}
    >
      <View className="px-6 pt-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 mr-1">
            <ChevronLeft color="#183059" size={28} />
          </TouchableOpacity>
          <Text className="text-[26px] leading-[32px] font-bold text-suhrhit-text">Evening Check-out</Text>
        </View>

        {aiResult ? (
          <View className="mt-4">
            <View className="bg-[#E6F0FA] p-6 rounded-2xl border border-suhrhit-border/50 mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3" style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
                  <Sparkles color="#183059" size={20} />
                </View>
                <Text className="text-suhrhit-primary font-bold text-[18px]">Your Daily Insight</Text>
              </View>
              <Text className="text-[15px] leading-[24px] text-suhrhit-text font-medium">{aiResult}</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text className="mb-8 text-[14px] text-suhrhit-muted">
              Reflect on your physical activities and habits today.
            </Text>

            <SubHeading className="mb-2">What kind of physical activity did you do today?</SubHeading>
            <ActivitySelector
              options={[
                {
                  title: "Light",
                  description: "Casual walking, Campus/workplace walking, Stretching",
                },
                {
                  title: "Moderate",
                  description: "Brisk walking, Jogging, Cycling, Dancing",
                },
                {
                  title: "Vigorous",
                  description: "Running, Gym/heavy workout, Sports, High-intensity exercise",
                },
              ]}
              value={activity}
              onChange={setActivity}
            />

            <SubHeading className="mb-2">What was your social media screen time?</SubHeading>
            <View className="mb-8 mt-2">
              <TextInput
                value={screenTime}
                onChangeText={setScreenTime}
                placeholder="e.g. 2 hours"
                placeholderTextColor="#A6B9C7"
                className="w-full rounded-xl border border-suhrhit-border bg-white px-4 py-4 text-[15px] font-medium text-suhrhit-text"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 250);
                }}
              />
            </View>

            <SubHeading className="mb-2">How many meals did you have? Any junk included?</SubHeading>
            <View className="mb-4 mt-2">
              <TextInput
                value={meals}
                onChangeText={setMeals}
                placeholder="e.g. 3 meals, a little bit of junk food"
                placeholderTextColor="#A6B9C7"
                multiline
                style={{ minHeight: 100, textAlignVertical: "top" }}
                className="w-full rounded-xl border border-suhrhit-border bg-white px-4 py-4 text-[15px] font-medium text-suhrhit-text"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 250);
                }}
              />
            </View>
          </View>
        )}

        {isAnalyzing && !aiResult && (
          <View className="absolute inset-0 bg-white/80 items-center justify-center z-10 min-h-[400px] rounded-2xl">
            <View className="bg-white p-6 rounded-3xl items-center shadow-sm border border-suhrhit-border/20" style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 }}>
              <ActivityIndicator size="large" color="#183059" />
              <Text className="text-suhrhit-primary font-bold mt-4 text-[16px]">Analyzing your day...</Text>
              <Text className="text-suhrhit-muted text-[13px] mt-2 text-center max-w-[200px]">Generating personalized insights based on your check-out.</Text>
            </View>
          </View>
        )}

        <KeyboardSpacer />
      </View>
    </Screen>
  );
}
