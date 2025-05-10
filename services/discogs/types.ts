// Common types
export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls?: {
    last?: string;
    next?: string;
    prev?: string;
  };
}

// Collection types
export interface CollectionRelease {
  id: number;
  instance_id: number;
  date_added: string;
  basic_information: {
    id: number;
    title: string;
    year: number;
    thumb: string;
    cover_image: string;
    artists: { name: string }[];
    formats: { name: string }[];
  };
}

export interface CollectionResponse {
  releases: CollectionRelease[];
  pagination: Pagination;
}

export interface CollectionFolder {
  id: number;
  name: string;
  count: number;
  resource_url: string;
}

export interface CollectionFoldersResponse {
  folders: CollectionFolder[];
}

// Wantlist types
export interface WantlistItem {
  id: number;
  basic_information: {
    title: string;
    year: number;
    artists: { name: string }[];
    formats: { name: string }[];
    thumb: string;
  };
  date_added: string;
}

export interface WantlistResponse {
  wants: WantlistItem[];
  pagination: Pagination;
}

// Release types
export interface ReleaseArtist {
  name: string;
  id: number;
  resource_url?: string;
}

export interface ReleaseLabel {
  name: string;
  catno: string;
  entity_type?: string;
  id: number;
  resource_url?: string;
}

export interface ReleaseFormat {
  name: string;
  qty: string;
  descriptions?: string[];
}

export interface ReleaseDetails {
  id: number;
  title: string;
  artists: ReleaseArtist[];
  labels: ReleaseLabel[];
  year: number;
  formats: ReleaseFormat[];
  thumb: string;
  cover_image: string;
  genres: string[];
  styles?: string[];
  tracklist: {
    position: string;
    title: string;
    duration: string;
  }[];
  notes?: string;
  released?: string;
  country?: string;
}
