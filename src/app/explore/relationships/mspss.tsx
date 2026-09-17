import React, { useState } from "react";
import { router } from "expo-router";
import Questionnaire, { Question } from "../../../components/relationships/Questionnaire";
import ResultScreen from "../../../components/relationships/ResultScreen";
import { Users } from "lucide-react-native";
import { saveRelationshipResult } from "../../../storage/relationships";

const mspssOptions = [
  "Very Strongly Disagree",
  "Strongly Disagree",
  "Mildly Disagree",
  "Neutral",
  "Mildly Agree",
  "Strongly Agree",
  "Very Strongly Agree"
];

const MSPSS_QUESTIONS: Question[] = [
  { id: "1", text: "There is a special person who is around when I am in need.", scale: 7, options: mspssOptions },
  { id: "2", text: "There is a special person with whom I can share joys and sorrows.", scale: 7, options: mspssOptions },
  { id: "3", text: "My family really tries to help me.", scale: 7, options: mspssOptions },
  { id: "4", text: "I get the emotional help & support I need from my family.", scale: 7, options: mspssOptions },
  { id: "5", text: "I have a special person who is a real source of comfort to me.", scale: 7, options: mspssOptions },
  { id: "6", text: "My friends really try to help me.", scale: 7, options: mspssOptions },
  { id: "7", text: "I can count on my friends when things go wrong.", scale: 7, options: mspssOptions },
  { id: "8", text: "I can talk about my problems with my family.", scale: 7, options: mspssOptions },
  { id: "9", text: "I have friends with whom I can share my joys and sorrows.", scale: 7, options: mspssOptions },
  { id: "10", text: "There is a special person in my life who cares about my feelings.", scale: 7, options: mspssOptions },
  { id: "11", text: "My family is willing to help me make decisions.", scale: 7, options: mspssOptions },
  { id: "12", text: "I can talk about my problems with my friends.", scale: 7, options: mspssOptions },
];

type Step = "test" | "result";

export default function MSPSSScreen() {
  const [step, setStep] = useState<Step>("test");
  const [score, setScore] = useState(0);

  const handleComplete = async (totalScore: number) => {
    setScore(totalScore);
    
    let bandLabel = "";
    if (totalScore <= 35) {
      bandLabel = "Low social support";
    } else if (totalScore <= 60) {
      bandLabel = "Moderate support";
    } else {
      bandLabel = "High support";
    }
    
    await saveRelationshipResult('mspss', totalScore, 84, bandLabel);
    setStep("result");
  };

  if (step === "test") {
    return (
      <Questionnaire
        title="Social Support Assessment"
        subtitle="12 questions • Takes 3-5 minutes"
        description="This questionnaire helps us understand how much support you feel you have from your family, friends, and significant others."
        questions={MSPSS_QUESTIONS}
        onComplete={handleComplete}
        zeroIndexed={false}
      />
    );
  }

  let bandLabel = "";
  let interpretation = "";
  
  if (score <= 35) {
    bandLabel = "Low social support";
    interpretation = "You may feel a lack of support from your friends, family, and social circle. It can be helpful to explore ways to build stronger connections or seek professional support if you're feeling isolated.";
  } else if (score <= 60) {
    bandLabel = "Moderate support";
    interpretation = "You feel some support from your friends, family, and social circle, but there may be areas where you feel less understood or supported. Exploring specific relationships might help you identify areas for growth.";
  } else {
    bandLabel = "High support";
    interpretation = "You feel generally supported by your friends, family and social circle. This is positive and can help you manage stress and challenges better.";
  }

  return (
    <ResultScreen
      title="Your Social Support Score"
      score={score}
      maxScore={84}
      bandLabel={bandLabel}
      interpretation={interpretation}
      disclaimer="This is not a clinical diagnosis. It simply helps us understand your current support level."
      icon={<Users color="#7293B3" size={48} />}
      continueText="Continue"
      onContinue={() => router.back()}
    />
  );
}
