import React, { useState } from "react";
import { router } from "expo-router";
import Questionnaire, { Question } from "../../../components/relationships/Questionnaire";
import ResultScreen from "../../../components/relationships/ResultScreen";
import IssueSelectionScreen, { IssueOption } from "../../../components/relationships/IssueSelectionScreen";
import InsightSolutionScreen from "../../../components/relationships/InsightSolutionScreen";
import { Heart, MessageCircle, ShieldAlert, HeartHandshake, Lock, Activity, ShieldX, Unlock, HelpCircle } from "lucide-react-native";

const RAS_QUESTIONS: Question[] = [
  { id: "1", text: "How often does your partner meet your needs?", scale: 5, options: ["Very Poor", "Poor", "Average", "Well", "Extremely well"] },
  { id: "2", text: "In general, how satisfied are you with your relationship?", scale: 5, options: ["Unsatisfied", "Somewhat Unsatisfied", "Average", "Somewhat Satisfied", "Extremely Satisfied"] },
  { id: "3", text: "How good is your relationship compared to most?", scale: 5, options: ["Poor", "Fair", "Average", "Good", "Excellent"] },
  { id: "4", text: "How often do you wish you hadn't gotten in this relationship?", scale: 5, isReverseScored: true, options: ["Never", "Rarely", "Average", "Often", "Very Often"] },
  { id: "5", text: "To what extent has your relationship met your original expectations?", scale: 5, options: ["Hardly at all", "A little", "Average", "Mostly", "Completely"] },
  { id: "6", text: "How much do you love your partner?", scale: 5, options: ["Not much", "A little", "Average", "Much", "Very Much"] },
  { id: "7", text: "How many problems are there in your relationship?", scale: 5, isReverseScored: true, options: ["Very few", "Few", "Average", "Many", "Very Many"] },
];

const ROMANTIC_ISSUES: IssueOption[] = [
  { id: "communication", title: "Communication", icon: <MessageCircle color="#7293B3" size={20} /> },
  { id: "conflict", title: "Conflict", icon: <ShieldAlert color="#7293B3" size={20} /> },
  { id: "emotional_intimacy", title: "Emotional intimacy", icon: <Heart color="#7293B3" size={20} /> },
  { id: "trust", title: "Trust", icon: <Lock color="#7293B3" size={20} /> },
  { id: "boundaries", title: "Boundaries", icon: <ShieldX color="#7293B3" size={20} /> },
  { id: "responsibilities", title: "Unequal responsibilities", icon: <Activity color="#7293B3" size={20} /> },
  { id: "controlled", title: "Feeling controlled", icon: <Unlock color="#7293B3" size={20} /> },
  { id: "insecurity", title: "Relationship insecurity", icon: <HeartHandshake color="#7293B3" size={20} /> },
  { id: "other", title: "Something else", icon: <HelpCircle color="#7293B3" size={20} /> },
];

type Step = "test" | "result" | "issue" | "solution";

export default function RomanticScreen() {
  const [step, setStep] = useState<Step>("test");
  const [score, setScore] = useState(0);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const handleTestComplete = (totalScore: number) => {
    setScore(totalScore);
    setStep("result");
  };

  const handleIssueSelect = (id: string) => {
    setSelectedIssueId(id);
    setStep("solution");
  };

  if (step === "test") {
    return (
      <Questionnaire
        title="Romantic Relationship"
        subtitle="7 questions • Takes 3-5 minutes"
        description="This questionnaire measures your overall satisfaction with your romantic relationship."
        questions={RAS_QUESTIONS}
        onComplete={handleTestComplete}
        zeroIndexed={false}
      />
    );
  }

  if (step === "result") {
    let bandLabel = "";
    let interpretation = "";
    
    if (score <= 17) {
      bandLabel = "Lower relationship satisfaction";
      interpretation = "Your responses suggest that you currently perceive a lower level of satisfaction in your relationship. There may be areas that need significant attention and support.";
    } else if (score <= 24) {
      bandLabel = "Moderate relationship satisfaction";
      interpretation = "You feel moderately satisfied in your relationship. There are some areas that may need attention or exploration to improve your connection.";
    } else {
      bandLabel = "Higher relationship satisfaction";
      interpretation = "Your responses suggest that you currently perceive a relatively high level of satisfaction in your relationship.";
    }

    return (
      <ResultScreen
        title="Your Relationship Satisfaction"
        score={score}
        maxScore={35}
        bandLabel={bandLabel}
        interpretation={interpretation}
        icon={<Heart color="#D35F5F" size={48} />}
        continueText="Explore Further"
        onContinue={() => setStep("issue")}
      />
    );
  }

  if (step === "issue") {
    return (
      <IssueSelectionScreen
        title="Would you like to explore more about your relationship?"
        subtitle="Your score suggests there may be some areas to look into. What would you like to explore?"
        options={ROMANTIC_ISSUES}
        onSelect={handleIssueSelect}
        onSkip={() => router.back()}
      />
    );
  }

  // Solution Step
  const selectedIssue = ROMANTIC_ISSUES.find(i => i.id === selectedIssueId);
  return (
    <InsightSolutionScreen
      title={selectedIssue?.title || "Insight"}
      icon={selectedIssue?.icon}
      introText={`Your responses suggest that ${selectedIssue?.title.toLowerCase()} may be an area of focus in your relationship.`}
      showsUpList={[
        "You may find it hard to express your needs or feelings clearly without misunderstandings.",
        "There may be frequent arguments or a lack of resolution after conflicts.",
        "You might feel unheard, unappreciated, or unsupported by your partner."
      ]}
      improveList={[
        "Try active listening (listen without interrupting and validate their feelings).",
        "Use 'I' statements (e.g., 'I feel...' instead of 'You always...').",
        "Set time aside for open, calm conversations outside of heated moments."
      ]}
      onFinish={() => router.back()}
    />
  );
}
