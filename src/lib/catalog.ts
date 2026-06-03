import type { CategoryConfig } from "./types";

export const categories: CategoryConfig[] = [
    {
        id: "trending",
        title: "Em alta nesta semana",
        endpoint: "/trending/movie/week?language=pt-BR",
        mediaType: "movie",
        visual: "backdrop",
        description: "Filmes que estao dominando o assunto nesta semana."
    },
    {
        id: "top-rated",
        title: "Premiados e prestigiados",
        endpoint: "/movie/top_rated?language=pt-BR",
        mediaType: "movie",
        visual: "poster",
        description: "Titulos fortes para quem quer repertorio e qualidade."
    },
    {
        id: "series-binge",
        title: "Series para maratonar",
        endpoint: "/discover/tv?language=pt-BR&sort_by=popularity.desc&with_origin_country=US",
        mediaType: "tv",
        visual: "poster",
        description: "Series populares com cara de sessao longa."
    },
    {
        id: "sci-fi",
        title: "Sci-fi e mundos expandidos",
        endpoint: "/discover/movie?language=pt-BR&with_genres=878",
        mediaType: "movie",
        visual: "backdrop",
        description: "Espaco, tecnologia e ficcao com visual forte."
    },
    {
        id: "crime",
        title: "Tensao e investigacao",
        endpoint: "/discover/tv?language=pt-BR&with_genres=80",
        mediaType: "tv",
        visual: "poster",
        description: "Series de crime, thriller e conflitos densos."
    }
];
