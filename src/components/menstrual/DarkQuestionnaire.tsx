import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Alert } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import DarkScreen from "./DarkScreen";

// A dark variant of RadioCard
function DarkRadioCard({ title, selected, onPress }: { title: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center border rounded-[20px] p-4 mb-3 ${
        selected ? "bg-[#82A9F9] border-[#82A9F9]" : "bg-[#142340] border-[#1E335A]"
      }`}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 mr-4 items-center justify-center ${
          selected ? "border-[#0D1B2A]" : "border-[#8B9CBE]"
        }`}
      >
        {selected && <View className="w-2.5 h-2.5 rounded-full bg-[#0D1B2A]" />}
      </View>
      <Text className={`font-bold text-[15px] flex-1 ${selected ? "text-[#0D1B2A]" : "text-white"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  scale: number;
}

interface DarkQuestionnaireProps {
  title: string;
  description?: string;
  questions: Question[];
  onComplete: (answers: number[]) => void;
}

export default function DarkQuestionnaire({
  title,
  description,
  questions,
  onComplete,
}: DarkQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateToStep = (nextStep: number) => {
    const direction = nextStep > step ? -1 : 1;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: direction * 50, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(-direction * 50);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[step] === -1) {
      Alert.alert("Please select an option", "You must answer the question to continue.");
      return;
    }
    if (step < questions.length - 1) {
      animateToStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      animateToStep(step - 1);
    } else {
      router.back();
    }
  };

  const q = questions[step];
  const currentOptions = q.options 
    ? q.options.map((opt, i) => ({ label: opt, value: i + 1 })) // 1-indexed for score
    : Array.from({ length: q.scale }).map((_, i) => ({ label: `${i + 1}`, value: i + 1 }));

  return (
    <DarkScreen
      scroll
      header={
        <View className="px-4 py-2 flex-row items-center justify-between border-b border-[#1E335A]">
          <TouchableOpacity onPress={handleBack} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#FFFFFF" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-1 flex-1 justify-end ml-4">
            <Text className="text-[12px] font-semibold text-[#8B9CBE] mr-2">{step + 1} / {questions.length}</Text>
            <View className="h-2 flex-1 max-w-[100px] bg-[#142340] rounded-full overflow-hidden">
               <View 
                 className="h-full bg-[#82A9F9] rounded-full" 
                 style={{ width: `${((step + 1) / questions.length) * 100}%` }}
               />
            </View>
          </View>
        </View>
      }
      footer={
        <View className="flex-row gap-3 pt-2">
          {step > 0 && (
            <TouchableOpacity 
              onPress={handleBack}
              className="flex-1 bg-[#142340] rounded-full py-4 items-center justify-center border border-[#1E335A]"
            >
              <Text className="text-white font-bold text-[16px]">Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            onPress={handleNext}
            disabled={answers[step] === -1}
            className={`${step > 0 ? 'flex-[2]' : 'flex-1'} rounded-full py-4 items-center justify-center ${
              answers[step] === -1 ? 'bg-[#1E335A]' : 'bg-[#82A9F9]'
            }`}
          >
            <Text className={`${answers[step] === -1 ? 'text-[#8B9CBE]' : 'text-[#0D1B2A]'} font-bold text-[16px]`}>
              {step === questions.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      }
    >
      <View className="px-6 pt-6">
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }], width: "100%" }}>
          <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-[#8B9CBE]">
            Question {step + 1} of {questions.length}
          </Text>

          <Text className="mb-4 text-[24px] font-bold text-white leading-[32px]" style={{ fontFamily: 'Georgia' }}>
            {title}
          </Text>

          {description && (
            <Text className="mb-8 text-[14px] text-[#8B9CBE] leading-[21px]">
              {description}
            </Text>
          )}

          <View className="bg-[#142340] p-6 py-5 rounded-3xl border border-[#1E335A] mb-6 shadow-lg">
            <Text className="text-[18px] font-semibold text-white leading-[26px]">
              {q.text}
            </Text>
          </View>

          <View className="mb-8">
            {currentOptions.map((opt, idx) => (
              <DarkRadioCard
                key={idx}
                title={opt.label}
                selected={answers[step] === opt.value}
                onPress={() => handleSelect(opt.value)}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </DarkScreen>
  );
}
