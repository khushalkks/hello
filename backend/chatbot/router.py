from fastapi import APIRouter
from pydantic import BaseModel
from chatbot.model import generate_answer
from chatbot.interview import generate_10_questions, rate_answer_and_suggest

router = APIRouter(prefix="/chat", tags=["Chatbot"])

class ChatRequest(BaseModel):
    question: str

@router.post("")
async def chat(req: ChatRequest):
    answer = generate_answer(req.question)
    return {
        "answer": answer
    }


# ==============================
# INTERVIEW ENDPOINTS (10 Qs, rate, modify)
# ==============================
interview_router = APIRouter(prefix="/interview", tags=["Interview"])


class InterviewStartRequest(BaseModel):
    topic: str = ""


class InterviewAnswerRequest(BaseModel):
    topic: str = ""
    question: str
    user_answer: str


@interview_router.post("/start")
async def interview_start(req: InterviewStartRequest):
    """Generate 10 interview questions for the topic."""
    questions = generate_10_questions(req.topic)
    return {"questions": questions}


@interview_router.post("/answer")
async def interview_answer(req: InterviewAnswerRequest):
    """Rate the answer and return feedback + what to modify."""
    result = rate_answer_and_suggest(req.topic, req.question, req.user_answer)
    return result
