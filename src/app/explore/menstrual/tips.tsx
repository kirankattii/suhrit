import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { ChevronLeft, Send, Sparkles } from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { generateInsight } from "../../../ai/client";

import KeyboardSpacer from "../../../components/KeyboardSpacer";

const FormattedMessage = ({ text, isUser }: { text: string; isUser: boolean }) => {
  if (isUser) {
    return <Text className="text-[15px] leading-[22px] text-[#0D1B2A] font-medium">{text}</Text>;
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
              <View className="mt-[8px] mr-2 w-[5px] h-[5px] rounded-full bg-white opacity-80" />
            )}
            <Text className="text-[15px] leading-[24px] text-white shrink">
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

export default function AITipsScreen() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm here to provide personalised tips based on your cycle and symptoms. What would you like to know?"
    }
  ]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    // Add user message immediately
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), sender: "user", text: userMessage }
    ];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);
    setIsTyping(true);

    // Build context for the AI
    const prompt = `Context: The user is in the Menstrual Well-being section of the Suhrit app, asking for advice.
User's Question: ${userMessage}
Please provide a helpful, empathetic, and concise response focusing on diet, yoga, activities, or general comfort during their menstrual cycle.
FORMATTING RULES:
1. Start with a warm empathetic opening sentence.
2. Provide highly informative knowledge using concise bullet points (start with -). Keep sentences short. Use **bold** for key terms.
3. End by asking a relevant question to guide the user.`;

    const aiResponse = await generateInsight(prompt);
    
    setIsTyping(false);

    if (aiResponse) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiResponse.trim()
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
        }
      ]);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D1B2A]" edges={["top", "bottom"]}>
      <StatusBar style="light" />
      
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 pt-1 pb-2 flex-row items-center border-b border-[#1E335A]">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 w-10 p-2">
            <ChevronLeft color="#FFFFFF" size={28} />
          </TouchableOpacity>
          <Text className="text-white font-bold text-[18px] flex-1 text-center pr-8" style={{ fontFamily: 'Georgia' }}>
            Personalised Tips
          </Text>
        </View>

        <ScrollView 
          className="flex-1 px-5 pt-6"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              className={`mb-6 flex-row ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <View className="w-8 h-8 rounded-full bg-[#1E335A] items-center justify-center mr-3 mt-1">
                  <Sparkles color="#82A9F9" size={16} />
                </View>
              )}
              
              <View 
                className={`max-w-[80%] p-4 rounded-[20px] ${
                  msg.sender === 'user' 
                    ? 'bg-[#82A9F9] rounded-tr-sm' 
                    : 'bg-[#142340] border border-[#1E335A] rounded-tl-sm'
                }`}
              >
                <FormattedMessage text={msg.text} isUser={msg.sender === 'user'} />
              </View>
            </View>
          ))}

          {isTyping && (
            <View className="flex-row w-full mb-6 justify-start items-center">
              <View className="w-8 h-8 rounded-full bg-[#1E335A] items-center justify-center mr-3">
                <Sparkles color="#82A9F9" size={16} />
              </View>
              <View className="bg-[#142340] border border-[#1E335A] p-4 rounded-[20px] rounded-tl-sm">
                <View className="flex-row items-center gap-1">
                  <View className="w-1.5 h-1.5 bg-[#8B9CBE] rounded-full animate-bounce" />
                  <View className="w-1.5 h-1.5 bg-[#8B9CBE] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <View className="w-1.5 h-1.5 bg-[#8B9CBE] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="px-5 py-4 bg-[#0D1B2A] border-t border-[#1E335A]">
          <View className="flex-row items-center bg-[#142340] border border-[#1E335A] rounded-full px-4 py-2">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask for diet, yoga, or relief tips..."
              placeholderTextColor="#8B9CBE"
              className="flex-1 text-white text-[15px] py-2"
              multiline
            />
            <TouchableOpacity 
              onPress={handleSend}
              disabled={isLoading}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                inputText.trim() && !isLoading ? 'bg-[#82A9F9]' : 'bg-[#1E335A]'
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#82A9F9" size="small" />
              ) : (
                <Send color={inputText.trim() ? '#0D1B2A' : '#8B9CBE'} size={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <KeyboardSpacer offset={0} />
      </View>
    </SafeAreaView>
  );
}
