import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";
import RadioCard from "../components/RadioCard";
import Screen from "../components/Screen";
import { Heading } from "../components/Typography";

const QUESTIONS = [
  "I have felt cheerful and in good spirits.",
  "I have felt calm and relaxed.",
  "I have felt active and vigorous.",
  "I woke up feeling fresh and rested.",
  "My daily life has been filled with things that interest me.",
];

const OPTIONS = [
  { label: "All of the time", score: 5 },
  { label: "Most of the time", score: 4 },
  { label: "More than half of the time", score: 3 },
  { label: "Less than half of the time", score: 2 },
  { label: "Some of the time", score: 1 },
  { label: "At no time", score: 0 },
];

export default function AssessmentScreen() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(5).fill(-1));

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateToStep = (nextStep: number) => {
    const direction = nextStep > step ? -1 : 1;
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction * 50,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      // Reset position to opposite side
      slideAnim.setValue(-direction * 50);
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = score;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[step] === -1) {
      Alert.alert(
        "Please select an option",
        "You must answer the question to continue.",
      );
      return;
    }

    if (step < 4) {
      animateToStep(step + 1);
    } else {
      // Calculate final score and navigate to results
      const rawScore = answers.reduce((a, b) => a + b, 0);
      router.replace(`/assessment-result?rawScore=${rawScore}`);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      animateToStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <Screen
      scroll
      footer={
        <View className="flex-row gap-3 pt-2">
          {step > 0 && (
            <View className="flex-1">
              <Button
                title="Back"
                variant="secondary"
                // size="small"
                onPress={handleBack}
              />
            </View>
          )}
          <View className={step > 0 ? "flex-[2]" : "flex-1"}>
            <Button
              title={step === 4 ? "Finish" : "Next"}
              onPress={handleNext}
              disabled={answers[step] === -1}
              // size="small"
            />
          </View>
        </View>
      }
    >
      <View className="px-6 pt-8">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={handleBack} className="-ml-2 w-10 p-2">
            <ChevronLeft color="#173F35" size={28} />
          </TouchableOpacity>

          <View className="flex-row items-center gap-1">
            {QUESTIONS.map((_, idx) => (
              <View
                key={idx}
                className={`h-2 rounded-full ${idx <= step ? "bg-suhrhit-primary w-6" : "bg-suhrhit-border w-2"}`}
              />
            ))}
          </View>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
            width: "100%",
          }}
        >
          <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1.5px] text-suhrhit-secondary">
            Question {step + 1} of 5
          </Text>

          <Heading className="mb-4">How have you been feeling lately?</Heading>

          <Text className="mb-8 text-[14px] text-suhrhit-muted leading-[21px]">
            Please indicate which of the following statements best describes how
            you have felt over the last two weeks:
          </Text>

          <View className="bg-white p-6 py-4 rounded-3xl border border-suhrhit-border mb-4">
            <Text className="text-[18px] font-semibold text-suhrhit-primary leading-[26px]">
              {QUESTIONS[step]}
            </Text>
          </View>

          <View>
            {OPTIONS.map((opt, idx) => (
              <RadioCard
                key={idx}
                title={opt.label}
                selected={answers[step] === opt.score}
                onPress={() => handleSelect(opt.score)}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </Screen>
  );
}
