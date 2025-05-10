import { FolderSelect } from "@/components/discogs/FolderSelect";
import { RecordItem } from "@/components/discogs/RecordItem";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useDiscogsCollection,
  useDiscogsCollectionFolders,
} from "@/hooks/useDiscogs";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function CollectionScreen() {
  const [page, setPage] = useState(1);
  const [selectedFolderId, setSelectedFolderId] = useState(0); // 0 is "All" folder

  // Get collection folders
  const { folders, loading: foldersLoading } = useDiscogsCollectionFolders();

  // Get collection items for the selected folder
  const { collection, loading, error } = useDiscogsCollection(
    undefined, // Use default username from config
    page,
    50,
    selectedFolderId
  );

  // Handle folder selection
  const handleFolderChange = (folderId: number) => {
    setSelectedFolderId(folderId);
    setPage(1); // Reset to first page when changing folders
  };

  // Render collection content
  const renderContent = () => {
    if (loading && page === 1) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText}>
            Loading collection...
          </ThemedText>
        </ThemedView>
      );
    }

    if (error) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>Error: {error.message}</ThemedText>
        </ThemedView>
      );
    }

    if (!collection?.releases.length) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>No releases found in your collection.</ThemedText>
        </ThemedView>
      );
    }

    return (
      <FlatList
        data={collection.releases}
        keyExtractor={(item) => `${item.id}-${item.instance_id}`}
        renderItem={({ item }) => <RecordItem item={item} type="collection" />}
        onEndReached={() => {
          if (collection && page < collection.pagination.pages) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() => (
          <>
            {page < (collection?.pagination.pages || 1) && (
              <ActivityIndicator style={styles.footer} />
            )}
          </>
        )}
      />
    );
  };

  return (
    <ScreenContainer>
      <ThemedText type="title" style={styles.title}>
        Collection
      </ThemedText>

      {/* Always show the folder selector */}
      <ThemedView style={styles.filtersContainer}>
        <FolderSelect
          folders={folders?.folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={handleFolderChange}
          loading={foldersLoading}
        />
      </ThemedView>

      {/* Collection content */}
      {renderContent()}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
