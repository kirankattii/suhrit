import AsyncStorage from "@react-native-async-storage/async-storage";

export type TrigunaProfile = "Sattva Dominant" | "Rajas Dominant" | "Tamas Dominant" | "Dual Dominance";

export interface TrigunaResult {
  id: string;
  date: string;
  sattva: number;
  rajas: number;
  tamas: number;
  total: number;
  dominantProfile: TrigunaProfile;
}

const TRIGUNA_HISTORY_KEY = "@triguna_history";

export const saveTrigunaResult = async (result: TrigunaResult) => {
  try {
    const existing = await getTrigunaHistory();
    const updated = [result, ...existing];
    await AsyncStorage.setItem(TRIGUNA_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving Triguna result:", error);
  }
};

export const getTrigunaHistory = async (): Promise<TrigunaResult[]> => {
  try {
    const data = await AsyncStorage.getItem(TRIGUNA_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting Triguna history:", error);
    return [];
  }
};

export const calculateTrigunaScore = (answers: Record<string, number>): TrigunaResult => {
  const getVal = (q: string) => answers[q] || 3; // Default 3 (Sometimes)

  const sattva = 
    getVal("Q01") + getVal("Q04") + getVal("Q07") + getVal("Q10") + getVal("Q13") + 
    getVal("Q16") + getVal("Q19") + getVal("Q22") + getVal("Q25") + getVal("Q28");
    
  const rajas = 
    getVal("Q02") + getVal("Q05") + getVal("Q08") + getVal("Q11") + getVal("Q14") + 
    getVal("Q17") + getVal("Q20") + getVal("Q23") + getVal("Q26") + getVal("Q29");
    
  const tamas = 
    getVal("Q03") + getVal("Q06") + getVal("Q09") + getVal("Q12") + getVal("Q15") + 
    getVal("Q18") + getVal("Q21") + getVal("Q24") + getVal("Q27") + getVal("Q30");

  const total = sattva + rajas + tamas;

  let dominantProfile: TrigunaProfile = "Dual Dominance";
  
  if (sattva > rajas && sattva > tamas) {
    dominantProfile = "Sattva Dominant";
  } else if (rajas > sattva && rajas >= tamas) {
    dominantProfile = "Rajas Dominant";
  } else if (tamas > sattva && tamas > rajas) {
    dominantProfile = "Tamas Dominant";
  } else if (sattva === rajas || rajas === tamas) {
    dominantProfile = "Dual Dominance";
  }

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    sattva,
    rajas,
    tamas,
    total,
    dominantProfile
  };
};
