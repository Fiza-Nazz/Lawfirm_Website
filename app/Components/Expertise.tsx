"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const expertiseItems = [
  {
    num: "01",
    title: "Banking Law",
    sub: "Financial Regulation",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=90&fit=crop",
    accent: "#b8943f",
    desc: "Comprehensive counsel on banking regulations, financial transactions, compliance frameworks, and dispute resolution for financial institutions and corporate clients.",
    stat: "200+ Cases",
  },
  {
    num: "02",
    title: "Health Law",
    sub: "Medical & Regulatory",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=90&fit=crop",
    accent: "#1b4d3e",
    desc: "Navigating complex healthcare regulations, medical malpractice defense, HIPAA compliance, and hospital-physician agreements with precision and care.",
    stat: "150+ Clients",
  },
  {
    num: "03",
    title: "Real Estate",
    sub: "Property & Transactions",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=90&fit=crop",
    accent: "#b8943f",
    desc: "Expert representation in property acquisitions, commercial leasing, zoning disputes, title examinations, and real estate development projects.",
    stat: "$2B+ Deals",
  },
  {
    num: "04",
    title: "Capital Markets",
    sub: "Securities & Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=90&fit=crop",
    accent: "#1b4d3e",
    desc: "Strategic advice on IPOs, mergers, acquisitions, debt offerings, and securities regulations for public and private companies seeking capital market access.",
    stat: "50+ IPOs",
  },
  {
    num: "05",
    title: "Corporate Law",
    sub: "Business & Governance",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=90&fit=crop",
    accent: "#b8943f",
    desc: "Comprehensive corporate legal services including formation, governance, contracts, shareholder agreements, and regulatory compliance for businesses of all sizes.",
    stat: "500+ Firms",
  },
  {
    num: "06",
    title: "Tax Law",
    sub: "Compliance & Planning",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=90&fit=crop",
    accent: "#1b4d3e",
    desc: "Strategic tax planning, dispute resolution with revenue authorities, cross-border tax structuring, and compliance advisory for individuals and corporations.",
    stat: "98% Success",
  },
  {
    num: "07",
    title: "Civil Litigation",
    sub: "Common Law",
    image: "/civil.png",
    accent: "#b8943f",
    desc: "Skilled advocacy in civil litigation matters, contract disputes, tortious claims, and appellate proceedings across all levels of the court system.",
    stat: "1000+ Wins",
  },
  {
    num: "08",
    title: "Labour Law",
    sub: "Employment & Rights",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=90&fit=crop",
    accent: "#1b4d3e",
    desc: "Protecting employer and employee rights through employment contracts, workplace disputes, unfair dismissal claims, and regulatory compliance guidance.",
    stat: "30+ Years",
  },
];

