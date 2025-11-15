# Hcl_Hackathon_Grp
## Problem Statement Chosen: Building A Mini-RAG Powered Assistant <br>
![](Pipeline.jpg)
Fig. 1: Data Load & Transform (LangChain) ->Embedding (Hugging Face Model via Langchain) ->Store (FAISS)->Retrieve (FAISS +LangChain)->Generate (Gemini) ->Serve (FastAPI/Flask)
##Plan Implemented
###Plan of Action 
1. Source, Load, and Transform using LangChain
We will gather raw documents, load them into LangChain, and clean/structure them for further processing.
2. Embedding using Hugging Face
We will convert the cleaned text into numerical vector embeddings using a HuggingFace embedding model.
3. Storing in FAISS
We will store these embeddings in a FAISS vector database for fast semantic search and retrieval.
4. Passing context to Gemini for final response generation
We will retrieve the relevant chunks from FAISS and send them as context to Gemini to generate accurate answers.
5. Deployment using FastAPI or Flask
We will wrap the entire pipeline into a simple API using FastAPI/Flask so users can query the RAG assistant.


Same Information Also Shared In The Below Doc:<br>
https://docs.google.com/document/d/1mRPzlmNzZTav-5Y-umTrdVucLc3_evJ_WxQhlPboI7M/edit?tab=t.0
