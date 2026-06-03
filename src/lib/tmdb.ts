import type { CategoryConfig, MediaItem, MediaResponse, VideoItem, VideoResponse } from "./types";

const API_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function getApiKey(): string {
    const key = import.meta.env.VITE_TMDB_API_KEY;

    if (!key) {
        throw new Error("Missing VITE_TMDB_API_KEY. Configure a TMDB API key in your environment.");
    }

    return key;
}

async function request<T>(endpoint: string): Promise<T> {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await fetch(`${API_BASE}${endpoint}${separator}api_key=${getApiKey()}`);

    if (!response.ok) {
        throw new Error(`TMDB request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export function imageUrl(path: string | null): string | null {
    return path ? `${IMAGE_BASE}${path}` : null;
}

export async function fetchCategory(category: CategoryConfig): Promise<MediaItem[]> {
    const data = await request<MediaResponse>(category.endpoint);

    return data.results
        .filter((item) => item.poster_path || item.backdrop_path)
        .map((item) => ({
            ...item,
            media_type: item.media_type ?? category.mediaType
        }));
}

export async function fetchFeaturedTitle(): Promise<MediaItem | null> {
    const data = await request<MediaResponse>("/trending/all/week?language=pt-BR");
    const candidates = data.results.filter((item) => item.backdrop_path && item.overview);

    if (candidates.length === 0) {
        return null;
    }

    const sorted = [...candidates].sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
    const featured = sorted[0];

    return {
        ...featured,
        media_type: featured.media_type ?? (featured.title ? "movie" : "tv")
    };
}

export async function fetchTrailer(mediaType: "movie" | "tv", id: number): Promise<VideoItem | null> {
    const data = await request<VideoResponse>(`/${mediaType}/${id}/videos?language=pt-BR`);
    const candidates = data.results.filter((video) => video.site === "YouTube");

    return (
        candidates.find((video) => video.type === "Trailer") ??
        candidates.find((video) => video.type === "Teaser") ??
        candidates[0] ??
        null
    );
}

export function getDisplayTitle(item: MediaItem): string {
    return item.title || item.name || item.original_name || "Sem titulo";
}

export function getYear(item: MediaItem): string {
    const value = item.release_date || item.first_air_date;
    return value ? value.slice(0, 4) : "----";
}

export function getRating(item: MediaItem): string {
    return item.vote_average ? item.vote_average.toFixed(1) : "--";
}
