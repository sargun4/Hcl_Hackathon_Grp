# Backend

Prereqs
- Linux machine with Conda (or Python 3.11+)
- GPU/CPU resources depending on embedding model
- Ensure you do NOT commit secrets 

1) Create environment & install
```bash
conda create -n hcltech python=3.11 -y
conda activate hcltech
pip install -r requirements.txt
```

2) Set environment variables
- Put your key in `.env` or export directly. NEVER commit secrets.
```bash
# using the repo .env (example present at /home/asa/hcltech/.env)
export GOOGLE_API_KEY="$(grep ^GOOGLE_API_KEY .env | cut -d'=' -f2-)"
```

3) Run the API (development)
```bash
cd /home/asa/hcltech
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Open: http://localhost:8000/docs
```

4) Example curl request (PDF only)
```bash
curl -v -X POST http://localhost:8000/rag/query \
  -F "prompt=Explain the SMPL model" \
  -F "files=@/full/path/to/SMPL2015.pdf;type=application/pdf"
```

5) Run tests
```bash
pip install pytest
pytest -q
