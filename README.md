<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->

# SMH-Client

A top level description of the project.

# Installation

## With Docker (recommended)

Pre-requisites:

- Docker

### Docker run

```

```

### Docker compose

1. Create empty folders `smh-client` and `smh-client/data`
2. Create the file `smh-client/compose.yaml` with the following contents:

```
services:
  smh-client:
    container_name: smh-client
    build: https://github.com/steve-king/smh-client.git
    ports:
      - '3131:3131'
    volumes:
      - type: bind
        source: ./data
        target: /app/data

```

3. cd to `smh-client` directory
4. `docker compose up -d`

## Manual installation

Pre-requisites:

- nodejs (v18 or higher)

1. Download zip and extract files, or clone: `git clone git@github.com:steve-king/smh-client.git`
2. Change to directory: `cd smh-client`
3. Install node packages: `npm install`
4. Start the server: `npm start`
