export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

export interface CycleInfo {
  cycleDay: number;
  currentPhase: CyclePhase;
  daysUntilNextPhase: number;
  nextPhase: CyclePhase;
}

export function getCycleInfo(lastPeriodStart: Date): CycleInfo {
  const today = new Date();
  
  // Normalize times to midnight to avoid time-of-day differences
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedLMP = new Date(lastPeriodStart.getFullYear(), lastPeriodStart.getMonth(), lastPeriodStart.getDate());
  
  const diffTime = Math.abs(normalizedToday.getTime() - normalizedLMP.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Base 28-day cycle calculation
  let cycleDay = (diffDays % 28) + 1;
  
  let currentPhase: CyclePhase = 'Menstrual';
  let daysUntilNextPhase = 0;
  let nextPhase: CyclePhase = 'Follicular';
  
  if (cycleDay >= 1 && cycleDay <= 5) {
    currentPhase = 'Menstrual';
    daysUntilNextPhase = 6 - cycleDay;
    nextPhase = 'Follicular';
  } else if (cycleDay >= 6 && cycleDay <= 13) {
    currentPhase = 'Follicular';
    daysUntilNextPhase = 14 - cycleDay;
    nextPhase = 'Ovulation';
  } else if (cycleDay === 14) {
    currentPhase = 'Ovulation';
    daysUntilNextPhase = 15 - cycleDay;
    nextPhase = 'Luteal';
  } else {
    currentPhase = 'Luteal';
    daysUntilNextPhase = 29 - cycleDay;
    nextPhase = 'Menstrual';
  }
  
  return {
    cycleDay,
    currentPhase,
    daysUntilNextPhase,
    nextPhase
  };
}
