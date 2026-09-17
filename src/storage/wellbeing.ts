import AsyncStorage from "@react-native-async-storage/async-storage";

const WHO5_KEY = "@suhrhit_who5_history";
const CHECKIN_KEY = "@suhrhit_checkin_history";
const PRECONCEPTION_CHECKIN_KEY = "@suhrhit_preconception_checkin_history";

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

export interface PreconceptionResult {
  id: string;
  date: string;
  score: number;
  total: number;
  answers: Record<number, boolean>;
}

export async function savePreconceptionResult(result: Omit<PreconceptionResult, "id">) {
  const history = await getPreconceptionHistory();
  const newResult: PreconceptionResult = { ...result, id: Date.now().toString() };
  history.push(newResult);
  await AsyncStorage.setItem(PRECONCEPTION_CHECKIN_KEY, JSON.stringify(history));
  return newResult;
}

export async function getPreconceptionHistory(): Promise<PreconceptionResult[]> {
  const value = await AsyncStorage.getItem(PRECONCEPTION_CHECKIN_KEY);
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export async function canTakeDailyCheckin(): Promise<boolean> {
  const checkins = await getDailyCheckins();
  if (checkins.length === 0) return true;
  
  const lastCheckin = new Date(checkins[checkins.length - 1].date);
  const now = new Date();
  
  return lastCheckin.toDateString() !== now.toDateString();
}

export async function canTakeWHO5(): Promise<boolean> {
  const history = await getWHO5History();
  if (history.length === 0) return true;
  
  // Sort history by date descending
  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastTestDate = new Date(sortedHistory[0].date);
  const now = new Date();

  // Get Monday of current week
  const day = now.getDay(); // 0 is Sunday, 1 is Monday...
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const currentWeekMonday = new Date(now.setDate(diff));
  currentWeekMonday.setHours(0, 0, 0, 0);

  return lastTestDate < currentWeekMonday;
}
