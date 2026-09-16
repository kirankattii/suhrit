import { UserRound, HelpCircle, HeartPulse, ShieldAlert } from "lucide-react-native";

import ExploreLayout, { ExploreMenuItem } from "../../components/ExploreLayout";

export default function ProfessionalScreen() {
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
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={HelpCircle}
        title="When to Seek Help"
        subtitle="Know the signs"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={HeartPulse}
        title="Mental Health Support"
        subtitle="You're not alone"
        onPress={() => {}}
      />
      <ExploreMenuItem
        icon={ShieldAlert}
        title="Emergency Resources"
        subtitle="Important contacts"
        onPress={() => {}}
      />
    </ExploreLayout>
  );
}
