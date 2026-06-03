import { Play } from "lucide-react";
import type { CategoryConfig, MediaItem } from "../lib/types";
import { getDisplayTitle, getRating, getYear, imageUrl } from "../lib/tmdb";

interface MediaRowProps {
    category: CategoryConfig;
    items: MediaItem[];
    onPlay: (item: MediaItem) => void;
}

export function MediaRow({ category, items, onPlay }: MediaRowProps) {
    return (
        <section className="media-row">
            <div className="media-row-head">
                <div>
                    <p className="eyebrow">Colecao</p>
                    <h2>{category.title}</h2>
                </div>
                <p>{category.description}</p>
            </div>

            <div className="media-scroller">
                {items.map((item) => {
                    const image = imageUrl(category.visual === "poster" ? item.poster_path : item.backdrop_path);

                    return (
                        <article className={`media-card ${category.visual}`.trim()} key={`${category.id}-${item.id}`}>
                            <button className="media-card-hit" type="button" onClick={() => onPlay(item)}>
                                {image ? <img src={image} alt={getDisplayTitle(item)} loading="lazy" /> : null}
                                <div className="media-card-overlay">
                                    <span className="play-chip">
                                        <Play size={14} />
                                        Trailer
                                    </span>
                                    <h3>{getDisplayTitle(item)}</h3>
                                    <div className="media-card-meta">
                                        <span>{getYear(item)}</span>
                                        <span>{item.media_type === "tv" ? "Serie" : "Filme"}</span>
                                        <span>{getRating(item)}</span>
                                    </div>
                                </div>
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
