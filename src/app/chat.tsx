import { router } from "expo-router";
import { Sparkles, Send } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
} from "react-native";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { generateInsight } from "../ai/client";
import KeyboardSpacer from "../components/KeyboardSpacer";
import BottomTabBar from "../components/BottomTabBar";

type Message = {
  id: string;
  role: "system" | "user" | "ai";
  content: string;
};

const FormattedMessage = ({ text, isUser }: { text: string; isUser: boolean }) => {
  if (isUser) {
    return <Text className="text-[15px] leading-[22px] text-white">{text}</Text>;
  }

  const lines = text.split('\n').filter(line => line.trim().length > 0);

  return (
    <View>
      {lines.map((line, index) => {
        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        const content = isBullet ? line.trim().substring(1).trim() : line.trim();

        const parts = content.split(/(\*\*.*?\*\*)/g);

        return (
          <View key={index} className={`flex-row ${isBullet ? 'mt-2 pl-1' : index > 0 ? 'mt-3' : ''}`}>
            {isBullet && (
              <View className="mt-[8px] mr-2 w-[5px] h-[5px] rounded-full bg-suhrhit-primary opacity-80" />
            )}
            <Text className="text-[15px] leading-[24px] text-suhrhit-primary shrink">
              {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <Text key={i} className="font-bold">{part.substring(2, part.length - 2)}</Text>;
                }
                return <Text key={i}>{part}</Text>;
              })}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default function AIChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    loadInitialInsight();

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const loadInitialInsight = async () => {
    setIsLoading(true);

    const initialPrompt = `You are Suhrit AI, an empathetic and highly knowledgeable assistant for a women's health application. The user has opened the AI chat.
Provide a helpful, welcoming, and structured opening message.
FORMATTING RULES:
1. Start with a warm empathetic opening sentence introducing yourself.
2. Provide exactly 2 concise bullet points (start with -) outlining how you can help (e.g., answering questions about menstrual well-being, mental health, or pregnancy).
3. End by asking how you can support them today.`;

    const insight = await generateInsight(initialPrompt);

    if (insight) {
      setMessages([
        {
          id: Date.now().toString(),
          role: "ai",
          content: insight.trim(),
        },
      ]);
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          role: "ai",
          content:
            "I'm having a little trouble connecting right now, but I'm here to support you with information about your well-being. \n- Please check your connection\n- Try asking a question below",
        },
      ]);
    }

    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessageContent = inputText.trim();
    setInputText("");

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    const conversationContext = messages
      .filter((m) => m.role !== "system")
      .map((m) => `${m.role === "ai" ? "Assistant" : "User"}: ${m.content}`)
      .join("\n\n");

    const fullPrompt = `You are a supportive and knowledgeable assistant in the Suhrit women's health app. 
    
Here is the conversation so far:
${conversationContext}

User: ${userMessageContent}

Provide a highly informative, educational, and helpful response.
FORMATTING RULES:
- Use exactly 2-3 concise bullet points (start with -) to structure your knowledge clearly.
- Keep sentences short and easy to read.
- Use **bold** for key terms or emphasis.
- Be highly empathetic, accurate, and supportive.`;

    const response = await generateInsight(fullPrompt);

    setIsTyping(false);

    if (response) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: response.trim(),
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content:
            "I'm sorry, I couldn't generate a response right now. Please try again.",
        },
      ]);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F5F9FF]"
      edges={["top"]}
    >
      <View className="flex-1">
        {/* Header */}
        <View
          className="px-4 py-3 flex-row items-center justify-center bg-white z-10"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.03,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View className="items-center justify-center">
            <View className="flex-row items-center mb-0.5">
              <Sparkles size={14} color="#E4A08E" className="mr-1.5" style={{ marginTop: -1 }} />
              <Text className="text-suhrhit-primary text-[16px]" style={{ fontFamily: "Georgia" }}>
                Suhrit AI
              </Text>
            </View>
            <Text
              className="text-suhrhit-text text-[11px] opacity-60 px-4 text-center tracking-wide"
              numberOfLines={1}
            >
              Your personal health companion
            </Text>
          </View>
        </View>

        {/* Chat Area */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-5"
          contentContainerStyle={{ paddingVertical: 24, paddingBottom: 40 }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center mt-20">
              <ActivityIndicator size="large" color="#183059" />
              <Text className="text-suhrhit-text mt-4 text-[15px] opacity-80">
                Waking up Suhrit...
              </Text>
            </View>
          ) : (
            messages.map((msg, index) => {
              const isAi = msg.role === "ai";
              return (
                <View key={msg.id} className={`flex-row w-full mb-6 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  {isAi && (
                    <View className="w-8 h-8 rounded-full bg-[#D9E8F5] items-center justify-center mr-3 mt-1" style={{ borderWidth: 1, borderColor: "rgba(24,48,89,0.08)" }}>
                      <Sparkles size={14} color="#183059" />
                    </View>
                  )}
                  <View
                    className={`max-w-[78%] p-4 ${
                      isAi
                        ? "bg-white rounded-[20px] rounded-tl-sm"
                        : "bg-suhrhit-primary rounded-[20px] rounded-tr-sm"
                    }`}
                    style={
                      isAi
                        ? {
                            shadowColor: "#183059",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.04,
                            shadowRadius: 12,
                            elevation: 2,
                            borderWidth: 1,
                            borderColor: "rgba(24, 48, 89, 0.04)",
                          }
                        : {}
                    }
                  >
                    <FormattedMessage text={msg.content} isUser={!isAi} />
                  </View>
                </View>
              );
            })
          )}
          {isTyping && (
            <View className="flex-row w-full mb-6 justify-start items-center">
              <View className="w-8 h-8 rounded-full bg-[#D9E8F5] items-center justify-center mr-3" style={{ borderWidth: 1, borderColor: "rgba(24,48,89,0.08)" }}>
                <Sparkles size={14} color="#183059" />
              </View>
              <View className="bg-white rounded-[20px] rounded-tl-sm px-5 py-4 border border-suhrhit-border/20" style={{
                shadowColor: "#183059", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8
              }}>
                <View className="flex-row items-center space-x-1">
                  <ActivityIndicator size="small" color="#183059" style={{ transform: [{ scale: 0.7 }] }} />
                  <Text className="text-suhrhit-text text-[13px] ml-2 opacity-60">Suhrit is typing...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View 
          className="px-5 py-3 bg-white flex-row items-end" 
          style={{ 
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.03,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          <View className="flex-1 min-h-[52px] max-h-[120px] bg-[#F0F5FA] rounded-[26px] flex-row items-center px-2 py-1.5 border border-suhrhit-border/50">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Ask Suhrit AI anything...`}
              placeholderTextColor="#A6B9C7"
              className="flex-1 px-4 py-2 text-[15px] text-suhrhit-primary leading-[20px]"
              multiline
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`w-10 h-10 rounded-full items-center justify-center ${!inputText.trim() || isTyping ? "bg-transparent" : "bg-suhrhit-primary"}`}
              style={!inputText.trim() || isTyping ? {} : {
                shadowColor: "#183059",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Send
                color={!inputText.trim() || isTyping ? "#A6B9C7" : "white"}
                size={18}
                strokeWidth={2.5}
                style={!inputText.trim() || isTyping ? {} : { marginLeft: -2, marginTop: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer offset={-40} />
      </View>
      {!isKeyboardVisible && <BottomTabBar />}
    </SafeAreaView>
  );
}
