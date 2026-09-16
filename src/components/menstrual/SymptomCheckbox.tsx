import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Check } from "lucide-react-native";

interface SymptomCheckboxProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export default function SymptomCheckbox({ label, selected, onToggle }: SymptomCheckboxProps) {
  return (
    <TouchableOpacity 
      onPress={onToggle}
      className="flex-row items-center py-4 border-b border-[#1E335A]"
    >
      <View className={`w-6 h-6 rounded mr-4 items-center justify-center border-2 ${
        selected ? "bg-[#82A9F9] border-[#82A9F9]" : "bg-transparent border-[#8B9CBE]"
      }`}>
        {selected && <Check color="#0D1B2A" size={16} strokeWidth={3} />}
      </View>
      <Text className="text-white text-[16px]">{label}</Text>
    </TouchableOpacity>
  );
}
