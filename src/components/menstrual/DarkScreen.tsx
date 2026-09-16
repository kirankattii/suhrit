import React, { PropsWithChildren, ReactNode } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface DarkScreenProps extends PropsWithChildren {
  scroll?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  scrollViewRef?: React.RefObject<ScrollView>;
}

export default function DarkScreen({
  children,
  scroll = false,
  header,
  footer,
  scrollViewRef,
}: DarkScreenProps) {
  const content = scroll ? (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
    >
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1">{children}</View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#0D1B2A]" // Very dark blue/black base color matching UI
      edges={["top", "bottom"]}
    >
      <StatusBar style="light" />
      {header}
      {content}
      {footer && (
        <View className="px-6 pb-6 pt-2 bg-[#0D1B2A]">
          {footer}
        </View>
      )}
    </SafeAreaView>
  );
}
