import { router, usePathname } from "expo-router";
import { Bot, Gamepad2, Home, Sprout, UserRound } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const isHome = pathname === "/home" || pathname.startsWith("/explore");
  const isInsights =
    pathname === "/progress" ||
    pathname === "/assessment" ||
    pathname === "/check-in";
  const isGames = pathname.startsWith("/games");
  const isResources = pathname === "/resources";
  const isProfile = pathname === "/profile";

  const isChat = pathname === "/chat";

  return (
    <View
      className="flex-row items-center justify-between bg-white px-4 pt-4 border-t border-suhrhit-border/50"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      {[
        { label: "Home", route: "/home", icon: Home, active: isHome },
        {
          label: "Progress",
          route: "/progress",
          icon: Sprout,
          active: isInsights,
        },
        { label: "AI", route: "/chat", icon: Bot, active: isChat },
        { label: "Unwind", route: "/games", icon: Gamepad2, active: isGames },
        {
          label: "Profile",
          route: "/profile?edit=true",
          icon: UserRound,
          active: isProfile,
        },
      ].map((tab, index) => {
        const Icon = tab.icon;
        const isAI = tab.label === "AI";

        if (isAI) {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => router.push(tab.route as any)}
              className="items-center flex-1"
            >
              <View className="absolute -top-[24px] w-[50px] h-[50px] rounded-full items-center justify-center bg-suhrhit-primary">
                <Icon color="white" size={26} strokeWidth={2.5} />
              </View>
              <View className="h-[24px]" />
              <Text
                className={`${tab.active ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(tab.route as any)}
            className="items-center flex-1"
          >
            <Icon
              color={tab.active ? "#183059" : "#7293B3"}
              size={24}
              strokeWidth={tab.active ? 2.5 : 2}
            />
            <Text
              className={`${tab.active ? "text-suhrhit-primary font-bold" : "text-suhrhit-secondary font-medium"} text-[10px] mt-1`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
