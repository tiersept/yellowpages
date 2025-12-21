# Yellowpages

Exploration of Turborepo setup with Next.js, Postgres database with Prisma ORM.

- Seperation of concerns by packages in a monorepo
- Wanted to test Prisma v7 and its studio
- Showcased parallel and intercepting routes while keeping clean urls and managing state
- Server side data fetching with a Suspense example
- PostgreSQL in docker with the idea of making use of PGVector for embeddings of the users and perform similarity searches. Didn't get to that part.
- Tab through user list

## Things to be aware

- Not fully fleshed out a DS
- Not made use of design tokens
- All round styling needs refinement
- Mobile not optimized
- Acccessibility can be refined

# To get started

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18 (see `.nvmrc` for recommended version)
- [pnpm](https://pnpm.io/) 10.19.0
- [Docker](https://www.docker.com/) for database container

## Setup

1. Use the correct Node version (if using nvm):

```bash
nvm use
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Create .env file in packages/db/
echo 'DATABASE_URL="postgresql://yellowpages:yellowpages@localhost:5432/yellowpages?schema=public"' > packages/db/.env

# Create .env file in apps/web/
cat > apps/web/.env << EOF
DATABASE_URL="postgresql://yellowpages:yellowpages@localhost:5432/yellowpages?schema=public"
NEXT_PUBLIC_MAPBOX_TOKEN="TOKEN"
EOF
```

4. Start the database (ensure Docker is installed and running):

```bash
# Using pnpm script
pnpm db:start

# Or directly with docker compose
docker compose up -d
```

5. Generate Prisma client and run migrations:

```bash
pnpm turbo run db:generate --filter=@repo/db
pnpm turbo run db:migrate --filter=@repo/db
pnpm turbo run db:seed --filter=@repo/db
```

6. Start the development server:

```bash
pnpm turbo dev
```

The app will be available at http://localhost:3000

## Running Prisma Studio

To open Prisma Studio (a visual database browser):

```bash
pnpm turbo run db:studio --filter=@repo/db
```

Prisma Studio will be available at http://localhost:51212

## Tech Stack

- [Turborepo](https://turborepo.com/) for monorepo
- [PostgreSQL](https://www.postgresql.org/) for database
- [Docker](https://www.docker.com/) for database container
- [Prisma](https://www.prisma.io/) for ORM
- [Motion](https://motion.dev/) for animation
- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
