import {
  CollectionFoldersResponse,
  CollectionResponse,
  DiscogsClient,
  ReleaseDetails,
  WantlistResponse,
} from "@/services/discogs";
import { useEffect, useState } from "react";

// Create a singleton instance of the DiscogsClient
const discogsClient = DiscogsClient.getInstance();

/**
 * Hook to fetch a user's Discogs collection
 */
export function useDiscogsCollection(
  username?: string,
  page = 1,
  perPage = 50,
  folderId = 0
) {
  const [collection, setCollection] = useState<CollectionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      try {
        setLoading(true);
        const data = await discogsClient.getCollection(
          username,
          page,
          perPage,
          folderId
        );
        setCollection(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch collection")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, [username, page, perPage, folderId]);

  return { collection, loading, error };
}

/**
 * Hook to fetch a user's Discogs wantlist
 */
export function useDiscogsWantlist(username?: string, page = 1, perPage = 50) {
  const [wantlist, setWantlist] = useState<WantlistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWantlist() {
      try {
        setLoading(true);
        const data = await discogsClient.getWantlist(username, page, perPage);
        setWantlist(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch wantlist")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWantlist();
  }, [username, page, perPage]);

  return { wantlist, loading, error };
}

/**
 * Hook to fetch a user's Discogs collection folders
 */
export function useDiscogsCollectionFolders(username?: string) {
  const [folders, setFolders] = useState<CollectionFoldersResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setLoading(true);
        const data = await discogsClient.getCollectionFolders(username);
        setFolders(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch collection folders")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, [username]);

  return { folders, loading, error };
}

/**
 * Hook to fetch a specific Discogs release
 */
export function useDiscogsRelease(releaseId: number) {
  const [release, setRelease] = useState<ReleaseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelease() {
      try {
        setLoading(true);
        const data = await discogsClient.getRelease(releaseId);
        setRelease(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch release")
        );
      } finally {
        setLoading(false);
      }
    }

    if (releaseId) {
      fetchRelease();
    }
  }, [releaseId]);

  return { release, loading, error };
}

// For backward compatibility
export const useDiscogs = useDiscogsCollection;
