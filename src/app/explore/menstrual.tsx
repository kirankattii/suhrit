import { Calendar, BarChart2, BookOpen, MapPin } from "lucide-react-native";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function MenstrualScreen() {
  return (
    <ExploreLayout
      title="Menstrual Well-being"
      subtitle={"Understand your cycle.\nSupport your body."}
      imageSource={require("../../../assets/images/explore/menstrual.jpg")}
    >
      <ExploreMenuItem
        icon={Calendar}
        title="Cycle Tracking"
        subtitle="Log your period and symptoms"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={BarChart2}
        title="Symptoms & Patterns"
        subtitle="Identify trends and get insights"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={BookOpen}
        title="Cycle Education"
        subtitle="Learn about your menstrual health"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={MapPin}
        title="Personalised Tips"
        subtitle="Just for you."
        onPress={() => {}}
      />
    </ExploreLayout>
  );
}
