import { FlashList } from "@shopify/flash-list";
import { cssInterop } from "nativewind";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./Button";
import { Text } from "./Text";

// Add CSS interop for FlashList
cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

type ExampleItem = {
  id: string;
  title: string;
  component: React.ReactNode;
};

const EXAMPLES: ExampleItem[] = [
  {
    id: "1",
    title: "Basic Component with Tailwind Classes",
    component: (
      <View className="bg-muted/20 p-4 rounded-lg">
        <Text>This is styled with Tailwind classes</Text>
      </View>
    ),
  },
  {
    id: "2",
    title: "Button Component",
    component: (
      <View className="flex flex-row flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </View>
    ),
  },
  {
    id: "3",
    title: "Dark Mode Support",
    component: (
      <View className="dark:bg-gray-800 bg-gray-100 p-4 rounded-lg">
        <Text className="dark:text-white text-black">
          This component changes in dark mode
        </Text>
      </View>
    ),
  },
  {
    id: "4",
    title: "Typography Variants",
    component: (
      <View className="gap-1">
        <Text variant="title1">Title 1</Text>
        <Text variant="title3">Title 3</Text>
        <Text variant="body">Body Text</Text>
        <Text variant="caption1">Caption Text</Text>
      </View>
    ),
  },
  {
    id: "5",
    title: "Platform-Specific Styling",
    component: (
      <View className="gap-2">
        <View className="ios:bg-blue-500 android:bg-green-500 p-3 rounded">
          <Text className="ios:text-white android:text-white">
            Platform-specific background
          </Text>
        </View>
      </View>
    ),
  },
];

export function Example() {
  return (
    <View style={styles.container}>
      <FlashList
        data={EXAMPLES}
        estimatedItemSize={120}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 mb-4 bg-card rounded-xl border border-border">
            <Text variant="heading">{item.title}</Text>
            <View className="mt-4">{item.component}</View>
            <View className="mt-2">
              <Text variant="subhead" color="tertiary">
                Example {item.id} of {EXAMPLES.length}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
