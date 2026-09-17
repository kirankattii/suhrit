import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CHECKLIST = [
  "Initial assessment completed",
  "Blood pressure checked",
  "Bleeding/recovery assessed",
  "Wound or stitches checked",
  "Breastfeeding support received",
  "Physical recovery discussed",
  "Warning signs discussed",
];

export default function PostpartumCheckScreen() {
  const insets = useSafeAreaInsets();

  // State for checkboxes
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadChecks();
  }, []);

  const loadChecks = async () => {
    try {
      const savedChecks = await AsyncStorage.getItem("postpartumChecklist");
      if (savedChecks) {
        setChecks(JSON.parse(savedChecks));
      }
    } catch (error) {
      console.error("Error loading checklist:", error);
    }
  };

  const toggleCheck = async (item: string) => {
    try {
      const newChecks = { ...checks, [item]: !checks[item] };
      setChecks(newChecks);
      await AsyncStorage.setItem(
        "postpartumChecklist",
        JSON.stringify(newChecks),
      );
    } catch (error) {
      console.error("Error saving checklist:", error);
    }
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      <View
        style={{ paddingTop: Math.max(insets.top, 10) + 8 }}
        className="px-6 bg-suhrhit-background z-50"
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-start justify-center"
          >
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text
            className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10"
            style={{ fontFamily: "Georgia" }}
          >
            My Postpartum Check
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6 pt-4"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-8">
          <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">
            Post-delivery checklist
          </Text>

          <View className="bg-white rounded-[24px] p-5 border border-suhrhit-border/50 shadow-sm mb-6">
            {CHECKLIST.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center py-3 border-b border-[#F0F5FA] last:border-0"
              >
                <TouchableOpacity
                  onPress={() => toggleCheck(item)}
                  className={`w-6 h-6 rounded-md border-2 mr-3 items-center justify-center ${checks[item] ? "bg-[#7293B3] border-[#7293B3]" : "bg-transparent border-[#D1D9E6]"}`}
                >
                  {checks[item] && (
                    <Text className="text-white text-[12px]">✓</Text>
                  )}
                </TouchableOpacity>
                <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* <View className="bg-white rounded-[16px] p-4 flex-row items-center justify-between border border-suhrhit-border/50 shadow-sm mb-6">
              <Text className="text-suhrhit-primary font-bold text-[15px]">Date completed</Text>
              <TouchableOpacity className="bg-[#F0F5FA] w-10 h-10 rounded-full items-center justify-center">
                <Calendar color="#7293B3" size={20} />
              </TouchableOpacity>
            </View> */}

          <TouchableOpacity
            onPress={() => router.push("/explore/postpartum/support")}
            className="bg-[#FFF0F0] rounded-[24px] p-5 mb-4 flex-row items-center border border-[#FFE0E0]"
          >
            <View className="bg-white w-10 h-10 rounded-full items-center justify-center mr-4">
              <AlertCircle color="#E53935" size={20} strokeWidth={2.5} />
            </View>
            <Text className="text-[#D32F2F] font-bold text-[15px] flex-1">
              Something Doesn't Feel Right?
            </Text>
            <ChevronRight color="#E53935" size={20} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
