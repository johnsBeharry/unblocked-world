# Unblocked World

SSR React implementation of the Unblocked World website, built with Vite, Express, React, and SCSS Modules.

## Requirements

- Node.js 18+
- npm

## Getting started

```bash
npm install
npm run dev
```

The local development server runs at [http://localhost:5173](http://localhost:5173).

## Available routes

- `/` — Home
- `/posters` — Posters
- `/guidelines` — Guidelines
- `/submit` — Submit

## Scripts

```bash
npm run dev       # Start the local SSR development server
npm run build     # Build the client and SSR bundles
npm run start     # Start the production SSR server
```

## Project structure

```text
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   └── footer/
│   ├── pages/
│   │   ├── home/
│   │   ├── posters/
│   │   ├── guidelines/
│   │   └── submit/
│   └── styles/
├── entry-client.jsx
└── entry-server.jsx
```

Each reusable component keeps its JSX and SCSS Module together. Shared sizing uses the `vw()` Sass function with a `1440px` base size:

```scss
@function vw($sizeInPx) {
  @return #{calc($sizeInPx * 1px / var(--base-size) * 100vw)};
}
```
