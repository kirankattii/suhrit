import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
    Alert,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import RadioCard from "../components/RadioCard";
import Screen from "../components/Screen";
import BottomTabBar from "../components/BottomTabBar";
import {
    BodyText,
    Heading,
    SubHeading,
} from "../components/Typography";

import {
    saveProfile,
    getProfile,
    setOnboardingCompleted,
} from "../storage/onboarding";

export default function ProfileScreen() {
  const { edit } = useLocalSearchParams();
  const isEditing = edit === "true";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const fieldLayouts = useRef<Record<string, number>>({});

  const [isFormMode, setIsFormMode] = useState(!isEditing);

  const loadProfileData = () => {
    getProfile().then((data) => {
      if (data) {
        setName(data.name);
        setAge(data.age);
        setRelationshipStatus(data.relationshipStatus);
        setOccupation(data.occupation);
      }
    });
  };

  useEffect(() => {
    if (isEditing) {
      loadProfileData();
    }
  }, [isEditing]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let firstErrorField: string | null = null;

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
      firstErrorField = "name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Please enter at least 2 characters.";
      firstErrorField = "name";
    }

    const numericAge = Number(age);
    if (!age || !Number.isInteger(numericAge)) {
      newErrors.age = "Please enter a valid age.";
      if (!firstErrorField) firstErrorField = "age";
    } else if (numericAge < 13 || numericAge > 120) {
      newErrors.age = "Please enter a valid age.";
      if (!firstErrorField) firstErrorField = "age";
    }

    if (!relationshipStatus) {
      newErrors.relationshipStatus = "Please select your relationship status.";
      if (!firstErrorField) firstErrorField = "relationshipStatus";
    }

    if (!occupation) {
      newErrors.occupation = "Please select your occupation.";
      if (!firstErrorField) firstErrorField = "occupation";
    }

    setErrors(newErrors);

    if (firstErrorField) {
      const yPos = fieldLayouts.current[firstErrorField];
      if (yPos !== undefined) {
        // Add 160 to account for the header content height above the form wrapper
        scrollViewRef.current?.scrollTo({ y: Math.max(0, yPos + 160), animated: true });
      }
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (loading) return;

    if (!validate()) return;

    try {
      setLoading(true);

      await saveProfile({
        name: name.trim(),
        age,
        relationshipStatus,
        occupation,
      });

      if (isEditing) {
        setIsFormMode(false);
      } else {
        await setOnboardingCompleted();
        router.replace("/home");
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      Alert.alert(
        "Something went wrong",
        "We couldn't save your information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      scroll
      scrollViewRef={scrollViewRef}
      footer={
        !isEditing ? (
          <Button
            title="Continue"
            onPress={handleContinue}
            loading={loading}
          />
        ) : undefined
      }
      bottomBar={isEditing ? <BottomTabBar /> : undefined}
    >
      <View className="px-6 pt-8">
        {isEditing && (
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity 
              onPress={() => {
                if (isFormMode) {
                  loadProfileData(); // Reset changes
                  setIsFormMode(false);
                } else {
                  router.back();
                }
              }} 
              className="-ml-2 p-2 w-10"
            >
              <ChevronLeft color="#183059" size={28} />
            </TouchableOpacity>
            
            <View className="w-24">
              {!isFormMode ? (
                <Button
                  title="Edit"
                  onPress={() => setIsFormMode(true)}
                  size="small"
                />
              ) : (
                <Button
                  title="Save"
                  onPress={handleContinue}
                  loading={loading}
                  size="small"
                />
              )}
            </View>
          </View>
        )}

        <Text className="mb-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-suhrhit-secondary">
          {isEditing ? "Your Profile" : "Almost there"}
        </Text>

        <Heading>
          {isEditing && !isFormMode ? "Profile Details" : isEditing ? "Edit your\nprofile." : "Tell us a little\nabout you."}
        </Heading>

        <BodyText className="mt-5">
          {isEditing && !isFormMode
            ? "Here are the details we use to personalize your experience."
            : isEditing
            ? "Update your details below to keep your SUHRIT experience personal."
            : "A few details help us make your SUHRIT experience feel more personal."}
        </BodyText>

        {!isFormMode ? (
          <View className="mt-9">
            <View className="mb-6 rounded-[24px] bg-white p-6 shadow-sm border border-suhrhit-border">
              <View className="mb-4">
                <Text className="text-[13px] font-medium text-suhrhit-muted">Name</Text>
                <Text className="mt-1 text-[16px] font-semibold text-suhrhit-text">{name || "-"}</Text>
              </View>
              <View className="mb-4 h-[1px] bg-suhrhit-border/50" />
              <View className="mb-4">
                <Text className="text-[13px] font-medium text-suhrhit-muted">Age</Text>
                <Text className="mt-1 text-[16px] font-semibold text-suhrhit-text">{age || "-"}</Text>
              </View>
              <View className="mb-4 h-[1px] bg-suhrhit-border/50" />
              <View className="mb-4">
                <Text className="text-[13px] font-medium text-suhrhit-muted">Relationship Status</Text>
                <Text className="mt-1 text-[16px] font-semibold text-suhrhit-text capitalize">
                  {relationshipStatus ? relationshipStatus.replace(/_/g, " ") : "-"}
                </Text>
              </View>
              <View className="mb-4 h-[1px] bg-suhrhit-border/50" />
              <View>
                <Text className="text-[13px] font-medium text-suhrhit-muted">Occupation</Text>
                <Text className="mt-1 text-[16px] font-semibold text-suhrhit-text capitalize">
                  {occupation ? occupation.replace(/_/g, " ") : "-"}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="mt-9">
            <View onLayout={(e) => { fieldLayouts.current.name = e.nativeEvent.layout.y; }}>
              <Input
                label="Name"
                placeholder="What should we call you?"
                value={name}
                onChangeText={(val) => {
                  setName(val);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={errors.name}
              />
            </View>

            <View onLayout={(e) => { fieldLayouts.current.age = e.nativeEvent.layout.y; }}>
              <Input
                label="Age"
                placeholder="Enter your age"
                value={age}
                onChangeText={(val) => {
                  setAge(val);
                  setErrors((prev) => ({ ...prev, age: "" }));
                }}
                keyboardType="numeric"
                error={errors.age}
              />
            </View>

            <View 
              className="mb-7"
              onLayout={(e) => { fieldLayouts.current.relationshipStatus = e.nativeEvent.layout.y; }}
            >
              <SubHeading className="mb-4">
                Relationship status
              </SubHeading>
              
              {errors.relationshipStatus && (
                <Text className="mb-4 text-[13px] text-suhrhit-error">
                  {errors.relationshipStatus}
                </Text>
              )}

              <RadioCard
                title="Single"
                selected={relationshipStatus === "single"}
                onPress={() => {
                  setRelationshipStatus("single");
                  setErrors((prev) => ({ ...prev, relationshipStatus: "" }));
                }}
              />

              <RadioCard
                title="Committed"
                selected={relationshipStatus === "committed"}
                onPress={() => {
                  setRelationshipStatus("committed");
                  setErrors((prev) => ({ ...prev, relationshipStatus: "" }));
                }}
              />

              <RadioCard
                title="Married"
                selected={relationshipStatus === "married"}
                onPress={() => {
                  setRelationshipStatus("married");
                  setErrors((prev) => ({ ...prev, relationshipStatus: "" }));
                }}
              />

              <RadioCard
                title="Prefer not to say"
                selected={relationshipStatus === "prefer_not_to_say"}
                onPress={() => {
                  setRelationshipStatus("prefer_not_to_say");
                  setErrors((prev) => ({ ...prev, relationshipStatus: "" }));
                }}
              />
            </View>

            <View
              onLayout={(e) => { fieldLayouts.current.occupation = e.nativeEvent.layout.y; }}
            >
              <SubHeading className="mb-4">
                What best describes you?
              </SubHeading>

              {errors.occupation && (
                <Text className="mb-4 text-[13px] text-suhrhit-error">
                  {errors.occupation}
                </Text>
              )}

              <RadioCard
                title="Student"
                selected={occupation === "student"}
                onPress={() => {
                  setOccupation("student");
                  setErrors((prev) => ({ ...prev, occupation: "" }));
                }}
              />

              <RadioCard
                title="Professional"
                selected={occupation === "professional"}
                onPress={() => {
                  setOccupation("professional");
                  setErrors((prev) => ({ ...prev, occupation: "" }));
                }}
              />

              <RadioCard
                title="Homemaker"
                selected={occupation === "homemaker"}
                onPress={() => {
                  setOccupation("homemaker");
                  setErrors((prev) => ({ ...prev, occupation: "" }));
                }}
              />

              <RadioCard
                title="Other"
                selected={occupation === "other"}
                onPress={() => {
                  setOccupation("other");
                  setErrors((prev) => ({ ...prev, occupation: "" }));
                }}
              />

              <RadioCard
                title="Prefer not to say"
                selected={occupation === "prefer_not_to_say"}
                onPress={() => {
                  setOccupation("prefer_not_to_say");
                  setErrors((prev) => ({ ...prev, occupation: "" }));
                }}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}