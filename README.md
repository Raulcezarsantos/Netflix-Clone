# Streaming Showcase

Refatoracao completa do clone antigo, agora com uma identidade propria e arquitetura moderna.

## Demo

- Site publicado: https://netflix-clone-beta-orcin.vercel.app/#hero

## Stack

- React 19
- TypeScript
- Vite
- TanStack Query
- TMDB API

## Melhorias principais

- Hero editorial com destaque dinamico
- Linhas curadas por categoria com visual mais forte
- Trailer em modal usando os videos da TMDB
- Chave da API fora do codigo fonte via `env`
- Estrutura mais limpa do que a base anterior em CRA

## Ambiente

Crie um `.env.local` com:

```bash
VITE_TMDB_API_KEY=your_tmdb_v3_api_key
```

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
