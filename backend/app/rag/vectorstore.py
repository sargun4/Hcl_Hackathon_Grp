import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS

def build_faiss_store(embeddings, docs):
    # Match notebook exactly
    dim = len(embeddings.embed_query("hello world"))
    index = faiss.IndexFlatL2(dim)
    store = FAISS(
        embedding_function=embeddings,
        index=index,
        docstore=InMemoryDocstore(),
        index_to_docstore_id={},
    )
    store.add_documents(docs)
    return store