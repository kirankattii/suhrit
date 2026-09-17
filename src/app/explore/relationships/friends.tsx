import React, { useState } from "react";
import { router } from "expo-router";
import Questionnaire, { Question } from "../../../components/relationships/Questionnaire";
import ResultScreen from "../../../components/relationships/ResultScreen";
import IssueSelectionScreen, { IssueOption } from "../../../components/relationships/IssueSelectionScreen";
import InsightSolutionScreen from "../../../components/relationships/InsightSolutionScreen";
import { Users, UserMinus, MessageCircle, Frown, HeartOff, UserPlus, Clock, ShieldAlert, CloudOff, HelpCircle } from "lucide-react-native";
import { saveRelationshipResult } from "../../../storage/relationships";

const fnsOptions = [
  "Not at all agree",
  "Hardly agree",
  "Somewhat agree",
  "Pretty much agree",
  "Very much agree",
  "Completely agree"
];

const FNS_QUESTIONS: Question[] = [
  { id: "1", text: "I feel close to my friends.", scale: 6, options: fnsOptions },
  { id: "2", text: "It is hard to imagine my life without my close/best friends.", scale: 6, options: fnsOptions },
  { id: "3", text: "My friends celebrate my good news.", scale: 6, options: fnsOptions },
  { id: "4", text: "I have fun with my friends.", scale: 6, options: fnsOptions },
  { id: "5", text: "I have meaningful conversations with my friends.", scale: 6, options: fnsOptions },
  { id: "6", text: "I like to hang out with my friends.", scale: 6, options: fnsOptions },
  { id: "7", text: "My friends understand me.", scale: 6, options: fnsOptions },
  { id: "8", text: "When I have a problem, I can talk to my friends about it.", scale: 6, options: fnsOptions },
  { id: "9", text: "I spend a lot of time socializing with my friends.", scale: 6, options: fnsOptions },
  { id: "10", text: "My friends and I go out and do things together.", scale: 6, options: fnsOptions },
  { id: "11", text: "My friends and I eat together often.", scale: 6, options: fnsOptions },
  { id: "12", text: "I attend social events with my friends.", scale: 6, options: fnsOptions },
  { id: "13", text: "I spend free time with my friends.", scale: 6, options: fnsOptions },
  { id: "14", text: "I socialize with a lot of different people.", scale: 6, options: fnsOptions },
];

const FRIENDS_ISSUES: IssueOption[] = [
  { id: "disconnected", title: "Feeling disconnected from friends", icon: <UserMinus color="#7293B3" size={20} /> },
  { id: "communication", title: "Difficulty communicating", icon: <MessageCircle color="#7293B3" size={20} /> },
  { id: "misunderstood", title: "Feeling misunderstood", icon: <Frown color="#7293B3" size={20} /> },
  { id: "support", title: "Lack of emotional support", icon: <HeartOff color="#7293B3" size={20} /> },
  { id: "making_friends", title: "Difficulty making/maintaining friendships", icon: <UserPlus color="#7293B3" size={20} /> },
  { id: "time", title: "Not spending enough time together", icon: <Clock color="#7293B3" size={20} /> },
  { id: "conflict", title: "Conflicts or disagreements", icon: <ShieldAlert color="#7293B3" size={20} /> },
  { id: "lonely", title: "Feeling lonely", icon: <CloudOff color="#7293B3" size={20} /> },
  { id: "other", title: "Something else", icon: <HelpCircle color="#7293B3" size={20} /> },
];

type Step = "test" | "result" | "issue" | "solution";

export default function FriendsScreen() {
  const [step, setStep] = useState<Step>("test");
  const [score, setScore] = useState(0);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const handleTestComplete = async (totalScore: number) => {
    setScore(totalScore);

    let bandLabel = "";
    if (totalScore <= 23) {
      bandLabel = "Lower satisfaction";
    } else if (totalScore <= 46) {
      bandLabel = "Moderate satisfaction";
    } else {
      bandLabel = "Higher satisfaction";
    }
    
    await saveRelationshipResult('friends', totalScore, 70, bandLabel);
    setStep("result");
  };

  const handleIssueSelect = (id: string) => {
    setSelectedIssueId(id);
    setStep("solution");
  };

  if (step === "test") {
    return (
      <Questionnaire
        title="Friendship Network Satisfaction"
        subtitle="14 questions • Takes 5-7 minutes"
        description="Please rate how much you agree with each statement about your friends during the past year."
        questions={FNS_QUESTIONS}
        onComplete={handleTestComplete}
        zeroIndexed={true}
      />
    );
  }

  if (step === "result") {
    let bandLabel = "";
    let interpretation = "";
    
    // Total max is 70
    if (score <= 23) {
      bandLabel = "Lower satisfaction";
      interpretation = "Your responses reflect a lower level of satisfaction with your friendships right now. You might be feeling disconnected or lacking the social support you desire.";
    } else if (score <= 46) {
      bandLabel = "Moderate satisfaction";
      interpretation = "Your responses reflect a moderate level of satisfaction with your friendships. While you have some good connections, there might be room for deeper closeness or more frequent socializing.";
    } else {
      bandLabel = "Higher satisfaction";
      interpretation = "Your responses indicate a relatively high level of satisfaction with your friendships. You likely feel close, supported and socially connected.";
    }

    return (
      <ResultScreen
        title="Your Friendship Satisfaction"
        score={score}
        maxScore={70}
        bandLabel={bandLabel}
        interpretation={interpretation}
        icon={<Users color="#7293B3" size={48} />}
        continueText="Explore Further"
        onContinue={() => setStep("issue")}
      />
    );
  }

  if (step === "issue") {
    return (
      <IssueSelectionScreen
        title="Would you like to explore your friendships further?"
        subtitle="Choose what you'd like to look into. You can always come back later."
        options={FRIENDS_ISSUES}
        onSelect={handleIssueSelect}
        onSkip={() => router.back()}
      />
    );
  }

  // Solution Step
  const selectedIssue = FRIENDS_ISSUES.find(i => i.id === selectedIssueId);
  return (
    <InsightSolutionScreen
      title={selectedIssue?.title || "Insight"}
      icon={selectedIssue?.icon}
      introText={`Your responses suggest that ${selectedIssue?.title.toLowerCase()} may be a challenge in your social life right now.`}
      showsUpList={[
        "You might feel like you're putting more effort into the friendship than they are.",
        "There may be long periods without communication or cancelled plans.",
        "You might feel lonely even when surrounded by others if the connection lacks depth."
      ]}
      improveList={[
        "Take the initiative to reach out and suggest specific, low-pressure plans.",
        "Be open about how you're feeling; vulnerability can foster deeper connection.",
        "Join clubs or groups aligned with your interests to meet like-minded people."
      ]}
      onFinish={() => router.back()}
    />
  );
}