/* ─── MODAL ─── */
function Modal({ item, onClose }: { item: typeof expertiseItems[0] | null; onClose: () => void }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-hero">
          <img src={item.image} alt={item.title} className="modal-hero-img"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"; }}
          />
          <div className="modal-hero-veil" />
          <div className="modal-hero-content">
            <span className="modal-num">{item.num}</span>
            <div className="modal-stat-pill">{item.stat}</div>
          </div>
        </div>

        <div className="modal-body">
          <span className="modal-tag">{item.sub}</span>
          <h3 className="modal-h">{item.title}</h3>
          <div className="modal-divider">
            <span className="modal-divider-dot" />
            <div className="modal-divider-line" />
          </div>
          <p className="modal-desc">{item.desc}</p>

          <div className="modal-feats">
            <div className="modal-feat">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#b8943f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Free Initial Consultation
            </div>
            <div className="modal-feat">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#b8943f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Expert Senior Attorneys
            </div>
            <div className="modal-feat">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#b8943f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Confidential &amp; Secure
            </div>
          </div>

          <button className="modal-cta">
            Schedule a Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD ─── */
function Card({ item, onClick, index }: { item: typeof expertiseItems[0]; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      setTilt({
        x: (nx - 0.5) * 18,
        y: (ny - 0.5) * -18,
        shine: { x: nx * 100, y: ny * 100 },
      });
    });
  }, []);

  const handleLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  };

  return (
    <div
      ref={ref}
      className={`ex-card${hovered ? " ex-card--on" : ""}`}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-10px) scale(1.02)`
          : "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)",
        animationDelay: `${index * 80}ms`,
        "--shine-x": `${tilt.shine.x}%`,
        "--shine-y": `${tilt.shine.y}%`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className={`ex-card-gloss${hovered ? " visible" : ""}`} />
      <div className="ex-card-num">{item.num}</div>

      <div className="ex-card-img-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="ex-card-img"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"; }}
        />
        <div className="ex-card-img-veil" />
        <div className={`ex-card-zoom-hint${hovered ? " show" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M10 4v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="ex-card-body">
        <div className="ex-card-meta">
          <span className="ex-card-sub">{item.sub}</span>
          <span className={`ex-card-stat${hovered ? " show" : ""}`}>{item.stat}</span>
        </div>
        <h3 className="ex-card-title">{item.title}</h3>
        <p className={`ex-card-desc${hovered ? " show" : ""}`}>{item.desc.slice(0, 80)}…</p>
        <div className={`ex-card-action${hovered ? " show" : ""}`}>
          <span>Explore Practice</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className={`ex-card-bar${hovered ? " on" : ""}`} />
    </div>
  );
}

