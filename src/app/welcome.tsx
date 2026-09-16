import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/suhrit/getstarted.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <StatusBar style="light" />
      
      {/* Top Section */}
      <View className="mt-32 items-center px-6">
        <Text className="text-[52px] text-white" style={{ fontFamily: "serif" }}>
          Suhrit
        </Text>
        <Text className="mt-2 text-[18px] text-white/90">
          More than a tracker.
        </Text>
      </View>

      {/* Bottom Section */}
      <View className="flex-1 justify-end px-6 pb-12">
        <View className="mb-12">
          <Text className="text-[26px] leading-[36px] text-white/90" style={{ fontFamily: "serif" }}>
            A{"\n"}kinder{"\n"}space{"\n"}for every{"\n"}phase of you.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/privacy")}
          className="mb-8 flex-row items-center justify-center rounded-[30px] bg-white/20 py-4"
          style={{
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.3)",
          }}
        >
          <Text className="mr-2 text-[18px] font-medium text-white">Get Started</Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}