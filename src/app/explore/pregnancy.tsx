import { Flower2, Droplet, Heart, Book } from "lucide-react-native";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function PregnancyScreen() {
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
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={Droplet}
        title="During Pregnancy"
        subtitle="Track, learn and feel supported"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={Heart}
        title="Postpartum"
        subtitle="Your recovery matters"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={Book}
        title="Resources"
        subtitle="Evidence-based information"
        onPress={() => {}}
      />
    </ExploreLayout>
  );
}
