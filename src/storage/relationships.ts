import AsyncStorage from "@react-native-async-storage/async-storage";

const RELATIONSHIP_KEY = "@suhrhit_relationship_history";

export type RelationshipTestType = 'mspss' | 'romantic' | 'family' | 'friends';

export interface RelationshipResult {
  id: string;
  date: string;
  type: RelationshipTestType;
  score: number;
  maxScore: number;
  bandLabel: string;
}

export async function getRelationshipHistory(): Promise<RelationshipResult[]> {
  try {
    const value = await AsyncStorage.getItem(RELATIONSHIP_KEY);
    if (!value) return [];
    return JSON.parse(value);
  } catch (error) {
    console.error("Failed to fetch relationship history:", error);
    return [];
  }
}

export async function saveRelationshipResult(
  type: RelationshipTestType,
  score: number,
  maxScore: number,
  bandLabel: string
): Promise<RelationshipResult> {
  const history = await getRelationshipHistory();
  const newResult: RelationshipResult = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    type,
    score,
    maxScore,
    bandLabel,
  };
  history.push(newResult);
  await AsyncStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(history));
  return newResult;
}
