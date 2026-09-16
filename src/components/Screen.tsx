import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  footer?: ReactNode;
  bottomBar?: ReactNode;
  scrollViewRef?: React.RefObject<ScrollView>;
}

export default function Screen({
  children,
  scroll = false,
  footer,
  bottomBar,
  scrollViewRef,
}: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 32,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      automaticallyAdjustKeyboardInsets={true}
    >
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1">{children}</View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-suhrhit-background"
      edges={bottomBar ? ["top"] : ["top", "bottom"]}
    >
      {content}
      {footer && (
        <View
          className="bg-suhrhit-background px-6 pb-4 pt-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 10,
            borderTopWidth: 1,
            borderTopColor: "rgba(0,0,0,0.05)",
          }}
        >
          {footer}
        </View>
      )}
      {bottomBar}
    </SafeAreaView>
  );
}