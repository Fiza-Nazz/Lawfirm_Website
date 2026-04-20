"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── THEME ─────────────────────────────────────────── */
const C = {
  ink:    "#0a0a0a",
  paper:  "#ffffff",
  off:    "#f9f8f6",
  teal:   "#1B4A42",
  teal2:  "#143830",
  gold:   "#C9A84C",
  gold2:  "#a8873a",
  mist:   "#e8e3db",
  smoke:  "#6b6b6b",
};

/* ─── PRACTICE DATA ───────────────────────────────────── */
const practices = [
  {
    id: "01",
    title: "Personal Injury",
    tagline: "Fight for what you deserve",
    category: "Civil Litigation",
    img: "/personalinjury.png",
    desc: "When negligence causes harm, we hold responsible parties accountable. Our attorneys pursue maximum compensation across medical malpractice, accidents, and wrongful death cases.",
    points: ["Medical Malpractice", "Slip & Fall Accidents", "Wrongful Death", "Product Liability"],
    stat: { num: "98%", label: "Win Rate" },
  },
  {
    id: "02",
    title: "Criminal Defense",
    tagline: "Your freedom is non-negotiable",
    category: "Defense Law",
    img: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=900&q=90&fit=crop",
    desc: "Facing criminal charges is life-altering. Our defense attorneys build airtight strategies to protect your rights, reputation, and future at every stage of the process.",
    points: ["DUI / DWI Defense", "Drug Offenses", "White-Collar Crime", "Assault & Violent Crimes"],
    stat: { num: "500+", label: "Acquittals" },
  },
  {
    id: "03",
    title: "Corporate Law",
    tagline: "Protecting your business at every turn",
    category: "Business Law",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=90&fit=crop",
    desc: "From startup formation to complex mergers, we provide comprehensive legal counsel empowering businesses to grow with confidence, compliance, and clarity.",
    points: ["Mergers & Acquisitions", "Contract Drafting", "Regulatory Compliance", "Shareholder Disputes"],
    stat: { num: "$2B+", label: "Deals Closed" },
  },
  {
    id: "04",
    title: "Bankruptcy",
    tagline: "A fresh financial start awaits",
    category: "Financial Law",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=90&fit=crop",
    desc: "Overwhelming debt doesn't define you. Our attorneys guide individuals and businesses through Chapter 7, 11, and 13 filings to restore financial stability.",
    points: ["Chapter 7 Filing", "Chapter 13 Restructure", "Business Bankruptcy", "Debt Negotiation"],
    stat: { num: "100%", label: "Discharge Rate" },
  },
  {
    id: "05",
    title: "Family Law",
    tagline: "Compassionate counsel in hard times",
    category: "Family & Domestic",
    img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=90&fit=crop",
    desc: "We handle sensitive family matters with discretion and empathy — ensuring you and your loved ones are protected, heard, and fairly represented in every proceeding.",
    points: ["Divorce & Separation", "Child Custody", "Adoption", "Prenuptial Agreements"],
    stat: { num: "25yr", label: "Experience" },
  },
  {
    id: "06",
    title: "Car Accidents",
    tagline: "Don't navigate recovery alone",
    category: "Auto & Transport",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=90&fit=crop",
    desc: "Auto accidents are devastating. We handle everything — insurance negotiations, liability disputes, and litigation — so you focus on healing while we focus on justice.",
    points: ["Insurance Claims", "Liability Assessment", "Uninsured Motorist", "Hit & Run Cases"],
    stat: { num: "3x", label: "Avg. Settlement" },
  },
];

/* ─── INTERSECTION HOOK ──────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── MAGNETIC CURSOR HOOK ───────────────────────────── */
function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
  }, []);
  const handleEnter = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.1s ease";
  }, []);
  return { ref, handleMove, handleLeave, handleEnter };
}

