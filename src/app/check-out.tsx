import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import KeyboardSpacer from "../components/KeyboardSpacer";
import { Heading, SubHeading } from "../components/Typography";

const ActivitySelector = ({
  options,
  value,
  onChange,
}: {
  options: { title: string; description: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <View className="mb-8 mt-2">
    {options.map((opt, idx) => {
      const selected = value === opt.title;
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => onChange(opt.title)}
          className={`mb-3 rounded-xl border p-4 ${
            selected
              ? "border-suhrhit-primary bg-[#E6F0FA]"
              : "border-suhrhit-border bg-white"
          }`}
        >
          <Text
            className={`text-[16px] font-bold mb-1 ${
              selected ? "text-suhrhit-primary" : "text-suhrhit-text"
            }`}
          >
            {opt.title}
          </Text>
          <Text
            className={`text-[13px] ${
              selected ? "text-suhrhit-primary font-medium" : "text-suhrhit-muted"
            }`}
          >
            {opt.description}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function CheckOutScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [activity, setActivity] = useState("");
  const [screenTime, setScreenTime] = useState("");
  const [meals, setMeals] = useState("");
  
  const handleComplete = () => {
    // Navigate to the Gratitude Tree game
    router.replace("/games/gratitude-tree");
  };

  return (
    <Screen
      scroll
      scrollViewRef={scrollViewRef}
      footer={<Button title="Complete your day with gratitude tree" onPress={handleComplete} />}
    >
      <View className="px-6 pt-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 mr-1">
            <ChevronLeft color="#183059" size={28} />
          </TouchableOpacity>
          <Text className="text-[26px] leading-[32px] font-bold text-suhrhit-text">Evening Check-out</Text>
        </View>

        <Text className="mb-8 text-[14px] text-suhrhit-muted">
          Reflect on your physical activities and habits today.
        </Text>

        <SubHeading className="mb-2">What kind of physical activity did you do today?</SubHeading>
        <ActivitySelector
          options={[
            {
              title: "Light",
              description: "Casual walking, Campus/workplace walking, Stretching",
            },
            {
              title: "Moderate",
              description: "Brisk walking, Jogging, Cycling, Dancing",
            },
            {
              title: "Vigorous",
              description: "Running, Gym/heavy workout, Sports, High-intensity exercise",
            },
          ]}
          value={activity}
          onChange={setActivity}
        />

        <SubHeading className="mb-2">What was your social media screen time?</SubHeading>
        <View className="mb-8 mt-2">
          <TextInput
            value={screenTime}
            onChangeText={setScreenTime}
            placeholder="e.g. 2 hours"
            placeholderTextColor="#A6B9C7"
            className="w-full rounded-xl border border-suhrhit-border bg-white px-4 py-4 text-[15px] font-medium text-suhrhit-text"
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 250);
            }}
          />
        </View>

        <SubHeading className="mb-2">How many meals did you have? Any junk included?</SubHeading>
        <View className="mb-4 mt-2">
          <TextInput
            value={meals}
            onChangeText={setMeals}
            placeholder="e.g. 3 meals, a little bit of junk food"
            placeholderTextColor="#A6B9C7"
            multiline
            style={{ minHeight: 100, textAlignVertical: "top" }}
            className="w-full rounded-xl border border-suhrhit-border bg-white px-4 py-4 text-[15px] font-medium text-suhrhit-text"
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 250);
            }}
          />
        </View>

        <KeyboardSpacer />
      </View>
    </Screen>
  );
}
