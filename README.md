# Hcl_Hackathon_Grp
## Problem Statement Chosen: Building A Mini-RAG Powered Assistant <br>
![](Pipeline.jpg)
Fig. 1: Data Load & Transform (LangChain) ->Embedding (Hugging Face Model via Langchain) ->Store (FAISS)->Retrieve (FAISS +LangChain)->Generate (Gemini) ->Serve (FastAPI)<br>
## Plan Implemented<br>
### Plan of Action <br>
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

### Structure and Flow
#### 1. Introduction
This project is a Retrieval-Augmented Generation (RAG) based chatbot that can answer questions using information stored in a document corpus.
 Instead of relying only on an LLM, the system retrieves relevant information from documents and generates accurate, context-based responses.
The entire project consists of:<br>
- A Python FastAPI backend that runs the RAG pipeline<br>
- A Node.js + HTML/JS frontend that provides a chat interface<br>

A clean and modular code structure so each part of the RAG workflow is easy to understand and extend
The final result is a fully working end-to-end RAG application.
#### 2. What the Project Does
When a user asks a question, the system:<br>
-Converts the question into embeddings<br>
-Finds the most relevant document chunks using vector similarity<br>
-Sends the question + retrieved context to an LLM<br>

Returns a final answer to the user. This makes the chatbot accurate and grounded — it answers based on real documents, not hallucinations.<br>
#### 3. Backend Overview (FastAPI + Python)
The backend is the main engine of the project. It performs all RAG operations.<br>
**Backend Components**<br>
-main.py: Runs the FastAPI server and exposes the /query API endpoint. This is what the frontend calls.<br>
-splitter.py: Breaks large documents into smaller chunks so retrieval becomes more accurate.<br>
-embeddings.py: Converts text into numerical embeddings using a transformer model.<br>
-vectorstore.py: Stores embeddings and performs similarity search. This is how the system finds relevant information.<br>
-models.py: Loads and connects to the LLM (like an OpenAI model).<br>
-agent.py: This file combines everything by retrieving relevant chunks, builds the final prompt,generates the answer using the LLM. This is the “brain” of the RAG pipeline.<br>
-tests/test_rag.py: Contains tests to verify the RAG pipeline and retrieval logic.<br>

Overall, the backend is modular and easy to extend — you can plug in new models, new documents, or new vector stores without rewriting everything.
#### 4. Frontend Overview (Node.js + HTML/CSS/JS)
The frontend provides a simple chat interface that the user interacts with.<br>
**Frontend Files**<br>
-index.html: The structure of the page — message area, input box, send button.<br>
-style.css: Styles the chat box, user messages, and bot responses.<br>
-app.js: The logic of the frontend is that it first reads user input;second it displays user message; third, it sends request to backend; fourth, it displays the bot's response<br>
-server.js: A simple Node.js server that hosts the frontend on localhost:3000.<br>
The frontend is intentionally simple and clean, making it easy for anyone to use.<br>
#### 5. How Everything Works Together
-User types a question in the chat UI<br>
-Frontend sends it to the FastAPI backend<br>
**Backend:**<br>
-embeds the question<br>
-retrieves similar document chunks<br>
-sends the context + question to the LLM<br>
-receives the generated answer<br>
-Backend returns the answer<br>
-Frontend displays it in the chat window<br>
This flow feels smooth and natural, just like using ChatGPT but with your own knowledge base.<br>
#### 6. Features of the System
-Fully functional end-to-end RAG implementation.<br>
-Simple and clean user interface. Modular architecture<br>
-Accurate, context-based answers<br>
-Easy to extend (more documents, more models, cloud vector stores, etc.)<br>
-Fast and responsive<br>


#### 7. Conclusion
This project successfully demonstrates how to build a real Retrieval-Augmented Generation system from scratch.
 It shows how document chunking, embeddings, vector search, and LLMs can be combined into a single working application.
The system is practical, scalable, and can be extended into:<br>
-enterprise knowledge assistants<br>
-PDF-based Q&A bots<br>
-internal documentation search tools<br>
-domain-specific chatbots<br>
Overall, this is a solid foundation for any real-world AI assistant.<br>

The implementation details of running the frontend and backend on your system is given respective in their READMEs(README files are inside the frontend and backend folder).<br>

Same Information Also Shared In The Below Doc:<br>
https://docs.google.com/document/d/1mRPzlmNzZTav-5Y-umTrdVucLc3_evJ_WxQhlPboI7M/edit?tab=t.0
