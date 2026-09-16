import { Calendar, BarChart2, BookOpen, MapPin } from "lucide-react-native";
import { router } from "expo-router";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function MenstrualScreen() {
  const navigateToDetail = (title: string, subtitle: string) => {
    router.push(`/explore/detail?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&category=Menstrual Well-being`);
  };

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
        onPress={() => navigateToDetail("Cycle Tracking", "Log your period and symptoms")}
      />
      <ExploreMenuItem
        icon={BarChart2}
        title="Symptoms & Patterns"
        subtitle="Identify trends and get insights"
        onPress={() => navigateToDetail("Symptoms & Patterns", "Identify trends and get insights")}
      />
      <ExploreMenuItem
        icon={BookOpen}
        title="Cycle Education"
        subtitle="Learn about your menstrual health"
        onPress={() => navigateToDetail("Cycle Education", "Learn about your menstrual health")}
      />
      <ExploreMenuItem
        icon={MapPin}
        title="Personalised Tips"
        subtitle="Just for you."
        onPress={() => navigateToDetail("Personalised Tips", "Just for you.")}
      />
    </ExploreLayout>
  );
}
