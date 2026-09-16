import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Image, ImageSourcePropType, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "./BottomTabBar";

interface ExploreLayoutProps {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType;
  children: React.ReactNode;
}

export function ExploreMenuItem({
  icon: Icon,
  title,
  subtitle,
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-[24px] p-5 mb-3 flex-row items-center border border-suhrhit-border/50"
      style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}
    >
      <View className="bg-[#EEF4F1] w-12 h-12 rounded-full items-center justify-center mr-4">
        <Icon color="#173F35" size={24} strokeWidth={2} />
      </View>
      <View className="flex-1">
        <Text className="text-suhrhit-primary font-bold text-[15px]">{title}</Text>
        <Text className="text-suhrhit-secondary text-[13px] mt-0.5 pr-2">{subtitle}</Text>
      </View>
      <ChevronRight color="#8BAF9F" size={20} strokeWidth={2.5} />
    </TouchableOpacity>
  );
}

export default function ExploreLayout({ title, subtitle, imageSource, children }: ExploreLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-suhrhit-background">
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: Math.max(insets.top, 20) + 16 }} className="px-6 pb-6">
          {/* Header */}
          <View className="flex-row items-center justify-between z-10 mb-6">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
              <ChevronLeft color="#173F35" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10" style={{ fontFamily: 'Georgia' }}>
              {title}
            </Text>
            <View className="w-10 h-10" />
          </View>

          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image 
              source={imageSource}
              style={{ width: '100%', height: 220 }}
              resizeMode="cover"
            />
          </View>

          {/* Subtitle */}
          <Text className="text-suhrhit-primary text-center text-[15px] leading-[22px] font-medium mb-8 px-4" style={{ fontFamily: 'Georgia' }}>
            {subtitle}
          </Text>

          {/* Menu Items */}
          <View>
            {children}
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
