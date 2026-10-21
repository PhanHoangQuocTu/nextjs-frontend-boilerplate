# AGENTS.md

Instructions for AI coding agents (Codex, Claude Code and others) working in this repository.
Claude Code reads `CLAUDE.md`, which imports this file. Keep the two in sync by editing only this one.

## What this repo is

A reusable **Next.js 16 frontend boilerplate**: App Router, React 19, TypeScript 7 (strict), Tailwind v4, shadcn/ui, next-intl (`en`, `vi`), TanStack Query, Zustand, Storybook, Vitest, Docker, CI. It has no product features. `src/modules/Health` and `src/api/posts` are examples to copy, not code to extend.

## Commands

Package manager is **pnpm 12** (pinned in `package.json`, enable with `corepack enable`). Node 22.

| Task | Command |
| --- | --- |
| Install | `pnpm install` |
| Dev server | `pnpm dev` (<http://localhost:3000>, copy `.env.example` to `.env.local` first) |
| Lint / format | `pnpm lint`, `pnpm format:check`, fix with `pnpm lint:fix` and `pnpm format:fix` |
| Types | `pnpm type-check` |
| Tests | `pnpm test` (one file: `pnpm exec vitest run path/to/file.test.ts`) |
| Everything quick | `pnpm check` (lint + type-check + test) |
| Production build | `pnpm build` |
| Storybook | `pnpm storybook` (port 6006), `pnpm build-storybook` |

Run commands non-interactively. Do not start long-running servers without stopping them afterwards.

## Definition of done

Before saying a change is finished, run and read the output of:

1. `pnpm lint`, `pnpm format:check`, `pnpm type-check`, `pnpm test`
2. `pnpm build` when routes, config, metadata or env changed
3. `pnpm build-storybook` when a component or story changed

The project must stay at **zero errors and zero warnings** in all of these and in the browser console. A change that only "works" while printing warnings is not done. For UI changes, open the page (or the story) in a browser and check the console.

## Architecture map

```text
src/app/            routes only: layouts, pages, metadata, route handlers (api/), manifest, robots, sitemap, OG images
src/api/            axios clients + one folder per domain: keys.ts requests.ts queries.ts mutations.ts type.ts index.ts
src/components/ui/  shadcn/ui (generated) + a *.stories.tsx next to each component
src/components/     form-field, layouts, providers, seo, common, utilities (app-owned components)
src/constants/      const.ts, env.ts (zod-validated), routes.ts
src/enums/enum.ts   shared enums
src/types/          type.ts (shared types), translation.ts (message typing)
src/hooks/          generic hooks, barrel `@/hooks`
src/i18n/           routing, request, navigation
src/lib/            cn(), seo.ts, og-image.tsx, theme.ts, cookies, validation
src/messages/       index.ts (registry + locale parity check) and <locale>/<namespace>.json
src/modules/        page-level UI (Health is the example); pages in src/app stay thin
src/stores/         Zustand (session, modal)
src/utils/          number, date, string, object, array, api-error, common
src/proxy.ts        next-intl locale negotiation (Next 16 renamed middleware.ts to proxy.ts)
```

## Conventions

- Alias `@/*` is `src/*`. Single quotes, 2 spaces, 120 columns, formatted by Biome (not Prettier or ESLint).
- Shared types go in `type.ts`, enums in `enum.ts`, constants in `const.ts`. A feature may keep its own next to its code.
- Components `PascalCase.tsx`, hooks `useCamelCase.ts`, utils `lowercase.ts`, tests in `__tests__/`.
- Pages in `src/app` are thin: build metadata, set the request locale, render a component from `src/modules`.
- Prefer Server Components. Add `'use client'` only where state, effects or browser APIs are needed.
- Do not add dependencies unless the task needs them. Check whether the repo already has an equivalent.
- Do not leave debug code, commented-out code, or `any` without a reason.

## Translations (strictly typed)

- Use `useTranslations` from `@/hooks` in Client Components and `useTranslationsServer` from `@/hooks/useTranslationsServer` on the server (pass `locale` inside `generateMetadata`). Never import `useTranslations` or `getTranslations` from `next-intl` directly; Biome fails on it.
- Never hardcode user-visible strings. Add them to `src/messages/en/<ns>.json` **and every other locale** in the same change. A missing or extra key in any locale breaks `pnpm type-check` (error lists `missing` / `extra`). ICU placeholders must match across locales (tested).
- New namespace or locale: register it in `src/messages/index.ts` (and `LOCALES`, `LOCALE_LABELS`, `LOCALE_OG` in `src/i18n/routing.ts` for a locale).
- Use `Link`, `useRouter`, `usePathname` from `@/i18n/navigation`, not `next/navigation`.
- Do not export `useTranslationsServer` from the `@/hooks` barrel: it would pull `next-intl/server` into client bundles.

## API layer

- The browser never calls the real backend. Browser code uses `getApiRequestClient()` (BFF at `/api/*`); server code uses the direct `request` client. The real URL is `NEXT_PUBLIC_API_URL`.
- New domain: `src/api/<domain>/{keys,requests,queries,mutations,type,index}.ts` plus a mirroring Route Handler `src/app/api/<domain>/route.ts`. Copy `src/api/posts`.
- Errors reaching callers are normalised `IApiError` (`status`, `message`, `code`, `details`).
- Token refresh is opt-in through `setRefreshTokenHandler`. There is no auth provider by design.

## SEO

- Every page exports `generateMetadata` that returns `buildMetadata({ locale, path, title, description, noIndex? })` from `src/lib/seo.ts`. Do not hand-write `openGraph` or `alternates`: Next replaces nested objects, so partial ones lose data.
- Indexable pages must be added to `INDEXABLE_ROUTES` in `src/constants/routes.ts` (feeds `sitemap.ts`). Operational or private pages pass `noIndex: true`.
- Non-production environments are `noindex` automatically. OG and Twitter images live at `src/app/opengraph-image.tsx` and `twitter-image.tsx`, outside `[locale]`.

## shadcn/ui and Storybook

- Add components with `pnpm dlx shadcn@latest add <name> --overwrite`. Afterwards run `pnpm exec biome lint . --write --unsafe && pnpm exec biome format . --write`.
- The CLI may write `from "cn"` imports: change to `@/lib/utils` and make sure no `cn` package lands in `package.json`.
- `src/components/ui/sonner.tsx` must import `useTheme` from `@/components/providers/ThemeProvider` (first-party provider; `next-themes` was removed on purpose). Re-apply after overwriting.
- Do not hand-edit `ui/` files for app behaviour; wrap them in `src/components` instead.
- Every new component gets a `*.stories.tsx` next to it. Async Server Components cannot render in Storybook: split a presentational view (see `LanguageSwitcherView`).
- `useSwitchLanguage` does a full page load on purpose (avoids a React 19 script warning); do not change it back to `router.replace`.

## Environment

Only three variables exist: `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`. They are parsed in `src/constants/env.ts`; read env only through `env`. Do not add variables, API keys or secrets without the user asking. `NEXT_PUBLIC_*` is inlined at build time, so Docker takes them as build args. Never commit `.env*` files except `.env.example`.

## Dependencies and tooling gotchas

- TypeScript 7: incremental builds ignore JSON edits, so `type-check` runs with `--incremental false`. Do not remove that flag. In an editor, "Restart TS Server" clears stale translation errors.
- pnpm 12 rejects packages published less than a day ago and blocks install scripts. New build scripts need an entry in `pnpm-workspace.yaml` (`allowBuilds`). If a fresh release is rejected, pin the previous version. `@types/node` stays on the Node major used at runtime (22).
- `next build` rewrites `tsconfig.json` when it disagrees with Next's required settings; keep the committed file as is.
- Biome is relaxed only for `src/components/ui/**`, `src/app/**` and `src/lib/**` (see `biome.json`), do not widen it.
- Do not kill processes with `pkill -f <pattern>` from a shell whose own command line contains that pattern; kill by PID or port.

## Testing

Vitest + Testing Library (jsdom). Put tests in `__tests__/` next to the code. Pure logic (utils, hooks, interceptors, SEO helpers, translations) must have tests. Type-level guarantees are tested with `@ts-expect-error` (see `src/hooks/__tests__/useTranslations.types.test.ts`).

## Git

- Conventional Commits, enforced by commitlint: `type(scope): subject`, lowercase, imperative, header under 100 characters, English, no trailing period. Types: feat, fix, docs, chore, style, refactor, ci, test, revert, perf, release. See `commit-message-instructions.md`.
- **Never add `Co-Authored-By` trailers or any AI attribution** (no "Generated with ..." lines) to commits, PR descriptions or code.
- Do not commit, push, amend or rewrite history unless the user asks. Husky runs lint-staged and commitlint on commit; never bypass hooks with `--no-verify`.
- Default branch is `main`. Do not touch `legacy-main` or the `gitlab` remote.

## Codex-specific notes

- Prefer targeted commands (`pnpm exec vitest run <file>`) while iterating, then the full definition of done once.
- The sandbox may block network access. `pnpm install`, `pnpm dlx shadcn@latest` and the demo API (`jsonplaceholder.typicode.com`) need it; if blocked, say so instead of faking results.
