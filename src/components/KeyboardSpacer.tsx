import React, { useState, useEffect } from "react";
import { Keyboard, Platform, Animated } from "react-native";

export default function KeyboardSpacer({ offset = 100 }: { offset?: number }) {
  const [keyboardSpace] = useState(new Animated.Value(0));

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      // Reduce the height by offset to account for the sticky footer and safe area
      const adjustedHeight = Math.max(0, e.endCoordinates.height - offset);
      Animated.timing(keyboardSpace, {
        toValue: adjustedHeight,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardSpace, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardSpace]);

  return <Animated.View style={{ height: keyboardSpace }} />;
}
