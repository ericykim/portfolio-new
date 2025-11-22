# Portfolio Monorepo

This is a Turborepo-based monorepo for a portfolio website with a Next.js frontend and Sanity Studio CMS.

## What's inside?

This Turborepo includes the following apps:

### Apps

- `web`: A [Next.js](https://nextjs.org/) app for the portfolio website
- `studio`: A [Sanity Studio](https://www.sanity.io/) app for content management

### Packages

- Place shared packages here in the future (e.g., shared UI components, config, utilities)

## Getting Started

### Install dependencies

```bash
bun install
```

### Development

To run all apps in development mode:

```bash
bun dev
```

To run a specific app:

```bash
# Run only the web app
bun dev --filter=@portfolio/web

# Run only the studio
bun dev --filter=@portfolio/studio
```

### Build

Build all apps:

```bash
bun build
```

Build a specific app:

```bash
bun build --filter=@portfolio/web
```

### Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## Workspace Structure

```
portfolio-new/
├── apps/
│   ├── web/          # Next.js portfolio website
│   └── studio/       # Sanity Studio CMS
├── packages/         # Shared packages (empty for now)
├── turbo.json        # Turborepo configuration
└── package.json      # Root workspace configuration
```
