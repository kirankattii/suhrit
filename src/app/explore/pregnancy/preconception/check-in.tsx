import { router } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import { ChevronLeft, Info } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { savePreconceptionResult } from "../../../../storage/wellbeing";

export const CHECKIN_QUESTIONS = [
  {
    id: 1,
    title: 'Have you and your partner not yet discussed your plans for pregnancy?',
    flagCategory: 'Communication',
    flagText: 'You may want to have an open conversation about your plans to ensure you both feel emotionally, practically, and financially prepared.'
  },
  {
    id: 2,
    title: 'Do you currently use tobacco/nicotine, alcohol or recreational drugs?',
    flagCategory: 'Lifestyle Habits',
    flagText: 'Consider reviewing substance use, as stopping these before conception is highly recommended for a healthy pregnancy.'
  },
  {
    id: 3,
    title: 'Do you have an ongoing medical condition that may require management before pregnancy?',
    flagCategory: 'Physical health',
    flagText: 'Your response suggests that an existing health condition may need review before conception.'
  },
  {
    id: 4,
    title: 'Are you taking any medicines, herbal products or supplements whose pregnancy safety has not been reviewed by a healthcare professional?',
    flagCategory: 'Medication',
    flagText: 'Your current medicines or supplements may need a pregnancy-safety review.'
  },
  {
    id: 5,
    title: 'Do you currently have a known nutritional deficiency or anaemia that has not been addressed?',
    flagCategory: 'Nutrition',
    flagText: 'You may want to review your nutritional status, such as anaemia or other deficiencies.',
    hint: 'Examples include low iron, vitamin D, vitamin B12 or folate levels.'
  },
  {
    id: 6,
    title: 'Are there any vaccinations or relevant infection/STI screening that you have not yet reviewed before pregnancy?',
    flagCategory: 'Vaccination & Infection',
    flagText: 'Consider reviewing your vaccination status and relevant infection screening.'
  },
  {
    id: 7,
    title: "Is there a known inherited condition, genetic disorder or significant birth defect in either partner's family that has not been discussed with a healthcare professional?",
    flagCategory: 'Family & Genetic Health',
    flagText: 'A family history of certain conditions might warrant a discussion with a healthcare professional or genetic counsellor.'
  },
  {
    id: 8,
    title: 'Do you currently have significant lifestyle concerns, such as very low physical activity, highly irregular eating or major sleep difficulties?',
    flagCategory: 'General Lifestyle',
    flagText: 'Consider addressing physical activity, eating habits, or sleep routines to support overall well-being.'
  },
  {
    id: 9,
    title: 'Are you currently experiencing significant anxiety, depression, emotional distress or another mental-health concern affecting daily life?',
    flagCategory: 'Mental Well-being',
    flagText: 'Your responses indicate that you might benefit from additional emotional or mental-health support right now.'
  },
  {
    id: 10,
    title: 'Do you have regular occupational or environmental exposure to potentially harmful chemicals or substances?',
    flagCategory: 'Environmental Exposure',
    flagText: 'Consider discussing any workplace or environmental exposures to chemicals, pesticides, or heavy metals.'
  }
];

export default function CheckInScreen() {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  
  const question = CHECKIN_QUESTIONS[currentIndex];
  const isSelected = (val: boolean) => answers[currentIndex] === val;

  const handleNext = async () => {
    if (answers[currentIndex] === undefined) return;
    
    if (currentIndex < CHECKIN_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Save to history
      const score = Object.values(answers).filter(val => val === true).length;
      await savePreconceptionResult({
        date: new Date().toISOString(),
        score,
        total: CHECKIN_QUESTIONS.length,
        answers,
      });

      // Go to results
      router.push({
        pathname: "/explore/pregnancy/preconception/results",
        params: { answersData: JSON.stringify(answers) }
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={handleBack} className="w-10 h-10 justify-center">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <Text className="text-suhrhit-primary font-medium text-[18px] absolute w-full text-center -z-10" style={{ fontFamily: 'Georgia' }}>
          Preconception Check-in
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-2 bg-[#F5F5F5] rounded-full overflow-hidden mr-4">
            <View 
              className="h-full bg-[#FFB6C1]" 
              style={{ width: `${((currentIndex + 1) / CHECKIN_QUESTIONS.length) * 100}%` }} 
            />
          </View>
          <Text className="text-suhrhit-secondary font-medium text-[14px]">
            {currentIndex + 1}/{CHECKIN_QUESTIONS.length}
          </Text>
        </View>

        <Text className="text-suhrhit-primary font-bold text-[22px] leading-[32px] mb-10" style={{ fontFamily: 'Georgia' }}>
          {question.title}
        </Text>

        <View className="gap-4">
          <TouchableOpacity
            onPress={() => setAnswers(prev => ({ ...prev, [currentIndex]: true }))}
            className={`py-4 rounded-full border items-center ${isSelected(true) ? 'bg-[#FFECF0] border-[#FFB6C1]' : 'bg-white border-[#E2E8F0]'}`}
          >
            <Text className={`font-bold text-[16px] ${isSelected(true) ? 'text-[#183059]' : 'text-suhrhit-secondary'}`}>
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAnswers(prev => ({ ...prev, [currentIndex]: false }))}
            className={`py-4 rounded-full border items-center ${isSelected(false) ? 'bg-[#FFECF0] border-[#FFB6C1]' : 'bg-white border-[#E2E8F0]'}`}
          >
            <Text className={`font-bold text-[16px] ${isSelected(false) ? 'text-[#183059]' : 'text-suhrhit-secondary'}`}>
              No
            </Text>
          </TouchableOpacity>
        </View>

        {question.hint && (
          <View className="bg-[#F5F9FF] rounded-[20px] p-4 flex-row mt-8">
            <View className="w-6 h-6 rounded-full bg-[#E6F0FA] items-center justify-center mr-3 mt-0.5">
              <Info color="#7293B3" size={14} />
            </View>
            <Text className="flex-1 text-[#7293B3] text-[13px] leading-[20px]">
              {question.hint}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="px-6 py-6 flex-row items-center justify-between border-t border-[#F0F0F0]" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
        <TouchableOpacity 
          className="w-[45%] py-4 items-center justify-center border border-[#E2E8F0] rounded-full"
          onPress={handleBack}
        >
          <Text className="text-suhrhit-secondary font-medium text-[16px]">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`w-[45%] py-4 items-center justify-center rounded-full ${answers[currentIndex] !== undefined ? 'bg-[#FFB6C1]' : 'bg-[#F5F5F5]'}`}
          onPress={handleNext}
          disabled={answers[currentIndex] === undefined}
        >
          <Text className={`font-bold text-[16px] ${answers[currentIndex] !== undefined ? 'text-[#183059]' : 'text-[#A0A0A0]'}`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
