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

## Requirements

- Node.js 18+
- Ollama (setup in Step 3)
