import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Baby,
  Brain,
  Droplet,
  Stethoscope,
  Users,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../components/BottomTabBar";
import { getProfile, ProfileData } from "../storage/onboarding";
import { canTakeDailyCheckin, canTakeWHO5 } from "../storage/wellbeing";
import { getGratitudeStreak } from "../storage/gratitude";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 2; // 48 for px-6, 16 for gap

export default function HomeScreen() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [allowDailyCheckin, setAllowDailyCheckin] = useState(true);
  const [allowWHO5, setAllowWHO5] = useState(true);
  const [gratitudeStreak, setGratitudeStreak] = useState(0);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      const checkAvailability = async () => {
        const canDaily = await canTakeDailyCheckin();
        const canW5 = await canTakeWHO5();
        const streakData = await getGratitudeStreak();
        setAllowDailyCheckin(canDaily);
        setAllowWHO5(canW5);
        setGratitudeStreak(streakData.streak);
      };
      checkAvailability();
    }, []),
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  let treeImage = require("../assets/images/games/gratitude/seed.jpg");
  if (gratitudeStreak >= 21) {
    treeImage = require("../assets/images/games/gratitude/majestic_tree.jpg");
  } else if (gratitudeStreak >= 14) {
    treeImage = require("../assets/images/games/gratitude/tree.jpg");
  } else if (gratitudeStreak >= 7) {
    treeImage = require("../assets/images/games/gratitude/young_tree.jpg");
  } else if (gratitudeStreak >= 4) {
    treeImage = require("../assets/images/games/gratitude/sapling.jpg");
  } else if (gratitudeStreak >= 2) {
    treeImage = require("../assets/images/games/gratitude/plant.jpg");
  } else if (gratitudeStreak >= 1) {
    treeImage = require("../assets/images/games/gratitude/sprout.jpg");
  }

  const firstName = profile?.name?.split(" ")[0] || "Srishti";

  return (
    <View className="flex-1 bg-[#FAFCFF]">
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Header */}
        <View
          className="bg-[#C6E8D3] px-6 rounded-b-[40px] relative overflow-hidden pb-12"
          style={{ paddingTop: Math.max(insets.top, 20) + 20 }}
        >
          <View className="flex-row justify-between items-start">
            <Text className="text-[#1E3A2F] text-[32px] leading-[40px] font-bold w-[60%]">
              Good morning{"\n"}
              {firstName}!
            </Text>
            {/* Gratitude Tree */}
            <View className="absolute right-[-10px] bottom-[-10px] items-center">
              {gratitudeStreak > 0 && (
                <View className="bg-white/80 px-3 py-1 rounded-full mb-1 shadow-sm">
                  <Text className="text-[#1E3A2F] text-[10px] font-bold text-center tracking-widest uppercase">
                    🔥 {gratitudeStreak} Day{gratitudeStreak !== 1 ? 's' : ''}
                  </Text>
                </View>
              )}
              <Image 
                source={treeImage}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Daily Check-in Floating Card */}
        <View className="-mt-8 px-6 z-20">
          <View
            className="bg-white rounded-3xl p-5 flex-row items-center justify-between shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View className="flex-1 mr-4">
              <Text className="text-gray-500 font-semibold text-[11px] uppercase tracking-wider mb-1">
                Daily Check-in
              </Text>
              <Text className="text-[#1A1A1A] font-medium text-[17px] leading-[22px]">
                How are you feeling{"\n"}today?
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (allowDailyCheckin) {
                  router.push("/check-in");
                } else {
                  Alert.alert(
                    "Already checked in!",
                    "You have already completed your daily check-in for today.",
                  );
                }
              }}
              className="bg-[#78A49C] rounded-full py-2.5 px-4 flex-row items-center"
            >
              <Text className="text-white font-medium mr-1 text-[14px]">
                Check-in
              </Text>
              <ArrowRight color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Explore Suhrit Section */}
        <View className="px-6 mt-8">
          <Text className="text-[#1A1A1A] text-[22px] font-bold mb-2">
            Explore Suhrit
          </Text>

          {/* Mental Well-being Card */}
          <TouchableOpacity
            onPress={() => router.push("/mind")}
            className="bg-[#CBE4F9] rounded-[24px] p-5 flex-row gap-4 items-center mb-4"
            activeOpacity={0.7}
          >
            <Brain
              size={32}
              color="#1A1A1A"
              strokeWidth={1.5}
              className="mr-4"
            />
            <Text className="text-[#1A1A1A] font-bold text-[16px]">
              Mental Well-being
            </Text>
          </TouchableOpacity>

          {/* 2x2 Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4 gap-x-2">
            {[
              {
                title: "Menstrual\nWell-being",
                route: "/explore/menstrual",
                bgColor: "bg-[#F3C7CB]",
                icon: Droplet,
                leading: "leading-[20px]",
              },
              {
                title: "Pregnancy\nJourney",
                route: "/explore/pregnancy",
                bgColor: "bg-[#C6E8D3]",
                icon: Baby,
                leading: "leading-[20px]",
              },
              {
                title: "Social\nRelationship &\nSupport",
                route: "/explore/relationships",
                bgColor: "bg-[#D3C7F3]",
                imageSource: require("../assets/images/social_support_icon.png"),
                leading: "leading-[18px]",
              },
              {
                title: "Professional\nSupport",
                route: "/explore/professional",
                bgColor: "bg-[#F9E0A2]",
                icon: Stethoscope,
                leading: "leading-[20px]",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.route as any)}
                  style={{ width: CARD_WIDTH }}
                  className={`${item.bgColor} rounded-[24px] p-5 pt-3 items-center justify-center aspect-square`}
                  activeOpacity={0.7}
                >
                  {item.imageSource ? (
                    <Image source={item.imageSource} style={{ width: 52, height: 52, marginBottom: 12, resizeMode: "contain" }} />
                  ) : (
                    item.icon && <IconComponent
                      size={32}
                      color="#1A1A1A"
                      strokeWidth={1.5}
                      className="mb-3"
                    />
                  )}
                  <Text
                    className={`text-[#1A1A1A] font-bold text-center ${item.leading} text-[15px]`}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Check-out Card (Now positioned directly below the grid) */}
        <View className="px-6 -mt-6">
          <View
            className="bg-white rounded-3xl p-5 flex-row items-center justify-between shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 10,
            }}
          >
            <Text className="text-[#1A1A1A] font-bold text-[15px] uppercase leading-[22px] tracking-wider w-[60%]">
              READY TO COMPLETE{"\n"}YOUR DAY?
            </Text>
            <TouchableOpacity 
              onPress={() => router.push("/check-out")}
              className="bg-[#78A49C] rounded-full py-2.5 px-4 flex-row items-center"
            >
              <Text className="text-white font-medium mr-1 text-[14px]">
                Check-out
              </Text>
              <ArrowRight color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
