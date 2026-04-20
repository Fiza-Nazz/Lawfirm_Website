"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const GOLD = "#C9A84C";
const TEAL = "#1B4A42";

const stats = [
  { number: "25+", label: "Years of Excellence" },
  { number: "1,200+", label: "Cases Won" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "40+", label: "Expert Attorneys" },
];

const attorneysWithImage = [
  {
    name: "Abid Akram",
    role: "Senior Partner",
    specialty: "Advocate Supreme Court",
    img: "/advocate7.png",
  },
  {
    name: "Faqia Amin",
    role: "Former Additional Joint Secretary",
    specialty: "Advocate High Court",
    img: "/advocate2.png",
  },
  {
    name: "Ilyas Amin",
    role: "Associate",
    specialty: "Advocate High Court",
    img: "/advocate3.png",
  },
  {
    name: "Muzamil Husaain Metlo",
    role: "Associate",
    specialty: "Advocate High Court",
    img: "/advocate4.png",
    clickable: true,
  },
  {
    name: "Zubair Chohan",
    role: "Associate",
    specialty: "Advocate High Court",
    img: "/advocate5.png",
  },
];

const attorneysNameOnly = [
  { name: "Amjad", role: "Associate", specialty: "Advocate High Court" },
  { name: "Abid Zaman", role: "Associate", specialty: "Advocate High Court" },
  { name: "Faheem Ali Mangi", role: "Associate", specialty: "Advocate High Court" },
  { name: "Muhammad Haroon Khoso", role: "Associate", specialty: "Advocate High Court" },
  { name: "Muhammad Nasir", role: "Associate", specialty: "Advocate High Court" },
  { name: "Abid Akram", role: "Associate", specialty: "Advocate High Court" },
];

const directors = [
  {
    name: "Syed Faraz Liaquat",
    role: "Director",
    firm: "Amin Law Associates",
    img: "/director.png",
  },
  {
    name: "Agha M Zakaria",
    role: "Director",
    firm: "Amin Law Associates",
    img: "/director1.png",
  },
];

const ceo = {
  name: "M Moin Amin",
  role: "CEO",
  firm: "Amin Law Associates",
  img: "/advocate0.png",
  phone1: "0300-9209003",
  phone2: "021-34899996",
  email: "Aminlawassociates7@gmail.com",
};

