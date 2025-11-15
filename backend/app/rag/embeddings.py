from langchain_huggingface import HuggingFaceEmbeddings

def get_embeddings():
    # Reuse the same model as notebook
    return HuggingFaceEmbeddings(model_name="thenlper/gte-large")