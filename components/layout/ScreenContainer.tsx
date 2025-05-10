import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";

// Default padding values
const DEFAULT_HORIZONTAL_PADDING = 20;
const DEFAULT_EXTRA_TOP_PADDING = 24;

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  horizontalPadding?: number;
  extraTopPadding?: number;
  applyBottomInset?: boolean;
}

/**
 * A container component for screens that handles safe area insets and padding consistently
 */
export function ScreenContainer({
  children,
  style,
  horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
  extraTopPadding = DEFAULT_EXTRA_TOP_PADDING,
  applyBottomInset = true,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  // Get the actual tab bar height from React Navigation
  const tabBarHeight = useBottomTabBarHeight();

  // Fully dynamic bottom padding that includes both the tab bar height and safe area
  const bottomPadding = (tabBarHeight || 49) + 32; // Use actual tab bar height or fallback

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      paddingTop: insets.top + extraTopPadding,
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
      paddingBottom: bottomPadding,
    },
    style,
  ];

  return <ThemedView style={containerStyle}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
