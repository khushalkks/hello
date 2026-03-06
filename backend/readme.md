📝 Text Summarization using DistilBART (Hugging Face)

This project implements abstractive text summarization using the pre-trained DistilBART CNN model from Hugging Face Transformers.

It takes a long input text and generates a short, meaningful, and coherent summary.

🔍 Model Used

Model Name: sshleifer/distilbart-cnn-12-6

Architecture: Transformer (Encoder–Decoder)

Task: Abstractive Text Summarization

Training Dataset: CNN / DailyMail

Framework: PyTorch

📦 Requirements

Make sure Python 3.8+ is installed on your system.

Install required dependencies:
pip install torch transformers

(Optional but Recommended)
pip install sentencepiece

📁 Project Structure
.
├── summarizer.py
├── README.md
└── requirements.txt   # optional

⚙️ How the Code Works (High Level)

Loads a pre-trained tokenizer and summarization model

Converts the input text into tokenized tensors

Uses beam search decoding to generate a high-quality summary

Decodes the generated tokens into human-readable text





2️⃣ Install dependencies


npm install mermaid


3️⃣ Install Ollama Model

Pull the Mistral model:

ollama pull mistral

Check installed models:

ollama list