const values = [
  { title: "Integrity", desc: "We uphold the highest ethical standards in every case." },
  { title: "Protection", desc: "Your rights and interests are our foremost priority." },
  { title: "Expertise", desc: "Decades of specialized legal knowledge at your service." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedNumber({ target }: { target: string }) {
  const { ref, inView } = useInView();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[\d]/g, "");
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplay(start + suffix);
      if (start >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  const router = useRouter();

  const statsSection = useInView(0.1);
  const story = useInView(0.1);
  const team = useInView(0.1);
  const valuesSection = useInView(0.1);
  const directorSection = useInView(0.1);
  const ceoSection = useInView(0.1);

  return (
    <main
      style={{
        background: "#ffffff",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#1a1a1a",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.25s; }
        .fade-up.d3 { transition-delay: 0.4s; }
        .fade-up.d4 { transition-delay: 0.55s; }

        .gold-line {
          width: 60px;
          height: 2px;
          background: ${GOLD};
          margin-bottom: 20px;
        }

        .label-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 12px;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.25);
          transform: scale(1.05);
          animation: zoomOut 12s ease forwards;
        }
        @keyframes zoomOut {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0);  }
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${TEAL}cc 0%, #00000088 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
          padding: 0 60px;
        }
        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.3s forwards;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 300;
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 1s ease 0.5s forwards;
        }
        .hero-title em { font-style: italic; color: ${GOLD}; }
        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: #cccccc;
          max-width: 520px;
          opacity: 0;
          animation: fadeUp 1s ease 0.75s forwards;
        }
        .hero-divider {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: #ffffff;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── STATS ── */
        .stats-bar { background: ${TEAL}; padding: 64px 60px; }
        .stats-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          text-align: center;
          padding: 0 20px;
          border-right: 1px solid rgba(201,168,76,0.25);
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: 'Bebas Neue', cursive;
          font-size: 4rem;
          color: ${GOLD};
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* ── STORY ── */
        .story-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .story-img-wrap { position: relative; }
        .story-img { width: 100%; height: 480px; object-fit: cover; display: block; }
        .story-img-accent {
          position: absolute;
          bottom: -20px; right: -20px;
          width: 120px; height: 120px;
          border: 2px solid ${GOLD};
          z-index: -1;
        }
        .story-badge {
          position: absolute;
          top: 30px; left: -24px;
          background: ${TEAL};
          color: #fff;
          padding: 20px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 1px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .story-badge strong {
          display: block;
          font-family: 'Bebas Neue', cursive;
          font-size: 2.5rem;
          color: ${GOLD};
          line-height: 1;
        }
        .story-text h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 24px;
          color: #111;
        }
        .story-text h2 em { font-style: italic; color: ${TEAL}; }
        .story-text p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.9;
          color: #555;
          margin-bottom: 16px;
        }
        .cta-btn {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 36px;
          background: ${TEAL};
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s, transform 0.3s;
          cursor: pointer;
          border: none;
        }
        .cta-btn:hover { background: ${GOLD}; transform: translateY(-2px); }

        /* ── VALUES ── */
        .values-section { background: #f9f7f4; padding: 80px 60px; }
        .values-inner { max-width: 1100px; margin: 0 auto; }
        .values-header { text-align: center; margin-bottom: 56px; }
        .values-header h2 { font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .value-card {
          background: #fff;
          padding: 40px 32px;
          border-top: 3px solid ${GOLD};
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }
        .value-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(27,74,66,0.12); }
        .value-title { font-size: 1.4rem; font-weight: 600; margin-bottom: 12px; color: ${TEAL}; }
        .value-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.8; color: #666; }

        /* ── CEO ── */
        .ceo-section { background: #ffffff; padding: 100px 60px; }
        .ceo-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 80px;
          align-items: center;
        }
        .ceo-img-wrap { position: relative; }
        .ceo-img { width: 100%; height: 520px; object-fit: cover; display: block; }
        .ceo-img-border {
          position: absolute;
          top: -16px; left: -16px; right: 16px; bottom: 16px;
          border: 2px solid ${GOLD};
          z-index: -1;
        }
        .ceo-badge {
          position: absolute;
          bottom: 32px; right: -20px;
          background: ${GOLD};
          color: #fff;
          padding: 14px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
        }
        .ceo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 300;
          color: #111;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .ceo-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.4rem;
          color: ${TEAL};
          letter-spacing: 4px;
          margin-bottom: 4px;
        }
        .ceo-firm {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: ${GOLD};
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .ceo-divider { width: 60px; height: 2px; background: ${GOLD}; margin-bottom: 32px; }
        .ceo-contact-list { display: flex; flex-direction: column; gap: 16px; }
        .ceo-contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #444;
        }
        .ceo-contact-icon {
          width: 42px; height: 42px;
          background: ${TEAL};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: ${GOLD};
          font-size: 16px;
        }
        .ceo-contact-item a { color: #444; text-decoration: none; transition: color 0.2s; }
        .ceo-contact-item a:hover { color: ${TEAL}; }

        /* ── DIRECTORS — FIXED LAYOUT ── */
        .director-section { background: ${TEAL}; padding: 80px 60px; }
        .director-section-header {
          max-width: 1100px;
          margin: 0 auto 48px;
          text-align: center;
        }
        .director-section-header .label-tag { color: ${GOLD}; }
        .director-section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 300;
          color: #ffffff;
        }
        .director-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .director-card {
          display: flex;
          align-items: center;
          gap: 28px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 32px 28px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .director-card:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(201,168,76,0.5);
        }
        .director-img-wrap {
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid ${GOLD};
          overflow: hidden;
          background: rgba(255,255,255,0.08);
        }
        .director-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .director-vline {
          width: 2px;
          height: 80px;
          background: ${GOLD};
          flex-shrink: 0;
          opacity: 0.6;
        }
        .director-info .director-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 8px;
        }
        .director-info .director-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2vw, 1.7rem);
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .director-info .director-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.5px;
        }
        .director-info .director-firm {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: ${GOLD};
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* ── TEAM ── */
        .team-section { max-width: 1100px; margin: 0 auto; padding: 100px 60px; }
        .team-header { margin-bottom: 56px; }
        .team-header h2 { font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300; }
        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .attorney-card { position: relative; overflow: hidden; cursor: pointer; }
        .attorney-card img {
          width: 100%; height: 360px;
          object-fit: cover; display: block;
          transition: transform 0.6s ease;
          filter: grayscale(20%);
        }
        .attorney-card:hover img { transform: scale(1.06); filter: grayscale(0%); }
        .attorney-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, ${TEAL}ee 0%, transparent 70%);
          padding: 32px 24px 24px;
          transform: translateY(8px);
          transition: transform 0.4s ease;
        }
        .attorney-card:hover .attorney-overlay { transform: translateY(0); }
        .attorney-name { font-size: 1.3rem; font-weight: 600; color: #fff; margin-bottom: 4px; }
        .attorney-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${GOLD};
        }
        .attorney-spec {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
        }
        .attorney-accent {
          position: absolute;
          top: 16px; right: 16px;
          width: 36px; height: 36px;
          border: 1px solid ${GOLD};
          opacity: 0;
          transition: opacity 0.4s;
        }
        .attorney-card:hover .attorney-accent { opacity: 1; }

        /* ── MUZAMMIL CLICKABLE BADGE ── */
        .view-cases-badge {
          position: absolute;
          top: 16px; left: 16px;
          background: ${GOLD};
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 12px;
          font-weight: 500;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .muzammil-card {
          cursor: pointer;
          outline: none;
        }
        .muzammil-card:focus-visible {
          outline: 2px solid ${GOLD};
          outline-offset: 2px;
        }
        .muzammil-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          transition: border-color 0.3s ease;
          pointer-events: none;
          z-index: 5;
        }
        .muzammil-card:hover::after {
          border-color: ${GOLD};
        }

        .attorney-name-card {
          background: #fff;
          border: 1px solid #e8e2d9;
          border-top: 3px solid ${GOLD};
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 120px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .attorney-name-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(27,74,66,0.1); }
        .attorney-name-card .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 6px;
        }
        .attorney-name-card .card-specialty {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 4px;
        }
        .attorney-name-card .card-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #888;
        }

        /* ── BOTTOM CTA ── */
        .bottom-cta { background: ${TEAL}; padding: 80px 60px; text-align: center; }
        .bottom-cta h2 {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 300;
          color: #fff;
          margin-bottom: 16px;
        }
        .bottom-cta p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          margin-bottom: 36px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .story-section { grid-template-columns: 1fr; padding: 60px 24px; gap: 48px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .stat-item { border-right: none; border-bottom: 1px solid rgba(201,168,76,0.2); padding-bottom: 24px; }
          .team-grid, .values-grid { grid-template-columns: 1fr; }
          .hero-content { padding: 0 24px; }
          .stats-bar, .values-section, .team-section, .bottom-cta { padding: 60px 24px; }
          .ceo-section { padding: 60px 24px; }
          .ceo-inner { grid-template-columns: 1fr; gap: 40px; }
          .ceo-badge { right: 0; }
          .director-section { padding: 60px 24px; }
          .director-grid { grid-template-columns: 1fr; gap: 24px; }
        }

        @media (max-width: 600px) {
          .stats-bar { padding: 48px 16px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .story-section { padding: 48px 16px; }
          .story-badge { left: 0; top: 16px; }
          .values-section { padding: 48px 16px; }
          .team-section { padding: 48px 16px; }
          .bottom-cta { padding: 60px 16px; }
          .ceo-section { padding: 48px 16px; }
          .director-section { padding: 48px 16px; }
          .director-card { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px 20px; }
          .director-vline { width: 40px; height: 2px; }
          .director-img-wrap { width: 80px; height: 80px; }
          .hero-content { padding: 0 16px; }
        }

        @media (max-width: 400px) {
          .stat-num { font-size: 3rem; }
          .director-card { padding: 20px 16px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Established 2000 · Excellence in Law</p>
          <h1 className="hero-title">
            Justice is not a<br />
            privilege — it&apos;s a <em>right.</em>
          </h1>
          <p className="hero-desc">
            For over two decades, Amin Law &amp; Associates has stood as a beacon of legal excellence — protecting individuals, families, and businesses with unwavering dedication.
          </p>
        </div>
        <div className="hero-divider" />
      </section>

      {/* STATS */}
      <section className="stats-bar" ref={statsSection.ref}>
        <div
          className="stats-grid"
          style={{
            opacity: statsSection.inView ? 1 : 0,
            transform: statsSection.inView ? "none" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-num">
                {statsSection.inView ? <AnimatedNumber target={s.number} /> : "0"}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section ref={story.ref}>
        <div className="story-section">
          <div className={`fade-up d1 ${story.inView ? "visible" : ""}`} style={{ position: "relative" }}>
            <div className="story-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Law Office"
                className="story-img"
              />
              <div className="story-img-accent" />
              <div className="story-badge">
                <strong>25</strong>
                Years of Trust
              </div>
            </div>
          </div>
          <div className={`story-text fade-up d2 ${story.inView ? "visible" : ""}`}>
            <p className="label-tag">Our Story</p>
            <div className="gold-line" />
            <h2>
              A Legacy Built on <em>Truth</em> &amp; Tenacity
            </h2>
            <p>
              Amin Law &amp; Associates was founded in 2000 with a singular mission — to deliver world-class legal representation without compromise. What began as a two-attorney practice has grown into one of the region&apos;s most respected full-service law firms.
            </p>
            <p>
              We handle matters ranging from personal injury and criminal defense to corporate litigation and bankruptcy — always with precision, always with purpose.
            </p>
            <button className="cta-btn">Meet Our Team</button>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section" ref={valuesSection.ref}>
        <div className="values-inner">
          <div className={`values-header fade-up ${valuesSection.inView ? "visible" : ""}`}>
            <p className="label-tag">What We Stand For</p>
            <div className="gold-line" style={{ margin: "0 auto 20px" }} />
            <h2>
              Our Core <em style={{ fontStyle: "italic", color: TEAL }}>Principles</em>
            </h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div
                key={i}
                className={`value-card fade-up d${i + 1} ${valuesSection.inView ? "visible" : ""}`}
              >
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO SECTION */}
      <section className="ceo-section" ref={ceoSection.ref}>
        <div className="ceo-inner">
          <div className={`fade-up d1 ${ceoSection.inView ? "visible" : ""}`} style={{ position: "relative" }}>
            <div className="ceo-img-wrap">
              <img src={ceo.img} alt={ceo.name} className="ceo-img" />
              <div className="ceo-img-border" />
              <div className="ceo-badge">Chief Executive Officer</div>
            </div>
          </div>
          <div className={`fade-up d2 ${ceoSection.inView ? "visible" : ""}`}>
            <p className="label-tag">Founder &amp; Leadership</p>
            <div className="ceo-name">{ceo.name}</div>
            <div className="ceo-title">{ceo.role}</div>
            <div className="ceo-firm">{ceo.firm}</div>
            <div className="ceo-divider" />
            <div className="ceo-contact-list">
              <div className="ceo-contact-item">
                <div className="ceo-contact-icon">📞</div>
                <a href={`tel:${ceo.phone1}`}>{ceo.phone1}</a>
              </div>
              <div className="ceo-contact-item">
                <div className="ceo-contact-icon">☎</div>
                <a href={`tel:${ceo.phone2}`}>{ceo.phone2}</a>
              </div>
              <div className="ceo-contact-item">
                <div className="ceo-contact-icon">✉</div>
                <a href={`mailto:${ceo.email}`}>{ceo.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTORS — FIXED CLEAN LAYOUT */}
      <section className="director-section" ref={directorSection.ref}>
        <div className={`director-section-header fade-up ${directorSection.inView ? "visible" : ""}`}>
          <p className="label-tag">Firm Leadership</p>
          <h2>Our Directors</h2>
        </div>
        <div className={`director-grid fade-up d2 ${directorSection.inView ? "visible" : ""}`}>
          {directors.map((d) => (
            <div className="director-card" key={d.name}>
              <div className="director-img-wrap">
                <img
                  src={d.img}
                  alt={d.name}
                  className="director-img"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.style.background = "rgba(201,168,76,0.15)";
                    }
                  }}
                />
              </div>
              <div className="director-vline" />
              <div className="director-info">
                <div className="director-label">Leadership</div>
                <div className="director-name">{d.name}</div>
                <div className="director-role">{d.role}</div>
                <div className="director-firm">{d.firm}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section ref={team.ref}>
        <div className="team-section">
          <div className={`team-header fade-up ${team.inView ? "visible" : ""}`}>
            <p className="label-tag">The People Behind Your Case</p>
            <div className="gold-line" />
            <h2>
              Meet Our <em style={{ fontStyle: "italic", color: TEAL }}>Attorneys</em>
            </h2>
          </div>

          {/* Attorneys WITH images */}
          <div className="team-grid" style={{ marginBottom: "32px" }}>
            {attorneysWithImage.map((a, i) => {
              const isMuzammil = a.clickable === true;
              return (
                <div
                  key={i}
                  className={`attorney-card fade-up d${Math.min(i + 1, 4)} ${team.inView ? "visible" : ""} ${isMuzammil ? "muzammil-card" : ""}`}
                  onClick={isMuzammil ? () => router.push("/cases") : undefined}
                  role={isMuzammil ? "button" : undefined}
                  tabIndex={isMuzammil ? 0 : undefined}
                  onKeyDown={
                    isMuzammil
                      ? (e) => { if (e.key === "Enter" || e.key === " ") router.push("/cases"); }
                      : undefined
                  }
                  title={isMuzammil ? "View Won Cases" : undefined}
                  style={isMuzammil ? { cursor: "pointer" } : { cursor: "default" }}
                >
                  <div className="attorney-accent" />
                  {isMuzammil && (
                    <div className="view-cases-badge">
                      <span>⚖</span> View Cases
                    </div>
                  )}
                  <img src={a.img} alt={a.name} />
                  <div className="attorney-overlay">
                    <div className="attorney-name">{a.name}</div>
                    <div className="attorney-role">{a.specialty}</div>
                    <div className="attorney-spec">{a.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Attorneys WITHOUT images */}
          <div className="team-grid">
            {attorneysNameOnly.map((a, i) => (
              <div
                key={i}
                className={`attorney-name-card fade-up d${Math.min(i + 1, 4)} ${team.inView ? "visible" : ""}`}
              >
                <div className="card-specialty">{a.specialty}</div>
                <div className="card-name">{a.name}</div>
                <div className="card-role">{a.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <h2>Ready to Discuss Your Case?</h2>
        <p>Schedule a confidential consultation with one of our expert attorneys today.</p>
        <button
          className="cta-btn"
          style={{ background: GOLD, color: "#fff" }}
          onClick={() => router.push("/consultation")}
        >
          Book a Consultation
        </button>
      </section>
    </main>
  );
}