import { router, useLocalSearchParams } from "expo-router";
import {
  Calendar,
  ChevronLeft,
  Droplet,
  Leaf,
  Moon,
  Sun,
} from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DarkScreen from "../../../../components/menstrual/DarkScreen";
import PhaseTabs, {
  PhaseTab,
} from "../../../../components/menstrual/PhaseTabs";

const phaseContent = {
  menstrual: {
    title: "Menstrual Phase",
    subtitle: "During your period",
    color: "#FF8FA3",
    icon: Droplet,
    bg: "bg-[#FF8FA3]/20", // Lighter for the header icon
    overview: {
      whatHappens:
        "Menstrual bleeding occurs, and the uterine lining is shed. You may experience cramps, fatigue, headache, bloating and body discomfort. Experiences vary between women.",
      duration: "This is the phase when you experience menstrual bleeding.",
      image: require("../../../../assets/images/explore/menstrual_phase_illustration.jpg"),
    },
    food: {
      keyNutrient: "Iron",
      description:
        "Iron helps replenish what is lost during menstrual bleeding.",
      vegetarian: [
        "Leafy greens (spinach, methi, etc.)",
        "Dal, chana, rajma",
        "Pulses",
        "Sesame seeds",
        "Nuts and dry fruits",
      ],
      nonVegetarian: ["Meat", "Fish", "Chicken", "Eggs"],
      note: "Including vitamin C rich foods (like amla, citrus fruits, guava) can help with iron absorption from plant-based foods.",
    },
    activity: {
      options: [
        { title: "Gentle walking", icon: "🚶‍♀️" },
        { title: "Light stretching", icon: "🤸‍♀️" },
        { title: "Gentle yoga", icon: "🧘‍♀️" },
        { title: "Rest when required", icon: "🛌" },
      ],
      yoga: [
        { title: "Balasana\n(Child's Pose)", icon: "🙇‍♀️" },
        { title: "Cat-Cow", icon: "🐈" },
        { title: "Supta Baddha\nKonasana", icon: "🧘‍♀️" },
        { title: "Gentle Supine\nTwist", icon: "🥨" },
        { title: "Shavasana", icon: "🛌" },
      ],
      breathing: [
        { title: "Slow diaphragmatic\nbreathing", icon: "😮‍💨" },
        { title: "Nadi Shodhana", icon: "🌬️" },
        { title: "Gentle relaxation\nbreathing", icon: "😌" },
      ],
    },
  },
  // Placeholders for other phases
  follicular: {
    title: "Follicular Phase",
    subtitle: "After your period",
    color: "#A7E3A1",
    icon: Leaf,
    bg: "bg-[#A7E3A1]/20",
    overview: {
      whatHappens:
        "This phase follows the beginning of menstruation and continues towards ovulation. Ovarian follicles develop and hormonal changes occur. Some women may notice increasing energy as the phase progresses.",
      duration:
        "This phase occurs after menstruation and continues until ovulation. The duration varies.",
      image: require("../../../../assets/images/explore/menstrual_phase_illustration.jpg"),
    },
    food: {
      keyNutrient: "Protein & Whole Grains",
      description:
        "Focus on a balanced diet containing Protein, Whole grains, Millets, Pulses, Vegetables, Fruits, Nuts, Seeds, Healthy fats, and adequate fluids.",
      vegetarian: [
        "Dal & Chana",
        "Rajma",
        "Paneer & Curd",
        "Ragi & Jowar",
        "Oats & Wheat",
        "Flax/Chia Seeds",
      ],
      nonVegetarian: ["Eggs", "Fish", "Chicken"],
      note: "Include Vitamin-C rich foods to help absorb plant-based iron.",
    },
    activity: {
      options: [
        { title: "Walking", icon: "🚶‍♀️" },
        { title: "Strength", icon: "🏋️‍♀️" },
        { title: "Aerobics", icon: "🏃‍♀️" },
        { title: "Dancing", icon: "💃" },
      ],
      yoga: [
        { title: "Surya Namaskar", icon: "🌞" },
        { title: "Warrior I & II", icon: "🧘‍♀️" },
        { title: "Trikonasana", icon: "📐" },
        { title: "Vrikshasana", icon: "🌳" },
        { title: "Setu Bandhasana", icon: "🌉" },
      ],
      breathing: [
        { title: "Nadi Shodhana", icon: "🌬️" },
        { title: "Bhramari", icon: "🐝" },
        { title: "Slow breathing", icon: "😮‍💨" },
      ],
    },
  },
  ovulation: {
    title: "Ovulation Phase",
    subtitle: "Middle of cycle",
    color: "#F9E076",
    icon: Sun,
    bg: "bg-[#F9E076]/20",
    overview: {
      whatHappens:
        "Ovulation is the release of a mature egg. It generally occurs around the middle of an individual cycle. Timing varies between women and between cycles.",
      duration:
        "Ovulation occurs around the middle of your individual cycle. Its timing can vary.",
      image: require("../../../../assets/images/explore/menstrual_phase_illustration.jpg"),
    },
    food: {
      keyNutrient: "Balanced Nutrition",
      description:
        "There is no requirement for a special 'ovulation diet.' Focus on balanced nutrition.",
      vegetarian: [
        "Whole grains",
        "Fruits & Veggies",
        "Nuts & Seeds",
        "Legumes",
      ],
      nonVegetarian: ["Lean Meats", "Fish", "Eggs"],
      note: "Ensure you are drinking adequate hydration throughout the day.",
    },
    activity: {
      options: [
        { title: "Jogging", icon: "🏃‍♀️" },
        { title: "Cycling", icon: "🚴‍♀️" },
        { title: "Strength", icon: "🏋️‍♀️" },
        { title: "Sports", icon: "🎾" },
      ],
      yoga: [
        { title: "Surya Namaskar", icon: "🌞" },
        { title: "Warrior poses", icon: "🧘‍♀️" },
        { title: "Trikonasana", icon: "📐" },
        { title: "Utkatasana", icon: "🪑" },
      ],
      breathing: [
        { title: "Nadi Shodhana", icon: "🌬️" },
        { title: "Bhramari", icon: "🐝" },
        { title: "Slow breathing", icon: "😮‍💨" },
      ],
    },
  },
  luteal: {
    title: "Luteal Phase",
    subtitle: "After ovulation",
    color: "#CBA6F7",
    icon: Moon,
    bg: "bg-[#CBA6F7]/20",
    overview: {
      whatHappens:
        "This phase occurs after ovulation. It continues until the next menstrual bleeding begins. Some women experience physical, emotional or behavioural changes (PMS) during this phase like bloating or fatigue.",
      duration:
        "This phase occurs after ovulation and ends when your next menstrual bleeding begins.",
      image: require("../../../../assets/images/explore/menstrual_phase_illustration.jpg"),
    },
    food: {
      keyNutrient: "Calcium & Vitamin D",
      description:
        "You may want to include calcium-rich foods and ensure you get enough Vitamin D.",
      vegetarian: ["Milk & Curd", "Paneer", "Ragi & Sesame", "Leafy Greens"],
      nonVegetarian: ["Egg Yolk", "Fatty Fish"],
      note: "Sunlight is also a great source of Vitamin D during this phase.",
    },
    activity: {
      options: [
        { title: "Gentle Walking", icon: "🚶‍♀️" },
        { title: "Stretching", icon: "🧘‍♀️" },
        { title: "Gentle Yoga", icon: "🌿" },
        { title: "Rest", icon: "🛌" },
      ],
      yoga: [
        { title: "Balasana", icon: "👶" },
        { title: "Cat–Cow", icon: "🐈" },
        { title: "Spinal twist", icon: "🥨" },
        { title: "Viparita Karani", icon: "🦵" },
        { title: "Shavasana", icon: "🧘‍♀️" },
      ],
      breathing: [
        { title: "Nadi Shodhana", icon: "🌬️" },
        { title: "Bhramari", icon: "🐝" },
        { title: "Diaphragmatic", icon: "😮‍💨" },
      ],
    },
  },
};

