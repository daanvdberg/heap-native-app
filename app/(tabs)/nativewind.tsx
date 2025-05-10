import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

// Example items showcasing NativeWind styling with existing components
const EXAMPLES = [
  {
    id: "1",
    title: "Tailwind Styling",
    description: "Applying Tailwind classes to existing app components",
    hasTailwindDemo: true,
  },
  {
    id: "2",
    title: "Dark Mode Support",
    description: "Styles that automatically adapt to light/dark mode",
    hasDarkModeDemo: true,
  },
  {
    id: "3",
    title: "Typography Classes",
    description: "Applying text styling with Tailwind classes",
    hasTypographyDemo: true,
  },
  {
    id: "4",
    title: "Layout with Flexbox",
    description: "Using Tailwind flex classes for responsive layouts",
    hasFlexboxDemo: true,
  },
];

// Tailwind styling demo using View with className
function TailwindDemo() {
  return (
    <View className="mt-4 p-3 rounded-md bg-primary">
      <ThemedText style={styles.demoTitle}>Tailwind Classes</ThemedText>
      <View className="flex-row justify-between items-center mt-2">
        <View className="w-10 h-10 rounded-full bg-accent items-center justify-center">
          <ThemedText>1</ThemedText>
        </View>
        <View className="w-10 h-10 rounded-md bg-secondary items-center justify-center">
          <ThemedText>2</ThemedText>
        </View>
        <View className="w-10 h-10 rounded-lg bg-muted items-center justify-center">
          <ThemedText>3</ThemedText>
        </View>
      </View>
    </View>
  );
}

// Dark mode adaptive styling demo
function DarkModeDemo() {
  return (
    <View className="mt-4 p-3 rounded-md dark:bg-card bg-accent">
      <ThemedText style={styles.demoTitle}>Dark Mode Adaptive</ThemedText>
      <View className="p-2 rounded-md bg-white dark:bg-zinc-800 mt-2">
        <ThemedText>This container adapts to dark/light mode</ThemedText>
      </View>
    </View>
  );
}

// Typography styling demo
function TypographyDemo() {
  return (
    <View className="mt-4 p-3 rounded-md bg-secondary">
      <ThemedText style={styles.demoTitle}>Typography Classes</ThemedText>
      <View className="mt-2">
        <ThemedText className="text-xs">Extra Small Text</ThemedText>
        <ThemedText className="text-sm">Small Text</ThemedText>
        <ThemedText className="text-base">Base Text</ThemedText>
        <ThemedText className="text-lg font-bold">Large Bold Text</ThemedText>
        <ThemedText className="text-xl italic">Extra Large Italic</ThemedText>
      </View>
    </View>
  );
}

// Flexbox layout demo
function FlexboxDemo() {
  return (
    <View className="mt-4 p-3 rounded-md bg-destructive">
      <ThemedText style={styles.demoTitle}>Flexbox Layout</ThemedText>
      <View className="flex-row flex-wrap gap-2 mt-2">
        <View className="p-2 bg-white dark:bg-zinc-800 rounded-md">
          <ThemedText>Item 1</ThemedText>
        </View>
        <View className="p-2 bg-white dark:bg-zinc-800 rounded-md">
          <ThemedText>Item 2</ThemedText>
        </View>
        <View className="p-2 bg-white dark:bg-zinc-800 rounded-md">
          <ThemedText>Item 3</ThemedText>
        </View>
        <View className="p-2 bg-white dark:bg-zinc-800 rounded-md">
          <ThemedText>Item 4</ThemedText>
        </View>
      </View>
    </View>
  );
}

// NativeWindUI Example Screen - styled to match the app's existing structure
export default function NativeWindScreen() {
  const renderContent = () => {
    return (
      <FlatList
        data={EXAMPLES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.itemContainer}>
            <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
            <ThemedText style={styles.description}>
              {item.description}
            </ThemedText>

            {item.hasTailwindDemo && <TailwindDemo />}
            {item.hasDarkModeDemo && <DarkModeDemo />}
            {item.hasTypographyDemo && <TypographyDemo />}
            {item.hasFlexboxDemo && <FlexboxDemo />}
          </ThemedView>
        )}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    );
  };

  return (
    <ScreenContainer>
      <ThemedText type="title" style={styles.title}>
        NativeWindUI
      </ThemedText>

      <ThemedView style={styles.infoContainer}>
        <ThemedText>
          Demonstrating NativeWind styling with existing app components
        </ThemedText>
      </ThemedView>

      {/* Content */}
      {renderContent()}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    marginVertical: 8,
    opacity: 0.2,
  },
  itemContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
    marginBottom: 8,
  },
  demoTitle: {
    fontWeight: "600",
  },
});
