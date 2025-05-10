import React from "react";
import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface RecordItemProps {
  item: {
    basic_information: {
      title: string;
      artists: { name: string }[];
      year?: number;
      formats?: { name: string }[];
      thumb?: string;
      cover_image?: string;
    };
    id?: number;
    instance_id?: number;
  };
  type: "collection" | "wishlist";
}

export function RecordItem({ item, type }: RecordItemProps) {
  // Use the appropriate image source based on the item type
  const imageSource = {
    uri:
      type === "collection"
        ? item.basic_information.cover_image
        : item.basic_information.thumb,
  };

  return (
    <ThemedView style={styles.recordItem}>
      <Image source={imageSource} style={styles.image} />
      <ThemedView style={styles.info}>
        <ThemedText type="defaultSemiBold">
          {item.basic_information.title}
        </ThemedText>
        <ThemedText>
          {item.basic_information.artists
            .map((artist) => artist.name)
            .join(", ")}
        </ThemedText>
        <ThemedText>{item.basic_information.year}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  recordItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  formatText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
});
