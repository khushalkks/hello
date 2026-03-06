import requests


def clean_mermaid_output(text: str) -> str:
    if not text:
        return ""

    # Remove markdown fences
    text = text.replace("```mermaid", "")
    text = text.replace("```", "")

    # Remove everything before mindmap
    if "mindmap" in text:
        text = text[text.index("mindmap"):]

    return text.strip()


def fix_mermaid_format(text: str, topic: str) -> str:
    """
    Convert LLM tree-style output into strict Mermaid mindmap format.
    """

    lines = text.splitlines()

    fixed_lines = ["mindmap", f"  root(({topic}))"]

    for line in lines:
        line = line.strip()

        if not line:
            continue

        # Skip first mindmap line
        if line.lower() == "mindmap":
            continue

        # Remove tree markers like |-
        line = line.replace("|-", "").strip()

        # Remove bullets if present
        if line.startswith("-"):
            line = line[1:].strip()

        fixed_lines.append(f"    {line}")

    return "\n".join(fixed_lines)


def generate_mindmap(topic: str) -> str:

    if not topic.strip():
        return "mindmap\n  root((Invalid Topic))"

    url = "http://localhost:11434/api/generate"

    prompt = f"""
Generate a structured mind map in Mermaid mindmap format.

Rules:
- Only output valid Mermaid mindmap syntax
- Use indentation (no |- symbols)
- Start directly with: mindmap
- No explanation text

Topic: {topic}
"""

    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(url, json=payload)
        data = response.json()

        output_text = data.get("response", "")

        cleaned = clean_mermaid_output(output_text)

        final_output = fix_mermaid_format(cleaned, topic)

        return final_output

    except Exception as e:
        print("Ollama Error:", str(e))
        return f"""mindmap
  root(({topic}))
    Error
      Ollama not running
"""