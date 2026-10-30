# MeshAI Server

Express + TypeScript + MongoDB backend for MeshAI.

## Features
- JWT authentication (register, login, current user)
- PDF upload with text chunking and embeddings
- Chat endpoints that answer questions using the uploaded documents

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file with your settings (such as `PORT`, `MONGO_URI`, and your API keys)
3. Start the server: `npm run dev`

## API
- `POST /auth/register`, `POST /auth/login`
- `GET /users/me`
- `GET /documents`, `POST /documents`
- `GET /chats`, `POST /chats`, `GET /chats/:id`, `POST /chats/:id/messages`