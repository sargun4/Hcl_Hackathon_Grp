# Frontend

Very small frontend for the RAG demo. Serves static UI and proxies requests to the FastAPI backend.

Prereqs
- Node.js (v14+) installed
- Backend running (FastAPI) at FASTAPI_URL (default: http://localhost:8000)

Install & run
```bash
cd frontend
npm install
FASTAPI_URL=http://localhost:8000 npm start
```

Files
- UI and client logic: [public/index.html](public/index.html), [public/app.js](public/app.js), [public/style.css](public/style.css)
- Local proxy + static server: [server.js](server.js)

Usage
- Open http://localhost:3000 in your browser (default port from server.js).
- Upload PDFs and enter a prompt to send to the backend /rag/query endpoint.
