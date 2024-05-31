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

SMH-Client is a self-hosted web application for monitoring the data that your Spacemesh nodes and post services expose via their gRPC APIs.

- A node.js server will maintain gRPC streaming calls with all of your configured instances.
- The server continuously collects this data, holding an up-to-date global 'state' object in memory.
- Whenever the state changes, an 'update' websocket event is emitted to all connected clients.
- When the web browser receives the websocket event, it will immediately fetch the latest state from the server, using a good old http request.
- If you have a VPN or ZTNA (Zero Trust Network Access) solution for remote access, you can easily check on your nodes from any location.
- (Work in progress) - You can also set email alerts to trigger whenever a significant event occurs (e.g when a node goes offline, or when a post service starts/finishes proving)

# Installation

## via Docker (recommended)

Pre-requisites:

- Docker

### Docker compose

Preferred method.

1. Create empty folders: `smh-client` and `smh-client/data`
2. Create file `smh-client/compose.yaml` with the following contents:

```
services:
  smh-client:
    container_name: smh-client
    build: github.com/steve-king/smh-client.git
    ports:
      - '3131:3131'
    volumes:
      - ./data:/app/data
```

3. cd to `smh-client` directory
4. run: `docker compose up -d`

### Docker run

Alternatively, you can just run the following command:

```

```

## Manual installation

Pre-requisites:

- git
- nodejs (v18 or higher)

1. clone repository: `git clone git@github.com:steve-king/smh-client.git`
2. Change to directory: `cd smh-client`
3. Initialise submodule: `git submodule update --init --recursive`
4. Install node packages: `npm install`
5. Compile and run: `npm run build && npm start`
6. Or for dev environment: `npm run dev`
