import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RyffResult {
  id: string;
  date: string;
  autonomy: number;
  environmentalMastery: number;
  personalGrowth: number;
  positiveRelations: number;
  purposeInLife: number;
  selfAcceptance: number;
  total: number;
}

const RYFF_HISTORY_KEY = "@ryff_history";

export const saveRyffResult = async (result: RyffResult) => {
  try {
    const existing = await getRyffHistory();
    const updated = [result, ...existing];
    await AsyncStorage.setItem(RYFF_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving Ryff result:", error);
  }
};

export const getRyffHistory = async (): Promise<RyffResult[]> => {
  try {
    const data = await AsyncStorage.getItem(RYFF_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting Ryff history:", error);
    return [];
  }
};

export const calculateRyffScore = (answers: Record<string, number>): RyffResult => {
  // 1 = Strongly Disagree, 7 = Strongly Agree (in our UI)
  // Negative items are reverse scored (7 - answer + 1) = 8 - answer
  const reverseScore = (val: number) => 8 - val;

  const score = (qId: string, isReverse: boolean = false) => {
    const val = answers[qId] || 4; // Default to neutral if somehow missing
    return isReverse ? reverseScore(val) : val;
  };

  // Subscales
  // Autonomy: Q15, Q17, Q18
  const autonomy = score("Q15", true) + score("Q17", false) + score("Q18", false);
  
  // Environmental Mastery: Q4, Q8, Q9
  const environmentalMastery = score("Q4", true) + score("Q8", false) + score("Q9", false);
  
  // Personal Growth: Q11, Q12, Q14
  const personalGrowth = score("Q11", false) + score("Q12", false) + score("Q14", true);
  
  // Positive Relations: Q6, Q13, Q16
  const positiveRelations = score("Q6", true) + score("Q13", false) + score("Q16", true);
  
  // Purpose in Life: Q3, Q7, Q10
  const purposeInLife = score("Q3", false) + score("Q7", true) + score("Q10", true);
  
  // Self-Acceptance: Q1, Q2, Q5
  const selfAcceptance = score("Q1", false) + score("Q2", false) + score("Q5", true);

  const total = autonomy + environmentalMastery + personalGrowth + positiveRelations + purposeInLife + selfAcceptance;

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    autonomy,
    environmentalMastery,
    personalGrowth,
    positiveRelations,
    purposeInLife,
    selfAcceptance,
    total
  };
};
