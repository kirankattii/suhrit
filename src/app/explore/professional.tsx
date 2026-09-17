import * as Linking from "expo-linking";
import { Mail, Phone, User } from "lucide-react-native";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import ExploreLayout from "../../components/ExploreLayout";

type Professional = {
  name: string;
  designation: string;
  practice?: string;
  email: string;
  phone?: string;
};

const PROFESSIONALS: Professional[] = [
  {
    name: "Ms Aditi H P",
    designation: "Consultant Psychologist & Dance Movement Therapist and Doctoral Candidate",
    practice: "Primarily providing online psychological consultations, including counselling & therapeutic support for concerns related to anxiety, relationships, emotional well-being and career development.",
    email: "aditihp.psy@gmail.com",
    phone: "+919590858055", // formatted for linking
  },
  {
    name: "Shraddha N",
    designation: "Consultant Psychologist",
    practice: "Currently taking pro-bono sessions.",
    email: "shraddhanmys@gmail.com",
    phone: "+919353442832",
  },
  {
    name: "Dr. Ginson George",
    designation: "Psychologist",
    email: "ginson@jssuni.edu.in",
  },
  {
    name: "Wani Rajendra",
    designation: "Counselling Psychologist",
    email: "Manaskara.healing@gmail.com",
  },
];

export default function ProfessionalSupportScreen() {
  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert("Error", "Could not open email client.");
    });
  };

  const handlePhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Error", "Could not open phone dialer.");
    });
  };

  return (
    <ExploreLayout
      title="Professional Support"
      subtitle="Reach out to our trusted network for guidance"
      imageSource={require("../../../assets/images/explore/professional.jpg")}
    >
      <View className="gap-y-4">
        {PROFESSIONALS.map((prof, index) => (
          <View 
            key={index} 
            className="bg-white rounded-3xl p-5 shadow-sm border border-[#F0F0F0]"
          >
            <View className="flex-row items-start mb-3">
              <View className="w-12 h-12 rounded-full bg-[#F4F6F9] items-center justify-center mr-4 border border-[#E2E8F0]">
                <User size={24} color="#64748B" />
              </View>
              <View className="flex-1 mt-1">
                <Text className="text-[#1A1A1A] font-bold text-[18px] mb-1">
                  {prof.name}
                </Text>
                <Text className="text-[#F59E0B] font-medium text-[13px] leading-[18px]">
                  {prof.designation}
                </Text>
              </View>
            </View>

            {prof.practice && (
              <View className="bg-[#FFFBEB] p-3 rounded-xl mb-4 border border-[#FEF3C7]">
                <Text className="text-[#92400E] text-[13px] leading-[18px]">
                  {prof.practice}
                </Text>
              </View>
            )}

            <View className="flex-row gap-x-3 mt-2">
              <TouchableOpacity 
                onPress={() => handleEmail(prof.email)}
                className="flex-1 flex-row items-center justify-center gap-x-3 bg-[#F8FAFC] py-3 rounded-xl border border-[#E2E8F0]"
              >
                <Mail size={16} color="#475569" />
                <Text className="text-[#475569] font-semibold text-[14px]">Email</Text>
              </TouchableOpacity>

              {prof.phone && (
                <TouchableOpacity 
                  onPress={() => handlePhone(prof.phone!)}
                  className="flex-1 flex-row items-center justify-center gap-x-3 bg-[#F0FDF4] py-3 rounded-xl border border-[#BBF7D0]"
                >
                  <Phone size={16} color="#16A34A" />
                  <Text className="text-[#16A34A] font-semibold text-[14px]">Call</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ExploreLayout>
  );
}
