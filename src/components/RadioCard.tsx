import { Check } from "lucide-react-native";
import {
    Pressable,
    Text,
    View,
} from "react-native";

interface RadioCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

export default function RadioCard({
  title,
  description,
  selected,
  onPress,
}: RadioCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{
        selected,
      }}
      className={`mb-3 rounded-2xl border py-3 px-4 ${
        selected
          ? "border-suhrhit-primary bg-[#E6F0FA]"
          : "border-suhrhit-border bg-white"
      }`}
    >
      <View className="flex-row items-center">
        <View
          className={`mr-3 h-5 w-5 items-center justify-center rounded-full border ${
            selected
              ? "border-suhrhit-primary bg-suhrhit-primary"
              : "border-[#CBD4D0]"
          }`}
        >
          {selected && (
            <Check
              size={12}
              color="#FFFFFF"
              strokeWidth={3}
            />
          )}
        </View>

        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-suhrhit-text">
            {title}
          </Text>

          {description ? (
            <Text className="mt-1 text-[13px] leading-[19px] text-suhrhit-muted">
              {description}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}