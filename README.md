# Next.js Frontend Boilerplate

A production-ready **Next.js 16** frontend starter: App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, i18n (English and Vietnamese), complete SEO, TanStack Query, Zustand, Storybook, Vitest, Docker and CI.

Clone it, rename it, delete the example `Health` module, and start building.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `output: 'standalone'`, `proxy.ts`), React 19, TypeScript 7 (strict) |
| UI | Tailwind CSS v4, shadcn/ui (new-york, all 61 components), Radix UI, Base UI, lucide-react, Framer Motion, Recharts, Sonner |
| Data | Axios (server and BFF clients), TanStack Query v5 (+ devtools), Route Handlers as BFF proxy, `/proxy/*` rewrite |
| State | Zustand (+ `auto-zustand-selectors-hook`), cookie-persisted session store |
| Forms and validation | React Hook Form, Zod v4, `@hookform/resolvers` |
| i18n | next-intl v4: `en` and `vi`, typed message keys, common client and server translation hooks |
| SEO | Per-page metadata, canonical and hreflang, Open Graph and Twitter images, JSON-LD, sitemap, robots, web manifest |
| Theming | First-party ThemeProvider (light, dark, system, no flash on load) |
| Components workbench | Storybook 10 (`@storybook/nextjs-vite`): theme and locale switchers, a11y addon |
| Quality | Biome (lint and format), Husky, lint-staged, commitlint (Conventional Commits) |
| Testing | Vitest 5, Testing Library, jsdom |
| Ops | Multi-stage Docker image, docker-compose with nginx, GitHub Actions, GitLab CI |

## Quick start

```bash
# Node >= 22 (see .nvmrc). pnpm is pinned in package.json and provided by corepack.
corepack enable
pnpm install

cp .env.example .env.local
pnpm dev                 # http://localhost:3000
pnpm storybook           # http://localhost:6006
```

