import { router } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronDown, ChevronUp, Leaf, Apple, Stethoscope, Pill, Brain, Dna, Shield, AlertTriangle } from "lucide-react-native";
import { useState } from "react";

export const TOPICS = [
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    subtitle: 'Stay physically active and reduce prolonged sedentary time.\nAvoid tobacco/nicotine, alcohol and recreational drugs.',
    icon: Leaf,
    iconColor: '#4CAF50',
    iconBg: '#E8F5E9'
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    subtitle: 'Aim for a varied, balanced diet.\nPay attention to folate and other nutritional needs before conception.',
    icon: Apple,
    iconColor: '#F44336',
    iconBg: '#FFEBEE'
  },
  {
    id: 'physical-health',
    title: 'Physical Health',
    subtitle: 'Review existing medical conditions before trying to conceive.\nWork towards a healthy weight and address known deficiencies.',
    icon: Stethoscope,
    iconColor: '#2196F3',
    iconBg: '#E3F2FD'
  },
  {
    id: 'medicines',
    title: 'Medicines & Supplements',
    subtitle: 'Review your medicines, supplements and herbal products before conception.\nNever stop prescribed medication without professional advice.',
    icon: Pill,
    iconColor: '#9C27B0',
    iconBg: '#F3E5F5'
  },
  {
    id: 'mental-health',
    title: 'Mental Well-being',
    subtitle: 'Reflect on your current emotional and mental well-being.\nSeek support if significant emotional difficulties are affecting daily life.',
    icon: Brain,
    iconColor: '#FF9800',
    iconBg: '#FFF3E0'
  },
  {
    id: 'genetic-health',
    title: 'Family & Genetic Health',
    subtitle: 'Consider important inherited conditions or birth defects in either family.\nRelevant family history may warrant genetic counselling.',
    icon: Dna,
    iconColor: '#00BCD4',
    iconBg: '#E0F7FA'
  },
  {
    id: 'infections',
    title: 'Infections & Vaccination',
    subtitle: 'Review vaccination status and relevant infection/STI risks.\nDiscuss required screening or vaccination with a healthcare professional.',
    icon: Shield,
    iconColor: '#3F51B5',
    iconBg: '#E8EAF6'
  },
  {
    id: 'environment',
    title: 'Environmental Exposure',
    subtitle: 'Be aware of significant exposure to chemicals, pesticides, heavy metals.\nIf exposure is unavoidable, discuss ways to reduce it.',
    icon: AlertTriangle,
    iconColor: '#607D8B',
    iconBg: '#ECEFF1'
  }
];

export default function PrepareTogetherScreen() {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-[#FAFAFA]" style={{ paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-[#F0F0F0]">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary font-bold text-[20px]" style={{ fontFamily: 'Georgia' }}>
          Prepare Together
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
          Small steps before you start trying can help you prepare for a healthier pregnancy.
        </Text>

        <View className="pb-10">
          {TOPICS.map((topic) => {
            const isExpanded = expandedId === topic.id;
            const points = topic.subtitle.split('\n');

            return (
              <TouchableOpacity 
                key={topic.id}
                activeOpacity={0.8}
                className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-[#F5F5F5]"
                onPress={() => setExpandedId(isExpanded ? null : topic.id)}
              >
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full items-center justify-center mr-4" style={{ backgroundColor: topic.iconBg }}>
                    <topic.icon color={topic.iconColor} size={24} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{topic.title}</Text>
                    {!isExpanded && (
                      <Text className="text-suhrhit-secondary text-[12px] leading-[18px]" numberOfLines={2}>
                        {points[0]}
                      </Text>
                    )}
                  </View>
                  {isExpanded ? (
                    <ChevronUp color="#CBD5E1" size={20} />
                  ) : (
                    <ChevronDown color="#CBD5E1" size={20} />
                  )}
                </View>

                {isExpanded && (
                  <View className="mt-4 pt-4 border-t border-[#F5F5F5] w-full gap-3">
                    {points.map((point, idx) => (
                      <View key={idx} className="flex-row items-start">
                        <View className="w-1.5 h-1.5 rounded-full mt-1.5 mr-3" style={{ backgroundColor: topic.iconColor }} />
                        <Text className="flex-1 text-suhrhit-primary text-[14px] leading-[20px]">
                          {point}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          <View className="bg-[#F5F9FF] rounded-2xl p-4 mt-4">
            <Text className="text-[#7293B3] text-[12px] text-center leading-[18px]">
              Everyone's needs are different. These suggestions are general preparation guidance and are not a substitute for personalised medical advice.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
