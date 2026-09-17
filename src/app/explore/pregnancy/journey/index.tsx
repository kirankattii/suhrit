import { 
  Apple, 
  Activity, 
  ClipboardList, 
  Baby, 
  Heart, 
  UserRound, 
  AlertTriangle,
  ChevronRight
} from "lucide-react-native";
import { router } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

interface MenuItemProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconBgColor: string;
  iconColor: string;
}

function CustomMenuItem({ icon: Icon, title, subtitle, onPress, iconBgColor, iconColor }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-[24px] p-4 mb-4 flex-row items-center shadow-sm border border-[#F0F4F8]"
    >
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mr-4" 
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon color={iconColor} size={24} strokeWidth={2.5} />
      </View>
      <View className="flex-1">
        <Text className="text-suhrhit-primary font-bold text-[15px] mb-1">{title}</Text>
        <Text className="text-suhrhit-secondary text-[13px] leading-[18px] pr-2">{subtitle}</Text>
      </View>
      <ChevronRight color="#CBD5E1" size={20} strokeWidth={2.5} />
    </TouchableOpacity>
  );
}

export default function PregnancyJourneyHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Custom Header matching the mockup */}
        <LinearGradient
          colors={['#E6F0FA', '#FAFCFF']}
          className="px-6 pt-10 pb-8 flex-row"
        >
          <View className="flex-1 justify-center z-10 pt-4">
            <Text className="text-suhrhit-primary font-bold text-[32px] leading-[36px]" style={{ fontFamily: 'Georgia' }}>
              Your{'\n'}Pregnancy{'\n'}Journey <Text className="text-[20px]">💖</Text>
            </Text>
            <Text className="text-suhrhit-secondary text-[13px] leading-[18px] mt-3 max-w-[180px]">
              Support for you today, a brighter tomorrow for your little one.
            </Text>
          </View>
          <View className="absolute right-0 bottom-0 w-[180px] h-[220px]">
            <Image 
              source={require("../../../../assets/images/pregnancy_journey/home_hero.jpg")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View className="px-5 pt-2">
          <CustomMenuItem
            icon={Apple}
            title="Care for You & Your Baby"
            subtitle="Nutrition, hydration and safe choices"
            onPress={() => router.push("/explore/pregnancy/journey/nutrition")}
            iconBgColor="#FFEAE5"
            iconColor="#FF6B6B"
          />
          <CustomMenuItem
            icon={Activity}
            title="Movement & Mindfulness"
            subtitle="Stay active, stay calm"
            onPress={() => router.push("/explore/pregnancy/journey/movement")}
            iconBgColor="#E6F0FA"
            iconColor="#3366CC"
          />
          <CustomMenuItem
            icon={ClipboardList}
            title="My Pregnancy Checklist"
            subtitle="Keep track of your care"
            onPress={() => router.push("/explore/pregnancy/journey/checklist")}
            iconBgColor="#F3E8FF"
            iconColor="#A855F7"
          />
          <CustomMenuItem
            icon={Baby}
            title="Your Baby's Journey"
            subtitle="Discover how your baby grows"
            onPress={() => router.push("/explore/pregnancy/journey/baby")}
            iconBgColor="#E0F2FE"
            iconColor="#0EA5E9"
          />
          <CustomMenuItem
            icon={Heart}
            title="My Baby's Little Moments"
            subtitle="Save your special memories"
            onPress={() => router.push("/explore/pregnancy/journey/moments")}
            iconBgColor="#FCE7F3"
            iconColor="#EC4899"
          />
          <CustomMenuItem
            icon={UserRound}
            title="Body Changes & Self-Image"
            subtitle="Understand and feel good"
            onPress={() => router.push("/explore/pregnancy/journey/body-changes")}
            iconBgColor="#EDE9FE"
            iconColor="#8B5CF6"
          />
          <CustomMenuItem
            icon={AlertTriangle}
            title="When Something Doesn't Feel Right"
            subtitle="Know the warning signs"
            onPress={() => router.push("/explore/pregnancy/journey/safety")}
            iconBgColor="#FEE2E2"
            iconColor="#DC2626"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
