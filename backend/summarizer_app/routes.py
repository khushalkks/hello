import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from summarizer_app.utils import extract_text_from_file
from summarizer_app.summarizer import summarize_text

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/summarize")
async def summarize_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        # ✅ Save uploaded file
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # ✅ Extract text from file
        text = extract_text_from_file(file_path)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Unable to extract text from file"
            )

        # ✅ Generate summary
        summary = summarize_text(text)

        return {
            "filename": file.filename,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # ✅ Optional: delete file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