/* ─── PRACTICE CARD ──────────────────────────────────── */
function PracticeCard({ p, index }: { p: typeof practices[0]; index: number }) {
  const { ref, inView } = useInView(0.08);
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const transitionBase = "box-shadow 0.4s ease, border-color 0.3s";
  const transitionHov  = "transform 0.1s ease, " + transitionBase;
  const transitionOut  = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), " + transitionBase;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(70px)",
        transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: hov
            ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(0)`
            : "perspective(1000px) rotateY(0) rotateX(0)",
          transition: hov ? transitionHov : transitionOut,
          cursor: "pointer",
          background: C.paper,
          border: `1px solid ${hov ? C.gold : C.mist}`,
          position: "relative",
          overflow: "hidden",
          boxShadow: hov
            ? `0 40px 80px rgba(27,74,66,0.22), 0 8px 32px rgba(201,168,76,0.15), inset 0 0 0 1px rgba(201,168,76,0.2)`
            : "0 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Top image with overlay ── */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hov ? "scale(1.08)" : "scale(1.02)",
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              filter: "brightness(0.88) contrast(1.05) saturate(0.9)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.65) 100%)",
          }} />
          <div style={{
            position: "absolute", top: 18, left: 18,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "5px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9, letterSpacing: "2.5px",
            textTransform: "uppercase", color: "#fff",
          }}>{p.category}</div>
          <div style={{
            position: "absolute", top: 12, right: 18,
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.5rem", fontWeight: 700,
            color: hov ? C.gold : "rgba(255,255,255,0.15)",
            lineHeight: 1, userSelect: "none",
            transition: "color 0.4s ease",
          }}>{p.id}</div>
          <div style={{
            position: "absolute", bottom: 18, left: 18,
            display: "flex", flexDirection: "column",
            opacity: hov ? 1 : 0,
            transform: hov ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.4s ease",
          }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: C.gold, lineHeight: 1 }}>{p.stat.num}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{p.stat.label}</span>
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`,
            transform: hov ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }} />
        </div>

        {/* ── Card Body ── */}
        <div style={{ padding: "22px 24px 26px" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            letterSpacing: "3px", textTransform: "uppercase",
            color: C.gold, marginBottom: 8,
          }}>{p.tagline}</p>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.45rem",
            fontWeight: 700, color: C.teal, marginBottom: 12, lineHeight: 1.15,
          }}>{p.title}</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            lineHeight: 1.85, color: C.smoke, marginBottom: 18,
          }}>{p.desc}</p>
          <div style={{ height: 1, background: C.mist, marginBottom: 16 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 12px", marginBottom: 20 }}>
            {p.points.map((pt, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#444",
              }}>
                <div style={{
                  width: 4, height: 4, borderRadius: "50%", background: C.gold,
                  flexShrink: 0, boxShadow: `0 0 6px ${C.gold}88`,
                }} />
                {pt}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "transparent", border: "none", padding: 0, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: hov ? C.gold : C.teal, transition: "color 0.3s",
            }}>
              Learn More
              <span style={{
                display: "inline-block", width: hov ? 36 : 16, height: 1,
                background: hov ? C.gold : C.teal, transition: "all 0.4s ease",
              }} />
              →
            </button>
            <div style={{
              width: 36, height: 36, border: `1px solid ${hov ? C.gold : C.mist}`,
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              color: hov ? C.gold : C.teal, fontSize: 16,
              transition: "all 0.3s ease",
              transform: hov ? "rotate(45deg)" : "rotate(0deg)",
            }}>↗</div>
          </div>
        </div>

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${50 + tilt.x * 4}% ${50 - tilt.y * 4}%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
        }} />
      </div>
    </div>
  );
}

/* ─── COUNTER ANIMATION ──────────────────────────────── */
function AnimatedStat({ num, label, delay = 0 }: { num: string; label: string; delay?: number }) {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
      transition: `all 0.8s ease ${delay}s`,
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 3rem)",
        fontWeight: 700, color: C.teal, lineHeight: 1,
      }}>{num}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: "2.5px", textTransform: "uppercase",
        color: "#999", marginTop: 6,
      }}>{label}</div>
    </div>
  );
}

/* ─── FLOATING BADGE ─────────────────────────────────── */
function FloatingBadge() {
  return (
    <div style={{
      position: "absolute", bottom: 60, right: 80, zIndex: 3,
      width: 100, height: 100,
      animation: "float 4s ease-in-out infinite",
      display: "none",
    }} className="floating-badge">
      <svg viewBox="0 0 110 110" width="100" height="100">
        <circle cx="55" cy="55" r="52" fill="none" stroke={`${C.gold}55`} strokeWidth="1" />
        <circle cx="55" cy="55" r="44" fill="none" stroke={`${C.gold}33`} strokeWidth="0.5" />
        <text x="55" y="50" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="28" fontWeight="700" fill={C.gold}>06</text>
        <text x="55" y="68" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" letterSpacing="3" fill="rgba(255,255,255,0.5)">AREAS</text>
      </svg>
    </div>
  );
}

