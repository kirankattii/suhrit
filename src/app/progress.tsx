import { router } from "expo-router";
import { ChevronLeft, TrendingUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import BottomTabBar from "../components/BottomTabBar";
import Screen from "../components/Screen";
import { Heading, SubHeading } from "../components/Typography";
import {
  DailyCheckin,
  getDailyCheckins,
  getWHO5History,
  WHO5Result,
  getPreconceptionHistory,
  PreconceptionResult
} from "../storage/wellbeing";

export default function ProgressScreen() {
  const [who5History, setWho5History] = useState<WHO5Result[]>([]);
  const [checkinHistory, setCheckinHistory] = useState<DailyCheckin[]>([]);
  const [preconceptionHistory, setPreconceptionHistory] = useState<PreconceptionResult[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const w5 = await getWHO5History();
      const ci = await getDailyCheckins();
      const pc = await getPreconceptionHistory();
      setWho5History(w5.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setCheckinHistory(ci.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setPreconceptionHistory(pc.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    loadData();
  }, []);

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Calculate averages
  const avgSleep = checkinHistory.length > 0
    ? (checkinHistory.reduce((acc, curr) => acc + curr.sleepDuration, 0) / checkinHistory.length).toFixed(1)
    : "—";
    
  const avgMood = checkinHistory.length > 0
    ? (checkinHistory.reduce((acc, curr) => acc + curr.mood, 0) / checkinHistory.length).toFixed(1)
    : "—";

  return (
    <Screen scroll bottomBar={<BottomTabBar />}>
      <View className="px-6 pt-12 pb-12">

        <Heading className="mb-2">My Progress</Heading>
        <Text className="mb-8 text-[14px] text-suhrhit-muted">
          Track your well-being journey over time.
        </Text>

        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-white p-5 rounded-3xl border border-suhrhit-border items-center">
             <Text className="text-suhrhit-secondary font-semibold text-[13px] mb-1">Avg Sleep</Text>
             <Text className="text-suhrhit-primary font-bold text-2xl">{avgSleep} <Text className="text-[14px] font-medium text-suhrhit-muted">hrs</Text></Text>
          </View>
          <View className="flex-1 bg-white p-5 rounded-3xl border border-suhrhit-border items-center">
             <Text className="text-suhrhit-secondary font-semibold text-[13px] mb-1">Avg Mood</Text>
             <Text className="text-suhrhit-primary font-bold text-2xl">{avgMood} <Text className="text-[14px] font-medium text-suhrhit-muted">/ 5</Text></Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <SubHeading>Well-being Over Time</SubHeading>
          <TrendingUp color="#7293B3" size={20} />
        </View>
        
        {who5History.length === 0 ? (
          <View className="bg-suhrhit-background border border-suhrhit-border/50 p-6 rounded-2xl items-center mb-8">
            <Text className="text-suhrhit-muted text-[14px] text-center mb-4">
              You haven't completed any WHO-5 assessments yet.
            </Text>
            <TouchableOpacity onPress={() => router.push("/assessment")} className="bg-suhrhit-primary px-4 py-2 rounded-full">
              <Text className="text-white font-medium text-[13px]">Take Assessment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white rounded-3xl border border-suhrhit-border overflow-hidden mb-8">
            <View className="flex-row bg-[#E6F0FA] p-4 border-b border-suhrhit-border">
              <Text className="flex-1 font-semibold text-suhrhit-primary text-[13px]">Date (WHO-5)</Text>
              <Text className="font-semibold text-suhrhit-primary text-[13px]">Score</Text>
            </View>
            {who5History.map((item, idx) => (
              <View key={item.id} className={`flex-row p-4 items-center ${idx !== who5History.length - 1 ? 'border-b border-suhrhit-border/40' : ''}`}>
                <Text className="flex-1 text-suhrhit-text font-medium text-[14px]">{formatDate(item.date)}</Text>
                <View className="bg-suhrhit-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-suhrhit-primary font-bold">{item.percentage}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View className="flex-row items-center justify-between mb-4">
          <SubHeading>Preconception Check-ins</SubHeading>
          <TrendingUp color="#7293B3" size={20} />
        </View>

        {preconceptionHistory.length === 0 ? (
          <View className="bg-suhrhit-background border border-suhrhit-border/50 p-6 rounded-2xl items-center mb-8">
            <Text className="text-suhrhit-muted text-[14px] text-center mb-4">
              You haven't completed any Preconception Check-ins yet.
            </Text>
            <TouchableOpacity onPress={() => router.push("/explore/pregnancy/preconception/check-in")} className="bg-[#FFB6C1] px-4 py-2 rounded-full">
              <Text className="text-[#183059] font-bold text-[13px]">Take Check-in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white rounded-3xl border border-suhrhit-border overflow-hidden mb-8">
            <View className="flex-row bg-[#FFF0F5] p-4 border-b border-[#FFD6E0]">
              <Text className="flex-1 font-semibold text-suhrhit-primary text-[13px]">Date</Text>
              <Text className="font-semibold text-suhrhit-primary text-[13px]">Flagged Areas</Text>
            </View>
            {preconceptionHistory.map((item, idx) => (
              <View key={item.id} className={`flex-row p-4 items-center ${idx !== preconceptionHistory.length - 1 ? 'border-b border-suhrhit-border/40' : ''}`}>
                <Text className="flex-1 text-suhrhit-text font-medium text-[14px]">{formatDate(item.date)}</Text>
                <View className="bg-[#FFB6C1]/30 px-3 py-1 rounded-full">
                  <Text className="text-suhrhit-primary font-bold">{item.score} / {item.total}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

      </View>
    </Screen>
  );
}
