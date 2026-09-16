import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@suhrhit_onboarding_completed";
const PROFILE_KEY = "@suhrhit_profile";
const CONSENT_KEY = "@suhrhit_consent";

export interface ProfileData {
  name: string;
  age: string;
  relationshipStatus: string;
  occupation: string;
}

export interface ConsentData {
  accepted: boolean;
  version: string;
  acceptedAt: string;
}

export async function setOnboardingCompleted() {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

export async function isOnboardingCompleted() {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);

  return value === "true";
}

export async function saveProfile(profile: ProfileData) {
  await AsyncStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profile)
  );
}

export async function getProfile(): Promise<ProfileData | null> {
  const value = await AsyncStorage.getItem(PROFILE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function saveConsent(consent: ConsentData) {
  await AsyncStorage.setItem(
    CONSENT_KEY,
    JSON.stringify(consent)
  );
}

export async function getConsent(): Promise<ConsentData | null> {
  const value = await AsyncStorage.getItem(CONSENT_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function resetOnboarding() {
  await AsyncStorage.multiRemove([
    ONBOARDING_KEY,
    PROFILE_KEY,
    CONSENT_KEY,
  ]);
}