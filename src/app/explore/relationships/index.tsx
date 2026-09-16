import { router } from "expo-router";
import { 
  ChevronLeft, 
  Users, 
  Heart, 
  Home as FamilyHome,
  CheckCircle2,
  ChevronRight
} from "lucide-react-native";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RelationshipsSectionHome() {
  return (
    <SafeAreaView className="flex-1 bg-suhrhit-surface" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-2 flex-row items-center bg-suhrhit-surface z-10 border-b border-suhrhit-border/20">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-start justify-center">
          <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View className="mb-8 mt-2">
          <View className="w-14 h-14 rounded-full bg-suhrhit-background items-center justify-center mb-4">
            <Users color="#183059" size={28} strokeWidth={2} />
          </View>
          <Text className="text-suhrhit-primary text-[28px] leading-[34px] font-bold mb-3" style={{ fontFamily: 'Georgia' }}>
            Relationship &{"\n"}Social Life
          </Text>
          <Text className="text-suhrhit-primary/70 text-[15px] leading-[22px]">
            Build stronger connections, feel supported, and take care of your emotional well-being.
          </Text>
        </View>

        {/* Social Support Assessment Card */}
        <TouchableOpacity 
          onPress={() => router.push("/explore/relationships/mspss")}
          className="bg-white border border-suhrhit-border/50 rounded-[24px] p-5 mb-10 flex-row items-center justify-between"
          style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 3 }}
        >
          <View className="flex-1 mr-4">
            <View className="flex-row items-center mb-2">
              <Users color="#7293B3" size={20} className="mr-2" />
              <Text className="text-suhrhit-primary font-bold text-[16px]">Social Support Assessment</Text>
            </View>
            <Text className="text-suhrhit-primary/60 text-[13px] ml-7">(Perceived Social Support Scale)</Text>
          </View>
          <ChevronRight color="#A6B9C7" size={20} />
        </TouchableOpacity>

        {/* Explore More Section */}
        <Text className="text-suhrhit-primary font-bold text-[18px] mb-5">Explore more</Text>

        {/* Category Cards */}
        <CategoryCard 
          icon={<Heart color="#D35F5F" size={24} />}
          title="Romantic Relationship"
          subtitle="Understand your relationship satisfaction and needs"
          onPress={() => router.push("/explore/relationships/romantic")}
        />
        
        <CategoryCard 
          icon={<FamilyHome color="#7293B3" size={24} />}
          title="Family"
          subtitle="Explore your family dynamics and support"
          onPress={() => router.push("/explore/relationships/family")}
        />
        
        <CategoryCard 
          icon={<Users color="#7293B3" size={24} />}
          title="Friends"
          subtitle="Assess your friendships and social connections"
          onPress={() => router.push("/explore/relationships/friends")}
        />
        
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryCard({ icon, title, subtitle, onPress }: { icon: React.ReactNode, title: string, subtitle: string, onPress: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white border border-suhrhit-border/40 rounded-[20px] p-4 mb-4 flex-row items-center"
      style={{ shadowColor: "#183059", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 }}
    >
      <View className="w-12 h-12 rounded-full bg-[#F5F9FF] items-center justify-center mr-4 border border-[#E6F0FA]">
        {icon}
      </View>
      <View className="flex-1 mr-2">
        <Text className="text-suhrhit-primary font-bold text-[16px] mb-1">{title}</Text>
        <Text className="text-suhrhit-primary/70 text-[13px] leading-[18px]">{subtitle}</Text>
      </View>
      <ChevronRight color="#A6B9C7" size={20} />
    </TouchableOpacity>
  );
}
