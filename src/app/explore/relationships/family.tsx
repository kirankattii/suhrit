import React, { useState } from "react";
import { router } from "expo-router";
import Questionnaire, { Question } from "../../../components/relationships/Questionnaire";
import ResultScreen from "../../../components/relationships/ResultScreen";
import IssueSelectionScreen, { IssueOption } from "../../../components/relationships/IssueSelectionScreen";
import InsightSolutionScreen from "../../../components/relationships/InsightSolutionScreen";
import { MessageCircle, ShieldAlert, Users, Heart, ShieldX, HelpCircle, Home } from "lucide-react-native";

const ffcsOptions = [
  "Completely false",
  "More false than true",
  "More true than false",
  "Completely true"
];

const FFCS_QUESTIONS: Question[] = [
  { id: "1", text: "We tend to share the same beliefs (social, religious, political)", scale: 4, options: ffcsOptions },
  { id: "2", text: "We enjoy dining together", scale: 4, options: ffcsOptions },
  { id: "3", text: "We all pray together", scale: 4, options: ffcsOptions },
  { id: "4", text: "We feel better when we do not spend much time together", scale: 4, isReverseScored: true, options: ffcsOptions },
  { id: "5", text: "All members of the family share the same values", scale: 4, options: ffcsOptions },
  { id: "6", text: "Decisions are usually taken by consensus", scale: 4, options: ffcsOptions },
  { id: "7", text: "There are some members of the family who impose their wishes on others", scale: 4, isReverseScored: true, options: ffcsOptions },
  { id: "8", text: "We often get angry with each other", scale: 4, isReverseScored: true, options: ffcsOptions },
  { id: "9", text: "We often yell at each other", scale: 4, isReverseScored: true, options: ffcsOptions },
  { id: "10", text: "There are episodes of physical violence in the family", scale: 4, isReverseScored: true, options: ffcsOptions },
  { id: "11", text: "We talk openly with each other", scale: 4, options: ffcsOptions },
  { id: "12", text: "We usually problem-solve together", scale: 4, options: ffcsOptions },
  { id: "13", text: "We always support each other", scale: 4, options: ffcsOptions },
  { id: "14", text: "We draw strength from one another", scale: 4, options: ffcsOptions },
];

const FAMILY_ISSUES: IssueOption[] = [
  { id: "communication", title: "Communication", icon: <MessageCircle color="#7293B3" size={20} /> },
  { id: "conflict", title: "Conflict/anger", icon: <ShieldAlert color="#7293B3" size={20} /> },
  { id: "expectations", title: "Family expectations & values", icon: <Users color="#7293B3" size={20} /> },
  { id: "emotional", title: "Emotional connection", icon: <Heart color="#7293B3" size={20} /> },
  { id: "boundaries", title: "Boundaries/autonomy", icon: <ShieldX color="#7293B3" size={20} /> },
  { id: "other", title: "Something else", icon: <HelpCircle color="#7293B3" size={20} /> },
];

type Step = "test" | "result" | "issue" | "solution";

export default function FamilyScreen() {
  const [step, setStep] = useState<Step>("test");
  const [score, setScore] = useState(0);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const calculateFFCSScore = (answers: number[]) => {
    let total = 0;
    answers.forEach((ans, idx) => {
      const q = FFCS_QUESTIONS[idx];
      // ans is 0 to 3 based on UI (0=Completely False, 3=Completely True)
      let val = ans; 
      if (q.isReverseScored) {
        val = 3 - ans;
      }
      total += val;
    });
    return total;
  };

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
        title="Family Support Questionnaire"
        subtitle="14 questions • Takes 5-7 minutes"
        description="This helps us understand your relationship with your family and the support you receive."
        questions={FFCS_QUESTIONS}
        onComplete={handleTestComplete}
        zeroIndexed={true}
        customScoring={calculateFFCSScore}
      />
    );
  }

  if (step === "result") {
    let bandLabel = "";
    let interpretation = "";
    
    // Total max is 42
    if (score <= 14) {
      bandLabel = "Lower Support";
      interpretation = "You may feel a lack of support or connection with your family. It's common to experience difficulties in family dynamics, and it might be helpful to explore boundaries.";
    } else if (score <= 28) {
      bandLabel = "Moderate Support";
      interpretation = "You feel some support from your family, but there may be areas where you feel less understood, supported, or where conflicts arise.";
    } else {
      bandLabel = "Higher Support";
      interpretation = "You feel a strong sense of support and connection with your family. This is a positive foundation for your well-being.";
    }

    return (
      <ResultScreen
        title="Your Family Support Score"
        score={score}
        maxScore={42}
        bandLabel={bandLabel}
        interpretation={interpretation}
        icon={<Home color="#519259" size={48} />}
        continueText="Save & Continue"
        onContinue={() => setStep("issue")}
      />
    );
  }

  if (step === "issue") {
    return (
      <IssueSelectionScreen
        title="Would you like to explore what might be affecting your family support?"
        subtitle="Choose what you'd like to look into further. You can always come back later."
        options={FAMILY_ISSUES}
        onSelect={handleIssueSelect}
        onSkip={() => router.back()}
      />
    );
  }

  // Solution Step
  const selectedIssue = FAMILY_ISSUES.find(i => i.id === selectedIssueId);
  return (
    <InsightSolutionScreen
      title={selectedIssue?.title || "Insight"}
      icon={selectedIssue?.icon}
      introText={`Your responses suggest that ${selectedIssue?.title.toLowerCase()} may be an area of focus in your family dynamics.`}
      showsUpList={[
        "You might feel pressured to conform to family expectations over your own values.",
        "There may be tension or frequent disagreements over life choices.",
        "You might struggle to establish independence or have your boundaries respected."
      ]}
      improveList={[
        "Clearly communicate your boundaries when you are calm.",
        "Acknowledge their perspective, but remain firm in your own needs.",
        "It's okay to limit time spent together if it protects your mental well-being."
      ]}
      onFinish={() => router.back()}
    />
  );
}
