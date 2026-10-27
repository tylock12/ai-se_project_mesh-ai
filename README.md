# Mesh AI

Mesh AI is a web application that lets teams build a knowledge base from their PDF documents and chat with an AI assistant that answers questions using those documents.

## Features

- **Intro page:** an overview of the app and how to get started
- **Knowledge base:** upload and manage documents the assistant can use
- **Chat:** ask the assistant questions in a chat interface
- **Upload area:** add files through a drag-and-drop or file-picker component


## Tech Stack

**Client**
- React 19
- TypeScript
- Vite
- React Router

**Server**
- Node.js
- Express 5
- TypeScript
- MongoDB integration through Mongoose

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
```

Create a `.env` file in the `server/` folder with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
NEBIUS_API_KEY=your_api_key
PORT=3000
```

Then start the server in development mode:

```bash
npm run dev
```

Or build and run it for production:

```bash
npm run build
npm start
```

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