/* ─── MAIN ─── */
export default function Expertise() {
  const [active, setActive] = useState<typeof expertiseItems[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');

        :root {
          --ivory:   #ffffff;
          --ink:     #0d0d0d;
          --gold:    #b8943f;
          --gold-lt: #d4aa50;
          --gold-dim: rgba(184,148,63,0.15);
          --teal:    #1b4d3e;
          --teal-lt: #2d6b5a;
          --muted:   #6b6560;
          --border:  rgba(0,0,0,0.08);
          --warm:    #f7f5f2;
          --card-shadow: 0 30px 70px rgba(0,0,0,0.13), 0 6px 20px rgba(0,0,0,0.06);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── SECTION WRAPPER ─── */
        .ex-wrap {
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          padding: 80px 48px 96px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .ex-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(184,148,63,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,148,63,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ─── HEADER ─── */
        .ex-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
          position: relative;
          flex-wrap: wrap;
          gap: 20px;
        }

        .ex-header::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 80px; height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .ex-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
          margin-bottom: 14px;
        }

        .ex-eyebrow-line {
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), var(--gold-lt));
        }

        .ex-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.8rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.05;
          letter-spacing: -1px;
        }

        .ex-title em {
          font-style: italic;
          color: var(--teal);
          position: relative;
          display: inline-block;
        }

        .ex-title em::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineIn 0.8s 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes underlineIn { to { transform: scaleX(1); } }

        .ex-right {
          text-align: right;
        }

        .ex-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          color: var(--ink);
          line-height: 1;
          letter-spacing: 2px;
          position: relative;
        }

        .ex-count::before {
          content: attr(data-num);
          position: absolute;
          inset: 0;
          color: transparent;
          -webkit-text-stroke: 1px rgba(184,148,63,0.25);
          transform: translate(3px, 3px);
          z-index: -1;
        }

        .ex-count-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 400;
          margin-top: 4px;
        }

        /* ─── GRID ─── */
        .ex-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ─── CARD ─── */
        .ex-card {
          position: relative;
          background: #fff;
          border: 1px solid var(--border);
          cursor: pointer;
          overflow: hidden;
          transition:
            transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            border-color 0.35s ease;
          will-change: transform;
          opacity: 0;
          animation: cardReveal 0.65s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ex-card--on {
          border-color: rgba(184,148,63,0.4);
          box-shadow: var(--card-shadow);
          z-index: 2;
        }

        .ex-card-gloss {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--shine-x, 50%) var(--shine-y, 50%),
            rgba(255,255,255,0.18) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 10;
          mix-blend-mode: screen;
        }
        .ex-card-gloss.visible { opacity: 1; }

        .ex-card-num {
          position: absolute;
          top: 14px; left: 14px;
          z-index: 5;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 2px;
          color: #fff;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.15);
          line-height: 1.4;
        }

        .ex-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--warm);
        }

        .ex-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease;
          filter: brightness(0.92) saturate(1.05);
        }

        .ex-card--on .ex-card-img {
          transform: scale(1.1);
          filter: brightness(0.75) saturate(1.15);
        }

        .ex-card-img-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 20%,
            rgba(13,13,13,0.55) 100%
          );
          transition: opacity 0.4s;
        }

        .ex-card-zoom-hint {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.6);
          width: 48px; height: 48px;
          background: rgba(184,148,63,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s, transform 0.4s cubic-bezier(0.23,1,0.32,1);
          z-index: 4;
        }

        .ex-card-zoom-hint.show {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .ex-card-body {
          padding: 20px 20px 22px;
          position: relative;
          background: #fff;
        }

        .ex-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 6px;
        }

        .ex-card-sub {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }

        .ex-card-stat {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          background: var(--gold-dim);
          padding: 3px 8px;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;
          white-space: nowrap;
        }

        .ex-card-stat.show { opacity: 1; transform: translateX(0); }

        .ex-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.15;
          margin-bottom: 8px;
          transition: color 0.3s;
        }

        .ex-card--on .ex-card-title { color: var(--teal); }

        .ex-card-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 300;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(6px);
          transition: max-height 0.4s ease, opacity 0.35s 0.05s, transform 0.35s 0.05s;
          margin-bottom: 0;
        }

        .ex-card-desc.show {
          max-height: 80px;
          opacity: 1;
          transform: translateY(0);
          margin-bottom: 12px;
        }

        .ex-card-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s 0.1s, transform 0.3s 0.1s;
        }

        .ex-card-action.show { opacity: 1; transform: translateY(0); }

        .ex-card-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, var(--teal) 0%, var(--gold) 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ex-card-bar.on { transform: scaleX(1); }

        /* ─── FOOTER STRIP ─── */
        .ex-footer {
          margin-top: 28px;
          background: var(--ink);
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 24px;
          padding: 28px 40px;
          position: relative;
          overflow: hidden;
        }

        .ex-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--gold), transparent);
        }

        .ex-footer-quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.3px;
          line-height: 1.5;
          margin-bottom: 6px;
        }

        .ex-footer-sub {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
        }

        .ex-footer-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ex-footer-btn {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 600;
          padding: 12px 28px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          transition: all 0.25s ease;
          border: none;
        }

        .ex-footer-btn-primary {
          background: var(--gold);
          color: var(--ink);
        }

        .ex-footer-btn-primary:hover {
          background: var(--gold-lt);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(184,148,63,0.35);
        }

        .ex-footer-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15) !important;
        }

        .ex-footer-btn-ghost:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
          border-color: rgba(255,255,255,0.3) !important;
        }

        /* ─── MODAL ─── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10,10,10,0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bFadeIn 0.3s ease;
          padding: 16px;
        }

        @keyframes bFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-panel {
          background: #fff;
          width: 100%;
          max-width: 540px;
          position: relative;
          overflow-y: auto;
          max-height: 90vh;
          box-shadow: 0 60px 120px rgba(0,0,0,0.5);
          animation: mSlideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes mSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-x {
          position: absolute;
          top: 12px; right: 12px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.95);
          border: 1px solid var(--border);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          z-index: 20;
          transition: background 0.2s, transform 0.2s;
        }

        .modal-x:hover { background: #f0ede9; transform: rotate(90deg); }

        .modal-hero {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .modal-hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: brightness(0.7) saturate(1.1);
        }

        .modal-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%);
        }

        .modal-hero-content {
          position: absolute;
          bottom: 16px; left: 20px; right: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 2;
        }

        .modal-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 4.5rem);
          color: rgba(255,255,255,0.15);
          line-height: 1;
          letter-spacing: 4px;
          -webkit-text-stroke: 1px rgba(255,255,255,0.25);
          user-select: none;
        }

        .modal-stat-pill {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink);
          background: var(--gold);
          padding: 6px 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
        }

        .modal-body {
          padding: 24px 28px 32px;
        }

        .modal-tag {
          display: inline-block;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 10px;
          border-left: 2px solid var(--gold);
          padding-left: 10px;
        }

        .modal-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 5vw, 2.4rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.05;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
        }

        .modal-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .modal-divider-dot {
          width: 6px; height: 6px;
          background: var(--gold);
          flex-shrink: 0;
        }

        .modal-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .modal-desc {
          font-size: 13.5px;
          color: #5a5249;
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 24px;
        }

        .modal-feats {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .modal-feat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--ink);
          font-weight: 400;
        }

        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--teal);
          color: #fff;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 600;
          padding: 15px 32px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
          width: 100%;
          justify-content: center;
        }

        .modal-cta:hover {
          background: var(--teal-lt);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(27,77,62,0.3);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════════ */

        /* Large tablets */
        @media (max-width: 1100px) {
          .ex-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Tablets / small laptops */
        @media (max-width: 900px) {
          .ex-wrap { padding: 56px 32px 72px; }
          .ex-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .ex-header { flex-direction: column; align-items: flex-start; }
          .ex-right { text-align: left; }
          .ex-footer {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 28px 28px;
          }
          .ex-footer-actions { justify-content: center; }
        }

        /* Mobile landscape / large phones */
        @media (max-width: 600px) {
          .ex-wrap { padding: 40px 16px 56px; }
          .ex-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ex-card-body { padding: 12px 12px 14px; }
          .ex-card-desc.show { max-height: 70px; }
          .ex-footer { padding: 22px 16px; }
          .ex-footer-actions { flex-direction: column; width: 100%; gap: 8px; }
          .ex-footer-btn { width: 100%; text-align: center; padding: 14px 16px; }
          .modal-hero { height: 170px; }
          .modal-body { padding: 18px 18px 24px; }
        }

        /* Small phones */
        @media (max-width: 420px) {
          .ex-wrap { padding: 32px 12px 48px; }
          .ex-grid { grid-template-columns: 1fr; gap: 12px; }
          .ex-card-img-wrap { aspect-ratio: 16 / 9; }
          .ex-header { margin-bottom: 36px; padding-bottom: 28px; }
          .modal-hero { height: 150px; }
        }
      `}</style>

      <section className="ex-wrap" ref={sectionRef}>
        {/* ── Header ── */}
        <div className="ex-header">
          <div className="ex-left">
            <div className="ex-eyebrow">
              <span className="ex-eyebrow-line" />
              Practice Areas
            </div>
            <h2 className="ex-title">
              Our <em>Areas of</em><br />Expertise
            </h2>
          </div>
          <div className="ex-right">
            <div className="ex-count" data-num="08">08</div>
            <div className="ex-count-label">Legal Specializations<br />Serving Since 1992</div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="ex-grid">
          {expertiseItems.map((item, i) => (
            <Card key={i} item={item} index={i} onClick={() => setActive(item)} />
          ))}
        </div>

        {/* ── Footer Strip ── */}
        <div className="ex-footer">
          <div className="ex-footer-left">
            <p className="ex-footer-quote">"Every person who walks through our door is important to us."</p>
            <span className="ex-footer-sub">Trusted Legal Counsel Since 1992</span>
          </div>
          <div className="ex-footer-actions">
            <button className="ex-footer-btn ex-footer-btn-ghost">Learn More</button>
            <button className="ex-footer-btn ex-footer-btn-primary">All Practice Areas →</button>
          </div>
        </div>
      </section>

      <Modal item={active} onClose={() => setActive(null)} />
    </>
  );
}