// Simple static server + proxy endpoint that forwards form-data to FastAPI
const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint: accepts a PDF file and prompt, forwards to FastAPI
app.post('/api/ask', upload.array('files'), async (req, res) => {
    try {
        const files = req.files || [];
        const prompt = req.body.prompt || '';

        if (!files.length) return res.status(400).json({ error: 'No files uploaded' });

        // Build multipart form to forward
        const FormData = require('form-data');
        const form = new FormData();

        // append each file as "files" so FastAPI can receive List[UploadFile]
        files.forEach((f) => {
            form.append('files', f.buffer, { filename: f.originalname, contentType: f.mimetype });
        });

        form.append('prompt', prompt);

        const resp = await fetch(`${FASTAPI_URL}/ask`, {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const text = await resp.text();
        res.status(resp.status).send(text);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Proxy RAG query -> FastAPI /rag/query (multiple PDFs + prompt)
app.post('/api/query', upload.array('files'), async (req, res) => {
  try {
    const files = req.files || [];
    const prompt = req.body.prompt || '';
    if (!files.length) return res.status(400).json({ error: 'No files uploaded' });

    const FormData = require('form-data');
    const form = new FormData();
    files.forEach(f => {
      form.append('files', f.buffer, { filename: f.originalname, contentType: f.mimetype });
    });
    form.append('prompt', prompt);

    const resp = await fetch(`${FASTAPI_URL}/rag/query`, {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    const text = await resp.text();
    // Try JSON parse; fallback to raw text
    try {
      const json = JSON.parse(text);
      res.status(resp.status).json(json);
    } catch {
      res.status(resp.status).send(text);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`UI server running on http://localhost:${PORT}`));