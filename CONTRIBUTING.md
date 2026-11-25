# Contributing

Thank you for helping improve the boilerplate. For a substantial change, open an issue first to discuss its scope and compatibility. Please keep pull requests focused and explain the problem, the change, and how you verified it.

## Get started

1. Install the Node LTS version in `.nvmrc` and the pnpm version pinned in `package.json` using the README quick start.
2. Fork and clone the repository, then run `pnpm install --frozen-lockfile`.
3. Copy `.env.example` to `.env.local` and run `pnpm dev`. Run `pnpm storybook` for component work.
4. Create a branch, make your changes, and add tests or stories where appropriate.

The [README](README.md) describes the architecture, commands, translations, API layer, and deployment setup. [AGENTS.md](AGENTS.md) records the project conventions and verification requirements.

## Verify your changes

Run these commands before opening a pull request:

```bash
pnpm verify
```

Run `pnpm build-storybook` for component, story or UI dependency changes. Check affected UI in a browser, including its console. For route, API or SEO changes, verify HTTP status, redirects and rendered metadata in the relevant locales. Changes to translations must update every supported locale and preserve matching ICU placeholders.

Husky applies safe fixes to staged files before running `pnpm verify` on a temporary checkout of the index. Before push it checks each distinct outgoing branch or tag tip. The checks use the lockfile in each snapshot and can download missing dependencies. Export any required build environment values in your shell. Keep local `.env` files out of Git. Commits use the format in [commit-message-instructions.md](commit-message-instructions.md).

Set the CI quality and image checks as required on protected branches when adopting the repo.

## Reporting problems

Use the issue templates for reproducible bugs and feature proposals. Do not include credentials, tokens, private customer data, or undisclosed security vulnerabilities in public issues. If GitHub private vulnerability reporting is enabled, use the repository's Security tab; otherwise ask the maintainers for a private reporting channel without publishing sensitive details.
