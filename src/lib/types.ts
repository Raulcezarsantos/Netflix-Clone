export type MediaType = "movie" | "tv";

export interface MediaItem {
    id: number;
    media_type?: MediaType;
    title?: string;
    name?: string;
    original_name?: string;
    overview: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
}

export interface MediaResponse {
    results: MediaItem[];
}

export interface VideoItem {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface VideoResponse {
    results: VideoItem[];
}

export interface CategoryConfig {
    id: string;
    title: string;
    endpoint: string;
    mediaType: MediaType;
    visual: "poster" | "backdrop";
    description: string;
}
