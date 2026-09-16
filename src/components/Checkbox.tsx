import { Check } from "lucide-react-native";
import React from "react";
import {
    Pressable,
    Text,
    View,
} from "react-native";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export default function Checkbox({
  checked,
  onPress,
  children,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-start"
      accessibilityRole="checkbox"
      accessibilityState={{
        checked,
      }}
    >
      <View
        className={`mr-3 mt-1 h-6 w-6 items-center justify-center rounded-lg border ${
          checked
            ? "border-suhrhit-primary bg-suhrhit-primary"
            : "border-suhrhit-border bg-white"
        }`}
      >
        {checked && (
          <Check
            size={15}
            color="#FFFFFF"
            strokeWidth={3}
          />
        )}
      </View>

      <Text className="flex-1 text-[14px] leading-[21px] text-suhrhit-muted">
        {children}
      </Text>
    </Pressable>
  );
}