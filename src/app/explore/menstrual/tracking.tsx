import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { ChevronLeft, Calendar, Info, Sparkles } from "lucide-react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import DarkScreen from "../../../components/menstrual/DarkScreen";
import CircularProgress from "../../../components/menstrual/CircularProgress";
import { getCycleInfo, CycleInfo, calculateCycleWithDelay, CycleDelayState } from "../../../utils/menstrualCalculations";

export default function CycleTrackingScreen() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7); 
    return d;
  });
  
  const [showPicker, setShowPicker] = useState(false);
  const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [cycleDuration, setCycleDuration] = useState(28); // default to 28 days
  const [delayState, setDelayState] = useState<CycleDelayState | null>(null);

  useEffect(() => {
    setCycleInfo(getCycleInfo(lastPeriodDate));
    setDelayState(calculateCycleWithDelay(lastPeriodDate, cycleDuration));
  }, [lastPeriodDate, cycleDuration]);

  const handleContinue = () => {
    setShowResults(true);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || lastPeriodDate;
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setLastPeriodDate(currentDate);
    // If we've already shown results, recalculate instantly
    setCycleInfo(getCycleInfo(currentDate));
    setDelayState(calculateCycleWithDelay(currentDate, cycleDuration));
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  // AI suggestions based on the current phase
  const getAISuggestion = (phase: string) => {
    switch (phase) {
      case "Menstrual":
        return "It's completely normal to feel tired right now. Focus on rest, gentle stretching, and iron-rich foods like spinach.";
      case "Follicular":
        return "Your energy is rising! This is a great time to try new workouts, brainstorm ideas, and eat fresh, light foods.";
      case "Ovulation":
        return "You're likely feeling social and energetic. Enjoy high-intensity workouts and focus on fiber-rich veggies.";
      case "Luteal":
        return "You might start feeling a bit inward or experience PMS. Try slow yoga, complex carbs, and prioritize sleep.";
      default:
        return "Track your cycle consistently to get the most accurate insights.";
    }
  };

  return (
    <DarkScreen 
      scroll
      header={
        <View className="px-5 py-2 flex-row items-center border-b border-[#1E335A]">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 w-10 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
          <Text className="text-white font-bold text-[18px] flex-1 text-center pr-8">Cycle Tracking</Text>
        </View>
      }
    >
      <View className="px-6 pt-6">
        <Text className="text-white text-[22px] font-bold mb-2 leading-[30px]" style={{ fontFamily: 'Georgia' }}>
          When was the first day of your last menstrual period?
        </Text>
        <Text className="text-[#8B9CBE] text-[15px] mb-6 leading-[22px]">
          This helps us understand where you are in your cycle.
        </Text>

        <TouchableOpacity 
          onPress={() => setShowPicker(true)}
          className="flex-row items-center bg-[#142340] border border-[#1E335A] rounded-[16px] px-4 py-4 mb-6"
        >
          <Calendar color="#8B9CBE" size={20} className="mr-3" />
          <Text className="text-white text-[16px] flex-1">{formatDate(lastPeriodDate)}</Text>
        </TouchableOpacity>

        {/* DatePicker UI */}
        {showPicker && (
          <View className="mb-6 bg-white rounded-xl overflow-hidden self-center">
            <DateTimePicker
              value={lastPeriodDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                className="bg-[#1E335A] p-3 items-center justify-center"
                onPress={() => setShowPicker(false)}
              >
                <Text className="text-white font-bold">Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!showResults ? (
          <TouchableOpacity 
            onPress={handleContinue}
            className="bg-[#82A9F9] rounded-full py-4 items-center justify-center mb-10"
          >
            <Text className="text-[#0D1B2A] font-bold text-[16px]">Continue</Text>
          </TouchableOpacity>
        ) : (
          <View className="mt-4 mb-10 items-center w-full">
            {cycleInfo && delayState && (
              <>
                <View className={`px-6 py-2.5 rounded-full mb-8 ${delayState.isDelayed ? 'bg-[#FF8FA3]/20 border border-[#FF8FA3]/50' : 'bg-[#1E335A]'}`}>
                  <Text className={`font-bold text-[15px] ${delayState.isDelayed ? 'text-[#FF8FA3]' : 'text-white'}`}>
                    {delayState.statusMessage}
                  </Text>
                </View>

                <CircularProgress 
                  currentDay={cycleInfo.cycleDay} 
                  currentPhase={cycleInfo.currentPhase} 
                />

                {/* AI Suggestion Card */}
                <View className="w-full bg-[#142340] border border-[#1E335A] rounded-[20px] p-5 mt-10">
                  <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 rounded-full bg-[#1E335A] items-center justify-center mr-3">
                      <Sparkles color="#82A9F9" size={16} />
                    </View>
                    <Text className="text-white font-bold text-[16px]">Suhrit AI Insight</Text>
                  </View>
                  <Text className="text-[#8B9CBE] text-[14px] leading-[22px]">
                    {getAISuggestion(cycleInfo.currentPhase)}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => router.push("/explore/menstrual/tips")}
                    className="mt-4 bg-[#1E335A] rounded-full py-3 items-center"
                  >
                    <Text className="text-[#82A9F9] font-semibold text-[13px]">Ask more in AI Tips</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
            {/* Linear Visual Flow */}
            <View className="flex-row items-center justify-center mt-8 mb-8 w-full px-2">
              <View className="items-center">
                <View className={`w-3 h-3 rounded-full mb-2 ${cycleInfo.currentPhase === 'Menstrual' ? 'bg-[#FF8FA3]' : 'bg-[#1E335A]'}`} />
                <Text className={`text-[11px] font-bold ${cycleInfo.currentPhase === 'Menstrual' ? 'text-[#FF8FA3]' : 'text-[#8B9CBE]'}`}>Menstrual</Text>
              </View>
              <View className="h-[2px] w-6 bg-[#1E335A] mx-1 mb-6" />
              <View className="items-center">
                <View className={`w-3 h-3 rounded-full mb-2 ${cycleInfo.currentPhase === 'Follicular' ? 'bg-[#A7E3A1]' : 'bg-[#1E335A]'}`} />
                <Text className={`text-[11px] font-bold ${cycleInfo.currentPhase === 'Follicular' ? 'text-[#A7E3A1]' : 'text-[#8B9CBE]'}`}>Follicular</Text>
              </View>
              <View className="h-[2px] w-6 bg-[#1E335A] mx-1 mb-6" />
              <View className="items-center">
                <View className={`w-3 h-3 rounded-full mb-2 ${cycleInfo.currentPhase === 'Ovulation' ? 'bg-[#F9E076]' : 'bg-[#1E335A]'}`} />
                <Text className={`text-[11px] font-bold ${cycleInfo.currentPhase === 'Ovulation' ? 'text-[#F9E076]' : 'text-[#8B9CBE]'}`}>Ovulation</Text>
              </View>
              <View className="h-[2px] w-6 bg-[#1E335A] mx-1 mb-6" />
              <View className="items-center">
                <View className={`w-3 h-3 rounded-full mb-2 ${cycleInfo.currentPhase === 'Luteal' ? 'bg-[#CBA6F7]' : 'bg-[#1E335A]'}`} />
                <Text className={`text-[11px] font-bold ${cycleInfo.currentPhase === 'Luteal' ? 'text-[#CBA6F7]' : 'text-[#8B9CBE]'}`}>Luteal</Text>
              </View>
            </View>

            {/* Info note */}
            <View className="flex-row bg-[#142340] rounded-[16px] p-4 border border-[#1E335A] w-full">
              <Info color="#8B9CBE" size={20} className="mr-3 mt-0.5" />
              <Text className="text-[#8B9CBE] text-[13px] leading-[20px] flex-1">
                Cycle phases are estimates and may vary from person to person and from cycle to cycle.
              </Text>
            </View>
          </View>
        )}
      </View>
    </DarkScreen>
  );
}
