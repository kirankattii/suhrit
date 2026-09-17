import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { Heading } from "../../components/Typography";
import { calculateRyffScore, saveRyffResult } from "../../storage/ryff";

const QUESTIONS = [
  { id: "Q01", text: "I like most parts of my personality." },
  {
    id: "Q02",
    text: "When I look at the story of my life, I am pleased with how things have turned out so far.",
  },
  {
    id: "Q03",
    text: "Some people wander aimlessly through life, but I am not one of them.",
  },
  { id: "Q04", text: "The demands of everyday life often get me down." },
  {
    id: "Q05",
    text: "In many ways I feel disappointed about my achievements in life.",
  },
  {
    id: "Q06",
    text: "Maintaining close relationships has been difficult and frustrating for me.",
  },
  {
    id: "Q07",
    text: "I live life one day at a time and don't really think about the future.",
  },
  {
    id: "Q08",
    text: "In general, I feel I am in charge of the situation in which I live.",
  },
  {
    id: "Q09",
    text: "I am good at managing the responsibilities of daily life.",
  },
  {
    id: "Q10",
    text: "I sometimes feel as if I've done all there is to do in life.",
  },
  {
    id: "Q11",
    text: "For me, life has been a continuous process of learning, changing, and growth.",
  },
  {
    id: "Q12",
    text: "I think it is important to have new experiences that challenge how I think about myself and the world.",
  },
  {
    id: "Q13",
    text: "People would describe me as a giving person, willing to share my time with others.",
  },
  {
    id: "Q14",
    text: "I gave up trying to make big improvements or changes in my life a long time ago.",
  },
  {
    id: "Q15",
    text: "I tend to be influenced by people with strong opinions.",
  },
  {
    id: "Q16",
    text: "I have not experienced many warm and trusting relationships with others.",
  },
  {
    id: "Q17",
    text: "I have confidence in my own opinions, even if they are different from the way most other people think.",
  },
  {
    id: "Q18",
    text: "I judge myself by what I think is important, not by the values of what others think is important.",
  },
];

const OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export default function RyffAssessmentScreen() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (qId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      Alert.alert(
        "Incomplete",
        "Please answer all questions before submitting.",
      );
      return;
    }

    const result = calculateRyffScore(answers);
    await saveRyffResult(result);

    router.replace(
      `/mind/ryff-result?result=${encodeURIComponent(JSON.stringify(result))}`,
    );
  };

  return (
    <Screen scroll footer={<Button title="Submit Assessment" onPress={handleSubmit} />}>
      <View className="px-6 pt-6 pb-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="-ml-2 mb-6 w-10 p-2"
        >
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>

        <Heading className="mb-2 text-[#4CAF50]">
          Psychological Wellbeing
        </Heading>
        <Text className="text-[14px] text-suhrhit-muted leading-[22px] mb-4">
          This 18-item assessment helps you understand 6 key dimensions of your
          psychological functioning.
        </Text>

        <View className="bg-[#E8F5E9] rounded-xl p-3 mb-8">
          <Text className="text-[12px] text-[#2E7D32] font-semibold">
            Scale: 1 (Strongly Disagree) to 7 (Strongly Agree)
          </Text>
        </View>

        <View className="mb-8">
          {QUESTIONS.map((q, index) => (
            <View
              key={q.id}
              className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#F0F0F0]"
            >
              <View className="flex-row items-start mb-5">
                <Text className="text-[#4CAF50] font-bold text-[14px] mr-2">
                  Q{index + 1}.
                </Text>
                <Text className="text-[#1A1A1A] font-semibold text-[15px] leading-[22px] flex-1">
                  {q.text}
                </Text>
              </View>

              <View className="flex-row justify-between">
                {OPTIONS.map((val) => {
                  const isSelected = answers[q.id] === val;
                  return (
                    <TouchableOpacity
                      key={val}
                      onPress={() => handleSelect(q.id, val)}
                      className={`w-[12%] aspect-square rounded-full items-center justify-center border ${
                        isSelected
                          ? "bg-[#4CAF50] border-[#4CAF50]"
                          : "bg-[#FAFAFA] border-[#E0E0E0]"
                      }`}
                    >
                      <Text
                        className={`text-[14px] font-bold ${isSelected ? "text-white" : "text-[#757575]"}`}
                      >
                        {val}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}
