import { router, useFocusEffect } from "expo-router";
import { ChevronLeft, Flame, Check, X, Leaf } from "lucide-react-native";
import { useCallback, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { 
  getGratitudeStreak, 
  saveGratitude, 
  getGratitudes, 
  GratitudeEntry 
} from "../../../storage/gratitude";
import { getProfile } from "../../../storage/onboarding";

export default function GratitudeTreeScreen() {
  const insets = useSafeAreaInsets();
  const [streak, setStreak] = useState(0);
  const [canPlantToday, setCanPlantToday] = useState(true);
  const [history, setHistory] = useState<GratitudeEntry[]>([]);
  const [name, setName] = useState("Friend");
  
  const [gratitudeText, setGratitudeText] = useState("");

  const loadData = useCallback(async () => {
    const profile = await getProfile();
    if (profile?.name) setName(profile.name.split(" ")[0]);

    const streakData = await getGratitudeStreak();
    setStreak(streakData.streak);
    setCanPlantToday(streakData.canPlantToday);
    
    const entries = await getGratitudes();
    setHistory(entries);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleSubmit = async () => {
    if (!gratitudeText.trim()) return;
    
    await saveGratitude(gratitudeText);
    setGratitudeText("");
    
    // Reload state
    await loadData();
    Alert.alert("Planted!", "Your gratitude has been planted. Your tree is growing!");
  };

  // Determine stage and image based on streak
  // (We use streak + 1 if they can plant today, representing the "current" day they are on)
  const currentDay = canPlantToday ? streak + 1 : streak;
  
  let stageName = "SEED";
  let progress = 0; // 0-100% within stage
  let imageSource = require("../../../assets/images/games/gratitude/seed.jpg");
  
  if (currentDay >= 24) {
    stageName = "MAJESTIC TREE";
    progress = 100;
    imageSource = require("../../../assets/images/games/gratitude/majestic_tree.jpg");
  } else if (currentDay >= 17) {
    stageName = "TREE";
    progress = ((currentDay - 17) / 7) * 100;
    imageSource = require("../../../assets/images/games/gratitude/tree.jpg");
  } else if (currentDay >= 12) {
    stageName = "YOUNG TREE";
    progress = ((currentDay - 12) / 5) * 100;
    imageSource = require("../../../assets/images/games/gratitude/young_tree.jpg");
  } else if (currentDay >= 9) {
    stageName = "SAPLING";
    progress = ((currentDay - 9) / 3) * 100;
    imageSource = require("../../../assets/images/games/gratitude/sapling.jpg");
  } else if (currentDay >= 6) {
    stageName = "SMALL PLANT";
    progress = ((currentDay - 6) / 3) * 100;
    imageSource = require("../../../assets/images/games/gratitude/plant.jpg");
  } else if (currentDay >= 4) {
    stageName = "SPROUT";
    progress = ((currentDay - 4) / 2) * 100;
    imageSource = require("../../../assets/images/games/gratitude/sprout.jpg");
  } else if (currentDay >= 2) {
    stageName = "SEEDLING";
    progress = ((currentDay - 2) / 2) * 100;
    imageSource = require("../../../assets/images/games/gratitude/seedling.jpg");
  } else {
    stageName = "SEED";
    progress = (currentDay / 2) * 100;
  }

  // Generate last 7 days for the calendar
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const isDayCompleted = (date: Date) => {
    return history.some(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === date.getTime();
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#E8F3E9]" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <View style={{ paddingTop: Math.max(insets.top, 20) }} className="px-5 pb-6">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
              <ChevronLeft color="#2E5C31" size={28} />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-6">
            <View className="flex-row items-center justify-center mb-2">
              <Leaf color="#2E5C31" size={24} />
              <Text className="text-[#2E5C31] text-[24px] font-bold ml-2 tracking-wide">
                THE GRATITUDE TREE
              </Text>
            </View>
            <Text className="text-[#4A7B4D] font-semibold text-[13px] tracking-widest uppercase mb-1">
              Daily Growth Journal
            </Text>
            <Text className="text-[#2E5C31] text-[18px] font-medium" style={{ fontFamily: 'Georgia' }}>
              Hello, {name}!
            </Text>
          </View>

          {/* Streak Card */}
          <View className="bg-[#4A7B4D] rounded-[24px] p-5 shadow-sm mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-white/80 font-bold text-[11px] uppercase tracking-wider mb-2">
                Your Gratitude Streak
              </Text>
              <View className="flex-row items-center">
                <Flame color="#FFA000" size={28} fill="#FFA000" />
                <Text className="text-white font-bold text-[28px] ml-2">{streak} DAYS</Text>
              </View>
            </View>

            <View>
               <Text className="text-white/80 font-bold text-[11px] uppercase tracking-wider mb-2 text-right">
                 Last 7 Days
               </Text>
               <View className="flex-row gap-1">
                 {last7Days.map((date, idx) => {
                   const completed = isDayCompleted(date);
                   const isToday = date.getTime() === today.getTime();
                   return (
                     <View key={idx} className="items-center">
                       <View 
                         className={`w-6 h-6 rounded-md items-center justify-center mb-1 
                           ${completed ? 'bg-white' : 'bg-white/20'} 
                           ${isToday && !completed ? 'border border-white border-dashed' : ''}`}
                       >
                         {completed ? (
                           <Check color="#4A7B4D" size={14} strokeWidth={3} />
                         ) : (
                           <X color="white" size={14} opacity={0.5} />
                         )}
                       </View>
                       <Text className="text-white text-[10px] opacity-80">{date.getDate()}</Text>
                     </View>
                   );
                 })}
               </View>
            </View>
          </View>

          {/* Tree Visualization */}
          <View className="bg-white rounded-[28px] p-6 mb-6 items-center border border-[#E8F3E9] shadow-sm">
            <View className="flex-row w-full justify-between items-center mb-2">
              <Text className="text-[#2E5C31] font-bold text-[12px] uppercase">
                Day {currentDay}: Growth
              </Text>
              <Text className="text-[#2E5C31] font-bold text-[12px] uppercase">
                {stageName}
              </Text>
            </View>
            
            <View className="w-full h-2 bg-[#E8F3E9] rounded-full overflow-hidden mb-6">
              <View className="h-full bg-[#4A7B4D]" style={{ width: `${progress}%` }} />
            </View>

            <Image 
              source={imageSource} 
              className="w-full h-[220px] rounded-[16px]"
              resizeMode="cover"
            />
          </View>

          {/* Input Section */}
          <View className="bg-white rounded-[28px] p-6 shadow-sm border border-[#E8F3E9] mb-4">
            <Text className="text-[#2E5C31] font-bold text-[18px] uppercase tracking-wide mb-1 text-center">
              Today's Gratitude
            </Text>
            <Text className="text-[#4A7B4D] text-[14px] text-center mb-6">
              {formatDate(new Date())}
            </Text>

            {canPlantToday ? (
              <>
                <Text className="text-[#2E5C31] font-semibold text-[16px] mb-3">
                  I am grateful for...
                </Text>
                <TextInput
                  className="bg-[#F8FAF8] rounded-[16px] p-4 text-[16px] text-[#2E5C31] border border-[#E8F3E9]"
                  placeholder="Write one thing you're thankful for today..."
                  placeholderTextColor="#A0C0A3"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={gratitudeText}
                  onChangeText={setGratitudeText}
                  style={{ minHeight: 120 }}
                />
                
                <TouchableOpacity 
                  onPress={handleSubmit}
                  disabled={!gratitudeText.trim()}
                  className={`mt-6 rounded-full py-4 items-center justify-center ${
                    gratitudeText.trim() ? 'bg-[#4A7B4D]' : 'bg-[#A0C0A3]'
                  }`}
                >
                  <Text className="text-white font-bold text-[16px] tracking-wide">
                    SUBMIT TODAY'S GRATITUDE
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View className="bg-[#F8FAF8] rounded-[16px] p-6 items-center border border-[#E8F3E9]">
                <Leaf color="#4A7B4D" size={32} className="mb-3" />
                <Text className="text-[#2E5C31] font-bold text-[16px] text-center mb-2">
                  You've already planted today!
                </Text>
                <Text className="text-[#4A7B4D] text-center text-[14px]">
                  "{history[history.length - 1]?.text}"
                </Text>
              </View>
            )}
          </View>

          <Text className="text-center text-[#4A7B4D] text-[13px] px-4 opacity-80 pb-6">
            Submit once daily to keep your streak going! Your tree grows each day.
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
