"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const slides = [
  {
    image: "/laww.png",
    tag: "Trusted Since 1992",
    heading: "Client\nFocused.",
    sub: "Uncompromising legal counsel for individuals, families & corporations seeking justice.",
    accent: "#b8943f",
  },
  {
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1800&q=95&fit=crop",
    tag: "Excellence in Law",
    heading: "Justice\nDriven.",
    sub: "Decades of proven advocacy across complex litigation, corporate and regulatory law.",
    accent: "#2d6b5a",
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1800&q=95&fit=crop",
    tag: "Results That Matter",
    heading: "Results\nMatter.",
    sub: "Strategic legal minds protecting what matters most — your rights, assets and future.",
    accent: "#b8943f",
  },
];

const DURATION = 900;
const INTERVAL = 6000;

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [textIn, setTextIn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false);

  const go = useCallback((to: number, d: "next" | "prev") => {
    if (lockRef.current || to === cur) return;
    lockRef.current = true;
    setDir(d);
    setTextIn(false);
    setPhase("exit");
    setPrev(cur);

    setTimeout(() => {
      setCur(to);
      setPhase("enter");
      setTimeout(() => {
        setPhase("idle");
        setPrev(null);
        setTextIn(true);
        lockRef.current = false;
      }, DURATION);
    }, DURATION * 0.5);
  }, [cur]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const n = (cur + 1) % slides.length;
      go(n, "next");
    }, INTERVAL);
  }, [go, cur]);

  useEffect(() => {
    setTextIn(true);
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const n = (cur - 1 + slides.length) % slides.length;
    go(n, "prev");
    startTimer();
  };

  const handleNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const n = (cur + 1) % slides.length;
    go(n, "next");
    startTimer();
  };

  const handleDot = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    go(i, i > cur ? "next" : "prev");
    startTimer();
  };

  const slide = slides[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Raleway:wght@200;300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #b8943f;
          --teal: #1b4d3e;
          --teal-lt: #2d6b5a;
          --ink: #0a0a0a;
          --white: #ffffff;
          --dur: ${DURATION}ms;
        }

        /* ══ WRAPPER ══════════════════════════════════════════ */
        .hs {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 580px;
          overflow: hidden;
          background: var(--ink);
          font-family: 'Raleway', sans-serif;
          cursor: none;
        }

        /* custom cursor - only on desktop */
        .hs-cursor, .hs-cursor-ring {
          display: none;
        }
        @media (min-width: 1024px) {
          .hs-cursor, .hs-cursor-ring {
            display: block;
          }
        }

        .hs-cursor {
          position: fixed;
          width: 12px; height: 12px;
          background: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s, height 0.25s, background 0.25s;
          mix-blend-mode: difference;
        }
        .hs-cursor-ring {
          position: fixed;
          width: 40px; height: 40px;
          border: 1px solid rgba(184,148,63,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease, width 0.35s ease, height 0.35s ease;
        }

        /* ══ BG SLIDES ════════════════════════════════════════ */
        .hs-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hs-layer {
          position: absolute;
          inset: -5%;
          width: 110%; 
          height: 110%;
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transition: opacity var(--dur) ease;
        }

        .hs-layer--cur {
          z-index: 2;
          opacity: 1;
          animation: kbCur 10s ease forwards;
        }
        .hs-layer--prev {
          z-index: 1;
          opacity: 1;
        }

        /* Exit & Enter transitions */
        .hs-layer--exit-next {
          animation: exitNext var(--dur) cubic-bezier(0.86,0,0.07,1) forwards !important;
          z-index: 3 !important;
        }
        .hs-layer--exit-prev {
          animation: exitPrev var(--dur) cubic-bezier(0.86,0,0.07,1) forwards !important;
          z-index: 3 !important;
        }
        .hs-layer--enter-next {
          animation: enterNext var(--dur) cubic-bezier(0.86,0,0.07,1) forwards !important;
        }
        .hs-layer--enter-prev {
          animation: enterPrev var(--dur) cubic-bezier(0.86,0,0.07,1) forwards !important;
        }

        @keyframes kbCur {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        @keyframes exitNext {
          from { transform: scale(1.04) translateX(0%); opacity: 1; }
          to   { transform: scale(0.92) translateX(-18%); opacity: 0; }
        }
        @keyframes exitPrev {
          from { transform: scale(1.04) translateX(0%); opacity: 1; }
          to   { transform: scale(0.92) translateX(18%); opacity: 0; }
        }
        @keyframes enterNext {
          from { transform: scale(1.1) translateX(12%); opacity: 0; }
          to   { transform: scale(1.04) translateX(0%); opacity: 1; }
        }
        @keyframes enterPrev {
          from { transform: scale(1.1) translateX(-12%); opacity: 0; }
          to   { transform: scale(1.04) translateX(0%); opacity: 1; }
        }

        /* ══ CINEMATIC OVERLAYS ═══════════════════════════════ */
        .hs-vignette {
          position: absolute;
          inset: 0; 
          z-index: 5;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 30% 50%, transparent 20%, rgba(0,0,0,0.55) 100%),
            linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%),
            linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
        }

        .hs-grain {
          position: absolute;
          inset: 0; 
          z-index: 6;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* ══ DECORATIVE ELEMENTS ══════════════════════════════ */
        .hs-deco-line-v {
          position: absolute;
          top: 0; bottom: 0;
          left: 72px;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(184,148,63,0.4) 30%, rgba(184,148,63,0.4) 70%, transparent);
          z-index: 10;
          pointer-events: none;
        }

        .hs-deco-corner {
          position: absolute;
          top: 32px; left: 32px;
          width: 52px; height: 52px;
          border-left: 1px solid rgba(184,148,63,0.55);
          border-top: 1px solid rgba(184,148,63,0.55);
          z-index: 10;
          pointer-events: none;
        }
        .hs-deco-corner-br {
          position: absolute;
          bottom: 60px; right: 32px;
          width: 52px; height: 52px;
          border-right: 1px solid rgba(184,148,63,0.35);
          border-bottom: 1px solid rgba(184,148,63,0.35);
          z-index: 10;
          pointer-events: none;
        }

        /* ══ CONTENT ══════════════════════════════════════════ */
        .hs-content {
          position: absolute;
          inset: 0; 
          z-index: 15;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 8vw;
          max-width: 780px;
        }

        /* Tag */
        .hs-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(8px, 1.8vw, 10px);
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .hs-tag.in { opacity: 1; transform: translateY(0); }
        .hs-tag::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: var(--gold);
        }

        /* Heading */
        .hs-h {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 8.5vw, 8rem);
          font-weight: 900;
          color: var(--white);
          line-height: 0.92;
          letter-spacing: -2.2px;
          white-space: pre-line;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(48px) skewY(2deg);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s,
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }
        .hs-h.in { opacity: 1; transform: translateY(0) skewY(0deg); }

        .hs-h em {
          font-style: italic;
          color: var(--gold);
        }

        /* Sub */
        .hs-sub {
          font-size: clamp(0.85rem, 1.8vw, 1.1rem);
          font-weight: 300;
          color: rgba(255,255,255,0.68);
          line-height: 1.75;
          max-width: 460px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.6s ease 0.38s, transform 0.6s ease 0.38s;
        }
        .hs-sub.in { opacity: 1; transform: translateY(0); }

        /* CTA group */
        .hs-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease 0.52s, transform 0.6s ease 0.52s;
        }
        .hs-ctas.in { opacity: 1; transform: translateY(0); }

        .hs-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 36px;
          background: var(--gold);
          color: var(--ink);
          font-family: 'Raleway', sans-serif;
          font-size: clamp(8.5px, 1.8vw, 9.5px);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          border: none;
          cursor: none;
          position: relative;
          overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%);
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s;
          white-space: nowrap;
        }
        .hs-btn-primary:hover {
          background: #d4a94e;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(184,148,63,0.35);
        }
        .hs-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .hs-btn-primary:hover::after { transform: translateX(100%); }

        .hs-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(8.5px, 1.8vw, 9.5px);
          font-weight: 600;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          background: none;
          border: none;
          cursor: none;
          transition: color 0.3s;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255,255,255,0.25);
          white-space: nowrap;
        }
        .hs-btn-ghost:hover { 
          color: var(--white); 
          border-bottom-color: rgba(255,255,255,0.7); 
        }

        /* stats row */
        .hs-stats {
          position: absolute;
          bottom: 110px;
          right: 7vw;
          z-index: 15;
          display: flex;
          flex-direction: column;
          gap: 22px;
          align-items: flex-end;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
        }
        .hs-stats.in { opacity: 1; transform: translateX(0); }

        .hs-stat {
          text-align: right;
        }
        .hs-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 700;
          color: var(--white);
          line-height: 1;
          letter-spacing: -1px;
        }
        .hs-stat-label {
          font-size: clamp(7px, 1.1vw, 9px);
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-top: 4px;
        }

        /* ══ ARROWS ═══════════════════════════════════════════ */
        .hs-arrows {
          position: absolute;
          bottom: 48px;
          left: 7vw;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .hs-arr {
          width: 48px; 
          height: 48px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.16);
          color: #fff;
          display: flex; 
          align-items: center; 
          justify-content: center;
          cursor: none;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          font-size: 18px;
        }
        .hs-arr:hover {
          background: rgba(184,148,63,0.2);
          border-color: rgba(184,148,63,0.6);
          transform: scale(1.1);
        }
        .hs-arr:first-child { 
          clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%); 
        }
        .hs-arr:last-child  { 
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%); 
        }

        /* ══ DOTS / TIMELINE ══════════════════════════════════ */
        .hs-timeline {
          position: absolute;
          bottom: 0;
          left: 0; 
          right: 0;
          height: 4px;
          z-index: 15;
          display: flex;
        }

        .hs-tl-seg {
          flex: 1;
          height: 100%;
          position: relative;
          background: rgba(255,255,255,0.09);
          cursor: pointer;
          overflow: hidden;
        }
        .hs-tl-seg + .hs-tl-seg { 
          border-left: 1px solid rgba(255,255,255,0.07); 
        }
        .hs-tl-fill {
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
        }
        .hs-tl-seg.active .hs-tl-fill {
          animation: tlFill ${INTERVAL}ms linear forwards;
        }
        @keyframes tlFill { 
          from { transform: scaleX(0); } 
          to { transform: scaleX(1); } 
        }

        /* counter */
        .hs-counter {
          position: absolute;
          bottom: 58px;
          right: 7vw;
          z-index: 15;
          display: flex;
          align-items: baseline;
          gap: 5px;
        }
        .hs-counter-cur {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          line-height: 1;
        }
        .hs-counter-sep {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.28);
          letter-spacing: 2px;
        }
        .hs-counter-tot {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.32);
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* scroll hint - hidden on mobile */
        .hs-scroll {
          position: absolute;
          bottom: 68px;
          right: 7vw;
          z-index: 14;
          display: none;
          align-items: center;
          gap: 10px;
          opacity: 0.45;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transition: opacity 0.3s;
          cursor: none;
        }
        @media (min-width: 1024px) {
          .hs-scroll { display: flex; }
        }
        .hs-scroll:hover { opacity: 0.85; }
        .hs-scroll-label {
          font-size: 7.5px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
        }
        .hs-scroll-line {
          width: 1px; 
          height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.65), transparent);
          animation: scrollLine 2.4s ease infinite;
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
        }

        /* ══ RESPONSIVE IMPROVEMENTS ════════════════════════ */
        @media (max-width: 1024px) {
          .hs-content { padding: 0 6vw; }
          .hs-stats { bottom: 90px; right: 5vw; gap: 18px; }
          .hs-arrows { left: 5vw; bottom: 38px; }
          .hs-counter { bottom: 46px; right: 5vw; }
        }

        @media (max-width: 640px) {
          .hs {
            min-height: 560px;
          }
          .hs-content {
            padding: 0 24px;
            max-width: 100%;
          }
          .hs-deco-line-v, 
          .hs-deco-corner, 
          .hs-deco-corner-br { 
            display: none; 
          }
          .hs-stats { 
            bottom: 85px; 
            right: 24px; 
            gap: 16px;
          }
          .hs-arrows { 
            left: 24px; 
            bottom: 32px; 
          }
          .hs-counter { 
            bottom: 38px; 
            right: 24px; 
          }
          .hs-btn-primary, .hs-btn-ghost {
            padding: 14px 28px;
            font-size: 8.5px;
          }
          .hs-ctas {
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .hs-h {
            font-size: clamp(2.4rem, 9.5vw, 4.2rem);
          }
          .hs-sub {
            font-size: 0.95rem;
            line-height: 1.65;
          }
        }
      `}</style>

      <CursorDot />

      <div className="hs">
        {/* ── BG LAYERS ── */}
        <div className="hs-bg">
          {slides.map((s, i) => {
            let cls = "hs-layer";
            if (i === cur) {
              cls += " hs-layer--cur";
              if (phase === "enter") {
                cls += dir === "next" ? " hs-layer--enter-next" : " hs-layer--enter-prev";
              }
            } else if (i === prev) {
              cls += " hs-layer--prev";
              if (phase === "exit" || phase === "enter") {
                cls += dir === "next" ? " hs-layer--exit-next" : " hs-layer--exit-prev";
              }
            }
            return (
              <div 
                key={i} 
                className={cls}
                style={{ 
                  backgroundImage: `url(${s.image})`, 
                  display: (i === cur || i === prev) ? "block" : "none" 
                }}
              />
            );
          })}
        </div>

        {/* overlays */}
        <div className="hs-vignette" />
        <div className="hs-grain" />

        {/* decorative - hidden on mobile */}
        <div className="hs-deco-line-v" />
        <div className="hs-deco-corner" />
        <div className="hs-deco-corner-br" />

        {/* ── CONTENT ── */}
        <div className="hs-content">
          <div className={`hs-tag${textIn ? " in" : ""}`}>{slide.tag}</div>
          <h1 
            className={`hs-h${textIn ? " in" : ""}`}
            dangerouslySetInnerHTML={{ 
              __html: slide.heading.replace(/\.$/, '<em>.</em>') 
            }} 
          />
          <p className={`hs-sub${textIn ? " in" : ""}`}>{slide.sub}</p>
          <div className={`hs-ctas${textIn ? " in" : ""}`}>
            <button className="hs-btn-primary">
              Free Consultation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="hs-btn-ghost">
              Our Practice Areas
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* stats */}
        <div className={`hs-stats${textIn ? " in" : ""}`}>
          {[["30+", "Years Experience"], ["98%", "Success Rate"], ["5000+", "Cases Won"]].map(([n, l]) => (
            <div className="hs-stat" key={l}>
              <div className="hs-stat-num">{n}</div>
              <div className="hs-stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* arrows */}
        <div className="hs-arrows">
          <button className="hs-arr" onClick={handlePrev} aria-label="Previous">
            <svg width="19" height="19" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M11 4L6 9l5 5"/>
            </svg>
          </button>
          <button className="hs-arr" onClick={handleNext} aria-label="Next">
            <svg width="19" height="19" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M7 4l5 5-5 5"/>
            </svg>
          </button>
        </div>

        {/* counter */}
        <div className="hs-counter">
          <span className="hs-counter-cur">{String(cur + 1).padStart(2, "0")}</span>
          <span className="hs-counter-sep">—</span>
          <span className="hs-counter-tot">{String(slides.length).padStart(2, "0")}</span>
        </div>

        {/* scroll hint */}
        <div className="hs-scroll">
          <div className="hs-scroll-line" />
          <span className="hs-scroll-label">Scroll</span>
        </div>

        {/* timeline progress */}
        <div className="hs-timeline">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`hs-tl-seg${i === cur ? " active" : ""}`} 
              onClick={() => handleDot(i)}
            >
              <div key={`${cur}-${i}`} className="hs-tl-fill" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Custom cursor component ── */
function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
      if (ring.current) {
        setTimeout(() => {
          if (ring.current) {
            ring.current.style.left = `${e.clientX}px`;
            ring.current.style.top = `${e.clientY}px`;
          }
        }, 80);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dot} className="hs-cursor" />
      <div ref={ring} className="hs-cursor-ring" />
    </>
  );
}