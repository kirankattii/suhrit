import * as Haptics from "expo-haptics";
import {
    ActivityIndicator,
    Pressable,
    Text,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
}

export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "default",
}: ButtonProps) {
  const handlePress = async () => {
    if (disabled || loading) return;

    await Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    );

    onPress();
  };

  const isPrimary = variant === "primary";
  const heightClass = size === "small" ? "h-11" : "h-[48px]";
  const textClass = size === "small" ? "text-[14px]" : "text-[15px]";

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      className={`${heightClass} w-full items-center justify-center rounded-xl ${
        isPrimary
          ? "bg-suhrhit-primary"
          : "border border-suhrhit-border bg-white"
      } ${
        disabled
          ? "opacity-40"
          : "active:opacity-80"
      }`}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? "#FFFFFF" : "#173F35"}
        />
      ) : (
        <Text
          className={`${textClass} font-semibold ${
            isPrimary
              ? "text-white"
              : "text-suhrhit-primary"
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}