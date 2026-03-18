import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ Fix for SpeechRecognition (TS doesn't know this API) */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

/* ✅ Message type */
type Message = {
  role: "user" | "assistant";
  text: string;
  ts: number;
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const INTERVIEW_START = `${BASE_URL}/interview/start`;
const INTERVIEW_ANSWER = `${BASE_URL}/interview/answer`;

const fmt = (d: number | string | Date) =>
  new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function InterviewPage() {
  const navigate = useNavigate();

  /* ✅ States */
  const [SpeechRecognitionAPI, setSpeechRecognitionAPI] = useState<any>(null);
  const [topic, setTopic] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speakEnabled, setSpeakEnabled] = useState<boolean>(true);
  const [interviewComplete, setInterviewComplete] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);

  /* ✅ Init Speech API */
  useEffect(() => {
    setSpeechRecognitionAPI(
      window.SpeechRecognition || window.webkitSpeechRecognition || null
    );
  }, []);

  /* ✅ Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  /* ✅ Text to Speech */
  const speak = (text: string) => {
    if (!speakEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  };

  /* ✅ Mic control */
  const toggleListening = () => {
    if (!SpeechRecognitionAPI) {
      alert("Speech Recognition not supported");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new (SpeechRecognitionAPI as any)();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  /* ✅ Cleanup */
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  /* ✅ Start Interview */
  const handleStartInterview = async () => {
    if (sending) return;
    setSending(true);

    try {
      const res = await fetch(INTERVIEW_START, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      const qs: string[] = data.questions || [];

      setQuestions(qs);
      setMessages([
        { role: "assistant", text: qs[0], ts: Date.now() },
      ]);
      setStarted(true);
      speak(qs[0]);
    } catch {
      alert("Backend not running!");
    } finally {
      setSending(false);
    }
  };

  /* ✅ Send Answer */
  const sendToInterview = async () => {
    if (!input.trim() || sending) return;

    const msg = input;
    const currentQ = questions[currentQuestionIndex];

    setMessages((p) => [
      ...p,
      { role: "user", text: msg, ts: Date.now() },
    ]);

    setInput("");
    setSending(true);

    try {
      const res = await fetch(INTERVIEW_ANSWER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          question: currentQ,
          user_answer: msg,
        }),
      });

      const data = await res.json();

      const nextIndex = currentQuestionIndex + 1;
      const nextQ = questions[nextIndex];

      const reply = nextQ
        ? `${data.feedback}\n\nNext:\n${nextQ}`
        : "🎉 Interview complete!";

      setMessages((p) => [
        ...p,
        { role: "assistant", text: reply, ts: Date.now() },
      ]);

      if (nextQ) {
        setCurrentQuestionIndex(nextIndex);
        speak(nextQ);
      } else {
        setInterviewComplete(true);
      }
    } catch {
      alert("Error sending answer");
    } finally {
      setSending(false);
    }
  };

  /* ✅ UI */
  return (
    <div style={{ padding: 30, color: "white" }}>
      <h2>🎤 AI Mock Interview</h2>

      {!started ? (
        <>
          <input
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button onClick={handleStartInterview}>
            {sending ? "Starting..." : "Start"}
          </button>
        </>
      ) : (
        <>
          <div style={{ height: 300, overflow: "auto" }}>
            {messages.map((m, i) => (
              <div key={i}>
                <b>{m.role}:</b> {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {!interviewComplete && (
            <>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <button onClick={toggleListening}>
                {isListening ? "Stop Mic" : "Start Mic"}
              </button>

              <button
                onClick={sendToInterview}
                disabled={!input.trim() || sending}
              >
                Send
              </button>
            </>
          )}
        </>
      )}

      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>
    </div>
  );
}