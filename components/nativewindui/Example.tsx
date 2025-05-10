import { FlashList } from "@shopify/flash-list";
import { cssInterop } from "nativewind";
import * as React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "./Text";
import { ThemeToggle } from "./ThemeToggle";

// Add CSS interop for FlashList
cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

type ExampleItem = {
  id: string;
  title: string;
};

const EXAMPLES: ExampleItem[] = [
  { id: "1", title: "Basic Component with Tailwind Classes" },
  { id: "2", title: "Responsive Design" },
  { id: "3", title: "Dark Mode Support" },
  { id: "4", title: "Typography Variants" },
  { id: "5", title: "Platform-Specific Styling" },
];

export function Example() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between p-4 border-b border-border">
        <Text variant="title2" className="font-bold">
          NativeWindUI Examples
        </Text>
        <ThemeToggle />
      </View>

      <FlashList
        data={EXAMPLES}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 m-2 bg-card rounded-xl border border-border">
            <Text variant="heading">{item.title}</Text>
            <View className="mt-2">
              <Text variant="subhead" color="tertiary">
                Example {item.id} of {EXAMPLES.length}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerClassName={`pb-${Math.floor(insets.bottom / 4)}`}
      />
    </View>
  );
}
