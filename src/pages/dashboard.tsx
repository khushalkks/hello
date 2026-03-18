import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const features = [
  {
    id: "summary",
    route: "/summary",
    num: "01",
    title: "Smart Summary",
    tagline: "Distill any document into crisp, structured text",
    desc: "AI reads your full document and produces a concise, structured summary — key points, themes, and takeaways in seconds.",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.35)",
    faintGlow: "rgba(124,58,237,0.08)",
    badge: "Text",
  },
  {
    id: "mindmap",
    route: "/mindmap",
    num: "02",
    title: "Mind Map",
    tagline: "Visualise knowledge as an interactive graph",
    desc: "Transforms document concepts into a branching mind map — understand structure, connections, and hierarchy at a glance.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.35)",
    faintGlow: "rgba(168,85,247,0.08)",
    badge: "Visual",
  },
  {
    id: "flashcard",
    route: "/flashcards",
    num: "03",
    title: "Flash Cards",
    tagline: "Learn faster with AI-generated study cards",
    desc: "Auto-generates question/answer flashcards from your content.",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
    faintGlow: "rgba(192,132,252,0.08)",
    badge: "Study",
  },
  {
    id: "chatbot",
    route: "/chatbot",
    num: "04",
    title: "AI Chatbot",
    tagline: "Converse with your document's knowledge",
    desc: "Ask anything. The chatbot answers using only your document.",
    color: "#f0abfc",
    glow: "rgba(240,171,252,0.35)",
    faintGlow: "rgba(240,171,252,0.08)",
    badge: "Chat",
  },
  {
    id: "quiz",
    route: "/quiz",
    num: "05",
    title: "Quiz Mode",
    tagline: "Test your understanding with smart quizzes",
    desc: "Generates MCQ and short-answer quizzes.",
    color: "#e879f9",
    glow: "rgba(232,121,249,0.35)",
    faintGlow: "rgba(232,121,249,0.08)",
    badge: "Test",
  },
  {
    id: "interview",
    route: "/interview",
    num: "06",
    title: "Mock Interview",
    tagline: "Answer verbally — AI asks, you speak",
    desc: "Practice interviews with AI.",
    color: "#d8b4fe",
    glow: "rgba(216,180,254,0.35)",
    faintGlow: "rgba(216,180,254,0.08)",
    badge: "Career",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        body { margin: 0; }

        .db-page {
          background: #06030f;
          min-height: 100vh;
          color: #e9d5ff;
          font-family: sans-serif;
        }

        .db-grid {
          max-width: 1200px;
          margin: auto;
          padding: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feat-card {
          position: relative;
          background: rgba(13,7,32,0.8);
          border-radius: 20px;
          padding: 30px;
          cursor: pointer;
          transition: 0.3s;
          overflow: hidden;
        }

        .feat-card:hover {
          transform: translateY(-6px);
        }

        .feat-card-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, var(--card-color-faint), transparent 60%);
          opacity: 0;
          transition: 0.3s;
        }

        .feat-card:hover .feat-card-bg {
          opacity: 1;
        }

        .feat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--shimmer-color), transparent);
          opacity: 0;
          transition: 0.3s;
        }

        .feat-card:hover::after {
          opacity: 1;
        }

        .feat-title {
          font-size: 18px;
          font-weight: bold;
        }

        .feat-desc {
          font-size: 14px;
          opacity: 0.7;
        }

        .feat-btn {
          margin-top: 20px;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>

      <div className="db-page">
        <div className="db-grid">
          {features.map((f, i) => (
            <div
              key={f.id}
              className="feat-card"
              style={
  {
    "--card-color-faint": f.faintGlow,
    "--shimmer-color": f.color,
    transitionDelay: loaded ? `${0.1 + i * 0.05}s` : "0s",
  } as React.CSSProperties
}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(f.route)}
            >
              {/* Background */}
              <div className="feat-card-bg" />

              {/* Content */}
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>

              <button
                className="feat-btn"
                style={{
                  background: hovered === f.id ? f.color : `${f.color}22`,
                  color: hovered === f.id ? "#fff" : f.color,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(f.route);
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;