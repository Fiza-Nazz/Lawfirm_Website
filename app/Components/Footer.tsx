"use client";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PracticeArea {
  label: string;
  href: string;
}
interface QuickLink {
  label: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const practiceAreas: PracticeArea[] = [
  { label: "Personal Injury", href: "#" },
  { label: "Medical Malpractice", href: "#" },
  { label: "Car Accidents", href: "#" },
  { label: "Workers Compensation", href: "#" },
  { label: "Wrongful Death", href: "#" },
  { label: "Product Liability", href: "#" },
  { label: "Slip & Fall", href: "#" },
  { label: "Brain Injuries", href: "#" },
];

const quickLinks: QuickLink[] = [
  { label: "About Our Firm", href: "#" },
  { label: "Our Attorneys", href: "#" },
  { label: "Case Results", href: "#" },
  { label: "Client Testimonials", href: "#" },
  { label: "Free Consultation", href: "#" },
  { label: "Blog & News", href: "/blog" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="f-stat-item">
      <div className="f-stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="f-stat-label">{label}</div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap');

        /* ── Ticker ── */
        .f-ticker-wrap {
          background: #0D4A3A;
          overflow: hidden;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .f-ticker-inner {
          display: flex;
          animation: fTickerScroll 30s linear infinite;
          width: max-content;
        }
        .f-ticker-inner:hover { animation-play-state: paused; }
        @keyframes fTickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .f-ticker-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 40px;
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65) !important;
          white-space: nowrap;
        }
        .f-ticker-dot {
          width: 5px; height: 5px;
          background: #C9913A;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── CTA Banner ── */
        .f-cta-banner {
          background: #F9F6F1;
          border-top: 1px solid rgba(201,145,58,0.2);
          border-bottom: 1px solid rgba(201,145,58,0.2);
          padding: 40px 24px;
        }
        .f-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 32px;
        }
        .f-cta-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9913A !important;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .f-cta-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #C9913A;
        }
        .f-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 600;
          color: #1A1A1A !important;
          line-height: 1.25;
        }
        .f-cta-title em {
          font-style: italic;
          color: #0D4A3A !important;
        }
        .f-cta-actions {
          display: flex;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        /* ── Buttons ── */
        .f-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: #0D4A3A;
          color: #ffffff !important;
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none !important;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
        }
        .f-btn-primary:hover {
          background: #1D6E58;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
        .f-btn-primary:visited { color: #ffffff !important; }

        .f-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          background: transparent;
          color: #0D4A3A !important;
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none !important;
          border: 1.5px solid #0D4A3A;
          cursor: pointer;
          transition: all 0.25s;
        }
        .f-btn-outline:hover {
          background: #0D4A3A;
          color: #ffffff !important;
        }
        .f-btn-outline:visited { color: #0D4A3A !important; }
        .f-btn-outline:hover:visited { color: #ffffff !important; }

        /* ── Stats ── */
        .f-stats-row {
          background: #0D4A3A;
          padding: 56px 24px;
        }
        .f-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .f-stat-item {
          text-align: center;
          padding: 20px 16px;
          border-right: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        .f-stat-item:last-child { border-right: none; }
        .f-stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: #E0A84E !important;
          line-height: 1;
          margin-bottom: 8px;
        }
        .f-stat-label {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55) !important;
        }

        /* ── Main Footer Body ── */
        .f-footer-main {
          background: #ffffff;
          padding: 80px 24px 50px;
          border-top: 3px solid #C9913A;
        }
        .f-footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.6fr;
          gap: 60px;
        }

        /* Logo col */
        .f-footer-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .f-footer-logo-icon {
          width: 48px; height: 48px;
          background: #0D4A3A;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #E0A84E;
        }
        .f-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1A1A1A !important;
          display: block;
        }
        .f-logo-tagline {
          font-family: 'Raleway', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9913A !important;
          display: block;
        }
        .f-footer-desc {
          font-family: 'Raleway', sans-serif;
          font-size: 13.5px;
          line-height: 1.85;
          color: #444444 !important;
          margin-bottom: 28px;
        }

        /* Social buttons */
        .f-social-row {
          display: flex;
          gap: 10px;
        }
        .f-social-btn {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(201,145,58,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #444444 !important;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none !important;
          background: transparent;
        }
        .f-social-btn:hover {
          background: #0D4A3A;
          border-color: #0D4A3A;
          color: #ffffff !important;
        }
        .f-social-btn:visited { color: #444444 !important; }

        /* Column headings */
        .f-col-heading {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1A1A1A !important;
          margin-bottom: 24px;
          padding-bottom: 14px;
          position: relative;
        }
        .f-col-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 28px; height: 2px;
          background: #C9913A;
        }

        /* Links */
        .f-link-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .f-link-list li a {
          font-family: 'Raleway', sans-serif;
          font-size: 13px;
          color: #444444 !important;
          text-decoration: none !important;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s, gap 0.2s;
        }
        .f-link-list li a:visited { color: #444444 !important; }
        .f-link-list li a:hover { color: #0D4A3A !important; gap: 12px; }
        .f-link-list li a:hover:visited { color: #0D4A3A !important; }
        .f-link-list li a svg {
          opacity: 0.5;
          transition: opacity 0.2s;
          flex-shrink: 0;
          color: #444444;
        }
        .f-link-list li a:hover svg { opacity: 1; color: #C9913A; }

        /* Contact info */
        .f-contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .f-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .f-contact-icon {
          width: 36px; height: 36px;
          background: rgba(13,74,58,0.06);
          border: 1px solid rgba(201,145,58,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #0D4A3A;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .f-contact-item:hover .f-contact-icon {
          background: #0D4A3A;
          color: #ffffff;
          border-color: #0D4A3A;
        }
        .f-contact-text-label {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9913A !important;
          margin-bottom: 3px;
          display: block;
        }
        .f-contact-text-value {
          font-family: 'Raleway', sans-serif;
          font-size: 13px;
          color: #1A1A1A !important;
          line-height: 1.5;
          text-decoration: none !important;
          display: block;
        }
        .f-contact-text-value:visited { color: #1A1A1A !important; }
        a.f-contact-text-value:hover { color: #0D4A3A !important; }

        /* Newsletter */
        .f-newsletter-box {
          background: #0D4A3A;
          padding: 28px;
          margin-top: 32px;
        }
        .f-newsletter-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff !important;
          margin-bottom: 6px;
        }
        .f-newsletter-sub {
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.6) !important;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .f-newsletter-form {
          display: flex;
          gap: 0;
        }
        .f-newsletter-input {
          flex: 1;
          padding: 11px 14px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-right: none;
          color: #ffffff !important;
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          outline: none;
          transition: border-color 0.2s;
        }
        .f-newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
        .f-newsletter-input:focus { border-color: #E0A84E; }
        .f-newsletter-btn {
          padding: 11px 18px;
          background: #C9913A;
          border: 1px solid #C9913A;
          color: #ffffff !important;
          cursor: pointer;
          display: flex; align-items: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .f-newsletter-btn:hover { background: #E0A84E; }
        .f-subscribed-msg {
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          color: #F0C880 !important;
          padding: 8px 0;
        }

        /* Divider */
        .f-footer-divider {
          max-width: 1200px;
          margin: 50px auto 0;
          border: none;
          border-top: 1px solid rgba(0,0,0,0.07);
        }

        /* ── Bottom Bar ── */
        .f-footer-bottom {
          background: #0D4A3A;
          padding: 18px 24px;
        }
        .f-footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .f-footer-copy {
          font-family: 'Raleway', sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.5) !important;
        }
        .f-footer-legal-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .f-footer-legal-links a {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55) !important;
          text-decoration: none !important;
          transition: color 0.2s;
        }
        .f-footer-legal-links a:visited { color: rgba(255,255,255,0.55) !important; }
        .f-footer-legal-links a:hover { color: #E0A84E !important; }

        /* ── Back to Top ── */
        .f-back-to-top {
          position: fixed;
          bottom: 28px; right: 28px;
          width: 44px; height: 44px;
          background: #0D4A3A;
          color: #ffffff !important;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 999;
        }
        .f-back-to-top.f-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .f-back-to-top:hover { background: #1D6E58; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .f-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 48px;
          }
          .f-stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .f-stat-item:nth-child(2) { border-right: none; }
          .f-stat-item:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.1); }
          .f-stat-item:nth-child(1),
          .f-stat-item:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 30px;
          }
          .f-stat-item:nth-child(3),
          .f-stat-item:nth-child(4) {
            padding-top: 30px;
          }
        }

        @media (max-width: 768px) {
          .f-cta-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .f-cta-eyebrow { justify-content: center; }
          .f-cta-actions { justify-content: center; }
          .f-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .f-footer-main { padding: 56px 20px 40px; }
          .f-footer-bottom-inner { flex-direction: column; text-align: center; }
          .f-footer-legal-links { justify-content: center; }
          .f-newsletter-form { flex-direction: column; gap: 8px; }
          .f-newsletter-input { border-right: 1px solid rgba(255,255,255,0.2); }
        }

        @media (max-width: 480px) {
          .f-stats-inner { grid-template-columns: 1fr; }
          .f-stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .f-stat-item:last-child { border-bottom: none; }
          .f-cta-actions { flex-direction: column; align-items: stretch; }
          .f-btn-primary, .f-btn-outline { justify-content: center; }
          .f-back-to-top { bottom: 16px; right: 16px; }
        }
      `}</style>

      <div className="f-root">

        {/* ── Ticker ── */}
        <div className="f-ticker-wrap" aria-hidden="true">
          <div className="f-ticker-inner">
            {[...Array(2)].map((_, i) =>
              ["No Fee Unless We Win", "Free Consultations Available 24/7", "Over 15,000 Cases Won", "Karachi's Most Trusted Legal Team", "Personal Injury Specialists", "Call Now: 0300-9209003", "Serving Karachi Since 1999"].map((t, j) => (
                <span className="f-ticker-item" key={`${i}-${j}`}>
                  <span className="f-ticker-dot" />
                  {t}
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <section className="f-cta-banner">
          <div className="f-cta-inner">
            <div>
              <div className="f-cta-eyebrow">Free Case Evaluation</div>
              <h2 className="f-cta-title">
                Injured? You Deserve <em>Justice</em> &amp; Full Compensation.
              </h2>
            </div>
            <div className="f-cta-actions">
              <a href="tel:03009209003" className="f-btn-primary">
                <IconPhone /> Call Now
              </a>
              <a href="#" className="f-btn-outline">
                Free Consultation <IconArrow />
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Row ── */}
        <div className="f-stats-row">
          <div className="f-stats-inner">
            <AnimatedStat end={15000} suffix="+" label="Cases Won" />
            <AnimatedStat end={500} suffix="M+" label="Recovered ($)" />
            <AnimatedStat end={25} suffix="+" label="Years Experience" />
            <AnimatedStat end={98} suffix="%" label="Client Satisfaction" />
          </div>
        </div>

        {/* ── Main Footer ── */}
        <footer className="f-footer-main">
          <div className="f-footer-grid">

            {/* Col 1 — Brand */}
            <div>
              <div className="f-footer-logo">
                <div className="f-footer-logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c-.99.143-1.99.317-3 .52m3-.52L2.25 15.196c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.031.352 5.989 5.989 0 002.031-.352c.483-.174.711-.703.59-1.202L5.25 4.971z" />
                  </svg>
                </div>
                <div>
                  <span className="f-logo-name">Amin Law Associates</span>
                  <span className="f-logo-tagline">Advocates &amp; Legal Consultants</span>
                </div>
              </div>
              <p className="f-footer-desc">
                With over two decades of dedicated legal service in Karachi, our attorneys fight relentlessly to protect your rights and secure the compensation you deserve. No fees until we win your case.
              </p>
              <div className="f-social-row">
                <a href="https://www.facebook.com/people/Amin-law-Associates/61569270775405/" className="f-social-btn" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="f-social-btn" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="f-social-btn" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://wa.me/923009209003" className="f-social-btn" aria-label="WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            {/* Col 2 — Practice Areas */}
            <div>
              <h3 className="f-col-heading">Practice Areas</h3>
              <ul className="f-link-list">
                {practiceAreas.map((a) => (
                  <li key={a.label}>
                    <a href={a.href}>
                      <IconChevronRight />
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Quick Links */}
            <div>
              <h3 className="f-col-heading">Quick Links</h3>
              <ul className="f-link-list">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>
                      <IconChevronRight />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <h3 className="f-col-heading">Contact Us</h3>
              <div className="f-contact-list">
                <div className="f-contact-item">
                  <div className="f-contact-icon"><IconPhone /></div>
                  <div>
                    <span className="f-contact-text-label">Mobile</span>
                    <a href="tel:03009209003" className="f-contact-text-value">0300-9209003</a>
                  </div>
                </div>
                <div className="f-contact-item">
                  <div className="f-contact-icon"><IconPhone /></div>
                  <div>
                    <span className="f-contact-text-label">PTCL / Landline</span>
                    <a href="tel:02134899996" className="f-contact-text-value">021-34899996</a>
                  </div>
                </div>
                <div className="f-contact-item">
                  <div className="f-contact-icon"><IconMail /></div>
                  <div>
                    <span className="f-contact-text-label">Email Us</span>
                    <a href="mailto:Aminlawassociates7@gmail.com" className="f-contact-text-value">Aminlawassociates7@gmail.com</a>
                  </div>
                </div>
                <div className="f-contact-item">
                  <div className="f-contact-icon"><IconLocation /></div>
                  <div>
                    <span className="f-contact-text-label">Office Address</span>
                    <span className="f-contact-text-value">
                      Mezzanine Floor, Plot #61 Commercial,<br />
                      Jamshaid II, District East,<br />
                      Karachi
                    </span>
                  </div>
                </div>
                <div className="f-contact-item">
                  <div className="f-contact-icon"><IconClock /></div>
                  <div>
                    <span className="f-contact-text-label">Office Hours</span>
                    <span className="f-contact-text-value">Mon–Sat: 9AM–7PM<br />24/7 Emergency Line</span>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="f-newsletter-box">
                <div className="f-newsletter-title">Stay Informed</div>
                <div className="f-newsletter-sub">Legal updates &amp; case insights straight to your inbox.</div>
                {subscribed ? (
                  <div className="f-subscribed-msg">✓ Thank you for subscribing!</div>
                ) : (
                  <form className="f-newsletter-form" onSubmit={handleSubscribe}>
                    <input
                      className="f-newsletter-input"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="f-newsletter-btn" aria-label="Subscribe">
                      <IconArrow />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <hr className="f-footer-divider" />
        </footer>

        {/* ── Bottom Bar ── */}
        <div className="f-footer-bottom">
          <div className="f-footer-bottom-inner">
            <p className="f-footer-copy">
              © {new Date().getFullYear()} Amin Law Associates, Karachi. All rights reserved.
            </p>
            <nav className="f-footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Disclaimer</a>
              <a href="#">Sitemap</a>
            </nav>
          </div>
        </div>

      </div>

      {/* ── Back to Top ── */}
      <button
        className={`f-back-to-top${showTop ? " f-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}