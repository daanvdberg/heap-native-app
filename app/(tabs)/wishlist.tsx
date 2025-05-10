import { RecordItem } from "@/components/discogs/RecordItem";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDiscogsWantlist } from "@/hooks/useDiscogs";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

enum SortBy {
  DateAdded = "date_added",
  Artist = "artist",
  Title = "title",
  Year = "year",
}

export default function WishlistScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DateAdded);
  const { wantlist, loading, error } = useDiscogsWantlist(undefined, page, 50);

  // Filter and sort the wantlist items
  const filteredWants = React.useMemo(() => {
    if (!wantlist?.wants) return [];

    let filtered = [...wantlist.wants];

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.basic_information.title.toLowerCase().includes(searchLower) ||
          item.basic_information.artists.some((artist) =>
            artist.name.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case SortBy.Artist:
          return a.basic_information.artists[0]?.name.localeCompare(
            b.basic_information.artists[0]?.name || ""
          );
        case SortBy.Title:
          return a.basic_information.title.localeCompare(
            b.basic_information.title
          );
        case SortBy.Year:
          return (
            (b.basic_information.year || 0) - (a.basic_information.year || 0)
          );
        case SortBy.DateAdded:
        default:
          return (
            new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
          );
      }
    });

    return filtered;
  }, [wantlist, search, sortBy]);

  // Render the filters section
  const renderFilters = () => {
    return (
      <ThemedView style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search wishlist..."
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
        />

        <ThemedView style={styles.sortOptions}>
          <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
          <ThemedView style={styles.sortButtons}>
            {Object.values(SortBy).map((option) => (
              <Pressable
                key={option}
                onPress={() => setSortBy(option)}
                style={[
                  styles.sortButton,
                  sortBy === option && styles.selectedSort,
                ]}
              >
                <ThemedText
                  style={sortBy === option ? styles.selectedSortText : null}
                >
                  {option === SortBy.DateAdded
                    ? "Date"
                    : option === SortBy.Artist
                    ? "Artist"
                    : option === SortBy.Title
                    ? "Title"
                    : "Year"}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  };

  // Render the content section
  const renderContent = () => {
    if (loading && page === 1) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText}>
            Loading wishlist...
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

    if (!wantlist?.wants.length) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>No items found in your wishlist.</ThemedText>
        </ThemedView>
      );
    }

    if (filteredWants.length === 0) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>No matches found for {search}</ThemedText>
        </ThemedView>
      );
    }

    return (
      <FlatList
        data={filteredWants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecordItem item={item} type="wishlist" />}
        onEndReached={() => {
          if (wantlist && page < wantlist.pagination.pages && !search) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() => (
          <>
            {page < (wantlist?.pagination.pages || 1) && !search && (
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
        Wishlist
      </ThemedText>

      {/* Always show filters */}
      {renderFilters()}

      {/* Wishlist content */}
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortLabel: {
    marginRight: 8,
  },
  sortButtons: {
    flexDirection: "row",
    flex: 1,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedSort: {
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    borderColor: "rgba(0, 122, 255, 0.5)",
  },
  selectedSortText: {
    fontWeight: "bold",
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
