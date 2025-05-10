import Constants from "expo-constants";

// API configuration
export const API_CONFIG = {
  discogs: {
    baseUrl: "https://api.discogs.com",
    token: Constants.expoConfig?.extra?.discogsToken as string,
    username: Constants.expoConfig?.extra?.discogsUsername as string,
    userAgent: "HeapNative/1.0.0",
  },
} as const;

// Type for API configuration
export type ApiConfig = typeof API_CONFIG;

// Helper to get API config
export function getApiConfig() {
  return API_CONFIG;
}
