"""AI Interviewer - 10 questions, rate answer, suggest modifications."""
import re
from chatbot.model import generate_answer

def _generate_with_prompt(prompt: str, max_len: int = 256) -> str:
    return generate_answer(prompt, max_output_length=max_len)


def generate_10_questions(topic: str) -> list[str]:
    """Generate 10 interview questions for the topic. Uses 2 calls to get 10."""
    topic_ctx = topic.strip() if topic else "general job interview"
    questions = []

    for part in [1, 2]:
        prompt = f"""List exactly 5 short interview questions for topic: {topic_ctx}.
Output ONLY the questions, one per line. No numbering. Part {part}. Questions:"""
        out = _generate_with_prompt(prompt, max_len=200)
        lines = [q.strip() for q in out.replace("?", "?\n").split("\n") if q.strip()]
        for line in lines:
            q = line.strip()
            if not q.endswith("?"):
                q = q + "?"
            if q and q not in questions:
                questions.append(q)
            if len(questions) >= 10:
                break
        if len(questions) >= 10:
            break

    # If we got fewer than 10, pad with generic ones
    generic = [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "Why do you want this role?",
        "Describe a challenging project.",
        "How do you handle conflict?",
        "What is your greatest achievement?",
        "Why should we hire you?",
        "What do you know about our company?",
        "Do you have any questions for us?",
    ]
    while len(questions) < 10:
        for g in generic:
            if g not in questions:
                questions.append(g)
                break
        if len(questions) >= 10:
            break

    return questions[:10]


def rate_answer_and_suggest(topic: str, question: str, user_answer: str) -> dict:
    """
    Rate the user's answer (out of 10), give feedback, and suggest 2-3 modifications.
    """
    prompt = f"""You are an interviewer. Rate this candidate's answer.

Topic: {topic or 'General'}
Question: {question}
Candidate's answer: {user_answer}

Respond in this exact format:
Rating: X/10
Feedback: (one sentence)
Modify: 1) (first improvement) 2) (second improvement) 3) (third improvement)

Keep each point short. Output ONLY the above format."""

    out = _generate_with_prompt(prompt, max_len=256)
    text = (out or "").strip()

    # Parse into structured response
    rating = "—"
    feedback = ""
    modify = []

    for line in text.split("\n"):
        line = line.strip()
        if line.lower().startswith("rating:"):
            rating = line.replace("rating:", "").strip()
        elif line.lower().startswith("feedback:"):
            feedback = line.replace("feedback:", "").strip()
        elif line.lower().startswith("modify:"):
            rest = line.replace("modify:", "").strip()
            parts = re.split(r"\s*\d+\)\s*", rest)
            modify = [p.strip() for p in parts if p.strip()][:3]

    if not modify and "modify" in text.lower():
        # Fallback: take rest of text as suggestions
        modify = [text]

    return {
        "rating": rating,
        "feedback": feedback or text,
        "suggestions": modify if modify else ["Try adding more specific examples.", "Structure your answer (situation, action, result)."],
    }
