import { Heart, Users, MessageCircle, Star } from "lucide-react-native";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function RelationshipsScreen() {
  return (
    <ExploreLayout
      title="Relationships & Social Life"
      subtitle="Stronger connections for a healthier you."
      imageSource={require("../../../assets/images/explore/relationships.jpg")}
    >
      <ExploreMenuItem
        icon={Heart}
        title="Partner Relationship"
        subtitle="Communication, intimacy and more"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={Users}
        title="Family & Friends"
        subtitle="Navigate your support system"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={MessageCircle}
        title="Social Life"
        subtitle="Balance, boundaries and well-being"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={Star}
        title="Self-Confidence"
        subtitle="Because you matter too."
        onPress={() => {}}
      />
    </ExploreLayout>
  );
}
