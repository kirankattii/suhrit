import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState, useRef, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import KeyboardSpacer from "../components/KeyboardSpacer";
import { Heading, SubHeading } from "../components/Typography";
import { saveDailyCheckin } from "../storage/wellbeing";
import { generateInsight } from "../ai/client";

const EmojiScaleSelector = ({
  options,
  value,
  onChange,
}: {
  options: { emoji: string; label: string }[];
  value: number;
  onChange: (v: number) => void;
}) => (
  <View className="mb-8 mt-2 flex-row justify-between">
    {options.map((opt, idx) => {
      const selected = value === idx + 1;
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => onChange(idx + 1)}
          className={`mx-1 flex-1 items-center justify-center rounded-xl border py-3 px-1 ${
            selected
              ? "border-suhrhit-primary bg-[#E6F0FA]"
              : "border-suhrhit-border bg-white"
          }`}
          style={{ minHeight: 80 }}
        >
          <Text className="text-[26px] mb-2">{opt.emoji}</Text>
          <Text
            className={`text-center text-[10px] font-semibold ${
              selected ? "text-suhrhit-primary" : "text-suhrhit-muted"
            }`}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const TimeInput = ({
  label,
  hour,
  minute,
  isAM,
  onChangeHour,
  onChangeMinute,
  onChangeAM,
  onFocus,
}: any) => (
  <View className="mb-6 flex-1">
    <Text className="mb-2 text-[13px] font-medium text-suhrhit-muted">{label}</Text>
    <View className="flex-row items-center gap-2">
      <TextInput
        value={hour}
        onChangeText={onChangeHour}
        onFocus={onFocus}
        keyboardType="numeric"
        maxLength={2}
        className="h-12 w-12 rounded-xl border border-suhrhit-border bg-white text-center text-[16px] font-medium"
        placeholder="10"
      />
      <Text className="text-[16px] font-bold text-suhrhit-text">:</Text>
      <TextInput
        value={minute}
        onChangeText={onChangeMinute}
        onFocus={onFocus}
        keyboardType="numeric"
        maxLength={2}
        className="h-12 w-12 rounded-xl border border-suhrhit-border bg-white text-center text-[16px] font-medium"
        placeholder="30"
      />
      <TouchableOpacity
        onPress={() => onChangeAM(!isAM)}
        className="h-12 w-12 items-center justify-center rounded-xl border border-suhrhit-border bg-suhrhit-background"
      >
        <Text className="text-[14px] font-semibold text-suhrhit-text">
          {isAM ? "AM" : "PM"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function CheckInScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [mood, setMood] = useState(0);
  const [stress, setStress] = useState(0);
  const [energy, setEnergy] = useState(0);

  const [bedHour, setBedHour] = useState("");
  const [bedMin, setBedMin] = useState("00");
  const [bedAM, setBedAM] = useState(false);

  const [wakeHour, setWakeHour] = useState("");
  const [wakeMin, setWakeMin] = useState("00");
  const [wakeAM, setWakeAM] = useState(true);

  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  useEffect(() => {
    if (errors.scales && mood && stress && energy) {
      setErrors((prev) => ({ ...prev, scales: "" }));
    }
  }, [mood, stress, energy, errors.scales]);

  useEffect(() => {
    if (errors.time && bedHour && wakeHour) {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  }, [bedHour, wakeHour, errors.time]);

  const calculateSleep = () => {
    let bh = parseInt(bedHour || "0", 10);
    if (!bedAM && bh !== 12) bh += 12;
    if (bedAM && bh === 12) bh = 0;

    let wh = parseInt(wakeHour || "0", 10);
    if (!wakeAM && wh !== 12) wh += 12;
    if (wakeAM && wh === 12) wh = 0;

    const bm = parseInt(bedMin || "0", 10);
    const wm = parseInt(wakeMin || "0", 10);

    let bedTotal = bh * 60 + bm;
    let wakeTotal = wh * 60 + wm;

    // Handle crossing midnight
    if (wakeTotal < bedTotal) {
      wakeTotal += 24 * 60;
    }

    return (wakeTotal - bedTotal) / 60;
  };

  const handleSave = async () => {
    setErrors({});
    const newErrors: Record<string, string> = {};

    if (!mood || !stress || !energy) {
      newErrors.scales = "Please select an option for Mood, Stress, and Energy.";
    }
    if (!bedHour || !wakeHour) {
      newErrors.time = "Please enter your Bedtime and Wake-up time.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.scales) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
      return;
    }

    setLoading(true);
    try {
      const sleepDuration = calculateSleep();
      
      const checkin = {
        date: new Date().toISOString(),
        mood,
        stress,
        energy,
        sleepDuration,
        bedTime: `${bedHour}:${bedMin} ${bedAM ? "AM" : "PM"}`,
        wakeTime: `${wakeHour}:${wakeMin} ${wakeAM ? "AM" : "PM"}`,
      };

      await saveDailyCheckin(checkin);

      // Fetch AI insight
      const prompt = `I am a user of a well-being app. Today my mood score is ${mood}/5, my stress is ${stress}/5, my energy is ${energy}/5, and I slept for ${sleepDuration.toFixed(1)} hours. Provide a short (2-3 sentences max), empathetic, and personalized supportive insight. Don't sound like a robot.`;
      
      const aiResponse = await generateInsight(prompt);
      
      if (aiResponse) {
        setInsight(aiResponse);
      } else {
        router.back();
      }
    } catch (e) {
      console.error(e);
      setErrors({ form: "Could not save check-in. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (insight) {
    return (
      <Screen scroll>
        <View className="px-6 pt-12 flex-1 items-center justify-center min-h-[80vh]">
          <View className="bg-white p-8 rounded-3xl border border-suhrhit-border items-center w-full">
            <Text className="text-4xl mb-6">🌿</Text>
            <Heading className="text-center mb-2">Thank You</Heading>
            <Text className="text-center text-[11px] text-suhrhit-primary font-bold tracking-widest uppercase mb-6">Your Today's Well Being</Text>
            <Text className="text-[16px] text-suhrhit-text text-center leading-[24px] font-medium mb-8">
              {insight}
            </Text>
            <Button title="Continue" onPress={() => router.back()} />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      scrollViewRef={scrollViewRef}
      footer={<Button title="Save Check-in" onPress={handleSave} loading={loading} />}
    >
      <View className="px-6 pt-8">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 mr-1">
            <ChevronLeft color="#183059" size={28} />
          </TouchableOpacity>
          <Text className="text-[26px] leading-[32px] font-bold text-suhrhit-text">How are you doing today?</Text>
        </View>

        <Text className="mb-8 text-[14px] text-suhrhit-muted">
          Take a moment to reflect on your day.
        </Text>

        {errors.scales && (
          <Text className="text-red-500 font-medium mb-4">{errors.scales}</Text>
        )}

        <SubHeading>How are you feeling today?</SubHeading>
        <EmojiScaleSelector
          options={[
            { emoji: "😢", label: "Very Low" },
            { emoji: "🙁", label: "Low" },
            { emoji: "😐", label: "Okay" },
            { emoji: "🙂", label: "Good" },
            { emoji: "😄", label: "Very Good" },
          ]}
          value={mood}
          onChange={setMood}
        />

        <SubHeading>How would you describe your stress today?</SubHeading>
        <EmojiScaleSelector
          options={[
            { emoji: "😌", label: "Very Low" },
            { emoji: "🧘", label: "Low" },
            { emoji: "😐", label: "Moderate" },
            { emoji: "😰", label: "High" },
            { emoji: "😫", label: "Very High" },
          ]}
          value={stress}
          onChange={setStress}
        />

        <SubHeading>How is your energy today?</SubHeading>
        <EmojiScaleSelector
          options={[
            { emoji: "🥱", label: "Very Low" },
            { emoji: "🔋", label: "Low" },
            { emoji: "😐", label: "Moderate" },
            { emoji: "😃", label: "High" },
            { emoji: "⚡", label: "Very High" },
          ]}
          value={energy}
          onChange={setEnergy}
        />

        <View className="mb-4 mt-2 h-[1px] bg-suhrhit-border/50" />
        
        <SubHeading className="mb-2">Sleep Tracking</SubHeading>
        {errors.time && (
          <Text className="text-red-500 font-medium mb-4">{errors.time}</Text>
        )}
        <View className="flex-row">
          <TimeInput
            label="Bedtime"
            hour={bedHour}
            minute={bedMin}
            isAM={bedAM}
            onChangeHour={setBedHour}
            onChangeMinute={setBedMin}
            onChangeAM={setBedAM}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 250);
            }}
          />
          <TimeInput
            label="Wake-up Time"
            hour={wakeHour}
            minute={wakeMin}
            isAM={wakeAM}
            onChangeHour={setWakeHour}
            onChangeMinute={setWakeMin}
            onChangeAM={setWakeAM}
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