export default function PhaseDetailScreen() {
  const { phase } = useLocalSearchParams<{ phase: string }>();
  const [activeTab, setActiveTab] = useState<PhaseTab>("overview");

  const data =
    (phaseContent as any)[phase || "menstrual"] || phaseContent.menstrual;
  const Icon = data.icon;

  // Render the specific tab content inside the large white container
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <View className="px-5 pt-6 pb-10">
            <Text className="text-[#1E293B] font-bold text-[18px] mb-3">
              What happens?
            </Text>
            <Text className="text-[#475569] text-[15px] leading-[22px] mb-8">
              {data.overview.whatHappens}
            </Text>

            {data.overview.image && (
              <View className="items-center mb-8">
                <Image
                  source={data.overview.image}
                  className="w-full h-[220px]"
                  resizeMode="contain"
                />
              </View>
            )}

            <Text className="text-[#1E293B] font-bold text-[18px] mb-4">
              How long does it last?
            </Text>
            <View className="bg-[#F8FAFC] rounded-[16px] p-4 flex-row items-center border border-[#F1F5F9]">
              <View className="bg-white p-3 rounded-[12px] shadow-sm mr-4 border border-[#F1F5F9]">
                <Calendar color="#F43F5E" size={24} />
              </View>
              <Text className="text-[#475569] text-[14px] leading-[20px] flex-1">
                {data.overview.duration}
              </Text>
            </View>
          </View>
        );

      case "food":
        return (
          <View className="px-5 pt-6 pb-10">
            <View className="bg-white rounded-[24px] mb-8">
              <View className="flex-row items-center mb-6 pt-2 justify-center">
                <View
                  className={`w-10 h-10 rounded-[12px] ${data.bg} items-center justify-center mr-3`}
                >
                  <Leaf color={data.color} size={20} />
                </View>
                <View>
                  <Text className="text-[#475569] text-[13px] font-bold mb-1">
                    Key Nutrient to Focus On
                  </Text>
                  <Text className="text-[#1E293B] text-[28px] font-bold">
                    {data.food.keyNutrient}
                  </Text>
                </View>
              </View>

              <Text className="text-[#475569] text-[15px] leading-[22px] text-center mb-6">
                {data.food.description}
              </Text>
            </View>

            <Text className="text-[#1E293B] font-bold text-[18px] mb-4">
              Food Sources
            </Text>

            {/* Split Vegetarian / Non-Vegetarian Box */}
            <View className="flex-row rounded-[16px] overflow-hidden mb-8 border border-[#F1F5F9]">
              <View className="flex-1 bg-[#F0FDF4] p-4">
                <Text className="text-[#166534] font-bold text-[15px] mb-4">
                  Vegetarian
                </Text>
                {data.food.vegetarian.map((item: string, i: number) => (
                  <View key={i} className="flex-row items-start mb-3">
                    <View className="w-1.5 h-1.5 rounded-full bg-[#166534] mt-2 mr-2" />
                    <Text className="text-[#1E293B] text-[14px] leading-[20px] flex-1">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex-1 bg-[#FEF2F2] p-4">
                <Text className="text-[#991B1B] font-bold text-[15px] mb-4">
                  Non-Vegetarian
                </Text>
                {data.food.nonVegetarian.map((item: string, i: number) => (
                  <View key={i} className="flex-row items-start mb-3">
                    <View className="w-1.5 h-1.5 rounded-full bg-[#991B1B] mt-2 mr-2" />
                    <Text className="text-[#1E293B] text-[14px] leading-[20px] flex-1">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Note Box */}
            <View className="bg-[#FEF9C3] rounded-[16px] p-4 flex-row items-start border border-[#FEF08A]">
              <Text className="text-[20px] mr-3">💡</Text>
              <Text className="text-[#854D0E] text-[14px] leading-[22px] flex-1 font-medium">
                {data.food.note}
              </Text>
            </View>
          </View>
        );

      case "activity":
        return (
          <View className="px-5 pt-6 pb-10">
            <Text className="text-[#1E293B] font-bold text-[18px] mb-4">
              Activity Options
            </Text>
            <View className="mb-8 pl-2">
              {data.activity.options.map((opt: any, i: number) => (
                <View key={i} className="flex-row items-center py-2">
                  <Text className="text-[22px] w-10 text-center mr-2">
                    {opt.icon}
                  </Text>
                  <Text className="text-[#475569] text-[15px]">
                    {opt.title}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-[#1E293B] font-bold text-[18px] mb-4">
              Yoga Asanas
            </Text>
            <View className="flex-row flex-wrap justify-between mb-8">
              {data.activity.yoga.map((asana: any, i: number) => (
                <View
                  key={i}
                  className="w-[48%] bg-[#F8FAFC] rounded-[16px] p-4 items-center mb-3 border border-[#F1F5F9]"
                >
                  <Text className="text-[32px] mb-3">{asana.icon}</Text>
                  <Text className="text-[#475569] text-[13px] text-center font-medium leading-[18px]">
                    {asana.title}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-[#1E293B] font-bold text-[18px] mb-4">
              Breathing Practices
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {data.activity.breathing.map((breath: any, i: number) => (
                <View
                  key={i}
                  className="w-[31%] bg-[#F8FAFC] rounded-[16px] p-3 items-center border border-[#F1F5F9]"
                >
                  <Text className="text-[24px] mb-3">{breath.icon}</Text>
                  <Text className="text-[#475569] text-[11px] text-center font-medium leading-[14px]">
                    {breath.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <DarkScreen
      scroll={false}
      header={
        <View>
          <View className="pt-2 pb-2 relative flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 justify-center pl-5 z-10 absolute left-0"
            >
              <ChevronLeft color="#FFFFFF" size={28} />
            </TouchableOpacity>

            <View className="flex-row items-center justify-center mt-2 mb-4">
              <View className="mr-3">
                <View className="items-center justify-center relative">
                  <View className="w-8 h-10 absolute bottom-0 left-0 right-0 items-center justify-end">
                    <Icon color={data.color} size={40} fill={data.color} />
                  </View>
                  <View className="w-10 h-10" />
                </View>
              </View>
              <View>
                <Text className="text-white font-bold text-[18px] mb-0.5">
                  {data.title}
                </Text>
                <Text className="text-[#8B9CBE] text-[13px]">
                  {data.subtitle}
                </Text>
              </View>
            </View>
          </View>
          <PhaseTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      }
    >
      {/* Large white container holding the entire content for the tab */}
      <ScrollView
        className="flex-1 bg-[#FDFDFD] rounded-t-[32px] mt-2"
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </DarkScreen>
  );
}
