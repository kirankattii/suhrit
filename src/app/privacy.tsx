import { router } from "expo-router";
import { ChevronLeft, Heart, Leaf, Lock, ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { saveConsent } from "../storage/onboarding";

export default function PrivacyScreen() {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!accepted || loading) return;

    try {
      setLoading(true);

      await saveConsent({
        accepted: true,
        version: "1.0",
        acceptedAt: new Date().toISOString(),
      });

      router.push("/profile");
    } catch (error) {
      console.error("Failed to save consent:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F0F5FA]"
      edges={["top", "bottom"]}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft color="#183059" size={28} />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[22px] font-semibold text-suhrhit-primary"
          style={{ fontFamily: "serif" }}
        >
          Terms & Conditions
        </Text>
        <View style={{ width: 44 }} /> {/* Balance header */}
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Leaf Icon */}
        <View className="items-center pb-6 pt-2">
          <Leaf color="#183059" size={32} />
        </View>

        {/* White Card */}
        <View className="flex-1 rounded-t-[40px] bg-white px-6 pt-8 pb-6 shadow-sm">
          <Text
            className="text-[28px] text-suhrhit-primary"
            style={{ fontFamily: "serif" }}
          >
            Welcome to Suhrit
          </Text>
          <Text className="mt-2 text-[16px] leading-[24px] text-[#4A5568]">
            By using this app, you agree to the following terms and conditions.
          </Text>

          <View className="mt-8" style={{ gap: 32 }}>
            {/* Item 1 */}
            <View className="flex-row">
              <View className="mt-1">
                <ShieldCheck color="#183059" size={32} />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  className="text-[18px] font-semibold text-suhrhit-primary"
                  style={{ fontFamily: "serif" }}
                >
                  Your Information
                </Text>
                <Text className="mt-1 text-[15px] leading-[22px] text-suhrhit-primary">
                  We collect and use your information to provide personalised insights and a better experience.
                </Text>
              </View>
            </View>

            {/* Item 2 */}
            <View className="flex-row">
              <View className="mt-1">
                <Lock color="#183059" size={32} />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  className="text-[18px] font-semibold text-suhrhit-primary"
                  style={{ fontFamily: "serif" }}
                >
                  Your Privacy
                </Text>
                <Text className="mt-1 text-[15px] leading-[22px] text-suhrhit-primary">
                  Your privacy matters. We follow strict security measures to keep your data safe.
                </Text>
              </View>
            </View>

            {/* Item 3 */}
            <View className="flex-row">
              <View className="mt-1">
                <Heart color="#183059" size={32} />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  className="text-[18px] font-semibold text-suhrhit-primary"
                  style={{ fontFamily: "serif" }}
                >
                  Responsible Use
                </Text>
                <Text className="mt-1 text-[15px] leading-[22px] text-suhrhit-primary">
                  Suhrit is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis or treatment.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Section */}
      <View className="bg-white px-6 pb-8 pt-2">
        <View className="mb-6 mt-2">
          <Checkbox
            checked={accepted}
            onPress={() => setAccepted(!accepted)}
          >
            I have read and agree to the Terms and Conditions and Privacy Policy.
          </Checkbox>
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!accepted}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}