import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "./components/AppShell";
import { Hero } from "./components/Hero";
import { MediaRow } from "./components/MediaRow";
import { StatePanel } from "./components/StatePanel";
import { TrailerModal } from "./components/TrailerModal";
import { categories } from "./lib/catalog";
import type { MediaItem } from "./lib/types";
import { fetchCategory, fetchFeaturedTitle, fetchTrailer, getDisplayTitle } from "./lib/tmdb";

function App() {
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const featuredQuery = useQuery({
        queryKey: ["featured-title"],
        queryFn: fetchFeaturedTitle
    });

    const categoryQueries = useQueries({
        queries: categories.map((category) => ({
            queryKey: ["category", category.id],
            queryFn: () => fetchCategory(category)
        }))
    });

    const trailerQuery = useQuery({
        queryKey: ["trailer", selectedItem?.media_type, selectedItem?.id],
        queryFn: () => fetchTrailer(selectedItem!.media_type ?? "movie", selectedItem!.id),
        enabled: Boolean(selectedItem)
    });

    const isLoading = featuredQuery.isLoading || categoryQueries.some((query) => query.isLoading);
    const hasError = featuredQuery.isError || categoryQueries.some((query) => query.isError);

    return (
        <AppShell>
            <Hero featured={featuredQuery.data ?? null} onPlay={setSelectedItem} />

            <section className="catalog-grid" id="catalogo">
                {isLoading ? (
                    <StatePanel
                        title="Carregando catalogo"
                        description="Buscando colecoes e destaques diretamente da TMDB."
                    />
                ) : hasError ? (
                    <StatePanel
                        title="Nao foi possivel carregar o catalogo"
                        description="Verifique a chave da TMDB no ambiente ou tente novamente em alguns instantes."
                    />
                ) : (
                    categories.map((category, index) => (
                        <MediaRow
                            key={category.id}
                            category={category}
                            items={categoryQueries[index].data ?? []}
                            onPlay={setSelectedItem}
                        />
                    ))
                )}
            </section>

            <TrailerModal
                open={Boolean(selectedItem)}
                youtubeKey={trailerQuery.data?.key ?? null}
                title={selectedItem ? getDisplayTitle(selectedItem) : "Trailer"}
                onClose={() => setSelectedItem(null)}
            />
        </AppShell>
    );
}

export default App;
