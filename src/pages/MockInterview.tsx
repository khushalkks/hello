// src/pages/MockInterview.tsx

import { useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import ChatMessage from "../components/chat/ChatMessage";
import TypingIndicator from "../components/chat/TypingIndicator";
import ChatInput from "../components/chat/ChatInput";

// Inject global styles once
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
@keyframes bounce { 0%,80%,100%{transform:scale(0.7);opacity:0.4} 40%{transform:scale(1);opacity:1} }
@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
`;

function ProgressBar({ count }: { count: number }) {
  const progress = Math.min((count / 5) * 100, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          fontSize: 12,
          color: "#a78bfa",
          fontFamily: "monospace",
          letterSpacing: 1,
        }}
      >
        Q {count}/5
      </div>
      <div
        style={{
          width: 80,
          height: 4,
          background: "rgba(167,139,250,0.15)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 4,
            background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function MockInterview() {
  const { messages, state, startInterview, sendMessage, reset } = useInterview();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Inject global CSS
 useEffect(() => {
  const existing = document.getElementById("global-styles");
  if (existing) return;

  const style = document.createElement("style");
  style.id = "global-styles";
  style.innerHTML = GLOBAL_STYLES;

  document.head.appendChild(style);

  return () => {
    const el = document.getElementById("global-styles");
    if (el) document.head.removeChild(el);
  };
}, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, state.isLoading]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(20px)",
          background: "rgba(10,10,15,0.85)",
          borderBottom: "1px solid rgba(167,139,250,0.1)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🎯
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#f1f0ff",
                letterSpacing: "-0.3px",
              }}
            >
              MockPrep AI
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#7c3aed",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Powered by Llama 3.3 · Groq
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {state.isStarted && <ProgressBar count={state.questionCount} />}
          {state.isStarted && (
            <button
              onClick={reset}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#9ca3af",
                padding: "6px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        {!state.isStarted ? (
          /* Landing screen */
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
              animation: "fadeUp 0.6s ease",
            }}
          >
            <div style={{ maxWidth: 520, textAlign: "center" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(167,139,250,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  margin: "0 auto 28px",
                }}
              >
                🎙️
              </div>

              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 42,
                  fontWeight: 400,
                  color: "#f1f0ff",
                  margin: "0 0 12px",
                  letterSpacing: "-1px",
                  lineHeight: 1.15,
                }}
              >
                Ace your next
                <br />
                <span style={{ fontStyle: "italic", color: "#a78bfa" }}>
                  interview
                </span>
              </h1>

              <p
                style={{
                  fontSize: 16,
                  color: "#6b7280",
                  lineHeight: 1.7,
                  margin: "0 0 36px",
                }}
              >
                AI-powered mock interview with real-time feedback.
                <br />5 targeted questions · Detailed evaluation · Instant results
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 36,
                }}
              >
                {["Technical", "HR", "DSA", "System Design", "Behavioral"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        background: "rgba(167,139,250,0.1)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        fontSize: 12,
                        color: "#a78bfa",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <button
                onClick={startInterview}
                style={{
                  padding: "14px 40px",
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  border: "none",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "white",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(124,58,237,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(124,58,237,0.3)";
                }}
              >
                Start Interview →
              </button>
            </div>
          </div>
        ) : (
          /* Chat screen */
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 20px",
              }}
            >
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} />
                ))}

                {state.isLoading && <TypingIndicator />}

                {state.error && (
                  <div
                    style={{
                      background: "rgba(220,38,38,0.1)",
                      border: "1px solid rgba(220,38,38,0.3)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: "#fca5a5",
                      fontSize: 13,
                      marginBottom: 16,
                    }}
                  >
                    ⚠️ {state.error}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {!state.isFinished ? (
              <ChatInput onSend={sendMessage} disabled={state.isLoading} />
            ) : (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderTop: "1px solid rgba(167,139,250,0.1)",
                }}
              >
                <button
                  onClick={reset}
                  style={{
                    padding: "12px 32px",
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  🔄 Start New Interview
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}