import { router } from "expo-router";
import { ChevronLeft, Square, CheckSquare, Info } from "lucide-react-native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Trimester = "1st Trimester" | "2nd Trimester" | "3rd Trimester";

const CHECKLIST_DATA = {
  "1st Trimester": [
    { id: "tri1_1", text: "First antenatal consultation" },
    { id: "tri1_2", text: "Pregnancy confirmation/initial assessment" },
    { id: "tri1_3", text: "Blood pressure & weight assessment" },
    { id: "tri1_4", text: "Routine blood investigations" },
    { id: "tri1_5", text: "Blood group / Rh assessment" },
    { id: "tri1_6", text: "Urine assessment" },
    { id: "tri1_7", text: "Recommended infection screening" },
    { id: "tri1_8", text: "Dating/early ultrasound when advised" },
    { id: "tri1_9", text: "First-trimester screening when appropriate" },
  ],
  "2nd Trimester": [
    { id: "tri2_1", text: "Scheduled antenatal consultation" },
    { id: "tri2_2", text: "Blood pressure & weight assessment" },
    { id: "tri2_3", text: "Recommended blood/urine investigations" },
    { id: "tri2_4", text: "Anomaly scan when recommended" },
    { id: "tri2_5", text: "Gestational diabetes screening at recommended stage" },
    { id: "tri2_6", text: "Maternal and fetal assessment" },
  ],
  "3rd Trimester": [
    { id: "tri3_1", text: "Regular antenatal visits" },
    { id: "tri3_2", text: "Blood pressure & weight assessment" },
    { id: "tri3_3", text: "Recommended investigations" },
    { id: "tri3_4", text: "Fetal growth assessment" },
    { id: "tri3_5", text: "Fetal movement discussion/monitoring" },
    { id: "tri3_6", text: "Birth-preparation discussion" },
    { id: "tri3_7", text: "Emergency plan" },
    { id: "tri3_8", text: "Breastfeeding preparation" },
    { id: "tri3_9", text: "Postpartum planning" },
  ]
};

const STORAGE_KEY = "@pregnancy_checklist_v1";

export default function PregnancyChecklistScreen() {
  const [activeTab, setActiveTab] = useState<Trimester>("1st Trimester");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load checklist data", e);
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleCheck = async (id: string) => {
    const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newCheckedItems);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCheckedItems));
    } catch (e) {
      console.error("Failed to save checklist data", e);
    }
  };

  const currentList = CHECKLIST_DATA[activeTab];

  if (!isLoaded) return null; // Wait for storage to load

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          My Pregnancy Checklist
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        Stay on track, step by step.
      </Text>

      {/* Tabs */}
      <View className="px-6 flex-row bg-[#F0F4F8] rounded-full p-1 mb-6">
        {(["1st Trimester", "2nd Trimester", "3rd Trimester"] as Trimester[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full items-center ${
              activeTab === tab ? "bg-[#3366CC]" : ""
            }`}
          >
            <Text
              className={`font-semibold text-[13px] ${
                activeTab === tab ? "text-white" : "text-[#5C728E]"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          {currentList.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => toggleCheck(item.id)}
              className="flex-row items-center py-4 border-b border-[#F0F4F8]"
            >
              {checkedItems[item.id] ? (
                <CheckSquare color="#3366CC" size={24} className="mr-4" />
              ) : (
                <Square color="#CBD5E1" size={24} className="mr-4" />
              )}
              <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-2 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            This checklist is a reminder, not a replacement for your doctor's antenatal-care schedule. Your healthcare provider may recommend additional or different tests depending on your pregnancy and medical history.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
