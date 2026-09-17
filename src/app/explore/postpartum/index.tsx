import { 
  Apple, 
  Users, 
  ClipboardList, 
  Baby, 
  Shield, 
  Star, 
  UserRound, 
  Heart,
  AlertCircle,
  ChevronRight
} from "lucide-react-native";
import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

import ExploreLayout, { ExploreMenuItem } from "../../../components/ExploreLayout";

export default function PostpartumHomeScreen() {
  return (
    <ExploreLayout
      title="Postpartum Journey"
      subtitle="A new chapter for you and your baby. Keep track of your recovery, important health needs and the little moments along the way."
      imageSource={require("../../../assets/images/explore/postpartum/home.jpg")}
    >
      <ExploreMenuItem
        icon={Apple}
        title="Nutrition & Recovery"
        subtitle="Nourish yourself, recover gently"
        onPress={() => router.push("/explore/postpartum/nutrition")}
      />
      <ExploreMenuItem
        icon={Users}
        title="Partner & First Circle"
        subtitle="You don't have to do it alone"
        onPress={() => router.push("/explore/postpartum/partner")}
      />
      <ExploreMenuItem
        icon={ClipboardList}
        title="My Postpartum Check"
        subtitle="Postpartum health checklist"
        onPress={() => router.push("/explore/postpartum/check")}
      />
      <ExploreMenuItem
        icon={Baby}
        title="My Baby's Health"
        subtitle="Track birth info and growth"
        onPress={() => router.push("/explore/postpartum/baby")}
      />
      <ExploreMenuItem
        icon={Shield}
        title="Vaccination Tracker"
        subtitle="Vaccination journey to 24 months"
        onPress={() => router.push("/explore/postpartum/vaccination")}
      />
      <ExploreMenuItem
        icon={Star}
        title="Baby's Little Moments"
        subtitle="Track developmental milestones"
        onPress={() => router.push("/explore/postpartum/milestones")}
      />
      <ExploreMenuItem
        icon={UserRound}
        title="Body Changes & Self-Image"
        subtitle="Your body is healing"
        onPress={() => router.push("/explore/postpartum/body-changes")}
      />
      <ExploreMenuItem
        icon={Heart}
        title="Emotional Well-being"
        subtitle="It's okay to feel more than one thing"
        onPress={() => router.push("/explore/postpartum/emotional")}
      />

      {/* Something Doesn't Feel Right Card */}
      <TouchableOpacity 
        onPress={() => router.push("/explore/postpartum/support")}
        className="bg-[#FFF0F0] rounded-[24px] p-5 mt-4 mb-8 flex-row items-center border border-[#FFE0E0]"
        style={{ shadowColor: "#FF0000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
      >
        <View className="bg-white w-12 h-12 rounded-full items-center justify-center mr-4 shadow-sm">
          <AlertCircle color="#E53935" size={24} strokeWidth={2.5} />
        </View>
        <View className="flex-1">
          <Text className="text-[#D32F2F] font-bold text-[15px]">Something Doesn't Feel Right?</Text>
          <Text className="text-[#D32F2F]/80 text-[13px] mt-0.5">Get Professional Support</Text>
        </View>
        <ChevronRight color="#E53935" size={20} strokeWidth={2.5} />
      </TouchableOpacity>

      {/* Disclaimer */}
      <Text className="text-suhrhit-secondary/70 text-[11px] text-center mb-8 px-2 leading-[16px]">
        SUHRIT provides general educational information and personal tracking tools. It is not a substitute for medical diagnosis, treatment or professional advice. Individual experiences during the postpartum period can vary. Please consult a qualified healthcare professional for personalised guidance or whenever you have concerns about yourself or your baby.
      </Text>
    </ExploreLayout>
  );
}
