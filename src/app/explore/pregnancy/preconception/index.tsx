import { router } from "expo-router";
import { Users, ClipboardList, Lightbulb, Map } from "lucide-react-native";
import ExploreLayout, { ExploreMenuItem } from "../../../../components/ExploreLayout";

export default function PreconceptionMenuScreen() {
  return (
    <ExploreLayout
      title="Preconception"
      subtitle={"Small steps today can help you and\nyour partner prepare for a healthier\ntomorrow."}
      imageSource={require("../../../../assets/images/explore/preconception_home.jpg")}
    >
      <ExploreMenuItem
        icon={Users}
        title="Prepare Together"
        subtitle="Learn about lifestyle, health, and more"
        onPress={() => router.push("/explore/pregnancy/preconception/prepare-together")}
      />
      <ExploreMenuItem
        icon={ClipboardList}
        title="Preconception Check-in"
        subtitle="Identify areas that may need attention"
        onPress={() => router.push("/explore/pregnancy/preconception/check-in")}
      />
      <ExploreMenuItem
        icon={Lightbulb}
        title="Your Areas to Consider"
        subtitle="Review your flagged check-in results"
        onPress={() => router.push("/explore/pregnancy/preconception/results")}
      />
      <ExploreMenuItem
        icon={Map}
        title="Preparing for Parenthood"
        subtitle="Reflect on this journey together"
        onPress={() => router.push("/explore/pregnancy/preconception/parenthood")}
      />
    </ExploreLayout>
  );
}
