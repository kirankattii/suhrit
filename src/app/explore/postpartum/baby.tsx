import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { Calendar, ChevronLeft, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomTabBar from "../../../components/BottomTabBar";

export default function BabyHealthScreen() {
  const insets = useSafeAreaInsets();

  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [head, setHead] = useState("");

  // Growth Records State
  const [records, setRecords] = useState<any[]>([]);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [recordDate, setRecordDate] = useState("");
  const [showRecordDatePicker, setShowRecordDatePicker] = useState(false);
  const [recordWeight, setRecordWeight] = useState("");
  const [recordLength, setRecordLength] = useState("");
  const [recordHead, setRecordHead] = useState("");

  useEffect(() => {
    loadBabyHealth();
  }, []);

  const loadBabyHealth = async () => {
    try {
      const data = await AsyncStorage.getItem("babyHealthInfo");
      if (data) {
        const parsed = JSON.parse(data);
        setDob(parsed.dob || "");
        setWeight(parsed.weight || "");
        setLength(parsed.length || "");
        setHead(parsed.head || "");
      }

      const recordsData = await AsyncStorage.getItem("babyGrowthRecords");
      if (recordsData) {
        setRecords(JSON.parse(recordsData));
      }
    } catch (error) {
      console.error("Error loading baby health info:", error);
    }
  };

  const saveBabyHealth = async () => {
    try {
      const data = { dob, weight, length, head };
      await AsyncStorage.setItem("babyHealthInfo", JSON.stringify(data));
      Alert.alert("Success", "Baby's health information saved!");
    } catch (error) {
      console.error("Error saving baby health info:", error);
      Alert.alert("Error", "Failed to save information.");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate.toLocaleDateString());
    }
  };

  const onRecordDateChange = (event: any, selectedDate?: Date) => {
    setShowRecordDatePicker(false);
    if (selectedDate) {
      setRecordDate(selectedDate.toLocaleDateString());
    }
  };

  const saveRecord = async () => {
    if (!recordDate) {
      Alert.alert("Error", "Please select a date for the measurement.");
      return;
    }
    try {
      const newRecord = {
        id: Date.now().toString(),
        date: recordDate,
        weight: recordWeight,
        length: recordLength,
        head: recordHead,
      };
      const updatedRecords = [newRecord, ...records];
      setRecords(updatedRecords);
      await AsyncStorage.setItem(
        "babyGrowthRecords",
        JSON.stringify(updatedRecords),
      );

      setIsAddingRecord(false);
      setRecordDate("");
      setRecordWeight("");
      setRecordLength("");
      setRecordHead("");
    } catch (error) {
      console.error("Error saving growth record:", error);
      Alert.alert("Error", "Failed to save the record.");
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const updatedRecords = records.filter((r) => r.id !== id);
      setRecords(updatedRecords);
      await AsyncStorage.setItem(
        "babyGrowthRecords",
        JSON.stringify(updatedRecords),
      );
    } catch (error) {
      console.error("Error deleting growth record:", error);
    }
  };

  return (
    <View className="flex-1 bg-suhrhit-background">
      {/* Sticky Header */}
      <View
        style={{ paddingTop: Math.max(insets.top, 10) + 8 }}
        className="px-6 pb-4 bg-suhrhit-background z-50"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-start justify-center"
          >
            <ChevronLeft color="#183059" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text
            className="text-suhrhit-primary text-[20px] font-medium text-center absolute w-full -z-10"
            style={{ fontFamily: "Georgia" }}
          >
            My Baby's Health
          </Text>
          <View className="w-10 h-10" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-6 pt-4">
          {/* Illustration */}
          <View className="items-center mb-6 overflow-hidden rounded-[32px]">
            <Image
              source={require("../../../assets/images/explore/postpartum/baby_health.jpg")}
              style={{ width: "100%", height: 220 }}
              resizeMode="cover"
            />
          </View>

          <Text
            className="text-suhrhit-primary text-[24px] font-bold mb-2 leading-[32px]"
            style={{ fontFamily: "Georgia" }}
          >
            Your Baby's{"\n"}First Health Records
          </Text>
          <Text className="text-suhrhit-secondary text-[15px] leading-[22px] mb-8">
            Track your baby's growth and key information.
          </Text>

          {/* Birth Information */}
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 shadow-sm mb-6">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">
              Birth Information
            </Text>

            {/* Date of birth */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">
                Date of birth
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="flex-row items-center bg-[#F0F5FA] rounded-xl px-4 py-2"
              >
                <Text className="text-suhrhit-secondary mr-2">
                  {dob || "Select"}
                </Text>
                <Calendar color="#7293B3" size={18} />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}

            {/* Birth weight */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">
                Birth weight
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">
                  kg
                </Text>
              </View>
            </View>

            {/* Birth length */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#F0F5FA]">
              <Text className="text-suhrhit-primary text-[15px]">
                Birth length
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={length}
                  onChangeText={setLength}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">
                  cm
                </Text>
              </View>
            </View>

            {/* Head circumference */}
            <View className="flex-row items-center justify-between py-3 mb-2">
              <Text className="text-suhrhit-primary text-[15px]">
                Head circumference
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  className="bg-[#F0F5FA] rounded-xl px-4 py-2 w-20 text-right text-suhrhit-primary font-medium"
                  placeholder="0.0"
                  keyboardType="numeric"
                  value={head}
                  onChangeText={setHead}
                />
                <Text className="text-suhrhit-secondary ml-2 w-6 text-right font-medium">
                  cm
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={saveBabyHealth}
              className="bg-suhrhit-primary py-3 rounded-xl items-center mt-2"
            >
              <Text className="text-white font-bold text-[15px]">
                Save Information
              </Text>
            </TouchableOpacity>
          </View>

          {/* Growth Record */}
          <View className="bg-white rounded-[24px] p-6 border border-suhrhit-border/50 shadow-sm mb-6">
            <Text className="text-suhrhit-primary font-bold text-[18px] mb-4">
              Growth Record
            </Text>

            {!isAddingRecord ? (
              <TouchableOpacity
                onPress={() => setIsAddingRecord(true)}
                className="flex-row items-center justify-center bg-[#E6F0FA] rounded-[16px] py-4"
              >
                <Plus color="#183059" size={20} className="mr-2" />
                <Text className="text-suhrhit-primary font-bold text-[15px]">
                  Add New Measurement
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="bg-[#F0F5FA] rounded-xl p-4 mb-4">
                <Text className="text-suhrhit-primary font-bold mb-3">
                  New Measurement
                </Text>

                {/* Date */}
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-suhrhit-primary text-[14px]">Date</Text>
                  <TouchableOpacity
                    onPress={() => setShowRecordDatePicker(true)}
                    className="flex-row items-center bg-white rounded-xl px-3 py-1.5 border border-[#E6F0FA]"
                  >
                    <Text className="text-suhrhit-secondary mr-2 text-[14px]">
                      {recordDate || "Select"}
                    </Text>
                    <Calendar color="#7293B3" size={16} />
                  </TouchableOpacity>
                </View>

                {showRecordDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onRecordDateChange}
                    maximumDate={new Date()}
                  />
                )}

                {/* Weight */}
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-suhrhit-primary text-[14px]">
                    Weight
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className="bg-white border border-[#E6F0FA] rounded-xl px-3 py-1.5 w-16 text-right text-suhrhit-primary text-[14px]"
                      placeholder="0.0"
                      keyboardType="numeric"
                      value={recordWeight}
                      onChangeText={setRecordWeight}
                    />
                    <Text className="text-suhrhit-secondary ml-1 w-5 text-right text-[12px]">
                      kg
                    </Text>
                  </View>
                </View>

                {/* Length */}
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-suhrhit-primary text-[14px]">
                    Length
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className="bg-white border border-[#E6F0FA] rounded-xl px-3 py-1.5 w-16 text-right text-suhrhit-primary text-[14px]"
                      placeholder="0.0"
                      keyboardType="numeric"
                      value={recordLength}
                      onChangeText={setRecordLength}
                    />
                    <Text className="text-suhrhit-secondary ml-1 w-5 text-right text-[12px]">
                      cm
                    </Text>
                  </View>
                </View>

                {/* Head */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-suhrhit-primary text-[14px]">
                    Head Circum.
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className="bg-white border border-[#E6F0FA] rounded-xl px-3 py-1.5 w-16 text-right text-suhrhit-primary text-[14px]"
                      placeholder="0.0"
                      keyboardType="numeric"
                      value={recordHead}
                      onChangeText={setRecordHead}
                    />
                    <Text className="text-suhrhit-secondary ml-1 w-5 text-right text-[12px]">
                      cm
                    </Text>
                  </View>
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    onPress={() => setIsAddingRecord(false)}
                    className="flex-1 py-2 rounded-xl items-center bg-white border border-[#E6F0FA]"
                  >
                    <Text className="text-suhrhit-secondary font-medium">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={saveRecord}
                    className="flex-1 py-2 rounded-xl items-center bg-suhrhit-primary"
                  >
                    <Text className="text-white font-medium">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* List of Records */}
            {records.length > 0 && (
              <View className="mt-4">
                {records.map((record) => (
                  <View
                    key={record.id}
                    className="mb-3 p-4 bg-[#F0F5FA] rounded-[16px] border border-[#E6F0FA]"
                  >
                    <View className="flex-row justify-between mb-2 pb-2 border-b border-suhrhit-border/10">
                      <Text className="text-suhrhit-primary font-bold text-[15px]">
                        {record.date}
                      </Text>
                      <TouchableOpacity onPress={() => deleteRecord(record.id)}>
                        <Text className="text-red-500 text-[13px]">Delete</Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="items-center">
                        <Text className="text-suhrhit-secondary text-[11px] mb-0.5 uppercase">
                          Weight
                        </Text>
                        <Text className="text-suhrhit-primary font-medium">
                          {record.weight || "-"} kg
                        </Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-suhrhit-secondary text-[11px] mb-0.5 uppercase">
                          Length
                        </Text>
                        <Text className="text-suhrhit-primary font-medium">
                          {record.length || "-"} cm
                        </Text>
                      </View>
                      <View className="items-center">
                        <Text className="text-suhrhit-secondary text-[11px] mb-0.5 uppercase">
                          Head
                        </Text>
                        <Text className="text-suhrhit-primary font-medium">
                          {record.head || "-"} cm
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Note */}
          <View className="bg-[#FDF9E6] p-4 rounded-xl border border-[#FBE697] mb-8">
            <Text className="text-[#8C6D1F] text-[12px] leading-[18px]">
              Every baby grows at their own pace. SUHRIT does not diagnose
              growth or developmental problems. If you have concerns about your
              baby's growth, speak with a pediatrician.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}
