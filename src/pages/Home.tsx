import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  const handleGetStarted = () => navigate("/dashboard");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "24+", label: "Documents Processed", icon: "📄" },
    { value: "156+", label: "Questions Answered", icon: "💬" },
    { value: "42+", label: "Notes Generated", icon: "📝" },
    { value: "8+", label: "Notebooks Created", icon: "📚" },
  ];

  const steps = [
    { num: "01", title: "Upload", desc: "Drop your document — PDF, DOCX, TXT, or image" },
    { num: "02", title: "Process", desc: "AI extracts, indexes, and understands your content" },
    { num: "03", title: "Interact", desc: "Ask anything, get grounded answers instantly" },
    { num: "04", title: "Save", desc: "Build a living notebook that grows with you" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Manrope:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        :root {
          --bg: #e8f4fd;
          --surface: #f0f8ff;
          --surface2: #daeef9;
          --border: #b8ddf0;
          --border-strong: #89c4e1;
          --ink: #0d2137;
          --ink-2: #1e3a52;
          --ink-3: #4a7090;
          --ink-4: #7aacc4;
          --accent: #0077cc;
          --accent-light: #d0ecfa;
          --accent-mid: #38a8e8;
          --shine: #a8dcf5;
          --shine2: #caeeff;
          --success: #0a6e3f;
        }

        body { background: var(--bg); }

        .page {
          font-family: 'Manrope', sans-serif;
          background: linear-gradient(160deg, #d6eefa 0%, #e8f6ff 40%, #cfe8f7 100%);
          color: var(--ink);
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px;
          background: rgba(214,238,250,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.3s;
        }
        .nav.scrolled {
          box-shadow: 0 1px 12px rgba(26,25,22,0.06);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 1.2rem;
          color: var(--ink);
          display: flex; align-items: center; gap: 10px;
          letter-spacing: -0.01em;
          text-decoration: none;
        }
        .nav-logo-mark {
          width: 28px; height: 28px;
          background: var(--accent);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .nav-logo-mark svg { width: 14px; height: 14px; color: white; }

        .nav-links { display: flex; gap: 4px; list-style: none; }
        .nav-links a {
          font-size: 0.875rem; font-weight: 500;
          color: var(--ink-3); text-decoration: none;
          padding: 6px 14px; border-radius: 6px;
          transition: all 0.15s;
        }
        .nav-links a:hover { color: var(--ink); background: var(--surface2); }

        .nav-cta {
          padding: 9px 20px;
          background: var(--accent); color: white;
          border: none; border-radius: 8px;
          font-family: 'Manrope', sans-serif; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          letter-spacing: -0.01em;
        }
        .nav-cta:hover {
          background: #1e4dd4;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(43,92,230,0.3);
        }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh; width: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 120px 24px 80px;
          overflow: hidden;
        }

        .hero-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,119,204,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,119,204,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.7;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%);
        }

        .hero-bg-blob {
          position: absolute; pointer-events: none; border-radius: 50%; filter: blur(80px);
        }
        .blob-1 {
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(56,168,232,0.35), transparent 70%);
          top: 0%; left: 50%; transform: translateX(-50%);
        }
        .blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(ellipse, rgba(168,220,245,0.5), transparent 70%);
          top: 50%; right: 5%;
        }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px 5px 6px;
          border: 1px solid var(--shine); border-radius: 100px;
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(202,238,255,0.7));
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase; color: var(--ink-3);
          margin-bottom: 28px;
          box-shadow: 0 2px 12px rgba(0,119,204,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
        }
        .eyebrow-badge {
          background: var(--accent); color: white;
          font-size: 0.65rem; font-weight: 700;
          padding: 3px 8px; border-radius: 100px; letter-spacing: 0.05em;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.05; letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 6px;
          position: relative;
        }
        .hero-title-accent {
          color: var(--accent);
          font-style: italic;
        }

        .hero-sub {
          font-size: 1.1rem; color: var(--ink-3); font-weight: 400;
          max-width: 500px; line-height: 1.75;
          margin: 20px auto 44px;
        }

        .hero-actions {
          display: flex; gap: 12px; align-items: center;
          justify-content: center; flex-wrap: wrap;
        }

        .btn-primary {
          padding: 14px 32px;
          background: var(--accent); color: white;
          border: none; border-radius: 10px;
          font-family: 'Manrope', sans-serif; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          letter-spacing: -0.01em;
          box-shadow: 0 2px 8px rgba(43,92,230,0.25), 0 1px 2px rgba(43,92,230,0.15);
        }
        .btn-primary:hover {
          background: #1e4dd4;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(43,92,230,0.35);
        }

        .btn-secondary {
          padding: 14px 32px;
          background: var(--surface); color: var(--ink-2);
          border: 1px solid var(--border-strong); border-radius: 10px;
          font-family: 'Manrope', sans-serif; font-size: 0.95rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(26,25,22,0.06);
        }
        .btn-secondary:hover {
          border-color: var(--ink-3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26,25,22,0.1);
        }

        .hero-trust {
          margin-top: 48px;
          display: flex; align-items: center; gap: 16px;
          justify-content: center; flex-wrap: wrap;
        }
        .trust-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; color: var(--ink-4); font-weight: 500;
        }
        .trust-item svg { width: 14px; height: 14px; color: var(--success); }
        .trust-divider { width: 1px; height: 14px; background: var(--border); }

        .scroll-hint {
          position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--ink-4); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          animation: bob 2.5s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* SECTIONS */
        .section {
          position: relative;
          max-width: 1200px; margin: 0 auto;
          padding: 80px 24px; width: 100%;
        }

        .section-tag {
          display: inline-block; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 14px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 600; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 14px; line-height: 1.15;
        }
        .section-sub {
          font-size: 0.97rem; color: var(--ink-3);
          max-width: 440px; line-height: 1.75;
        }

        /* FEATURES */
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 52px;
        }
        @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr; } }

        .feature-card {
          position: relative; padding: 32px 28px;
          background: linear-gradient(135deg, rgba(240,248,255,0.9), rgba(202,238,255,0.6));
          border: 1px solid var(--shine); border-radius: 16px;
          transition: all 0.25s; overflow: hidden;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 16px rgba(0,119,204,0.08), inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .feature-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--accent-mid));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s;
        }
        .feature-card:hover {
          border-color: var(--accent-mid);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,119,204,0.18), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .feature-card:hover::after { transform: scaleX(1); }

        .card-icon {
          width: 48px; height: 48px;
          background: var(--accent-light);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; transition: all 0.25s;
        }
        .feature-card:hover .card-icon {
          background: var(--accent);
        }
        .card-icon svg { width: 22px; height: 22px; color: var(--accent); transition: color 0.25s; }
        .feature-card:hover .card-icon svg { color: white; }

        .card-num {
          position: absolute; top: 24px; right: 24px;
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 700;
          color: rgba(26,25,22,0.04); line-height: 1;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 600;
          color: var(--ink); margin-bottom: 8px;
        }
        .card-desc { font-size: 0.875rem; color: var(--ink-3); line-height: 1.7; }

        /* STATS */
        .stats-wrapper { padding: 0 24px 80px; }
        .stats-inner {
          max-width: 1200px; margin: 0 auto;
          background: linear-gradient(135deg, rgba(240,248,255,0.95), rgba(202,238,255,0.75));
          border: 1px solid var(--shine); border-radius: 20px;
          padding: 56px 48px;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
          box-shadow: 0 4px 32px rgba(0,119,204,0.12), inset 0 1px 0 rgba(255,255,255,0.8);
          backdrop-filter: blur(16px);
          position: relative; overflow: hidden;
        }
        .stats-inner::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--accent-mid), var(--gold));
        }
        @media (max-width: 700px) { .stats-inner { grid-template-columns: repeat(2, 1fr); } }

        .stat-item {
          text-align: center; padding: 20px 16px;
          border-right: 1px solid var(--border);
        }
        .stat-item:last-child { border-right: none; }

        .stat-emoji {
          font-size: 1.75rem; display: block; margin-bottom: 10px;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem; font-weight: 700;
          letter-spacing: -0.04em; color: var(--ink);
          line-height: 1; margin-bottom: 6px;
        }
        .stat-label {
          font-size: 0.75rem; font-weight: 600;
          color: var(--ink-4); letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* STEPS */
        .steps-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; margin-top: 60px; position: relative;
        }
        .steps-grid::before {
          content: ''; position: absolute; top: 22px; left: 12.5%; right: 12.5%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-strong), var(--border-strong), transparent);
          border-top: 1px dashed var(--border-strong);
        }
        @media (max-width: 700px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid::before { display: none; }
        }

        .step-item { text-align: center; padding: 0 20px; }
        .step-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(240,248,255,0.95), rgba(202,238,255,0.8));
          border: 1.5px solid var(--shine);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; transition: all 0.25s;
          box-shadow: 0 2px 12px rgba(0,119,204,0.15), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .step-item:hover .step-circle {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(43,92,230,0.3);
          transform: scale(1.1);
        }
        .step-num {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: var(--ink-3); letter-spacing: 0.04em;
          transition: color 0.25s;
        }
        .step-item:hover .step-num { color: white; }

        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 600;
          color: var(--ink); margin-bottom: 8px;
        }
        .step-desc { font-size: 0.82rem; color: var(--ink-4); line-height: 1.65; }

        /* CTA */
        .cta-section { padding: 0 24px 100px; }
        .cta-card {
          max-width: 1200px; margin: 0 auto;
          padding: 72px 64px;
          background: var(--ink);
          border-radius: 24px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-card::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 20% 50%, rgba(43,92,230,0.25), transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 50%, rgba(201,151,58,0.15), transparent 70%);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700; letter-spacing: -0.03em;
          color: white; margin-bottom: 14px; position: relative;
          line-height: 1.1;
        }
        .cta-sub {
          color: rgba(255,255,255,0.5); font-size: 1rem; line-height: 1.7;
          max-width: 380px; margin: 0 auto 40px; position: relative;
        }
        .cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-primary-inv {
          padding: 14px 32px;
          background: white; color: var(--ink);
          border: none; border-radius: 10px;
          font-family: 'Manrope', sans-serif; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; letter-spacing: -0.01em;
        }
        .btn-primary-inv:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.2);
        }
        .btn-ghost-inv {
          padding: 14px 32px;
          background: transparent; color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 10px;
          font-family: 'Manrope', sans-serif; font-size: 0.95rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost-inv:hover {
          border-color: rgba(255,255,255,0.5); color: white;
          transform: translateY(-2px);
        }

        /* DIVIDER */
        .divider {
          height: 1px; background: var(--border);
          max-width: 1200px; margin: 0 auto;
        }

        /* FOOTER */
        .footer {
          max-width: 1200px; margin: 0 auto;
          padding: 28px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-copy { font-size: 0.78rem; color: var(--ink-4); }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a {
          font-size: 0.78rem; color: var(--ink-4); text-decoration: none;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: var(--ink); }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .stats-inner { padding: 32px 20px; }
          .cta-card { padding: 48px 24px; }
          .footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px; }
          .hero { padding: 100px 20px 80px; }
        }
      `}</style>

      <div className="page">

        <nav className={`nav${scrollY > 10 ? ' scrolled' : ''}`}>
          <div className="nav-logo">
            <div className="nav-logo-mark">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            InteglienceAI
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#stats">Stats</a></li>
          </ul>
          <button className="nav-cta" onClick={handleGetStarted}>Open App →</button>
        </nav>

        <section className="hero" ref={heroRef}>
          <div className="hero-bg-grid" />
          <div className="hero-bg-blob blob-1" />
          <div className="hero-bg-blob blob-2" />

          <div className="hero-eyebrow">
            <span className="eyebrow-badge">NEW</span>
            Powered by advanced LLM reasoning
          </div>

          <h1 className="hero-title">
            Your documents,<br />
            <span className="hero-title-accent">made intelligent.</span>
          </h1>

          <p className="hero-sub">
            Upload any document and unlock AI-powered summaries, instant Q&A,
            and structured notebooks — all from a single interface.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={handleGetStarted}>Get Started Free</button>
            <button className="btn-secondary">Watch demo ↗</button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Free to start
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Instant setup
            </div>
          </div>

          <div className="scroll-hint">
            <span>scroll</span>
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <path d="M6 1v16M1 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        <section className="section" id="features">
          <div>
            <span className="section-tag">✦ Capabilities</span>
            <h2 className="section-title">Everything you need,<br />nothing you don't.</h2>
            <p className="section-sub">Three core pillars that turn passive documents into active knowledge.</p>
          </div>
          <div className="features-grid">
            {[
              {
                icon: (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ),
                num: "01", title: "Upload Documents",
                desc: "Support for PDF, DOCX, TXT, and images with automatic OCR text extraction."
              },
              {
                icon: (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                num: "02", title: "AI Analysis",
                desc: "Get intelligent summaries, structured notes, and context-aware answers from your content."
              },
              {
                icon: (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                num: "03", title: "Interactive Chat",
                desc: "Conversational Q&A grounded entirely in your documents. No hallucinations."
              },
            ].map((card, i) => (
              <div className="feature-card" key={i}>
                <div className="card-icon">{card.icon}</div>
                <span className="card-num">{card.num}</span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="section" id="stats" style={{ paddingBottom: 0 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag">✦ By the numbers</span>
            <h2 className="section-title">Proven in practice</h2>
          </div>
        </section>

        <div className="stats-wrapper">
          <div className="stats-inner">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="stat-emoji">{s.icon}</span>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        <section className="section" id="how">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag">✦ Process</span>
            <h2 className="section-title">Simple by design</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Four steps. Zero friction. Immediate value.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div className="step-item" key={i}>
                <div className="step-circle"><span className="step-num">{step.num}</span></div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="cta-section" style={{ paddingTop: 80 }}>
          <div className="cta-card">
            <h2 className="cta-title">Ready to transform<br />your documents?</h2>
            <p className="cta-sub">Start for free. No credit card needed. Your knowledge, unlocked.</p>
            <div className="cta-actions">
              <button className="btn-primary-inv" onClick={handleGetStarted}>
                Start Now — It's Free
              </button>
              <button className="btn-ghost-inv">Watch demo ↗</button>
            </div>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid var(--border)' }}>
          <div className="footer">
            <div className="nav-logo" style={{ fontSize: '1rem', gap: '8px' }}>
              <div className="nav-logo-mark" style={{ width: 22, height: 22, borderRadius: 5 }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 11, height: 11 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              InteglienceAI
            </div>
            <p className="footer-copy">© 2025 InteglienceAI. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;