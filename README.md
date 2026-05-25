# AI Chatbot

A beginner-friendly AI chatbot powered by **Ollama** (llama3), with a React frontend and Express backend.

## Project structure

```
AI-Chatbot/
├── frontend/          # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       ├── api/
│       ├── App.jsx
│       └── main.jsx
└── backend/           # Node.js + Express
    ├── routes/
    ├── controllers/
    └── server.js
```

## Quick start (after Step 1)

### Backend

```bash
cd backend
npm install
npm run dev
```

Health check: http://localhost:5000/api/health

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

## Ollama setup (Step 3)

1. Install: https://ollama.com/download
2. Pull model: `ollama pull llama3`
3. Verify: `ollama list`
4. Test: `ollama run llama3 "Hello"`

Ollama API runs at `http://localhost:11434` by default.

## Chat API (Step 4)

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is React in one sentence?"}'
```

## Requirements

- Node.js 18+
- Ollama with `llama3` model pulled
