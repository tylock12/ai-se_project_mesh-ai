# Mesh AI

Mesh AI is a web application that lets users chat with an AI assistant and manage a knowledge base of their own documents. TODO: adjust this sentence to describe what your app actually does.

## Features

- **Intro page:** an overview of the app and how to get started
- **Knowledge base:** upload and manage documents the assistant can use
- **Chat:** ask the assistant questions in a chat interface
- **Upload area:** add files through a drag-and-drop or file-picker component

## Tech Stack

**Client**
- React with TypeScript
- Vite
- React Router

**Server**
- TODO: e.g., Node.js and Express
- TODO: any AI service or database you use

## Getting Started

You need [Node.js](https://nodejs.org/) installed. Clone the repository first:

```bash
git clone https://github.com/tylock12/ai-se_project_mesh-ai.git
cd ai-se_project_mesh-ai
```

### Run the client

```bash
cd client
npm install
npm run dev
```

The app runs at http://localhost:5173.

### Run the server

```bash
cd server
npm install
npm start
```

TODO: replace `npm start` with the command in `server/package.json` under `"scripts"`. If the server needs environment variables or API keys, list them here, for example: create a `.env` file in `server/` with `API_KEY=your_key_here`.

## Project Structure

```
ai-se_project_mesh-ai/
├── client/    React front end
│   └── src/
│       ├── components/   App, AppLayout, Header, UploadArea
│       ├── Pages/        Intro, KnowledgeBase, Chat
│       └── assets/       images and icons
└── server/    back end
```

## Author

Tymon