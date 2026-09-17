import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { TOPICS } from "./prepare-together";

export default function TopicDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const topic = TOPICS.find(t => t.id === id) || TOPICS[0];
  
  // Example image mapping - ideally each topic has its own image
  const getImageSource = () => {
    if (topic.id === 'lifestyle') {
      return require('../../../../assets/images/explore/lifestyle_active.jpg');
    }
    // Fallback
    return require('../../../../assets/images/explore/lifestyle_active.jpg'); 
  };

  const points = topic.subtitle.split('\n');

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-[#F0F0F0]">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary font-medium text-[18px] absolute w-full text-center -z-10" style={{ fontFamily: 'Georgia' }}>
          {topic.title}
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6 items-center">
          <View className="w-full h-48 rounded-[32px] overflow-hidden mb-8">
            <Image 
              source={getImageSource()}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary font-bold text-[24px] text-center mb-4" style={{ fontFamily: 'Georgia' }}>
            Build healthy habits together
          </Text>
          
          <Text className="text-suhrhit-secondary text-[15px] leading-[24px] text-center mb-8 px-2">
            A healthy lifestyle can support your overall well-being and prepare your body for pregnancy.
          </Text>

          <View className="w-full gap-6">
            {points.map((point, idx) => (
              <View key={idx} className="flex-row items-center bg-[#FDFDFD] p-4 rounded-2xl border border-[#F0F0F0]">
                <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: topic.iconBg }}>
                  <topic.icon color={topic.iconColor} size={20} />
                </View>
                <Text className="flex-1 text-suhrhit-primary text-[14px] leading-[20px] font-medium">
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="px-6 py-6 border-t border-[#F0F0F0] bg-white" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
        <TouchableOpacity 
          className="w-full bg-[#FFB6C1] rounded-full py-4 items-center justify-center shadow-sm"
          onPress={() => router.back()}
        >
          <Text className="text-[#183059] font-bold text-[16px]">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
