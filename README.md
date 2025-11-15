# Hcl_Hackathon_Grp
## Problem Statement Chosen: Building A Mini-RAG Powered Assistant <br>
![](Pipeline.jpg)
Fig. 1: Data Load & Transform (LangChain) ->Embedding (Hugging Face Model via Langchain) ->Store (FAISS)->Retrieve (FAISS +LangChain)->Generate (Gemini) ->Serve (FastAPI)<br>
##Plan Implemented<br>
###Plan of Action <br>
1. Source, Load, and Transform using LangChain<br>
We will gather raw documents, load them into LangChain, and clean/structure them for further processing.<br>
2. Embedding using Hugging Face<br>
We will convert the cleaned text into numerical vector embeddings using a HuggingFace embedding model.<br>
3. Storing in FAISS<br>
We will store these embeddings in a FAISS vector database for fast semantic search and retrieval.<br>
4. Passing context to Gemini for final response generation<br>
We will retrieve the relevant chunks from FAISS and send them as context to Gemini to generate accurate answers.<br>
5. Deployment using FastAPI or Flask<br>
We will wrap the entire pipeline into a simple API using FastAPI/Flask so users can query the RAG assistant.<br>


Same Information Also Shared In The Below Doc:<br>
https://docs.google.com/document/d/1mRPzlmNzZTav-5Y-umTrdVucLc3_evJ_WxQhlPboI7M/edit?tab=t.0
