import { getApiConfig } from "@/constants/api";
import {
  CollectionFoldersResponse,
  CollectionResponse,
  ReleaseDetails,
  WantlistResponse,
} from "./types";

/**
 * Client for interacting with the Discogs API
 */
export class DiscogsClient {
  private config = getApiConfig().discogs;
  private cachedClient: DiscogsClient | null = null;

  /**
   * Get a singleton instance of the DiscogsClient
   */
  static getInstance(): DiscogsClient {
    if (!this.prototype.cachedClient) {
      this.prototype.cachedClient = new DiscogsClient();
    }
    return this.prototype.cachedClient;
  }

  /**
   * Make a request to the Discogs API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      const headers = {
        Authorization: `Discogs token=${this.config.token}`,
        "User-Agent": this.config.userAgent,
        "Content-Type": "application/json",
        ...options.headers,
      };

      console.log(`Fetching: ${url}`);
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Discogs API Error:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `Discogs API error: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error("Discogs request failed:", error);
      throw error;
    }
  }

  /**
   * Build a URL with query parameters
   */
  private buildUrl(baseUrl: string, params: Record<string, any> = {}): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * Get a user's collection
   */
  async getCollection(
    username: string = this.config.username,
    page: number = 1,
    perPage: number = 50,
    folderId: number = 0
  ): Promise<CollectionResponse> {
    const url = this.buildUrl(
      `/users/${username}/collection/folders/${folderId}/releases`,
      { page, per_page: perPage }
    );
    return this.request<CollectionResponse>(url);
  }

  /**
   * Get a user's collection folders
   */
  async getCollectionFolders(
    username: string = this.config.username
  ): Promise<CollectionFoldersResponse> {
    return this.request<CollectionFoldersResponse>(
      `/users/${username}/collection/folders`
    );
  }

  /**
   * Get a user's wantlist
   */
  async getWantlist(
    username: string = this.config.username,
    page: number = 1,
    perPage: number = 50
  ): Promise<WantlistResponse> {
    const url = this.buildUrl(`/users/${username}/wants`, {
      page,
      per_page: perPage,
    });
    return this.request<WantlistResponse>(url);
  }

  /**
   * Get details for a specific release
   */
  async getRelease(releaseId: number): Promise<ReleaseDetails> {
    return this.request<ReleaseDetails>(`/releases/${releaseId}`);
  }

  /**
   * Search for releases
   */
  async searchReleases(
    query: string,
    type: "release" | "master" | "artist" | "label" = "release",
    page: number = 1,
    perPage: number = 50
  ): Promise<any> {
    const url = this.buildUrl("/database/search", {
      q: query,
      type,
      page,
      per_page: perPage,
    });
    return this.request<any>(url);
  }
}
