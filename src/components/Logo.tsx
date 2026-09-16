import { Text, View } from "react-native";

interface LogoProps {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <View>
      <Text
        className={`text-2xl font-bold tracking-[5px] ${
          light ? "text-white" : "text-suhrhit-primary"
        }`}
      >
        SUHRIT
      </Text>
    </View>
  );
}