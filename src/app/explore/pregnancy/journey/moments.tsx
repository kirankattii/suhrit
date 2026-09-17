import { router } from "expo-router";
import { ChevronLeft, Plus, Info, Image as ImageIcon, Calendar, X, Heart, Square, CheckSquare } from "lucide-react-native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Camera } from "lucide-react-native";

const STORAGE_KEY = "@pregnancy_memories_v1";
const STORAGE_KEY_CHECKS = "@pregnancy_moments_checks_v1";

type Tab = "Milestones" | "My Memories";

interface Memory {
  id: string;
  milestone: string;
  date: string;
  note: string;
  imageUri?: string | null;
}

const MILESTONES = [
  "First pregnancy test",
  "First antenatal visit",
  "First ultrasound",
  "First time I saw/heard the heartbeat",
  "First scan picture saved",
  "First movement I felt",
  "First time my partner/family felt movement",
  "A special pregnancy moment",
];

export default function MomentsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("Milestones");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [checkedMilestones, setCheckedMilestones] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formMilestone, setFormMilestone] = useState(MILESTONES[0]);
  const [formDate, setFormDate] = useState("");
  const [formNote, setFormNote] = useState("");
  const [formImage, setFormImage] = useState<string | null>(null);

  useEffect(() => {
    loadMemories();
    // Default date to today
    const today = new Date();
    setFormDate(`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);
  }, []);

  const loadMemories = async () => {
    try {
      const storedMemories = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMemories) {
        try {
          setMemories(JSON.parse(storedMemories));
        } catch (e) {}
      }
      
      const storedChecks = await AsyncStorage.getItem(STORAGE_KEY_CHECKS);
      if (storedChecks) {
        try {
          const parsed = JSON.parse(storedChecks);
          if (Array.isArray(parsed)) {
            const newRecord: Record<string, boolean> = {};
            parsed.forEach(p => newRecord[p] = true);
            setCheckedMilestones(newRecord);
          } else {
            setCheckedMilestones(parsed || {});
          }
        } catch (e) {}
      }
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveMemory = async () => {
    if (!formNote.trim() && !formImage) {
      alert("Please add a note or an image to save your memory.");
      return;
    }

    let finalImageUri = formImage;

    // Move the image from temporary cache to permanent document directory
    if (formImage && !formImage.includes(FileSystem.documentDirectory || '')) {
      try {
        const filename = formImage.split('/').pop() || `memory_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({
          from: formImage,
          to: newPath
        });
        finalImageUri = newPath;
      } catch (e) {
        console.error("Error saving image permanently:", e);
      }
    }

    const newMemory: Memory = {
      id: Date.now().toString(),
      milestone: formMilestone,
      date: formDate,
      note: formNote,
      imageUri: finalImageUri,
    };

    const newMemories = [newMemory, ...memories]; // Add to top
    setMemories(newMemories);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMemories));
      // Reset form and return to timeline
      setFormNote("");
      setFormImage(null);
      setShowForm(false);
      setActiveTab("My Memories");
    } catch (e) {
      console.error("Failed to save memory", e);
    }
  };

  const toggleMilestone = async (item: string) => {
    try {
      const newChecks = {
        ...checkedMilestones,
        [item]: !checkedMilestones[item]
      };
      setCheckedMilestones(newChecks);
      await AsyncStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(newChecks));
    } catch (e) {
      console.error("Failed to save check", e);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8, // compress slightly
    });

    if (!result.canceled) {
      setFormImage(result.assets[0].uri);
    }
  };

  if (!isLoaded) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFCFF]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => showForm ? setShowForm(false) : router.back()} className="mr-4">
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-suhrhit-primary text-[22px] font-bold" style={{ fontFamily: 'Georgia' }}>
            {showForm ? "Add Memory" : "Little Moments"}
          </Text>
        </View>
        {!showForm && (
          <TouchableOpacity onPress={() => setShowForm(true)} className="w-10 h-10 bg-[#FCE7F3] rounded-full items-center justify-center">
            <Plus color="#DB2777" size={24} />
          </TouchableOpacity>
        )}
      </View>

      {!showForm && (
        <>
          <Text className="px-6 text-suhrhit-primary/70 text-[15px] mb-6">
            Cherish the moments that matter.
          </Text>
          {/* Tabs */}
          <View className="px-6 flex-row bg-[#F0F4F8] rounded-full p-1 mb-6">
            {(["Milestones", "My Memories"] as Tab[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-full items-center ${
                  activeTab === tab ? "bg-[#3366CC]" : ""
                }`}
              >
                <Text
                  className={`font-semibold text-[13px] ${
                    activeTab === tab ? "text-white" : "text-[#5C728E]"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {showForm ? (
          /* ADD MEMORY FORM */
          <View className="pb-10">
            {/* Milestone Selector */}
            <Text className="text-suhrhit-primary font-bold mb-3 mt-2 text-[16px]">Select Milestone</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 h-12">
              {MILESTONES.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setFormMilestone(item)}
                  className={`px-4 py-2 rounded-full mr-3 border ${
                    formMilestone === item ? "bg-[#FCE7F3] border-[#DB2777]" : "bg-white border-[#F0F4F8]"
                  }`}
                >
                  <Text className={`${formMilestone === item ? "text-[#DB2777] font-bold" : "text-suhrhit-secondary"}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-suhrhit-primary font-bold mb-3 text-[16px]">Date</Text>
            <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 border border-[#F0F4F8] mb-6">
              <Calendar color="#CBD5E1" size={20} className="mr-3" />
              <TextInput
                value={formDate}
                onChangeText={setFormDate}
                placeholder="DD/MM/YYYY"
                className="flex-1 text-[15px] text-suhrhit-primary"
              />
            </View>

            <Text className="text-suhrhit-primary font-bold mb-3 text-[16px]">Write a Memory</Text>
            <View className="bg-white rounded-2xl border border-[#F0F4F8] mb-6 p-1">
              <TextInput
                value={formNote}
                onChangeText={setFormNote}
                placeholder="How did you feel? What happened?"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="text-[15px] text-suhrhit-primary p-3 min-h-[120px]"
              />
            </View>

            <Text className="text-suhrhit-primary font-bold mb-3 text-[16px]">Add Photo</Text>
            {formImage ? (
              <View className="mb-8 relative rounded-2xl overflow-hidden border border-[#F0F4F8]">
                <Image source={{ uri: formImage }} className="w-full h-48" resizeMode="cover" />
                <TouchableOpacity 
                  onPress={() => setFormImage(null)}
                  className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
                >
                  <X color="#333" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row mb-8 space-x-3 gap-3">
                <TouchableOpacity 
                  onPress={takePhoto}
                  className="flex-1 bg-white rounded-2xl border-2 border-dashed border-[#CBD5E1] h-32 flex-col items-center justify-center"
                >
                  <Camera color="#94A3B8" size={32} className="mb-2" />
                  <Text className="text-[#94A3B8] font-medium text-center">Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={pickImage}
                  className="flex-1 bg-white rounded-2xl border-2 border-dashed border-[#CBD5E1] h-32 flex-col items-center justify-center"
                >
                  <ImageIcon color="#94A3B8" size={32} className="mb-2" />
                  <Text className="text-[#94A3B8] font-medium text-center">Upload Photo</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              onPress={saveMemory}
              className="bg-[#3366CC] rounded-full py-4 flex-row items-center justify-center mb-8"
            >
              <Heart color="white" size={20} className="mr-2" />
              <Text className="text-white font-bold text-[16px]">Save Moment</Text>
            </TouchableOpacity>

          </View>
        ) : activeTab === "Milestones" ? (
          /* MILESTONES TAB */
          <View>
            <View className="bg-white rounded-3xl p-6 border border-[#F0F4F8] mb-6">
              {MILESTONES.map((item, index) => {
                const isSaved = memories.some(m => m.milestone === item) || !!checkedMilestones[item];
                return (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => toggleMilestone(item)}
                    className="flex-row items-center py-3 border-b border-[#F0F4F8]"
                  >
                    {isSaved ? (
                      <CheckSquare color="#DB2777" size={24} className="mr-4" />
                    ) : (
                      <Square color="#CBD5E1" size={24} className="mr-4" />
                    )}
                    <Text className={`text-[15px] flex-1 leading-[20px] ${isSaved ? "text-[#DB2777] font-bold" : "text-suhrhit-primary"}`}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="bg-[#E6F0FA] rounded-2xl p-4 flex-row items-start mb-8">
              <Info color="#3366CC" size={20} className="mr-3 mt-0.5" />
              <Text className="flex-1 text-[#3366CC] text-[13px] leading-[18px]">
                These memories are for you to record and cherish. Scan findings and fetal development should always be interpreted by your healthcare professional.
              </Text>
            </View>
          </View>
        ) : (
          /* MY MEMORIES TAB (TIMELINE) */
          <View className="pb-10">
            {memories.length > 0 ? (
              memories.map((memory) => (
                <View key={memory.id} className="bg-white rounded-3xl border border-[#F0F4F8] p-5 mb-5 shadow-sm">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="bg-[#FCE7F3] px-3 py-1 rounded-full">
                      <Text className="text-[#DB2777] font-bold text-[12px]">{memory.milestone}</Text>
                    </View>
                    <Text className="text-[#94A3B8] text-[13px]">{memory.date}</Text>
                  </View>
                  
                  {memory.imageUri && (
                    <View className="rounded-2xl overflow-hidden mb-3 border border-[#F0F4F8]">
                      <Image source={{ uri: memory.imageUri }} className="w-full h-48" resizeMode="cover" />
                    </View>
                  )}
                  
                  {memory.note ? (
                    <Text className="text-suhrhit-primary text-[15px] leading-[22px]">
                      {memory.note}
                    </Text>
                  ) : null}
                </View>
              ))
            ) : (
              <View className="flex-1 items-center justify-center py-20">
                <Text className="text-suhrhit-secondary text-[15px] mb-4">No memories added yet.</Text>
                <TouchableOpacity 
                  onPress={() => setShowForm(true)}
                  className="bg-[#FCE7F3] rounded-full py-3 px-6 flex-row items-center justify-center"
                >
                  <Plus color="#DB2777" size={18} className="mr-2" strokeWidth={3} />
                  <Text className="text-[#DB2777] font-bold text-[14px]">Add a Memory</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
