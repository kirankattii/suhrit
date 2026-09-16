import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ChevronLeft, FileText, Check } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DarkScreen from "../../../../components/menstrual/DarkScreen";
import SymptomCheckbox from "../../../../components/menstrual/SymptomCheckbox";

const AVAILABLE_SYMPTOMS = [
  "Abdominal cramps / pelvic pain",
  "Backache",
  "Dizziness / feeling faint",
  "Nausea",
  "Constipation",
  "Diarrhea / loose stools",
  "Appetite changes / food cravings",
  "Acne / skin breakouts",
  "Oily skin",
  "Swelling / puffiness",
  "Pain in thighs",
  "Feeling unusually heavy"
];

export default function SymptomsPatternsScreen() {
  const [activeTab, setActiveTab] = useState<"assessment" | "symptoms">("assessment");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const [hasResults, setHasResults] = useState(false);
  const [scores, setScores] = useState({ emotional: 0, physical: 0 });

  useFocusEffect(
    useCallback(() => {
      const loadResults = async () => {
        try {
          const e = await AsyncStorage.getItem('JDRSP_EMOTIONAL');
          const p = await AsyncStorage.getItem('JDRSP_PHYSICAL');
          if (e !== null && p !== null) {
            setScores({ emotional: parseInt(e, 10), physical: parseInt(p, 10) });
            setHasResults(true);
          } else {
            setHasResults(false);
          }
        } catch (error) {
          console.error("Error loading assessment scores:", error);
        }
      };
      loadResults();
    }, [])
  );

  const getBurdenLevel = (score: number) => {
    if (score >= 17) return { level: "High", emoji: "😟", color: "text-[#F87171]", bg: "bg-[#F87171]" };
    if (score >= 9) return { level: "Moderate", emoji: "😐", color: "text-[#F9E076]", bg: "bg-[#F9E076]" };
    return { level: "Low", emoji: "😊", color: "text-[#A7E3A1]", bg: "bg-[#A7E3A1]" };
  };

  const eLevel = getBurdenLevel(scores.emotional);
  const pLevel = getBurdenLevel(scores.physical);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert("No Symptoms Selected", "Please select at least one symptom to save.");
      return;
    }
    
    Alert.alert(
      "Symptoms Saved",
      "Your symptoms for today have been successfully recorded.",
      [{ text: "OK", onPress: () => setActiveTab("assessment") }]
    );
  };

  return (
    <DarkScreen 
      scroll
      header={
        <View className="px-5 py-2 flex-row items-center border-b border-[#1E335A]">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 w-10 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
          <Text className="text-white font-bold text-[18px] flex-1 text-center pr-8">Symptoms & Patterns</Text>
        </View>
      }
      footer={
        activeTab === "symptoms" ? (
          <TouchableOpacity 
            onPress={handleSaveSymptoms}
            className="bg-[#82A9F9] rounded-full py-4 items-center justify-center"
          >
            <Text className="text-[#0D1B2A] font-bold text-[16px]">Save Symptoms</Text>
          </TouchableOpacity>
        ) : undefined
      }
    >
      <View className="px-6 pt-6">
        {/* Segmented Control */}
        <View className="flex-row bg-[#142340] rounded-full p-1 border border-[#1E335A] mb-8">
          <TouchableOpacity 
            onPress={() => setActiveTab("assessment")}
            className={`flex-1 py-3 items-center rounded-full ${activeTab === "assessment" ? "bg-[#82A9F9]" : ""}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === "assessment" ? "text-[#0D1B2A]" : "text-[#8B9CBE]"}`}>
              Assessment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab("symptoms")}
            className={`flex-1 py-3 items-center rounded-full ${activeTab === "symptoms" ? "bg-[#82A9F9]" : ""}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === "symptoms" ? "text-[#0D1B2A]" : "text-[#8B9CBE]"}`}>
              Add Symptoms
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "assessment" ? (
          <View>
            <View className="bg-[#142340] rounded-[24px] p-6 border border-[#1E335A] mb-8">
              <Text className="text-white text-[20px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>Understand Your Cycle</Text>
              <Text className="text-[#8B9CBE] text-[14px] leading-[22px] mb-6">
                Take a short, validated questionnaire to understand your emotional and physical experiences.
              </Text>
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-2xl bg-[#1E335A] items-center justify-center">
                  <FileText color="#8B9CBE" size={32} />
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => router.push("/explore/menstrual/symptoms/quiz")}
                className="bg-[#82A9F9] rounded-full py-4 items-center justify-center"
              >
                <Text className="text-[#0D1B2A] font-bold text-[16px]">
                  {hasResults ? "Take Assessment Again" : "Start Assessment"}
                </Text>
              </TouchableOpacity>
              <Text className="text-center text-[#8B9CBE] text-[12px] mt-4">Takes about 3-5 minutes</Text>
            </View>

            {hasResults && (
              <View>
                <Text className="text-white text-[18px] font-bold mb-4">Your Results</Text>
                <View className="flex-row gap-4 mb-6">
                  <View className="flex-1 bg-[#142340] border border-[#1E335A] rounded-[20px] p-4">
                    <View className="flex-row items-center mb-4">
                      <Text className="text-[20px] mr-2">😌</Text>
                      <Text className="text-white text-[14px] font-medium flex-1">Emotional Symptoms</Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className={`w-6 h-6 rounded-full ${eLevel.bg} items-center justify-center mr-2`}>
                         <Text className="text-[12px]">{eLevel.emoji}</Text>
                      </View>
                      <Text className={`${eLevel.color} font-bold text-[16px]`}>{eLevel.level}</Text>
                    </View>
                  </View>
                  
                  <View className="flex-1 bg-[#142340] border border-[#1E335A] rounded-[20px] p-4">
                    <View className="flex-row items-center mb-4">
                      <Text className="text-[20px] mr-2">🩸</Text>
                      <Text className="text-white text-[14px] font-medium flex-1">Physical Symptoms</Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className={`w-6 h-6 rounded-full ${pLevel.bg} items-center justify-center mr-2`}>
                         <Text className="text-[12px]">{pLevel.emoji}</Text>
                      </View>
                      <Text className={`${pLevel.color} font-bold text-[16px]`}>{pLevel.level}</Text>
                    </View>
                  </View>
                </View>
                
                <View className="bg-[#142340] border border-[#1E335A] rounded-[20px] p-5 flex-row">
                  <View className="mr-3">
                    <View className="w-6 h-6 rounded-full border border-[#8B9CBE] items-center justify-center">
                      <Text className="text-[#8B9CBE] text-[12px] font-bold">i</Text>
                    </View>
                  </View>
                  <Text className="text-[#8B9CBE] text-[13px] leading-[20px] flex-1">
                    Your responses suggest that you may be experiencing some physical changes around your cycle. The experience and intensity of symptoms can vary from person to person and from cycle to cycle.
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text className="text-white text-[20px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>Add Additional Symptoms</Text>
            <Text className="text-[#8B9CBE] text-[14px] leading-[22px] mb-6">
              Select any other symptoms you're experiencing in this cycle.
            </Text>
            
            <View className="mb-6 bg-[#142340] border border-[#1E335A] rounded-[24px] px-6 py-2 shadow-sm">
              {AVAILABLE_SYMPTOMS.map((symptom, idx) => (
                <SymptomCheckbox 
                  key={idx} 
                  label={symptom} 
                  selected={selectedSymptoms.includes(symptom)} 
                  onToggle={() => toggleSymptom(symptom)} 
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </DarkScreen>
  );
}
