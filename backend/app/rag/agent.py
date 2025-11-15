from langchain.chat_models import init_chat_model

SYSTEM_TEMPLATE = """You are a research assistant specialized in analyzing scientific papers.

You must only use the retrieved context to answer. If the answer cannot be fully supported by the provided context, say “Not enough information in the retrieved documents.”
When answering:
- Cite passages using [source_<n>] where <n> is from document metadata 'source'.
- Do not hallucinate.
- Use clear, structured academic language.
- Reference which chunks support each point.
"""

def get_model():
    # Model name from notebook
    return init_chat_model("google_genai:gemini-2.5-flash-lite")

def build_prompt(context_text: str, user_query: str):
    return f"{SYSTEM_TEMPLATE}\n\nRetrieved Context:\n{context_text}\n\nUser Query: {user_query}"