import { Flower2, Droplet, Heart, Book } from "lucide-react-native";
import { router } from "expo-router";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function PregnancyScreen() {
  const navigateToDetail = (title: string, subtitle: string) => {
    router.push(`/explore/detail?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&category=Pregnancy & Postpartum`);
  };

  return (
    <ExploreLayout
      title="Pregnancy & Postpartum"
      subtitle={"Support, information and care\nthrough your motherhood journey."}
      imageSource={require("../../../assets/images/explore/pregnancy.jpg")}
    >
      <ExploreMenuItem
        icon={Flower2}
        title="Preconception"
        subtitle="Plan and prepare"
        onPress={() => navigateToDetail("Preconception", "Plan and prepare")}
      />
      <ExploreMenuItem
        icon={Droplet}
        title="During Pregnancy"
        subtitle="Track, learn and feel supported"
        onPress={() => navigateToDetail("During Pregnancy", "Track, learn and feel supported")}
      />
      <ExploreMenuItem
        icon={Heart}
        title="Postpartum"
        subtitle="Your recovery matters"
        onPress={() => navigateToDetail("Postpartum", "Your recovery matters")}
      />
      <ExploreMenuItem
        icon={Book}
        title="Resources"
        subtitle="Evidence-based information"
        onPress={() => navigateToDetail("Resources", "Evidence-based information")}
      />
    </ExploreLayout>
  );
}
