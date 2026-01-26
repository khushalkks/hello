import os
from fastapi import APIRouter, UploadFile, File
from summarizer_app.utils import extract_text_from_file
from summarizer_app.summarizer import summarize_text

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/summarize")
async def summarize_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save file
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract text
    text = extract_text_from_file(file_path)

    # Summarize
    summary = summarize_text(text)

    return {
        "filename": file.filename,
        "summary": summary
    }
