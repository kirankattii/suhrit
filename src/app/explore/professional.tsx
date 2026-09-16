import { UserRound, HelpCircle, HeartPulse, ShieldAlert } from "lucide-react-native";
import { router } from "expo-router";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function ProfessionalScreen() {
  const navigateToDetail = (title: string, subtitle: string) => {
    router.push(`/explore/detail?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&category=Professional Support`);
  };

  return (
    <ExploreLayout
      title="Professional Support"
      subtitle="Because it's okay to seek support."
      imageSource={require("../../../assets/images/explore/professional.jpg")}
    >
      <ExploreMenuItem
        icon={UserRound}
        title="Find a Professional"
        subtitle="Doctors, counsellors and specialists"
        onPress={() => navigateToDetail("Find a Professional", "Doctors, counsellors and specialists")}
      />
      <ExploreMenuItem
        icon={HelpCircle}
        title="When to Seek Help"
        subtitle="Know the signs"
        onPress={() => navigateToDetail("When to Seek Help", "Know the signs")}
      />
      <ExploreMenuItem
        icon={HeartPulse}
        title="Mental Health Support"
        subtitle="You're not alone"
        onPress={() => navigateToDetail("Mental Health Support", "You're not alone")}
      />
      <ExploreMenuItem
        icon={ShieldAlert}
        title="Emergency Resources"
        subtitle="Important contacts"
        onPress={() => navigateToDetail("Emergency Resources", "Important contacts")}
      />
    </ExploreLayout>
  );
}
