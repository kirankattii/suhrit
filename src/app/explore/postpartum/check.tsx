import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

type MainTab = "My Check-up" | "Follow-up Timeline";
type DeliveryTab = "Institutional Delivery" | "Home Delivery";

const CHECKLIST = [
  "Initial assessment completed",
  "Blood pressure checked",
  "Bleeding/recovery assessed",
  "Wound or stitches checked",
  "Breastfeeding support received",
  "Physical recovery discussed",
  "Warning signs discussed"
];

const TIMELINE = [
  { day: "Day 3", label: "Day 3" },
  { day: "Day 7", label: "Day 7" },
  { day: "Day 14", label: "Day 14" },
  { day: "Day 21", label: "Day 21" },
  { day: "Day 28", label: "Day 28" },
  { day: "Day 42", label: "Day 42" }
];

export default function PostpartumCheckScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<MainTab>("My Check-up");
  const [deliveryType, setDeliveryType] = useState<DeliveryTab>("Institutional Delivery");
  
  // State for checkboxes
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [timelineChecks, setTimelineChecks] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setChecks(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleTimelineCheck = (day: string) => {
    setTimelineChecks(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            My Postpartum Check
          </Text>
          <View className="w-10 h-10" />
        </View>

        {/* Main Tabs */}
        <View className="flex-row bg-[#F0F5FA] rounded-full p-1 mb-6">
          {(["My Check-up", "Follow-up Timeline"] as MainTab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full items-center justify-center ${activeTab === tab ? "bg-[#7293B3] shadow-sm" : ""}`}
            >
              <Text className={`text-[13px] font-bold ${activeTab === tab ? "text-white" : "text-suhrhit-secondary"}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6" bounces={false} showsVerticalScrollIndicator={false}>
        {activeTab === "My Check-up" ? (
          <View className="pb-8">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">Post-delivery checklist</Text>
            
            <View className="bg-white rounded-[24px] p-5 border border-suhrhit-border/50 shadow-sm mb-6">
              {CHECKLIST.map((item, index) => (
                <View key={index} className="flex-row items-center py-3 border-b border-[#F0F5FA] last:border-0">
                  <TouchableOpacity
                    onPress={() => toggleCheck(item)}
                    className={`w-6 h-6 rounded-md border-2 mr-3 items-center justify-center ${checks[item] ? 'bg-[#7293B3] border-[#7293B3]' : 'bg-transparent border-[#D1D9E6]'}`}
                  >
                    {checks[item] && <Text className="text-white text-[12px]">✓</Text>}
                  </TouchableOpacity>
                  <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">{item}</Text>
                </View>
              ))}
            </View>

            <View className="bg-white rounded-[16px] p-4 flex-row items-center justify-between border border-suhrhit-border/50 shadow-sm mb-6">
              <Text className="text-suhrhit-primary font-bold text-[15px]">Date completed</Text>
              <TouchableOpacity className="bg-[#F0F5FA] w-10 h-10 rounded-full items-center justify-center">
                <Calendar color="#7293B3" size={20} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={() => router.push("/explore/postpartum/support")}
              className="bg-[#FFF0F0] rounded-[24px] p-5 mb-4 flex-row items-center border border-[#FFE0E0]"
            >
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center mr-4">
                <AlertCircle color="#E53935" size={20} strokeWidth={2.5} />
              </View>
              <Text className="text-[#D32F2F] font-bold text-[15px] flex-1">Something Doesn't Feel Right?</Text>
              <ChevronRight color="#E53935" size={20} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-8">
            <Text className="text-suhrhit-primary text-[24px] font-bold mb-4" style={{ fontFamily: 'Georgia' }}>
              Postnatal Follow-up
            </Text>

            <View className="flex-row bg-[#F0F5FA] rounded-full p-1 mb-8">
              {(["Institutional Delivery", "Home Delivery"] as DeliveryTab[]).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setDeliveryType(tab)}
                  className={`flex-1 py-2.5 rounded-full items-center justify-center ${deliveryType === tab ? "bg-white shadow-sm" : ""}`}
                >
                  <Text className={`text-[13px] font-bold ${deliveryType === tab ? "text-suhrhit-primary" : "text-suhrhit-secondary"}`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="ml-4">
              {TIMELINE.map((item, index) => {
                const isLast = index === TIMELINE.length - 1;
                const isChecked = timelineChecks[item.day];
                
                return (
                  <View key={index} className="flex-row mb-6 relative">
                    {/* Timeline Line */}
                    {!isLast && (
                      <View className="absolute left-[11px] top-[30px] bottom-[-40px] w-0.5 bg-[#7293B3]" />
                    )}
                    
                    {/* Timeline Node */}
                    <View className="mt-1 mr-6 relative z-10 bg-suhrhit-background py-1">
                      <View className={`w-6 h-6 rounded-full items-center justify-center ${isChecked ? 'bg-[#7293B3]' : 'bg-[#E6F0FA] border-2 border-[#7293B3]'}`}>
                        {isChecked && <Text className="text-white text-[10px]">✓</Text>}
                      </View>
                    </View>

                    {/* Content */}
                    <View className="flex-1 flex-row items-center justify-between bg-white rounded-[20px] p-4 border border-suhrhit-border/50 shadow-sm">
                      <Text className="text-suhrhit-primary font-bold text-[16px]">{item.label}</Text>
                      
                      <View className="flex-row items-center">
                        <View className="items-end mr-3">
                          <View className="flex-row items-center mb-1">
                            <Text className="text-suhrhit-secondary text-[12px] mr-2">Completed</Text>
                            <TouchableOpacity
                              onPress={() => toggleTimelineCheck(item.day)}
                              className={`w-5 h-5 rounded-md border-2 items-center justify-center ${isChecked ? 'bg-[#7293B3] border-[#7293B3]' : 'bg-transparent border-[#D1D9E6]'}`}
                            >
                              {isChecked && <Text className="text-white text-[10px]">✓</Text>}
                            </TouchableOpacity>
                          </View>
                          <View className="flex-row items-center">
                            <Text className="text-suhrhit-secondary text-[12px] mr-2">Date</Text>
                            <TouchableOpacity className="w-5 h-5 rounded items-center justify-center">
                              <Calendar color="#7293B3" size={14} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <View className="bg-suhrhit-primary/5 p-4 rounded-xl border border-suhrhit-primary/10 mt-6">
              <Text className="text-suhrhit-secondary text-[12px] leading-[18px]">
                These are recommended follow-ups. Your healthcare provider may advise different timings based on your situation.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
