import { Flower2, Droplet, Heart } from "lucide-react-native";
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
        onPress={() => router.push("/explore/pregnancy/preconception")}
      />
      <ExploreMenuItem
        icon={Droplet}
        title="Pregnancy Journey"
        subtitle="Track, learn and feel supported"
        onPress={() => router.push("/explore/pregnancy/journey")}
      />
      <ExploreMenuItem
        icon={Heart}
        title="Postpartum"
        subtitle="Your recovery matters"
        onPress={() => router.push("/explore/postpartum")}
      />
    </ExploreLayout>
  );
}
