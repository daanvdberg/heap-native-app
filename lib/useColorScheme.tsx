import { COLORS } from "@/theme";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

function useColorScheme() {
  const { colorScheme } = useNativewindColorScheme();

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    colors: COLORS[colorScheme ?? "light"],
  };
}

// Export just the useColorScheme hook without Android-specific functionality
export { useColorScheme };
