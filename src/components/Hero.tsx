import { Play, Star } from "lucide-react";
import type { MediaItem } from "../lib/types";
import { getDisplayTitle, getRating, getYear, imageUrl } from "../lib/tmdb";

interface HeroProps {
    featured: MediaItem | null;
    onPlay: (item: MediaItem) => void;
}

export function Hero({ featured, onPlay }: HeroProps) {
    const background = imageUrl(featured?.backdrop_path ?? null);

    return (
        <section
            className="hero"
            id="hero"
            style={
                background
                    ? {
                          backgroundImage: `linear-gradient(90deg, rgba(5, 8, 14, 0.96) 0%, rgba(5, 8, 14, 0.74) 42%, rgba(5, 8, 14, 0.88) 100%), url(${background})`
                      }
                    : undefined
            }
        >
            <div className="hero-copy">
                <p className="eyebrow">Curadoria editorial</p>
                <h1>{featured ? getDisplayTitle(featured) : "Descubra o que assistir a seguir."}</h1>
                <p className="hero-description">
                    Uma releitura mais profissional do clone antigo, agora com destaque dinamico,
                    listas tematicas e trailer embutido a partir da API da TMDB.
                </p>

                <div className="hero-actions">
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => featured && onPlay(featured)}
                        disabled={!featured}
                    >
                        <Play size={18} />
                        Assistir trailer
                    </button>
                    <a className="secondary-button" href="#catalogo">
                        Ver catalogo
                    </a>
                </div>

                {featured ? (
                    <div className="hero-metadata">
                        <span>{featured.media_type === "tv" ? "Serie" : "Filme"}</span>
                        <span>{getYear(featured)}</span>
                        <span>
                            <Star size={14} />
                            {getRating(featured)}
                        </span>
                    </div>
                ) : null}
            </div>

            <aside className="hero-panel" id="curadoria">
                <article>
                    <strong>Experiencia</strong>
                    <span>Hero com destaque editorial e trailer sem sair do contexto.</span>
                </article>
                <article>
                    <strong>Curadoria</strong>
                    <span>Linhas organizadas por humor, genero e popularidade.</span>
                </article>
                <article>
                    <strong>Tecnologia</strong>
                    <span>React, TypeScript, Vite e cache de dados com React Query.</span>
                </article>
            </aside>
        </section>
    );
}
