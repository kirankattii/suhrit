import React from "react";
import { router } from "expo-router";
import DarkQuestionnaire, { Question } from "../../../../components/menstrual/DarkQuestionnaire";

const JDRSP_QUESTIONS: Question[] = [
  { id: "e1", text: "I have felt sad, low, or depressed.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "e2", text: "I have felt anxious, tense, or on edge.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "e3", text: "I have experienced noticeable mood changes or felt tearful.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "e4", text: "I have felt irritable or experienced conflicts with others.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "p1", text: "I have felt unusually tired, fatigued, or lacking energy.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "p2", text: "I have experienced changes in my sleep.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "p3", text: "I have experienced breast tenderness/swelling or bloating.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
  { id: "p4", text: "I have experienced headaches or muscle/joint pain.", scale: 6, options: ["Not at all", "Extremely mild", "Mild", "Moderate", "Severe", "Extreme"] },
];

export default function MenstrualQuizScreen() {
  const handleComplete = (answers: number[]) => {
    // 1-indexed values are returned from DarkQuestionnaire
    const emotionalScore = answers.slice(0, 4).reduce((a, b) => a + b, 0);
    const physicalScore = answers.slice(4, 8).reduce((a, b) => a + b, 0);
    // In a real app we'd save this to state/store, but we'll just redirect to the dashboard for now
    router.replace({
      pathname: "/explore/menstrual/symptoms/result",
      params: {
        emotionalScore: emotionalScore.toString(),
        physicalScore: physicalScore.toString()
      }
    });
  };

  return (
    <DarkQuestionnaire
      title="Understand Your Cycle"
      description="Select the response that best describes your experience over the past few days."
      questions={JDRSP_QUESTIONS}
      onComplete={handleComplete}
    />
  );
}
