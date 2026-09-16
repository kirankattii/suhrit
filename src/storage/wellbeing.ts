import AsyncStorage from "@react-native-async-storage/async-storage";

const WHO5_KEY = "@suhrhit_who5_history";
const CHECKIN_KEY = "@suhrhit_checkin_history";

export interface WHO5Result {
  id: string;
  date: string;
  rawScore: number;
  percentage: number;
}

export interface DailyCheckin {
  id: string;
  date: string;
  mood: number; // 1-5
  stress: number; // 1-5
  energy: number; // 1-5
  sleepDuration: number; // hours
  bedTime: string;
  wakeTime: string;
}

export async function saveWHO5Result(result: Omit<WHO5Result, "id">) {
  const history = await getWHO5History();
  const newResult: WHO5Result = { ...result, id: Date.now().toString() };
  history.push(newResult);
  await AsyncStorage.setItem(WHO5_KEY, JSON.stringify(history));
  return newResult;
}

export async function getWHO5History(): Promise<WHO5Result[]> {
  const value = await AsyncStorage.getItem(WHO5_KEY);
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export async function saveDailyCheckin(checkin: Omit<DailyCheckin, "id">) {
  const history = await getDailyCheckins();
  const newCheckin: DailyCheckin = { ...checkin, id: Date.now().toString() };
  history.push(newCheckin);
  await AsyncStorage.setItem(CHECKIN_KEY, JSON.stringify(history));
  return newCheckin;
}

export async function getDailyCheckins(): Promise<DailyCheckin[]> {
  const value = await AsyncStorage.getItem(CHECKIN_KEY);
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}
