# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- The shared rules above are the source of truth. Edit `AGENTS.md`, not this file, for anything that is not Claude-specific.
- For work that touches several files (a new domain, a new locale, a new page), outline the plan first, then implement. Use the existing example (`src/api/posts`, `src/modules/Health`) as the template instead of designing from scratch.
- Use the dedicated Read, Edit and Grep tools instead of `cat`, `sed` and `grep` in Bash. Search with the code index if `.codegraph/` exists.
- Verify UI changes in a real browser when a browser tool is available: start `pnpm dev` (or `pnpm storybook`), load the page, check the console is empty, then stop the server. Test both `/health` and `/vi/health` for anything translated.
- Run the full definition of done (`pnpm lint`, `pnpm format:check`, `pnpm type-check`, `pnpm test`, plus `pnpm build` or `pnpm build-storybook` when relevant) and report the actual results. Do not claim success from a partial run.
- Commits: never add a `Co-Authored-By` trailer or any AI attribution, even if a default setting suggests it. Only commit when asked.
- When a request is ambiguous about scope (new dependency, new env variable, new locale), ask before adding it. The boilerplate stays minimal on purpose.
