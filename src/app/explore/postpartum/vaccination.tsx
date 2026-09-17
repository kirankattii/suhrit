import { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomTabBar from "../../../components/BottomTabBar";

const VACCINES = [
  {
    age: "At Birth",
    list: ["BCG", "Hepatitis B (Birth dose)", "OPV-0"]
  },
  {
    age: "6 Weeks",
    list: ["OPV-1", "Pentavalent-1", "Rotavirus-1", "fIPV-1", "PCV-1"]
  },
  {
    age: "10 Weeks",
    list: ["OPV-2", "Pentavalent-2", "Rotavirus-2"]
  },
  {
    age: "14 Weeks",
    list: ["OPV-3", "Pentavalent-3", "Rotavirus-3", "fIPV-2", "PCV-2"]
  },
  {
    age: "9–12 Months",
    list: ["MR-1", "PCV Booster", "fIPV-3", "JE-1*"]
  },
  {
    age: "16–24 Months",
    list: ["MR-2", "DPT Booster-1", "OPV Booster", "JE-2*"]
  }
];

export default function VaccinationScreen() {
  const insets = useSafeAreaInsets();
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadChecks();
  }, []);

  const loadChecks = async () => {
    try {
      const savedChecks = await AsyncStorage.getItem("vaccinationChecks");
      if (savedChecks) {
        setChecks(JSON.parse(savedChecks));
      }
    } catch (error) {
      console.error("Error loading vaccination checks:", error);
    }
  };

  const toggleCheck = async (age: string) => {
    try {
      const newChecks = { ...checks, [age]: !checks[age] };
      setChecks(newChecks);
      await AsyncStorage.setItem("vaccinationChecks", JSON.stringify(newChecks));
    } catch (error) {
      console.error("Error saving vaccination checks:", error);
    }
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            Vaccination Tracker
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/vaccination.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-2" style={{ fontFamily: 'Georgia' }}>
            My Baby's{"\n"}Vaccination Journey
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            Keep track from birth to 24 months.
          </Text>

          {/* Timeline */}
          <View className="ml-4 mb-4">
            {VACCINES.map((item, index) => {
              const isLast = index === VACCINES.length - 1;
              const isChecked = checks[item.age];
              
              return (
                <View key={index} className="flex-row mb-6 relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <View className="absolute left-[11px] top-[30px] bottom-[-30px] w-[2px] bg-[#E6F0FA]" />
                  )}
                  
                  {/* Check Circle */}
                  <View className="mt-1 mr-4 relative z-10 bg-suhrhit-background py-1">
                    <TouchableOpacity
                      onPress={() => toggleCheck(item.age)}
                      className={`w-6 h-6 rounded-full items-center justify-center ${isChecked ? 'bg-[#7293B3]' : 'bg-[#E6F0FA] border-2 border-[#7293B3]'}`}
                    >
                      {isChecked && <Text className="text-white text-[10px]">✓</Text>}
                    </TouchableOpacity>
                  </View>

                  {/* Content */}
                  <View className="flex-1 mt-1.5">
                    <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{item.age}</Text>
                    <Text className="text-suhrhit-secondary text-[13px] leading-[18px]">
                      {item.list.join(", ")}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Text className="text-suhrhit-secondary text-[12px] italic mb-6">
            *JE is given where applicable.
          </Text>

          {/* Disclaimer */}
          <View className="bg-suhrhit-primary/5 p-4 rounded-xl border border-suhrhit-primary/10 mb-8">
            <Text className="text-suhrhit-primary font-bold text-[12px] uppercase mb-1">Important Disclaimer</Text>
            <Text className="text-suhrhit-secondary text-[12px] leading-[18px]">
              Vaccination schedules may be updated. Always verify your baby's vaccination details with your pediatrician and official vaccination record.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
