from pydantic import BaseModel

class RAGResponse(BaseModel):
    answer: str
    used_sources: list[str]