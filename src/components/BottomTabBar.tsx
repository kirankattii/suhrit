import { router, usePathname } from "expo-router";
import { Home, Sprout, BookOpen, UserRound } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const isHome = pathname === "/home" || pathname.startsWith("/explore");
  const isInsights = pathname === "/progress" || pathname === "/assessment" || pathname === "/check-in";
  const isResources = pathname === "/resources";
  const isProfile = pathname === "/profile";

  return (
    <View 
      className="flex-row items-center justify-between bg-white px-8 pt-4 border-t border-suhrhit-border/50" 
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <TouchableOpacity onPress={() => router.push("/home")} className="items-center">
        <Home color={isHome ? "#173F35" : "#8BAF9F"} size={24} strokeWidth={isHome ? 2.5 : 2} />
        <Text className={`${isHome ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[11px] mt-1`}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push("/progress")} className="items-center">
        <Sprout color={isInsights ? "#173F35" : "#8BAF9F"} size={24} strokeWidth={isInsights ? 2.5 : 2} />
        <Text className={`${isInsights ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[11px] mt-1`}>Insights</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <BookOpen color={isResources ? "#173F35" : "#8BAF9F"} size={24} strokeWidth={isResources ? 2.5 : 2} />
        <Text className={`${isResources ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[11px] mt-1`}>Resources</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center" onPress={() => router.push("/profile?edit=true")}>
        <UserRound color={isProfile ? "#173F35" : "#8BAF9F"} size={24} strokeWidth={isProfile ? 2.5 : 2} />
        <Text className={`${isProfile ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[11px] mt-1`}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
