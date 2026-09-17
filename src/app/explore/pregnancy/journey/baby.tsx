import { router } from "expo-router";
import { ChevronLeft, Info, Heart } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Trimester = "1st Trimester" | "2nd Trimester" | "3rd Trimester";

const BABY_JOURNEY_DATA = {
  "1st Trimester": {
    title: "Weeks 1-12",
    subtitle: "Big beginnings",
    items: [
      "Early embryonic development",
      "Major body structures begin forming",
      "Early heart development",
      "Placental development",
      "Limb development",
      "Facial development",
      "Early fetal movement (not yet felt)",
    ]
  },
  "2nd Trimester": {
    title: "Weeks 13-27",
    subtitle: "Growing and feeling",
    items: [
      "Rapid growth",
      "Increasingly recognizable features",
      "Continued bone development",
      "Increasing movement",
      "Hearing-related development",
      "Many mothers begin feeling fetal movement",
    ]
  },
  "3rd Trimester": {
    title: "Weeks 28-40+",
    subtitle: "Getting ready",
    items: [
      "Continued growth and weight gain",
      "Brain/nervous-system maturation",
      "Lung maturation",
      "Increasingly developed movement patterns",
      "Preparation for birth",
      "Baby may gradually move toward a birth position",
    ]
  }
};

export default function BabyJourneyScreen() {
  const [activeTab, setActiveTab] = useState<Trimester>("1st Trimester");
  const data = BABY_JOURNEY_DATA[activeTab];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
          Your Baby's Journey
        </Text>
      </View>
      <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
        A remarkable journey, week by week.
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
        <View className="bg-white rounded-3xl p-6 border border-[#F0F4F8] mb-6">
          <View className="flex-row items-center mb-6">
            <View className="w-24 h-24 rounded-full overflow-hidden mr-4 border-2 border-[#FFEAE5]">
              <Image 
                source={require("../../../../assets/images/pregnancy_journey/baby_1st_tri.jpg")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-suhrhit-primary font-bold text-[18px] mb-1">{data.title}</Text>
              <Text className="text-suhrhit-secondary text-[15px] font-medium">{data.subtitle}</Text>
            </View>
          </View>
          
          <View>
            {data.items.map((item, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="w-2 h-2 rounded-full bg-[#FF6B6B] mr-3" />
                <Text className="text-suhrhit-primary text-[15px] flex-1 leading-[20px]">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-[#FFF0F0] rounded-2xl p-5 mb-4 items-center flex-row">
          <View className="flex-1 mr-3">
            <Text className="text-[#D32F2F] text-[14px] leading-[20px] text-center font-medium italic">
              Every tiny milestone is a step towards your baby's bright tomorrow.
            </Text>
          </View>
          <Heart color="#D32F2F" fill="#D32F2F" size={24} />
        </View>

        <View className="bg-[#E6F0FA] rounded-2xl p-4 mt-2 flex-row items-start mb-8">
          <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
          <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
            These milestones are approximate. Development varies between pregnancies and this information cannot determine whether your baby is healthy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
