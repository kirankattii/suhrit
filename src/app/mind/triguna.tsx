import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { Heading } from "../../components/Typography";
import { calculateTrigunaScore, saveTrigunaResult } from "../../storage/triguna";

const QUESTIONS = [
  { id: "Q01", dimension: "sattva", text: "I maintain a calm and steady mind even when facing unexpected challenges." },
  { id: "Q02", dimension: "rajas", text: "I feel a constant, restless urge to keep busy or achieve more." },
  { id: "Q03", dimension: "tamas", text: "I feel persistent sluggishness, physical heaviness, or low energy throughout the day." },
  { id: "Q04", dimension: "sattva", text: "I practice patience, empathy, and forgiveness toward others in daily interactions." },
  { id: "Q05", dimension: "rajas", text: "I get irritated or angry quickly when things do not go as planned." },
  { id: "Q06", dimension: "tamas", text: "I frequently delay important tasks and struggle with chronic procrastination." },
  { id: "Q07", dimension: "sattva", text: "I feel a genuine sense of inner contentment and gratitude for my life." },
  { id: "Q08", dimension: "rajas", text: "I overthink past decisions and worry excessively about future scenarios." },
  { id: "Q09", dimension: "tamas", text: "I experience mental fog, confusion, or difficulty making basic decisions." },
  { id: "Q10", dimension: "sattva", text: "I naturally choose healthy, nourishing habits that keep my body and mind balanced." },
  { id: "Q11", dimension: "rajas", text: "I feel intensely competitive and constantly compare my achievements with others." },
  { id: "Q12", dimension: "tamas", text: "I tend to isolate myself socially and avoid interacting with friends or family." },
  { id: "Q13", dimension: "sattva", text: "I manage my emotional impulses effectively during high-stress situations." },
  { id: "Q14", dimension: "rajas", text: "My energy and mood shift rapidly between intense enthusiasm and sudden fatigue." },
  { id: "Q15", dimension: "tamas", text: "I hold onto past grudges, bitterness, and negative emotions for extended periods." },
  { id: "Q16", dimension: "sattva", text: "I seek personal growth and learning for self-improvement rather than social status." },
  { id: "Q17", dimension: "rajas", text: "I constantly seek external validation, attention, or social approval." },
  { id: "Q18", dimension: "tamas", text: "I feel unmotivated, pessimistic, or helpless regarding positive personal changes." },
  { id: "Q19", dimension: "sattva", text: "I communicate truthfully, kindly, and constructively without unnecessary arguing." },
  { id: "Q20", dimension: "rajas", text: "I find it difficult to sit quietly without seeking constant distraction or activity." },
  { id: "Q21", dimension: "tamas", text: "I daze off frequently, oversleep, or wake up unrefreshed despite full sleep." },
  { id: "Q22", dimension: "sattva", text: "I maintain a regular self-care routine, adequate rest, and balanced daily rhythm." },
  { id: "Q23", dimension: "rajas", text: "I make hasty, impulsive decisions driven by immediate emotions or desires." },
  { id: "Q24", dimension: "tamas", text: "I tend to ignore or neglect my personal hygiene, physical health, and environment." },
  { id: "Q25", dimension: "sattva", text: "I deal with life transitions and losses with emotional stability and resilience." },
  { id: "Q26", dimension: "rajas", text: "I experience physical restlessness, muscle tension, or a fast-paced mind." },
  { id: "Q27", dimension: "tamas", text: "I feel emotionally dazed, numb, or detached from my goals and daily life." },
  { id: "Q28", dimension: "sattva", text: "I enjoy serving or helping others without expecting personal gain or reward." },
  { id: "Q29", dimension: "rajas", text: "I feel deeply driven by material ambitions, status, and attachment to outcomes." },
  { id: "Q30", dimension: "tamas", text: "I rely on passive distractions or unhealthy escapes to avoid reality." }
];

const OPTIONS = [
  { label: "Never", value: 1 },
  { label: "Rarely", value: 2 },
  { label: "Sometimes", value: 3 },
  { label: "Often", value: 4 },
  { label: "Always", value: 5 },
];

export default function TrigunaAssessmentScreen() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < QUESTIONS.length) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    const result = calculateTrigunaScore(answers);
    await saveTrigunaResult(result);
    
    // Pass stringified result object via query params, or use an ID and fetch from storage
    // Using simple query param stringification for ease (assuming it's small)
    router.replace(`/mind/triguna-result?result=${encodeURIComponent(JSON.stringify(result))}`);
  };

  return (
    <Screen scroll footer={<Button title="Submit Assessment" onPress={handleSubmit} />}>
      <View className="px-6 pt-8 pb-12">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 mb-6 w-10 p-2">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>

        <Heading className="mb-2 text-[#FF9800]">NIMHANS Triguna Scale</Heading>
        <Text className="text-[14px] text-suhrhit-muted leading-[22px] mb-8">
          This 30-item assessment helps you discover your dominant behavioral and energy traits according to Ayurvedic psychology.
        </Text>

        <View className="mb-8">
          {QUESTIONS.map((q, index) => (
            <View key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#F0F0F0]">
              <View className="flex-row items-start mb-4">
                <Text className="text-[#FF9800] font-bold text-[14px] mr-2">Q{index + 1}.</Text>
                <Text className="text-[#1A1A1A] font-semibold text-[15px] leading-[22px] flex-1">
                  {q.text}
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2">
                {OPTIONS.map((opt) => {
                  const isSelected = answers[q.id] === opt.value;
                  return (
                    <TouchableOpacity
                      key={opt.value}
                      onPress={() => handleSelect(q.id, opt.value)}
                      className={`flex-1 min-w-[30%] py-2 rounded-lg items-center border ${
                        isSelected 
                          ? "bg-[#FFE0B2] border-[#FF9800]" 
                          : "bg-[#FAFAFA] border-[#E0E0E0]"
                      }`}
                    >
                      <Text className={`text-[12px] font-medium text-center ${isSelected ? "text-[#E65100]" : "text-[#757575]"}`}>
                        {opt.label}
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
