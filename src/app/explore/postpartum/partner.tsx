import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, Home, Baby, Coffee, Moon, MessageCircle, Shield, HeartPulse } from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

const SUPPORT_ITEMS = [
  {
    icon: Home,
    title: "Share daily responsibilities",
    color: "#7293B3",
    desc: "Helping with household responsibilities can give a new mother more time to rest and recover."
  },
  {
    icon: Baby,
    title: "Share baby-care responsibilities",
    color: "#E57373",
    desc: "Caring for a baby can be demanding. Sharing responsibilities can make the transition easier."
  },
  {
    icon: Coffee,
    title: "Support meals and hydration",
    color: "#81C784",
    desc: "Helping with meals and keeping water within reach can make self-care easier."
  },
  {
    icon: Moon,
    title: "Give her time to rest",
    color: "#9575CD",
    desc: "Rest is an important part of recovery."
  },
  {
    icon: MessageCircle,
    title: "Listen without judgement",
    color: "#4FC3F7",
    desc: "Sometimes being heard and understood is more helpful than trying to solve everything."
  },
  {
    icon: Shield,
    title: "Respect her boundaries",
    color: "#FFB74D",
    desc: "Her physical and emotional needs may change during recovery. Respecting those changes matters."
  },
  {
    icon: HeartPulse,
    title: "Encourage her to seek help",
    color: "#D32F2F",
    desc: "If she is struggling physically or emotionally, encourage her to speak with a healthcare professional."
  }
];

export default function PartnerScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View style={{ paddingTop: Math.max(insets.top, 10) + 8 }} className="px-6 pb-4 bg-suhrhit-background z-50">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
            Partner & First Circle
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6 pt-4">

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={require("../../../assets/images/explore/postpartum/partner.jpg")}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary text-[24px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>
            You Don't Have to Do It Alone
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            A new mother needs care too. Small acts of understanding and support can make a big difference.
          </Text>

          {/* Items */}
          <View className="mb-6">
            {SUPPORT_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <View key={index} className="flex-row items-start mb-5">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-white border border-suhrhit-border/50"
                    style={{ shadowColor: item.color, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
                  >
                    <Icon color={item.color} size={22} strokeWidth={2} />
                  </View>
                  <View className="flex-1 mt-1">
                    <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">{item.title}</Text>
                    {/* The screenshot only shows titles mostly, but we have descriptions in markdown.
                        We can show them subtly or omit them if they cluttter. Let's add them as light text */}
                    <Text className="text-suhrhit-secondary text-[13px] leading-[18px]">{item.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="bg-[#E6F0FA] p-5 rounded-[24px] mb-8">
            <Text className="text-[#183059] text-[15px] leading-[22px] text-center font-medium italic" style={{ fontFamily: 'Georgia' }}>
              "Supporting a new mother doesn't mean fixing everything. Sometimes listening, understanding and simply being present can be the most helpful thing."
            </Text>
          </View>

        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
