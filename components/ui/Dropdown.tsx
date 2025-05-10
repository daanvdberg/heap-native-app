import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  DimensionValue,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";

export interface DropdownItem {
  id: string | number;
  label: string;
  count?: number;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedId: string | number | null;
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  loading?: boolean;
  label?: string;
  width?: DimensionValue;
  emptyText?: string;
}

export function Dropdown({
  items,
  selectedId,
  onSelect,
  placeholder = "Select an option",
  loading = false,
  label,
  width = "100%",
  emptyText = "No options available",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const DropdownButtonRef = useRef<View>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = createStyles(colors);

  const selectedItem = items.find((item) => item.id === selectedId);

  const toggleDropdown = (): void => {
    if (loading) return;

    if (isOpen) {
      setIsOpen(false);
    } else {
      openDropdown();
    }
  };

  const openDropdown = (): void => {
    DropdownButtonRef.current?.measure((_fx, _fy, _width, height, px, py) => {
      setDropdownTop(py + height);
      setDropdownLeft(px);
      setParentWidth(_width);
      setIsOpen(true);
    });
  };

  const onItemPress = (item: DropdownItem): void => {
    onSelect(item);
    setIsOpen(false);
  };

  // Close on outside press
  useEffect(() => {
    if (Platform.OS === "web") {
      const handleClick = (e: MouseEvent) => {
        if (DropdownButtonRef.current) {
          const element = DropdownButtonRef.current as unknown as HTMLElement;
          if (element && !element.contains(e.target as Node)) {
            setIsOpen(false);
          }
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [isOpen]);

  const renderItem = ({ item }: { item: DropdownItem }) => (
    <Pressable
      style={[styles.item, item.id === selectedId && styles.selectedItem]}
      onPress={() => onItemPress(item)}
    >
      <Text
        style={[
          styles.itemText,
          item.id === selectedId && styles.selectedItemText,
        ]}
      >
        {item.label} {item.count !== undefined && `(${item.count})`}
      </Text>
    </Pressable>
  );

  // Create a ViewStyle object with the width
  const containerStyle: ViewStyle = {
    ...styles.container,
    width,
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        ref={DropdownButtonRef}
        style={[styles.button, isOpen && styles.buttonOpen]}
        onPress={toggleDropdown}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.tint} />
        ) : (
          <>
            <Text style={styles.buttonText}>
              {selectedItem ? selectedItem.label : placeholder}
              {selectedItem &&
                selectedItem.count !== undefined &&
                ` (${selectedItem.count})`}
            </Text>
            <Text style={styles.icon}>{isOpen ? "▲" : "▼"}</Text>
          </>
        )}
      </Pressable>

      <Modal visible={isOpen} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.dropdown,
                {
                  top: dropdownTop,
                  left: dropdownLeft,
                  width: parentWidth,
                },
              ]}
            >
              {items.length > 0 ? (
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  bounces={false}
                  style={styles.dropdownList}
                />
              ) : (
                <Text style={styles.emptyText}>{emptyText}</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    label: {
      marginBottom: 8,
      fontWeight: "500",
      color: colors.text,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 40,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: colors.background,
    },
    buttonOpen: {
      borderColor: colors.tint,
    },
    buttonText: {
      flex: 1,
      color: colors.text,
    },
    icon: {
      fontSize: 12,
      color: colors.text,
      marginLeft: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    dropdown: {
      position: "absolute",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      maxHeight: 300,
    },
    dropdownList: {
      padding: 5,
    },
    item: {
      padding: 10,
      borderRadius: 4,
    },
    selectedItem: {
      backgroundColor: `${colors.tint}20`,
    },
    itemText: {
      color: colors.text,
    },
    selectedItemText: {
      fontWeight: "bold",
      color: colors.tint,
    },
    emptyText: {
      padding: 10,
      color: colors.text,
      textAlign: "center",
      fontStyle: "italic",
    },
  });
