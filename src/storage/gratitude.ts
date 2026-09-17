import AsyncStorage from "@react-native-async-storage/async-storage";

const GRATITUDE_KEY = "@suhrhit_gratitude_history";

export interface GratitudeEntry {
  id: string;
  date: string;
  text: string;
}

export async function getGratitudes(): Promise<GratitudeEntry[]> {
  const value = await AsyncStorage.getItem(GRATITUDE_KEY);
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export async function saveGratitude(text: string): Promise<GratitudeEntry> {
  const history = await getGratitudes();
  const newEntry: GratitudeEntry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    text,
  };
  history.push(newEntry);
  await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(history));
  return newEntry;
}

export async function getGratitudeStreak(): Promise<{
  streak: number;
  lastEntryDate: string | null;
  canPlantToday: boolean;
}> {
  const history = await getGratitudes();
  if (history.length === 0) {
    return { streak: 0, lastEntryDate: null, canPlantToday: true };
  }

  // Sort history by date descending
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let currentStreak = 1; // At least one entry exists
  
  // Normalize dates to local midnight for streak calculation
  const normalizeDate = (isoString: string) => {
    const d = new Date(isoString);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const today = normalizeDate(new Date().toISOString());
  const lastEntryTime = normalizeDate(sortedHistory[0].date);
  
  // Calculate if the user can plant today (only once per calendar day)
  const canPlantToday = lastEntryTime < today;

  // If the last entry was before yesterday, streak is broken (0)
  const oneDayMs = 24 * 60 * 60 * 1000;
  if (today - lastEntryTime > oneDayMs) {
    return { streak: 0, lastEntryDate: sortedHistory[0].date, canPlantToday: true };
  }

  // Calculate ongoing streak by looking backwards
  for (let i = 0; i < sortedHistory.length - 1; i++) {
    const current = normalizeDate(sortedHistory[i].date);
    const prev = normalizeDate(sortedHistory[i + 1].date);

    // If difference is exactly 1 day, streak continues
    if (current - prev === oneDayMs) {
      currentStreak++;
    } 
    // If difference is 0 (multiple entries in one day somehow), ignore and continue
    else if (current === prev) {
      continue;
    }
    // Gap > 1 day, streak ends
    else {
      break;
    }
  }

  return {
    streak: currentStreak,
    lastEntryDate: sortedHistory[0].date,
    canPlantToday,
  };
}
