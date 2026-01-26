from fastapi import FastAPI
from summarizer_app.routes import router

app = FastAPI(
    title="Text Summarization API",
    description="Minor Project – NLP Text Summarizer",
    version="1.0"
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Text Summarization API is running"}
