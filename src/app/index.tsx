import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { isOnboardingCompleted } from "../storage/onboarding";

export default function Index() {
  useEffect(() => {
    const initialize = async () => {
      try {
        const completed = await isOnboardingCompleted();

        if (completed) {
          router.replace("/home");
        } else {
          router.replace("/welcome");
        }
      } catch (error) {
        console.error(
          "Failed to initialize application:",
          error
        );

        router.replace("/welcome");
      }
    };

    initialize();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-suhrhit-background">
      <Text className="text-[30px] font-bold tracking-[6px] text-suhrhit-primary">
        SUHRIT
      </Text>

      <ActivityIndicator
        className="mt-6"
        color="#183059"
      />
    </View>
  );
}