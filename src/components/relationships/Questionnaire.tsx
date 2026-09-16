import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Alert } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import RadioCard from "../RadioCard";
import Screen from "../Screen";
import Button from "../Button";

export interface Question {
  id: string;
  text: string;
  options?: string[]; // If custom labels are provided
  minLabel?: string;
  maxLabel?: string;
  scale: number;
  isReverseScored?: boolean;
}

interface QuestionnaireProps {
  title: string;
  subtitle: string;
  description?: string;
  questions: Question[];
  onComplete: (score: number, answers: number[]) => void;
  zeroIndexed?: boolean;
  customScoring?: (answers: number[]) => number;
}

export default function Questionnaire({
  title,
  subtitle,
  description,
  questions,
  onComplete,
  zeroIndexed = false,
  customScoring
}: QuestionnaireProps) {
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

  const calculateScore = () => {
    if (customScoring) return customScoring(answers);
    let total = 0;
    questions.forEach((q, idx) => {
      let val = answers[idx];
      if (!zeroIndexed) val += 1;
      if (q.isReverseScored) {
        if (zeroIndexed) val = (q.scale - 1) - val;
        else val = (q.scale + 1) - val;
      }
      total += val;
    });
    return total;
  };

  const handleNext = () => {
    if (answers[step] === -1) {
      Alert.alert("Please select an option", "You must answer the question to continue.");
      return;
    }
    if (step < questions.length - 1) {
      animateToStep(step + 1);
    } else {
      onComplete(calculateScore(), answers);
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
  
  // Generate options based on scale or provided options array
  const currentOptions = q.options 
    ? q.options.map((opt, i) => ({ label: opt, value: i })) 
    : Array.from({ length: q.scale }).map((_, i) => {
        let label = `${zeroIndexed ? i : i + 1}`;
        if (i === 0 && q.minLabel) label = `${q.minLabel}`;
        if (i === q.scale - 1 && q.maxLabel) label = `${q.maxLabel}`;
        return { label, value: i };
      });

  return (
    <Screen
      scroll
      header={
        <View className="px-4 py-2 flex-row items-center justify-between bg-suhrhit-background z-10 border-b border-suhrhit-border/20">
          <TouchableOpacity onPress={handleBack} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-1 flex-1 justify-end ml-4">
            <Text className="text-[12px] font-semibold text-suhrhit-secondary mr-2">{step + 1} / {questions.length}</Text>
            <View className="h-2 flex-1 max-w-[100px] bg-suhrhit-border rounded-full overflow-hidden">
               <View 
                 className="h-full bg-suhrhit-primary rounded-full" 
                 style={{ width: `${((step + 1) / questions.length) * 100}%` }}
               />
            </View>
          </View>
        </View>
      }
      footer={
        <View className="flex-row gap-3 pt-2">
          {step > 0 && (
            <View className="flex-1">
              <Button title="Back" variant="secondary" onPress={handleBack} />
            </View>
          )}
          <View className={step > 0 ? "flex-[2]" : "flex-1"}>
            <Button
              title={step === questions.length - 1 ? "Finish" : "Next"}
              onPress={handleNext}
              disabled={answers[step] === -1}
            />
          </View>
        </View>
      }
    >
      <View className="px-6 pt-6">
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }], width: "100%" }}>
          <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-suhrhit-secondary">
            Question {step + 1} of {questions.length}
          </Text>

          <Text className="mb-4 text-[24px] font-bold text-suhrhit-primary" style={{ fontFamily: 'Georgia' }}>
            {title}
          </Text>

          {description && (
            <Text className="mb-8 text-[14px] text-suhrhit-muted leading-[21px]">
              {description}
            </Text>
          )}

          <View className="bg-white p-6 py-4 rounded-3xl border border-suhrhit-border mb-4">
            <Text className="text-[18px] font-semibold text-suhrhit-primary leading-[26px]">
              {q.text}
            </Text>
          </View>

          <View className="mb-8">
            {currentOptions.map((opt, idx) => (
              <RadioCard
                key={idx}
                title={opt.label}
                selected={answers[step] === opt.value}
                onPress={() => handleSelect(opt.value)}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </Screen>
  );
}
