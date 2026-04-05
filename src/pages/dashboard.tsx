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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6M9 8h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
      </svg>
    ),
    color: "#0077cc",
    glow: "rgba(0,119,204,0.3)",
    badge: "Text",
  },
  {
    id: "mindmap",
    route: "/mindmap",
    num: "02",
    title: "Mind Map",
    tagline: "Visualise knowledge as an interactive graph",
    desc: "Transforms document concepts into a branching mind map — understand structure, connections, and hierarchy at a glance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="4" cy="6" r="2"/><line x1="6" y1="7" x2="10" y2="11"/>
        <circle cx="20" cy="6" r="2"/><line x1="18" y1="7" x2="14" y2="11"/>
        <circle cx="4" cy="18" r="2"/><line x1="6" y1="17" x2="10" y2="13"/>
        <circle cx="20" cy="18" r="2"/><line x1="18" y1="17" x2="14" y2="13"/>
        <circle cx="12" cy="3" r="2"/><line x1="12" y1="5" x2="12" y2="9"/>
      </svg>
    ),
    color: "#0099e6",
    glow: "rgba(0,153,230,0.3)",
    badge: "Visual",
  },
  {
    id: "flashcard",
    route: "/flashcards",
    num: "03",
    title: "Flash Cards",
    tagline: "Learn faster with AI-generated study cards",
    desc: "Auto-generates question/answer flashcards from your content. Flip, review, and retain information in spaced repetition style.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20M8 5v14"/>
      </svg>
    ),
    color: "#0ab3e8",
    glow: "rgba(10,179,232,0.3)",
    badge: "Study",
  },
  {
    id: "chatbot",
    route: "/chatbot",
    num: "04",
    title: "AI Chatbot",
    tagline: "Converse with your document's knowledge",
    desc: "Ask anything. The chatbot answers using only your document's content — grounded, cited, and hallucination-free.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    color: "#1a6bbf",
    glow: "rgba(26,107,191,0.3)",
    badge: "Chat",
  },
  {
    id: "quiz",
    route: "/quiz",
    num: "05",
    title: "Quiz Mode",
    tagline: "Test your understanding with smart quizzes",
    desc: "Generates MCQ and short-answer quizzes from your document. Track your score and identify knowledge gaps instantly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    color: "#006bb3",
    glow: "rgba(0,107,179,0.3)",
    badge: "Test",
  },
  {
    id: "interview",
    route: "/interview",
    num: "06",
    title: "Interview Prep",
    tagline: "Ace interviews with topic-specific questions",
    desc: "Extracts likely interview questions from your document. Practice answers and build confidence with AI-curated prep sets.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    color: "#38a8e8",
    glow: "rgba(56,168,232,0.3)",
    badge: "Career",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        :root {
          --bg: #d6eefa;
          --bg2: #cae6f5;
          --surface: rgba(240,250,255,0.85);
          --surface-solid: #edf7ff;
          --border: #b0d8ef;
          --border-shine: #8ec8e8;
          --ink: #0d2137;
          --ink-2: #1e3a52;
          --ink-3: #4a7090;
          --ink-4: #7aacc4;
          --accent: #0077cc;
          --accent-mid: #38a8e8;
          --shine: rgba(255,255,255,0.75);
        }

        .db-page {
          font-family: 'Manrope', sans-serif;
          background: linear-gradient(145deg, #d0e9f7 0%, #e0f2fc 40%, #cce5f5 100%);
          min-height: 100vh;
          width: 100%;
          color: var(--ink);
          overflow-x: hidden;
          position: relative;
        }

        /* Subtle grid overlay */
        .db-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,119,204,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,119,204,0.05) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%);
        }

        /* Orbs */
        .db-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .db-orb-1 {
          width: 600px; height: 500px;
          background: radial-gradient(circle, rgba(56,168,232,0.3), transparent 70%);
          top: -100px; left: -100px;
          animation: orb-drift 16s ease-in-out infinite alternate;
        }
        .db-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(168,220,245,0.4), transparent 70%);
          bottom: 0; right: -80px;
          animation: orb-drift 20s ease-in-out infinite alternate-reverse;
        }
        @keyframes orb-drift { from { transform: translate(0,0); } to { transform: translate(30px,40px); } }

        /* Nav */
        .db-nav {
          position: sticky; top: 0;
          z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
          background: rgba(214,238,250,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 12px rgba(0,119,204,0.08);
          width: 100%;
        }

        .db-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
          color: var(--ink);
          display: flex; align-items: center; gap: 10px;
          cursor: pointer;
        }

        .db-logo-mark {
          width: 28px; height: 28px;
          background: var(--accent);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(0,119,204,0.35);
        }
        .db-logo-mark svg { width: 14px; height: 14px; color: white; }

        .db-nav-right {
          display: flex; align-items: center; gap: 12px;
        }

        .db-nav-pill {
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink-3);
          background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(202,238,255,0.5));
          backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .db-nav-back {
          padding: 8px 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(202,238,255,0.5));
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--ink-2);
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .db-nav-back:hover {
          border-color: var(--border-shine);
          box-shadow: 0 4px 12px rgba(0,119,204,0.15), inset 0 1px 0 rgba(255,255,255,0.9);
          transform: translateY(-1px);
        }

        /* Content wrapper */
        .db-content {
          width: 100%;
          padding: 0 48px;
        }

        /* Header */
        .db-header {
          position: relative; z-index: 2;
          padding: 60px 0 40px;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .db-header.in { opacity: 1; transform: translateY(0); }

        .db-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .db-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--ink);
          line-height: 1.05;
          margin-bottom: 12px;
        }

        .db-title span {
          color: var(--accent);
          font-style: italic;
        }

        .db-subtitle {
          font-size: 1rem;
          color: var(--ink-3);
          font-weight: 400;
          max-width: 480px;
          line-height: 1.65;
        }

        /* Stats bar */
        .db-statsbar {
          position: relative; z-index: 2;
          width: 100%;
          margin-bottom: 48px;
          display: flex; gap: 16px; flex-wrap: wrap;
          opacity: 0; transform: translateY(16px);
          transition: all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }
        .db-statsbar.in { opacity: 1; transform: translateY(0); }

        .db-stat-chip {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(202,238,255,0.6));
          border: 1px solid var(--border);
          border-radius: 100px;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 10px rgba(0,119,204,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .db-stat-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }

        .db-stat-chip span:first-of-type {
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
        }

        .db-stat-chip span:last-of-type {
          font-size: 0.75rem;
          color: var(--ink-3);
          font-weight: 500;
        }

        /* Grid */
        .db-grid {
          position: relative; z-index: 2;
          width: 100%;
          padding-bottom: 80px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1100px) { .db-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .db-grid { grid-template-columns: 1fr; }
          .db-content { padding: 0 20px; }
          .db-nav { padding: 0 20px; }
        }

        /* Feature card */
        .feat-card {
          position: relative;
          background: linear-gradient(145deg, rgba(245,252,255,0.9), rgba(210,240,255,0.7));
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 28px 28px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          opacity: 0;
          transform: translateY(30px);
          backdrop-filter: blur(16px);
          box-shadow: 0 2px 16px rgba(0,119,204,0.07), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .feat-card.in {
          opacity: 1;
          transform: translateY(0);
        }

        .feat-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: var(--border-shine);
          box-shadow: 0 20px 50px rgba(0,119,204,0.18), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Top shimmer line on hover */
        .feat-card::after {
          content: '';
          position: absolute; top: 0; left: 10%; right: 10%;
          height: 2px;
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.35s;
        }
        .feat-card:hover::after { opacity: 1; }

        /* Card glow spot */
        .feat-card-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .feat-card:hover .feat-card-glow { opacity: 0.5; }

        /* Card top row */
        .feat-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 24px;
        }

        .feat-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .feat-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid;
          transition: all 0.3s;
        }

        .feat-num {
          position: absolute; bottom: 24px; right: 24px;
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
          color: rgba(0,119,204,0.07);
          transition: color 0.3s;
          pointer-events: none;
        }
        .feat-card:hover .feat-num { color: rgba(0,119,204,0.12); }

        .feat-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 5px;
        }

        .feat-tagline {
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .feat-desc {
          font-size: 0.865rem;
          color: var(--ink-3);
          line-height: 1.68;
          margin-bottom: 28px;
        }

        /* CTA button */
        .feat-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 11px 20px;
          border-radius: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .feat-btn svg {
          width: 15px; height: 15px;
          transition: transform 0.25s;
          flex-shrink: 0;
        }
        .feat-btn:hover svg { transform: translateX(4px); }

        /* Divider line */
        .feat-divider {
          height: 1px;
          margin-bottom: 18px;
          border-radius: 1px;
          transition: opacity 0.3s;
          opacity: 0.2;
        }
        .feat-card:hover .feat-divider { opacity: 0.4; }
      `}</style>

      <div className="db-page">
        <div className="db-grid-bg" />
        <div className="db-orb db-orb-1" />
        <div className="db-orb db-orb-2" />

        {/* Nav */}
        <nav className="db-nav">
          <div className="db-logo" onClick={() => navigate("/")}>
            <div className="db-logo-mark">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            InteglienceAI
          </div>
          <div className="db-nav-right">
            <div className="db-nav-pill">📄 Notebook Active</div>
            <button className="db-nav-back" onClick={() => navigate("/")}>← Home</button>
          </div>
        </nav>

        {/* All content */}
        <div className="db-content">
          {/* Header */}
          <div className={`db-header ${loaded ? "in" : ""}`}>
            <div className="db-eyebrow">✦ your workspace</div>
            <h1 className="db-title">
              Choose your<br />
              <span>AI feature</span>
            </h1>
            <p className="db-subtitle">
              Six intelligent tools built around your document. Pick one to get started — each unlocks a different way to learn.
            </p>
          </div>

          {/* Stats bar */}
          <div className={`db-statsbar ${loaded ? "in" : ""}`}>
            {[
              { val: "6", label: "Features Available", dot: "#0077cc" },
              { val: "100%", label: "Document-Grounded", dot: "#0099e6" },
              { val: "AI", label: "Powered by LLM", dot: "#38a8e8" },
            ].map((s, i) => (
              <div className="db-stat-chip" key={i}>
                <div className="db-stat-chip-dot" style={{ background: s.dot, boxShadow: `0 0 8px ${s.dot}` }} />
                <span>{s.val}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="db-grid">
            {features.map((f, i) => (
              <div
                key={f.id}
                className={`feat-card ${loaded ? "in" : ""}`}
                style={{
                  transitionDelay: loaded ? `${0.15 + i * 0.07}s` : "0s",
                }}
                onMouseEnter={() => setHovered(f.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(f.route)}
              >
                {/* Glow spot */}
                <div
                  className="feat-card-glow"
                  style={{ background: `radial-gradient(circle, ${f.glow}, transparent 70%)` }}
                />

                {/* Top shimmer */}
                <style>{`.feat-card:nth-child(${i+1})::after { background: linear-gradient(90deg, transparent, ${f.color}, transparent); }`}</style>

                <div className="feat-top">
                  {/* Icon */}
                  <div
                    className="feat-icon-wrap"
                    style={{
                      background: hovered === f.id
                        ? `linear-gradient(135deg, ${f.color}, ${f.color}cc)`
                        : `linear-gradient(135deg, rgba(255,255,255,0.8), ${f.color}22)`,
                      border: `1px solid ${hovered === f.id ? "transparent" : `${f.color}55`}`,
                      boxShadow: hovered === f.id
                        ? `0 4px 20px ${f.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`
                        : `inset 0 1px 0 rgba(255,255,255,0.8)`,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24" fill="none"
                      stroke={hovered === f.id ? "white" : f.color}
                      strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                      style={{ width: 22, height: 22 }}
                    >
                      {f.icon.props.children}
                    </svg>
                  </div>

                  {/* Badge */}
                  <span
                    className="feat-badge"
                    style={{
                      color: f.color,
                      borderColor: `${f.color}44`,
                      background: `linear-gradient(135deg, rgba(255,255,255,0.7), ${f.color}18)`,
                    }}
                  >
                    {f.badge}
                  </span>
                </div>

                {/* Divider */}
                <div className="feat-divider" style={{ background: f.color }} />

                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-tagline" style={{ color: f.color }}>{f.tagline}</p>
                <p className="feat-desc">{f.desc}</p>

                {/* CTA */}
                <button
                  className="feat-btn"
                  style={{
                    background: hovered === f.id
                      ? `linear-gradient(135deg, ${f.color}, ${f.color}cc)`
                      : `linear-gradient(135deg, rgba(255,255,255,0.8), ${f.color}18)`,
                    color: hovered === f.id ? "white" : f.color,
                    borderColor: hovered === f.id ? "transparent" : `${f.color}44`,
                    boxShadow: hovered === f.id
                      ? `0 4px 20px ${f.glow}`
                      : `inset 0 1px 0 rgba(255,255,255,0.8)`,
                  }}
                  onClick={(e) => { e.stopPropagation(); navigate(f.route); }}
                >
                  Open {f.title}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </button>

                {/* Ghost number */}
                <div className="feat-num">{f.num}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;