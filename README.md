# Unblocked World

SSR React implementation of the Unblocked World website, built with Vite, Express, React, and SCSS Modules.

## Requirements

- Node.js 22.9+ (the scripts use `--env-file-if-exists`; Vercel uses Node 24)
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

## Deployment and environment variables

The Submit page talks to two outside services. Both are reached through this
site's own server, so the browser never sees an API key and never calls
another domain:

| Route on this site | Goes to | Used for |
|---|---|---|
| `/api/forms/*` | the submission form API (`https://link.unblocked.world/api/forms/*`) | Artist sign-in (email code), profile, drafts, poster uploads, submit, withdraw |
| `/api/submissions` | the judging portal API (`…/api/v1/contests/<slug>/submissions`) | One-shot poster submission with an API key |

### Environment variables

Set these on the server (never with a `VITE_` prefix: those end up in the
browser bundle). For local development copy `.env.example` to `.env`.

| Variable | Required | Value | What it does |
|---|---|---|---|
| `UNBLOCKED_EXTERNAL_API_KEY` | yes, for `/api/submissions` | `ubk_…` key from the portal's **Admin → API Keys** | Authenticates one-shot submissions. Secret: keep it server-side only. |
| `UNBLOCKED_EXTERNAL_CONTEST_SLUG` | yes | the contest's slug, e.g. `ownership` (live) or `test-november` (testing) | Which contest `/api/submissions` sends posters to. Check it with `GET https://unblocked-juding-portal.peakshift.workers.dev/api/v1/contests/<slug>`: `not_found` means the slug is wrong or archived; `"acceptingSubmissions": false` means the contest is not open. |
| `UNBLOCKED_EXTERNAL_API_BASE_URL` | no | default `https://unblocked-juding-portal.peakshift.workers.dev/api/v1` | Judging portal API base. Must be HTTPS. Change it only if the portal moves. |
| `UNBLOCKED_FORM_API_ORIGIN` | no | default `https://link.unblocked.world` | Where `/api/forms/*` is forwarded. Change it only if the form service moves. |
| `SITE_URL` | no | e.g. `https://unblocked.world` | Domain used in the page links and share image of the static build (Vercel). Leave it empty on Vercel: the deployment's own domain is used (production domain on production, branch URL on previews). The Node server and Cloudflare use the domain of each request. Last fallback: `site.url` in `src/app/seo/seo-content.json`. |

Environment variables are read when the server starts or a deployment is
built: after changing one, restart the Node server or redeploy on Vercel.

### Which form / contest the Submit page uses

The Submit page calls the form named `test`
(`FORM_API = '/api/forms/test'` in `src/app/pages/submit/api/submitFormApi.js`).
The form service decides which contest that form belongs to (today `test` →
contest `test-november`). To go live, either point the `test` form at the live
contest on the form service, or change `FORM_API` to the live form's name and
redeploy. `UNBLOCKED_EXTERNAL_CONTEST_SLUG` does **not** change this; it only
affects `/api/submissions`.

### Hosting options

**Vercel** (current staging)

- `vercel.json` sets the build (`npm run build` → `dist/client`), the page
  rewrites and the rewrite of `/api/forms/:path*` to the function in
  `api/forms.js`. `api/submissions.js` serves `/api/submissions`.
- Add the variables above under **Project → Settings → Environment
  Variables** for the environment you deploy to (Production, and Preview if
  preview deployments must work), then redeploy.
- Vercel Functions accept request bodies up to 4.5 MB, so larger poster
  uploads fail on Vercel even though the form service allows 5 MB
  (JPG/PNG/PDF) and 20 MB (GIF/MP4). Use the Node server if larger files are
  needed.
- Every new client route needs a rewrite in `vercel.json`, or a refresh on
  that page returns 404.

**Own Node server** (VPS, Docker, etc.)

```bash
npm ci
npm run build
npm run start   # serves dist/client and both API routes on port 5173
```

- Provide the variables through the process environment or a `.env` file in
  the project root.
- Put the app behind HTTPS (e.g. a reverse proxy to port 5173). The artist
  session cookie from the form service is passed on with its `Secure` flag
  (removed only on `localhost`), so sign-in needs HTTPS on a real domain.
- Allow request bodies of at least 25 MB in the reverse proxy (e.g. nginx
  `client_max_body_size 25m;`) so 20 MB uploads get through.

**Cloudflare Workers** (`wrangler.jsonc`, `npm run deploy`)

- `worker/index.js` serves the pages and `/api/submissions` only; it has
  **no** `/api/forms/*` proxy yet, so the Submit page's sign-in and drafts do
  not work there. Use Vercel or the Node server for the Submit page.
- Non-secret values are in `wrangler.jsonc` → `vars` (update
  `UNBLOCKED_EXTERNAL_CONTEST_SLUG` there); set the key with
  `npx wrangler secret put UNBLOCKED_EXTERNAL_API_KEY`.

### Launch checklist

1. The live contest (e.g. `ownership`) is in **Submissions Open** in the
   judging portal admin: `GET …/api/v1/contests/ownership` shows
   `"acceptingSubmissions": true`.
2. The Submit page's form points at the live contest (see "Which form /
   contest the Submit page uses").
3. `UNBLOCKED_EXTERNAL_CONTEST_SLUG` = the live slug and
   `UNBLOCKED_EXTERNAL_API_KEY` = a valid key on the production server;
   redeployed or restarted afterwards.
4. Checks on the deployed site:
   - `GET https://<your-domain>/api/forms/test/contest` (or the live form
     name) returns JSON with the live contest and `"acceptingSubmissions": true`
     (a 404 means the `/api/forms` proxy is not deployed).
   - `GET https://<your-domain>/api/forms/test/me` returns
     `401 {"error":"unauthenticated"}` when signed out.
   - Sign in on `/submit` with a real email, save a draft, submit it, and see
     it in the judging portal.

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
