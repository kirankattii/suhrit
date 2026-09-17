import { router, usePathname } from "expo-router";
import { Home, Sprout, BookOpen, UserRound, Gamepad2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const isHome = pathname === "/home" || pathname.startsWith("/explore");
  const isInsights = pathname === "/progress" || pathname === "/assessment" || pathname === "/check-in";
  const isGames = pathname.startsWith("/games");
  const isResources = pathname === "/resources";
  const isProfile = pathname === "/profile";

  return (
    <View 
      className="flex-row items-center justify-between bg-white px-6 pt-4 border-t border-suhrhit-border/50" 
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <TouchableOpacity onPress={() => router.push("/home")} className="items-center">
        <Home color={isHome ? "#183059" : "#7293B3"} size={24} strokeWidth={isHome ? 2.5 : 2} />
        <Text className={`${isHome ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push("/progress")} className="items-center">
        <Sprout color={isInsights ? "#183059" : "#7293B3"} size={24} strokeWidth={isInsights ? 2.5 : 2} />
        <Text className={`${isInsights ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}>Progress</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push("/games")} className="items-center">
        <Gamepad2 color={isGames ? "#183059" : "#7293B3"} size={24} strokeWidth={isGames ? 2.5 : 2} />
        <Text className={`${isGames ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}>Unwind</Text>
      </TouchableOpacity>
      

      <TouchableOpacity className="items-center" onPress={() => router.push("/profile?edit=true")}>
        <UserRound color={isProfile ? "#183059" : "#7293B3"} size={24} strokeWidth={isProfile ? 2.5 : 2} />
        <Text className={`${isProfile ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
