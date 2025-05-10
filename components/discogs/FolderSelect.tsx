import { CollectionFolder } from "@/services/discogs/types";
import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import { Dropdown, DropdownItem } from "../ui/Dropdown";

interface FolderSelectProps {
  folders: CollectionFolder[] | undefined;
  selectedFolderId: number;
  onSelectFolder: (folderId: number) => void;
  loading?: boolean;
  width?: DimensionValue;
}

export function FolderSelect({
  folders = [],
  selectedFolderId,
  onSelectFolder,
  loading = false,
  width = "100%",
}: FolderSelectProps) {
  // Convert Discogs folders to dropdown items format
  const folderItems: DropdownItem[] = React.useMemo(() => {
    if (!folders || folders.length === 0) return [];

    return folders.map((folder) => ({
      id: folder.id,
      label: folder.name,
      count: folder.count,
    }));
  }, [folders]);

  // Handle folder selection
  const handleSelect = (item: DropdownItem) => {
    onSelectFolder(Number(item.id));
  };

  return (
    <View style={styles.container}>
      <Dropdown
        label="Collection Folder"
        items={folderItems}
        selectedId={selectedFolderId}
        onSelect={handleSelect}
        loading={loading}
        width={width}
        placeholder="Select a folder"
        emptyText="No folders available"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
