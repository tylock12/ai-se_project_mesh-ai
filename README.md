# MeshAI

MeshAI is a full-stack web application. Users upload PDF documents to a personal knowledge base, and an AI assistant answers questions about those documents in a chat interface. Answers are grounded in the uploaded text using retrieval-augmented generation (RAG): documents are split into chunks, each chunk is embedded, and the most relevant chunks are retrieved from MongoDB to answer each question.

**Live:** https://52.15.202.239.sslip.io

## Features

- Account registration and login with JWT authentication
- Knowledge base: upload, list, and delete PDF documents
- Chat with the assistant about your documents
- Rate limiting on login and registration
- Structured request and application logging

## Tech stack

**Client:** React, TypeScript, Vite, React Router

**Server:** Node.js 20, Express 5, TypeScript, Mongoose, Morgan (request logs), Winston (application logs), express-rate-limit, multer (uploads), pdf-parse, OpenAI SDK for the Nebius AI API

**Database:** MongoDB 7

**Infrastructure:** Docker and Docker Compose, Caddy (reverse proxy with automatic HTTPS), AWS EC2

**CI:** GitHub Actions. Every pull request and push to `main` builds and lints the client and the server.

## Getting started

### Prerequisites

- Node.js 20 or newer
- Docker Desktop (or Docker Engine) for the full stack
- Git

### 1. Clone the repository

```bash
git clone https://github.com/tylock12/ai-se_project_mesh-ai.git
cd ai-se_project_mesh-ai
```

### 2. Create the environment files

Copy the template at the project root:

```bash
cp .env.example .env
```

Fill in the values in the root `.env`. Docker Compose reads this file.

For development without Docker, `npm run dev` in `server/` reads `server/.env`, so create that file too. Use the same values, except `MONGO_URI`, which should point to a local MongoDB (for example `mongodb://127.0.0.1:27017/meshai`).

### 3. Option A: development (no Docker)

Install dependencies, then start the server and client in two terminals:

```bash
npm install --prefix server
npm install --prefix client

npm run dev --prefix server    # API on http://localhost:3000
npm run dev --prefix client    # app on http://localhost:5173
```

The Vite dev server forwards requests starting with `/api` to the API on port 3000, removing the `/api` prefix. Open http://localhost:5173 in your browser. MongoDB must be running locally, or `MONGO_URI` must point to a hosted instance.

### 4. Option B: full stack with Docker

```bash
docker compose up --build
```

This starts MongoDB, the API, the frontend, and Caddy. Open https://localhost. Your browser will warn about the local certificate, which is expected.

To stop the stack, press Ctrl+C, then run `docker compose down`.

## Environment variables

Set these in the root `.env` for Docker Compose, and in `server/.env` for development without Docker.

| Variable | Used by | Description |
| --- | --- | --- |
| `MONGO_URI` | server | MongoDB connection string. Use `mongodb://mongo:27017/meshai` inside Docker Compose, or a local URL for development. |
| `JWT_SECRET` | server | Secret used to sign authentication tokens. Use a different value in every environment. |
| `NEBIUS_API_KEY` | server | API key for the Nebius AI service, used for embeddings and chat. |
| `SITE_ADDRESS` | Caddy | Hostname Caddy serves and gets an HTTPS certificate for. Use `localhost` locally and your public hostname in production. |
| `PORT` | server | Optional. Port the API listens on. Defaults to `3000`. |
| `NODE_ENV` | server | Set to `development` by the `dev` script and to `production` in the Docker stack. Controls log format and whether rate limits apply. |

## Routing

Requests to `/api/*` are routed differently in development and production, but both strip the `/api` prefix before reaching the Express router, so the router mounts at the root:

- **Development:** the Vite proxy in `client/vite.config.ts` rewrites `/api/...` to `/...` and forwards it to port 3000.
- **Production:** the root `Caddyfile` runs `uri strip_prefix /api` before forwarding to the backend.

Both changes must stay in sync, or API calls return 404.

## Deployment

The app runs on an AWS EC2 instance with Docker Compose:

1. Point a DNS name at the instance's public IP, or use a `sslip.io` hostname built from the IP.
2. Open ports 80 and 443 in the instance's security group. Caddy needs port 80 to issue the certificate.
3. Create `.env` on the server with production values, including a new `JWT_SECRET`.
4. Run `sudo docker compose up --build -d`.

## Project structure

- `client/`: React frontend, built into static files and served by Caddy in production
- `server/`: Express API, including auth, document upload and parsing, chunking, embeddings, and chat
- `compose.yaml`: Runs MongoDB, the API, the frontend, and Caddy together
- `Caddyfile`: The public reverse proxy. Sends `/api/*` to the API and everything else to the frontend
- `.github/workflows/ci.yaml`: CI pipeline for the client and server