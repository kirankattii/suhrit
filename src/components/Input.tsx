import {
    Text,
    TextInput,
    View,
} from "react-native";
import { Label } from "./Typography";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric";
  error?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
}: InputProps) {
  return (
    <View className="mb-6">
      <Label>{label}</Label>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#98A29F"
        keyboardType={keyboardType}
        autoCapitalize={
          keyboardType === "default"
            ? "words"
            : "none"
        }
        className={`h-[48px] rounded-xl border bg-white px-4 text-[15px] text-suhrhit-text ${
          error
            ? "border-suhrhit-error"
            : "border-suhrhit-border"
        }`}
      />

      {error ? (
        <Text className="mt-2 text-[13px] text-suhrhit-error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}