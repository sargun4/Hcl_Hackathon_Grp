import os
import tempfile
from typing import List, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from langchain_community.document_loaders import PyPDFLoader

from .rag.embeddings import get_embeddings
from .rag.splitter import get_text_splitter
from .rag.vectorstore import build_faiss_store
from .rag.agent import get_model, build_prompt
from .rag.models import RAGResponse

app = FastAPI(title="Gemini RAG Service", version="0.1.0")

# Initialize global components (embeddings + model reused)
embeddings = get_embeddings()
model = get_model()
text_splitter = get_text_splitter()

def load_file_to_docs(upload: UploadFile) -> List[Any]:
    # Exactly like the notebook: use PyPDFLoader and set metadata["source"]
    if not upload.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(upload.file.read())
        tmp.flush()
        loader = PyPDFLoader(tmp.name)
        docs = loader.load()
        for d in docs:
            d.metadata["source"] = upload.filename  # mirror notebook's explicit source field
        return docs

@app.post("/rag/query", response_model=RAGResponse)
async def rag_query(
    prompt: str = Form(...),
    files: List[UploadFile] = File(...)
):
    if not os.getenv("GOOGLE_API_KEY"):
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY not set")

    # Load documents
    all_docs: List[Document] = []
    for f in files:
        docs = load_file_to_docs(f)
        all_docs.extend(docs)

    # Split
    splits = text_splitter.split_documents(all_docs)

    # Build ephemeral vector store
    store = build_faiss_store(embeddings, splits)

    # Retrieve (match notebook default behavior)
    retrieved = store.similarity_search(prompt)
    if not retrieved:
        return RAGResponse(answer="Not enough information in the retrieved documents.", used_sources=[])

    # Build context string with source tags
    context_lines = []
    used_sources = set()
    for d in retrieved:
        src = d.metadata.get("source", "unknown")
        used_sources.add(src)
        snippet = d.page_content[:600].replace("\n", " ")
        context_lines.append(f"[{src}] {snippet}")

    context_text = "\n\n".join(context_lines)

    # Compose final prompt
    final_prompt = build_prompt(context_text, prompt)

    # Call model
    response = model.invoke(final_prompt)

    return RAGResponse(answer=response.content, used_sources=sorted(list(used_sources)))

@app.get("/health")
def health():
    return {"status": "ok"}