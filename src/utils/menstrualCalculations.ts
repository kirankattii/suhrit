export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

export interface CycleInfo {
  cycleDay: number;
  currentPhase: CyclePhase;
  daysUntilNextPhase: number;
  nextPhase: CyclePhase;
}

export function getCycleInfo(lastPeriodStart: Date): CycleInfo {
  const today = new Date();
  
  // Normalize times to midnight UTC to avoid time-of-day and DST differences
  const normalizedToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedLMP = Date.UTC(lastPeriodStart.getFullYear(), lastPeriodStart.getMonth(), lastPeriodStart.getDate());
  
  const diffTime = Math.abs(normalizedToday - normalizedLMP);
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

export interface CycleDelayState {
  cycleDay: number;
  cycleDuration: number;
  delayDays: number;
  isDelayed: boolean;
  statusMessage: string;
}

/**
 * Calculates cycle day and delay based on user's entered cycle duration.
 */
export function calculateCycleWithDelay(
  lastPeriodStartDate: Date,
  cycleDuration: number, // e.g., 28, 30, or user-selected duration
  currentDate: Date = new Date()
): CycleDelayState {
  // 1. Calculate continuous days since last period started
  // Normalize dates to remove time parts
  const normalizedCurrent = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const normalizedLMP = Date.UTC(lastPeriodStartDate.getFullYear(), lastPeriodStartDate.getMonth(), lastPeriodStartDate.getDate());
  
  const diffInTime = normalizedCurrent - normalizedLMP;
  const elapsedDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  const cycleDay = elapsedDays + 1;

  // 2. Check if period is delayed based on custom cycle duration
  if (elapsedDays > cycleDuration) {
    const delayDays = elapsedDays - cycleDuration;
    return {
      cycleDay,
      cycleDuration,
      delayDays,
      isDelayed: true,
      statusMessage: `Delayed by ${delayDays} day${delayDays > 1 ? "s" : ""}`
    };
  }

  // 3. Normal cycle progress
  return {
    cycleDay,
    cycleDuration,
    delayDays: 0,
    isDelayed: false,
    statusMessage: `Cycle Day ${cycleDay}`
  };
}
