# MeshAI

A full-stack AI assistant. Users upload PDF documents to a personal knowledge base, and the app uses retrieval-augmented generation (RAG) over MongoDB to answer questions about them in a chat interface.

**Live:** https://52.15.202.239.sslip.io

## Tech stack

- React and TypeScript (Vite) for the client
- Express 5 and TypeScript for the API
- MongoDB with Mongoose
- Docker and Docker Compose
- Caddy as the reverse proxy, with automatic HTTPS
- AWS EC2 for hosting
- GitHub Actions for CI

## Getting started

**Prerequisites:** Node.js 20+, Docker Desktop (or Docker Engine), Git

1. Clone the repository and `cd` into it:
   ```bash
   git clone https://github.com/tylock12/ai-se_project_mesh-ai.git
   cd ai-se_project_mesh-ai
   ```
2. Create your environment file from the template:
   ```bash
   cp .env.example .env
   ```
   Fill in the values in `.env`. See the table below.
3. Install dependencies for both apps:
   ```bash
   npm install --prefix server
   npm install --prefix client
   ```
4. Run the full stack in development (client and server together):
   ```bash
   npm run dev
   ```
5. Or run the full production-style stack with Docker:
   ```bash
   docker compose up --build
   ```
   The app is then served at `https://localhost` (accept the local certificate warning).

The server reads its own `server/.env` when run with `npm run dev`, so copy the values there too if you develop locally without Docker.

## Environment variables

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string. Use `mongodb://mongo:27017/meshai` for Docker Compose, or a local MongoDB URL for development. |
| `JWT_SECRET` | Secret key used to sign authentication tokens. Use a different value in every environment. |
| `NEBIUS_API_KEY` | API key for the Nebius AI service used for embeddings and chat. |
| `SITE_ADDRESS` | Domain Caddy serves and issues HTTPS certificates for. Use `localhost` locally and your public hostname in production. |
| `PORT` | Optional. Port the Express server listens on. Defaults to `3000`. |

## Project structure

- `client/`: React frontend, built into a static site and served by Caddy
- `server/`: Express API, including auth, document upload, chunking, embeddings, and chat
- `compose.yaml`: Runs MongoDB, the API, the frontend, and Caddy together
- `Caddyfile`: Routes `/api/*` to the backend and everything else to the frontend