/* ─── CTA BUTTON ─────────────────────────────────────── */
function CTAButton({ label, primary, onClick }: { label: string; primary: boolean; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        padding: "14px 28px",
        background: primary ? (hov ? C.gold : C.paper) : "transparent",
        color: primary ? C.teal : (hov ? C.gold : C.paper),
        border: primary ? "none" : `1px solid ${hov ? C.gold : "rgba(255,255,255,0.4)"}`,
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: "3px", textTransform: "uppercase",
        cursor: "pointer",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov && primary ? "0 16px 40px rgba(0,0,0,0.25)" : "none",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        whiteSpace: "nowrap",
      }}
    >{label}</button>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────── */
export default function PracticeAreas() {
  const hero  = useInView(0.01);
  const intro = useInView(0.08);
  const grid  = useInView(0.04);
  const cta   = useInView(0.08);
  const mag   = useMagnetic();

  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Civil Litigation", "Defense Law", "Business Law", "Financial Law", "Family & Domestic", "Auto & Transport"];
  const filtered = filter === "All" ? practices : practices.filter(p => p.category === filter);

  return (
    <main style={{ background: C.paper, color: C.ink, overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        button { outline: none; }

        @keyframes heroWord {
          from { opacity:0; transform:translateY(28px) skewY(2deg); }
          to   { opacity:1; transform:translateY(0) skewY(0); }
        }
        @keyframes bgDrift {
          from { transform: scale(1.1) translate(0,0); }
          to   { transform: scale(1.0) translate(-10px,-5px); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33%      { transform: translateY(-10px) rotate(2deg); }
          66%      { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spinSlow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        .hw { display:inline-block; opacity:0; animation:heroWord 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

        .filter-btn {
          padding: 10px 18px;
          background: transparent;
          border: 1px solid ${C.mist};
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${C.smoke};
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .filter-btn:hover, .filter-btn.active {
          background: ${C.teal};
          color: ${C.paper};
          border-color: ${C.teal};
        }

        /* ── FLOATING BADGE show on large screens ── */
        @media (min-width: 1024px) {
          .floating-badge { display: block !important; }
        }

        /* ── LARGE DESKTOP ── */
        @media (min-width: 1200px) {
          .hero-pad { padding: 0 100px !important; }
          .section-inner { max-width: 1200px !important; }
        }

        /* ── TABLET LANDSCAPE (901–1199px) ── */
        @media (max-width: 1199px) and (min-width: 901px) {
          .practices-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hero-pad { padding: 0 60px !important; }
          .section-pad { padding: 70px 40px !important; }
          .process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .intro-flex { gap: 60px !important; }
          .intro-left { flex: 0 0 280px !important; }
        }

        /* ── TABLET PORTRAIT (601–900px) ── */
        @media (max-width: 900px) and (min-width: 601px) {
          .practices-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hero-pad { padding: 0 40px !important; }
          .section-pad { padding: 60px 32px !important; }
          .intro-flex { flex-direction: column !important; gap: 40px !important; }
          .intro-left { flex: none !important; width: 100% !important; }
          .process-grid { grid-template-columns: repeat(2,1fr) !important; }
          .stats-row { gap: 32px !important; flex-wrap: wrap !important; }
          .cta-inner { flex-direction: column !important; gap: 36px !important; }
          .badge-row { flex-wrap: wrap !important; gap: 8px !important; }
        }

        /* ── MOBILE (≤600px) ── */
        @media (max-width: 600px) {
          .practices-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 0 24px !important; }
          .section-pad { padding: 50px 20px !important; }
          .intro-flex { flex-direction: column !important; gap: 36px !important; }
          .intro-left { flex: none !important; width: 100% !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .stats-row { gap: 28px !important; flex-wrap: wrap !important; }
          .cta-inner { flex-direction: column !important; gap: 28px !important; }
          .cta-btns { flex-direction: column !important; width: 100% !important; }
          .cta-btns button { width: 100% !important; justify-content: center !important; }
          .badge-row { flex-wrap: wrap !important; gap: 8px !important; }
          .filter-bar-inner { padding: 0 20px !important; }
          .filter-btn { padding: 9px 14px !important; font-size: 9px !important; }
          .award-badges { flex-wrap: wrap !important; }
        }

        /* ── EXTRA SMALL (≤380px) ── */
        @media (max-width: 380px) {
          .hero-pad { padding: 0 16px !important; }
          .section-pad { padding: 40px 16px !important; }
          .filter-btn { padding: 8px 10px !important; letter-spacing: 1px !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/laww.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.18) grayscale(20%)",
          animation: "bgDrift 20s ease forwards",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.teal2}ee 0%, ${C.teal}bb 45%, rgba(0,0,0,0.7) 100%)` }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />
        <div style={{
          position: "absolute", left: 36, top: 0, bottom: 0,
          width: 1, background: `linear-gradient(to bottom, transparent, ${C.gold}55, transparent)`,
        }} />
        <div style={{
          position: "absolute", right: -80, top: "10%",
          width: 500, height: 500,
          border: `1px solid ${C.gold}22`, borderRadius: "50%",
          animation: "spinSlow 40s linear infinite",
        }} />
        <FloatingBadge />
        <div className="hero-pad" style={{ position: "relative", zIndex: 4, padding: "0 60px", maxWidth: 900, width: "100%" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
            opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards",
          }}>
            <div style={{ width: 40, height: 1, background: C.gold, flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: C.gold }}>
              Amin Law Associates · Practice Areas
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
            fontWeight: 700, lineHeight: 0.95, color: C.paper, marginBottom: 32,
          }}>
            {"Legal".split("").map((ch, i) => (
              <span key={i} className="hw" style={{ animationDelay: `${0.35 + i * 0.06}s` }}>{ch}</span>
            ))}
            {" "}
            <span className="hw" style={{ animationDelay: "0.75s" }}>
              <em style={{ fontStyle: "italic", color: C.gold }}>Excellence</em>
            </span>
            <br />
            <span className="hw" style={{ animationDelay: "0.9s", fontSize: "0.75em", fontWeight: 400, opacity: 0.85 }}>
              Across Every Domain.
            </span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 2vw, 15px)", lineHeight: 2,
            color: "rgba(255,255,255,0.6)", maxWidth: 480,
            opacity: 0, animation: "fadeUp 0.9s ease 1.1s forwards",
          }}>
            Six specialized practice areas. One unified commitment — justice, precision, and results for every client we serve.
          </p>
          <div style={{
            display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap",
            opacity: 0, animation: "fadeUp 0.9s ease 1.3s forwards",
          }}>
            <CTAButton label="Free Consultation" primary />
            <CTAButton label="Our Attorneys" primary={false} />
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: C.paper, clipPath: "ellipse(60% 100% at 50% 100%)",
        }} />
      </section>

      {/* ══════════════ INTRO STRIP ══════════════ */}
      <section
        ref={intro.ref}
        className="intro-flex section-pad section-inner"
        style={{
          display: "flex", alignItems: "flex-start", gap: 80,
          maxWidth: 1140, margin: "0 auto", padding: "90px 60px",
          opacity: intro.inView ? 1 : 0,
          transform: intro.inView ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="intro-left" style={{ flex: "0 0 320px" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: "6rem",
            color: `${C.teal}14`, lineHeight: 0.7, fontWeight: 700, userSelect: "none",
          }}>"</div>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
            fontStyle: "italic", fontWeight: 400, lineHeight: 1.6, color: C.teal, marginTop: -20,
          }}>
            Every case is a person. Every person deserves relentless advocacy.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
            <div style={{ width: 40, height: 1, background: C.gold, flexShrink: 0 }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.gold }}>
              Jonathan Harlow, Founder
            </p>
          </div>
          <div className="award-badges" style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
            {["Best Law Firm 2023", "AV Rated", "Top 40 Under 40"].map(b => (
              <div key={b} style={{
                padding: "6px 10px",
                border: `1px solid ${C.mist}`,
                fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: C.smoke, background: C.off,
              }}>{b}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 2vw, 15px)", lineHeight: 2, color: "#555", marginBottom: 36,
          }}>
            Our practice spans the full spectrum of legal need. Whether you're an individual facing a crisis or a corporation navigating complex regulation, Harlow & Associates brings the same intensity, preparation, and expertise to every engagement.
          </p>
          <div className="stats-row" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <AnimatedStat num="25+" label="Years Active" delay={0} />
            <AnimatedStat num="6" label="Practice Areas" delay={0.15} />
            <AnimatedStat num="1,200+" label="Cases Closed" delay={0.3} />
            <AnimatedStat num="$500M+" label="Recovered" delay={0.45} />
          </div>
        </div>
      </section>

      {/* ══════════════ FILTER BAR ══════════════ */}
      <div ref={grid.ref} style={{
        background: C.off, borderTop: `1px solid ${C.mist}`, borderBottom: `1px solid ${C.mist}`,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        opacity: grid.inView ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}>
        <div className="filter-bar-inner" style={{
          display: "flex", gap: 0, maxWidth: 1140, margin: "0 auto",
          padding: "0 60px", alignItems: "center",
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? " active" : ""}`}
              onClick={() => setFilter(cat)}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* ══════════════ PRACTICE GRID ══════════════ */}
      <section className="section-pad" style={{ background: C.off, padding: "70px 60px 90px" }}>
        <div className="section-inner" style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{
            marginBottom: 48, display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            opacity: grid.inView ? 1 : 0, transform: grid.inView ? "none" : "translateY(20px)",
            transition: "all 0.9s ease 0.2s",
          }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
                What We Handle
              </p>
              <div style={{
                width: grid.inView ? 56 : 0, height: 2,
                background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`,
                transition: "width 1s ease 0.4s", marginBottom: 14,
              }} />
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
                fontWeight: 700, color: C.ink, lineHeight: 1.1,
              }}>
                Our <em style={{ fontStyle: "italic", color: C.teal }}>Practice Areas</em>
              </h2>
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: C.smoke, lineHeight: 1.7,
            }}>
              Showing <strong style={{ color: C.teal }}>{filtered.length}</strong> of {practices.length} areas
            </div>
          </div>

          <div
            className="practices-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {filtered.map((p, i) => (
              <PracticeCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESS STRIP ══════════════ */}
      <ProcessStrip />

      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <section
        ref={cta.ref}
        className="section-pad"
        style={{
          background: C.teal2, padding: "90px 60px",
          position: "relative", overflow: "hidden",
          opacity: cta.inView ? 1 : 0,
          transform: cta.inView ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{
          position: "absolute", right: -120, top: -120,
          width: 480, height: 480, border: `1px solid ${C.gold}18`, borderRadius: "50%",
        }} />
        <div className="cta-inner section-inner" style={{
          maxWidth: 1140, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 48, flexWrap: "wrap",
          position: "relative", zIndex: 2,
        }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>
              Not Sure Where to Start?
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
              fontWeight: 700, color: C.paper, lineHeight: 1.15,
            }}>
              Let us guide you to the{" "}
              <em style={{ fontStyle: "italic", color: C.gold }}>right solution.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.95, color: "rgba(255,255,255,0.55)", marginTop: 18, maxWidth: 440 }}>
              Schedule a free consultation and speak directly with one of our senior attorneys — no obligation, no pressure.
            </p>
            <div className="badge-row" style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              {["📞 +923009209003", "📧 Aminlawassociates7@gmail.com", "🕒 Mon–Sat, 8am–8pm"].map(info => (
                <div key={info} style={{
                  padding: "7px 12px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(10px, 1.5vw, 12px)", color: "rgba(255,255,255,0.7)",
                }}>{info}</div>
              ))}
            </div>
          </div>
          <div className="cta-btns" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <CTAButton label="Book Free Consultation" primary />
            <CTAButton label="View Our Attorneys" primary={false} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 6, letterSpacing: "1px" }}>
              Response within 24 hours guaranteed
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── PROCESS STRIP ──────────────────────────────────── */
function ProcessStrip() {
  const { ref, inView } = useInView(0.1);
  const steps = [
    { n: "01", title: "Free Consultation", desc: "Tell us your case. No charge, no commitment." },
    { n: "02", title: "Case Evaluation", desc: "We assess every angle and build your strategy." },
    { n: "03", title: "Active Representation", desc: "We fight in your corner from day one." },
    { n: "04", title: "Resolution & Results", desc: "Maximum compensation or acquittal — delivered." },
  ];
  return (
    <section ref={ref} style={{ background: C.paper, padding: "80px 60px", borderTop: `1px solid ${C.mist}` }}>
      <div className="section-inner" style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", marginBottom: 56,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "all 0.9s ease",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>How It Works</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 700, color: C.ink }}>
            From <em style={{ fontStyle: "italic", color: C.teal }}>First Call</em> to Final Victory
          </h2>
        </div>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              background: i % 2 === 0 ? C.off : C.paper,
              borderTop: `3px solid ${i === 0 ? C.gold : C.mist}`,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: `all 0.9s ease ${0.1 + i * 0.12}s`,
              position: "relative",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: "3rem",
                fontWeight: 700, color: `${C.teal}18`, lineHeight: 1, marginBottom: 14, userSelect: "none",
              }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: C.teal, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.8, color: C.smoke }}>{s.desc}</p>
              {i < 3 && (
                <div style={{
                  position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
                  color: C.gold, fontSize: 18, zIndex: 2,
                }}>›</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}