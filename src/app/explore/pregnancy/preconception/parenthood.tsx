import { router } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, HeartHandshake, Home, Smile, Info } from "lucide-react-native";

export default function ParenthoodScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-[#F0F0F0]">
        <Text pointerEvents="none" className="text-suhrhit-primary font-medium text-[18px] absolute left-0 right-0 text-center" style={{ fontFamily: 'Georgia' }}>
          Preparing for Parenthood
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center z-10">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6 items-center">
          <View className="w-full h-56 rounded-[32px] overflow-hidden mb-8">
            <Image 
              source={require('../../../../assets/images/explore/parenthood_couple.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-suhrhit-primary font-bold text-[24px] text-center mb-2" style={{ fontFamily: 'Georgia' }}>
            Before You Become Parents
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] text-center mb-8">
            A shared journey, a stronger tomorrow. Think about it together:
          </Text>

          <View className="w-full gap-4 mb-8">
            <View className="bg-[#F5F9FF] rounded-2xl p-5 border border-[#E6F0FA]">
              <View className="flex-row items-center mb-3">
                <HeartHandshake color="#183059" size={20} className="mr-3" />
                <Text className="text-suhrhit-primary font-bold text-[16px]">Support System</Text>
              </View>
              <Text className="text-suhrhit-secondary text-[14px] leading-[22px]">
                Who could you and your partner turn to for emotional or practical support if parenthood becomes challenging?
              </Text>
            </View>

            <View className="bg-[#FFF0F5] rounded-2xl p-5 border border-[#FFD6E0]">
              <View className="flex-row items-center mb-3">
                <Home color="#D81B60" size={20} className="mr-3" />
                <Text className="text-suhrhit-primary font-bold text-[16px]">Shared Responsibilities</Text>
              </View>
              <Text className="text-suhrhit-secondary text-[14px] leading-[22px]">
                Have you discussed how childcare, household responsibilities and financial responsibilities may be shared?
              </Text>
            </View>

            <View className="bg-[#E8F5E9] rounded-2xl p-5 border border-[#C8E6C9]">
              <View className="flex-row items-center mb-3">
                <Smile color="#2E7D32" size={20} className="mr-3" />
                <Text className="text-suhrhit-primary font-bold text-[16px]">Emotional Preparation</Text>
              </View>
              <Text className="text-suhrhit-secondary text-[14px] leading-[22px]">
                How do you both feel about becoming parents at this stage of your lives?
              </Text>
            </View>
          </View>

          <View className="bg-[#FAFAFA] rounded-2xl p-4 flex-row w-full mb-10 border border-[#F0F0F0]">
            <View className="w-6 h-6 rounded-full bg-[#E0E0E0] items-center justify-center mr-3 mt-0.5">
              <Info color="#757575" size={14} />
            </View>
            <Text className="flex-1 text-[#757575] text-[13px] leading-[20px]">
              There are no right or wrong answers. These questions are simply for reflection and conversation.
            </Text>
          </View>

          {/* Disclaimer section */}
          <View className="w-full bg-[#F5F9FF] rounded-3xl p-6 items-center mb-8">
            <View className="w-16 h-16 rounded-full overflow-hidden mb-4 bg-white border border-[#E6F0FA]">
              <Image 
                source={require('../../../../assets/images/explore/thoughtful_steps.jpg')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-suhrhit-primary font-bold text-[18px] text-center mb-2" style={{ fontFamily: 'Georgia' }}>
              You're Taking Thoughtful Steps
            </Text>
            <Text className="text-suhrhit-secondary text-center text-[14px] mb-6">
              Informed choices today for healthier tomorrows.
            </Text>
            
            <View className="flex-row items-start mb-6">
              <View className="w-5 h-5 rounded-full bg-[#183059] items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-[12px] font-bold">i</Text>
              </View>
              <Text className="flex-1 text-suhrhit-secondary text-[12px] leading-[18px]">
                <Text className="font-bold">Important</Text>{"\n"}
                SUHRIT provides general information and self-reflection tools to help you prepare for pregnancy. This information is not a medical diagnosis, fertility assessment or substitute for professional care. Individual health needs differ. If you have concerns about your health, medicines, family history or pregnancy planning, consider speaking with a qualified healthcare professional.
              </Text>
            </View>

            <TouchableOpacity 
              className="w-full bg-[#FFB6C1] rounded-full py-4 items-center justify-center shadow-sm"
              onPress={() => router.navigate("/explore/pregnancy/preconception")}
            >
              <Text className="text-[#183059] font-bold text-[15px]">Back to Preconception</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