Open [`/health`](http://localhost:3000/health) or `/vi/health` to see the example page: application status, uptime, round-trip latency, and a live list fetched through the proxy.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` / `pnpm lint:fix` | Biome lint |
| `pnpm format:check` / `pnpm format:fix` | Biome format |
| `pnpm type-check` | `tsc --noEmit` |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest |
| `pnpm check` | lint + type-check + test |
| `pnpm storybook` / `pnpm build-storybook` | Storybook dev server / static build |

## Project structure

```text
src/
├── app/                      # Routes only (thin): layouts, pages, metadata, route handlers
│   ├── [locale]/             # i18n segment: layout, providers, home, health, error, not-found
│   ├── api/                  # BFF route handlers (health, posts proxy example)
│   ├── manifest.ts, robots.ts, sitemap.ts, icon.svg, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx
├── api/                      # API layer, one folder per domain
│   ├── axios.ts              # `request` (server -> backend) and `requestInternal` (browser -> BFF)
│   ├── interceptors.ts       # bearer token, single-flight refresh on 401, error normalisation
│   └── health/  posts/       # keys.ts, requests.ts, queries.ts, mutations.ts, type.ts, index.ts
├── components/
│   ├── ui/                   # shadcn/ui + a *.stories.tsx next to each component
│   ├── form-field/           # React Hook Form + shadcn field wrappers
│   ├── layouts/              # Header, Footer, MainLayout, LanguageSwitcher, ThemeSwitcher
│   ├── providers/            # QueryClientProvider, ThemeProvider (first-party, no flash)
│   ├── seo/                  # JsonLd
│   ├── common/               # PageHeader, ErrorState, CopyButton
│   └── utilities/            # VStack, HStack, Show, FadeIn, StopPropagation
├── config/                   # fonts, site facts
├── constants/                # const.ts, env.ts (zod-validated), routes.ts
├── enums/                    # enum.ts
├── hooks/                    # generic hooks and barrel (`@/hooks`)
├── i18n/                     # routing, request (namespaces), navigation
├── lib/                      # cn(), seo.ts, og-image.tsx, cookies, validation regex and messages
├── messages/                 # index.ts (registry + locale parity check) and {en,vi}/*.json
├── modules/                  # page-level business UI (Health is the example)
├── stores/                   # Zustand: session, modal
├── styles/globals.css        # Tailwind v4 + shadcn tokens (light and dark)
├── types/                    # type.ts (shared), translation.ts (message typing), additional.d.ts
├── utils/                    # number, date, string, object, array, api-error, common
└── proxy.ts                  # next-intl locale negotiation (+ commented auth guard template)
.storybook/                   # Storybook config (providers, theme and locale toolbar)
tests/setup.ts                # Vitest setup
docker/                       # Dockerfile and nginx
```

### Conventions

- Shared types live in `type.ts`, enums in `enum.ts`, constants in `const.ts`. A feature may have its own next to its code (`src/api/posts/type.ts`, `src/modules/Health/const.ts`).
- Components `PascalCase.tsx`, hooks `useCamelCase.ts`, utils `lowercase.ts`. Tests go in `__tests__/`, stories sit next to the component.
- Alias `@/*` maps to `src/*`.
- Commits follow Conventional Commits. Husky runs lint-staged on commit and commitlint on the message.

## Translations (client and server)

Messages live in `src/messages/<locale>/<namespace>.json` and are registered once in `src/messages/index.ts`. English is the source of truth.

```tsx
// Client Component
import { useTranslations } from '@/hooks';

const { t, locale } = useTranslations('common.actions');
t('retry'); // keys autocomplete after the namespace
t('missing'); // compile error: not a key of "common.actions"

const { t: tAll } = useTranslations(); // no namespace: use the full path
tAll('common.actions.retry');
```

```tsx
// Server Component, generateMetadata, Route Handler
import { useTranslationsServer } from '@/hooks/useTranslationsServer';

const { t } = await useTranslationsServer('health');
const { t } = await useTranslationsServer('health', locale); // inside generateMetadata, pass the locale from params
```

What is enforced, and where:

| Mistake | Caught by |
| --- | --- |
| Unknown namespace or key in `useTranslations(...)` / `t(...)` | `pnpm type-check`, the editor, `next build` |
| A locale is missing a key, or has an extra key, compared with English | Compile error in `src/messages/index.ts` that lists the `missing` / `extra` keys |
| Different ICU placeholders (`{seconds}`) between locales, or empty strings | `pnpm test` (`src/messages/__tests__`) |
| Importing `useTranslations` / `getTranslations` straight from `next-intl` | Biome (`noRestrictedImports`); the wrappers in `src/hooks` are the only allowed place |

The typing lives in `src/types/translation.ts` and does not depend on module augmentation, so every TypeScript version and editor resolves it the same way. `useTranslationsServer` is deliberately **not** exported from the `@/hooks` barrel, so `next-intl/server` never reaches a client bundle.

**Add a key:** add it to `en/<namespace>.json` **and** every other locale; the build fails until all locales match.
**Add a language:** create `src/messages/<locale>/*.json`, register it in `src/messages/index.ts`, and add it to `LOCALES`, `LOCALE_LABELS` and `LOCALE_OG` in `src/i18n/routing.ts`.
**Add a namespace:** create the JSON file for every locale and register it in `src/messages/index.ts`.

URLs use `localePrefix: 'as-needed'`: `/health` for English, `/vi/health` for Vietnamese. Import `Link`, `useRouter` and `usePathname` from `@/i18n/navigation`, not from `next/navigation`. The language switcher does a full page load on purpose (see `useSwitchLanguage`).

> If the editor shows a stale translation error after you edit a JSON file, run **TypeScript: Restart TS Server**. `pnpm type-check` always runs from scratch (`--incremental false`) because incremental builds do not notice JSON changes under TypeScript 7.

## SEO

Everything is wired once and reused by every page:

- **Per-page metadata:** `buildMetadata()` in `src/lib/seo.ts` returns title, description, canonical URL, hreflang alternates (with `x-default`), Open Graph, Twitter and robots. Use it from `generateMetadata`. See `src/app/[locale]/page.tsx` and `src/app/[locale]/health/page.tsx`.
- **Title template:** the locale layout sets `%s | Site name`; pass `{ absolute }` to skip it.
- **Open Graph and Twitter images:** `src/app/opengraph-image.tsx` and `twitter-image.tsx` render one 1200x630 image with `next/og` (outside `[locale]`, so crawlers never hit a locale redirect).
- **Structured data:** `<JsonLd>` renders `WebSite` (layout) and `BreadcrumbList` (health page) from the builders in `src/lib/seo.ts`.
- **Crawling:** `sitemap.ts` (with per-locale alternates, driven by `INDEXABLE_ROUTES`), `robots.ts`, `manifest.ts`, `icon.svg` and `apple-icon.tsx`.
- **Safety by default:** every non-production environment (`NEXT_PUBLIC_APP_ENV` other than `production`) is `noindex` through robots metadata, `robots.txt` and an `X-Robots-Tag` header. Operational pages such as `/health` opt out with `noIndex: true`.

To add an indexable page: create the route, call `buildMetadata({ locale, path, title, description })`, and add its path to `INDEXABLE_ROUTES` in `src/constants/routes.ts`.

## API layer and proxy

The browser never calls the real backend. Two patterns are included:

1. **Route Handler (BFF)** in `src/app/api/posts/route.ts`: browser to `/api/posts` to backend `/posts`. The backend URL stays on the server, there is no CORS, and responses can be reshaped. `getApiRequestClient()` returns the direct client on the server and the BFF client in the browser, so one `requests.ts` works in both.
2. **Rewrite** in `next.config.ts`: `/proxy/*` is forwarded to `NEXT_PUBLIC_API_URL` with no code. Use it for simple pass-through.

Add a domain:

```text
src/api/<domain>/{keys,requests,queries,mutations,type,index}.ts
src/app/api/<domain>/route.ts        # mirror the backend path
```

Token refresh is opt-in. Register a handler once at start-up; without one a 401 clears the session:

```ts
setRefreshTokenHandler(async (refreshToken) => (await requestInternal.post('/auth/refresh', { refreshToken })).data);
```

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_APP_ENV` | `development`, `staging` or `production`. Non-production is `noindex` |
| `NEXT_PUBLIC_APP_URL` | Public origin of this app (canonical URLs, sitemap, Open Graph) |
| `NEXT_PUBLIC_API_URL` | Backend origin. Target of the BFF handlers and the `/proxy/*` rewrite |

Values are parsed and validated in `src/constants/env.ts`. `NEXT_PUBLIC_*` values are inlined at build time, so Docker takes them as build args.

## Storybook

`pnpm storybook` serves every shadcn component plus the app's own components (form fields, layouts, common, utilities). The toolbar switches **theme** (light and dark) and **locale** (en and vi). Providers for i18n, React Query and tooltips are applied globally in `.storybook/preview.tsx`.

Add a story next to the component as `Name.stories.tsx`. Server Components (async) cannot render in Storybook; split a presentational view out of them (see `LanguageSwitcherView`).

## shadcn/ui

All components are in `src/components/ui`. Add or refresh one with:

```bash
pnpm dlx shadcn@latest add <component> --overwrite
```

If the CLI writes `from "cn"` imports, change them to `@/lib/utils`. Biome rules are relaxed for that folder only (`biome.json` overrides).

## Testing

Vitest, Testing Library and jsdom. Tests live in `__tests__/` next to the code: utilities, hooks, the axios interceptors and a component.

## Docker

```bash
docker compose up --build        # app behind nginx on http://localhost:8080
```

`docker/Dockerfile` is multi-stage (deps, builder, runner), runs as a non-root user and has a `HEALTHCHECK` on `/api/health`. Pass `NEXT_PUBLIC_*` as build args (see `docker-compose.yml`).

## CI

- **GitHub Actions** (`.github/workflows/ci.yml`): lint, format, type-check, tests with coverage, build, Storybook build, Docker build.
- **GitLab CI** (`.gitlab-ci.yml`): the same checks plus a Kaniko image push to the project registry.

## Dependency policy

Dependencies track the latest stable releases. pnpm 12 refuses packages published less than a day ago (`minimumReleaseAge`), and install scripts are denied unless listed under `allowBuilds` in `pnpm-workspace.yaml`. `@types/node` follows the Node major used at runtime (22), not the newest.

Update everything with `pnpm up --latest`, then run `pnpm check` and `pnpm build`.
