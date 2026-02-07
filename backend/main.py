from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from summarizer_app.routes import router as summarize_router
from chatbot.router import router as chatbot_router

app = FastAPI(
    title="AI Notebook Backend",
    description="Text Summarizer + Document Chatbot (DistilBART)",
    version="1.0"
)

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(summarize_router)   # /summarize
app.include_router(chatbot_router)     # /chat

@app.get("/")
def root():
    return {
        "message": "AI Notebook API running",
        "endpoints": ["/summarize", "/chat"]
    }
