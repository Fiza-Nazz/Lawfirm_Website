"use client";

import { useEffect, useRef, useState } from "react";

export default function Evaluation() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ev-root {
          background: #fff;
          font-family: 'Jost', sans-serif;
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
        }

        .ev-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(11,77,70,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,77,70,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .ev-ghost {
          position: absolute;
          bottom: -10px;
          right: -10px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px rgba(11,77,70,0.07);
          user-select: none;
          pointer-events: none;
          line-height: 1;
          letter-spacing: -4px;
        }

        .ev-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0 56px;
          align-items: center;
        }

        .ev-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #0b4d46 30%, #0b4d46 70%, transparent);
          align-self: stretch;
          min-height: 200px;
        }

        .ev-left {}

        .ev-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .ev-root.visible .ev-eyebrow { opacity: 1; transform: translateY(0); }

        .ev-eyebrow-bar {
          width: 32px;
          height: 1px;
          background: #c0622a;
          flex-shrink: 0;
        }

        .ev-eyebrow-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #c0622a;
        }

        .ev-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 400;
          color: #0f0f0f;
          line-height: 1.2;
          margin: 0 0 20px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s 0.1s ease, transform 0.65s 0.1s ease;
        }

        .ev-root.visible .ev-heading { opacity: 1; transform: translateY(0); }

        .ev-heading em {
          font-style: italic;
          color: #0b4d46;
        }

        .ev-body {
          font-size: 14px;
          font-weight: 300;
          color: #555;
          line-height: 1.85;
          margin: 0 0 32px 0;
          max-width: 400px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.65s 0.2s ease, transform 0.65s 0.2s ease;
        }

        .ev-root.visible .ev-body { opacity: 1; transform: translateY(0); }

        .ev-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #0b4d46;
          color: #fff;
          border: none;
          padding: 16px 36px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.3s;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.65s 0.3s ease, transform 0.65s 0.3s ease, color 0.3s;
          white-space: nowrap;
        }

        .ev-root.visible .ev-btn { opacity: 1; transform: translateY(0); }

        .ev-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c0622a;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .ev-btn:hover::before { transform: translateX(0); }
        .ev-btn:hover { color: #fff; }

        .ev-btn span, .ev-btn-arrow { position: relative; z-index: 1; }

        .ev-btn-arrow {
          width: 16px;
          height: 16px;
          position: relative;
          z-index: 1;
          transition: transform 0.3s;
          flex-shrink: 0;
        }

        .ev-btn:hover .ev-btn-arrow { transform: translateX(4px); }

        .ev-btn-arrow svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ev-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ev-card {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 22px 0;
          border-bottom: 1px solid #ece8e2;
          cursor: default;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.55s ease, transform 0.55s ease, background 0.25s, padding-left 0.25s;
        }

        .ev-card:first-child { border-top: 1px solid #ece8e2; }

        .ev-root.visible .ev-card:nth-child(1) { opacity: 1; transform: translateX(0); transition-delay: 0.15s; }
        .ev-root.visible .ev-card:nth-child(2) { opacity: 1; transform: translateX(0); transition-delay: 0.27s; }
        .ev-root.visible .ev-card:nth-child(3) { opacity: 1; transform: translateX(0); transition-delay: 0.39s; }

        .ev-card:hover { background: #f8f5f1; padding-left: 8px; }

        .ev-icon-box {
          width: 42px;
          height: 42px;
          border: 1px solid #0b4d46;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s;
        }

        .ev-card:hover .ev-icon-box { background: #0b4d46; }

        .ev-icon-box svg {
          width: 18px;
          height: 18px;
          stroke: #0b4d46;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.25s;
        }

        .ev-card:hover .ev-icon-box svg { stroke: #fff; }

        .ev-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 400;
          color: #0f0f0f;
          margin: 0 0 5px 0;
        }

        .ev-card-desc {
          font-size: 12.5px;
          font-weight: 300;
          color: #777;
          line-height: 1.7;
          margin: 0;
        }

        /* ── LARGE DESKTOP (1200px+) ── */
        @media (min-width: 1200px) {
          .ev-root { padding: 100px 60px; }
          .ev-inner { max-width: 1100px; gap: 0 72px; }
        }

        /* ── TABLET LANDSCAPE (901px – 1199px) ── */
        @media (max-width: 1199px) and (min-width: 901px) {
          .ev-root { padding: 70px 40px; }
          .ev-inner { gap: 0 40px; }
        }

        /* ── TABLET PORTRAIT (601px – 900px) ── */
        @media (max-width: 900px) and (min-width: 601px) {
          .ev-root { padding: 60px 32px; }
          .ev-inner {
            grid-template-columns: 1fr;
            gap: 40px 0;
          }
          .ev-divider { display: none; }
          .ev-body { max-width: 100%; }
          .ev-card { opacity: 1; transform: translateX(0); }
        }

        /* ── MOBILE (≤600px) ── */
        @media (max-width: 600px) {
          .ev-root { padding: 48px 20px; }
          .ev-inner {
            grid-template-columns: 1fr;
            gap: 36px 0;
          }
          .ev-divider { display: none; }
          .ev-body {
            max-width: 100%;
            font-size: 13px;
            margin-bottom: 24px;
          }
          .ev-heading { margin-bottom: 14px; }
          .ev-btn {
            width: 100%;
            justify-content: center;
            padding: 15px 20px;
            font-size: 10px;
          }
          .ev-card { padding: 16px 0; gap: 14px; }
          .ev-card-title { font-size: 15px; }
          .ev-card-desc { font-size: 12px; }
          .ev-icon-box { width: 38px; height: 38px; }
          .ev-ghost { font-size: clamp(50px, 20vw, 80px); }
        }

        /* ── EXTRA SMALL (≤380px) ── */
        @media (max-width: 380px) {
          .ev-root { padding: 36px 16px; }
          .ev-eyebrow-text { letter-spacing: 2px; font-size: 9px; }
          .ev-card-desc { font-size: 11.5px; }
          .ev-card-title { font-size: 14px; }
          .ev-icon-box { width: 34px; height: 34px; }
          .ev-icon-box svg { width: 15px; height: 15px; }
        }
      `}</style>

      <div ref={ref} className={`ev-root${visible ? " visible" : ""}`}>
        <span className="ev-ghost">LAW</span>

        <div className="ev-inner">
          {/* LEFT */}
          <div className="ev-left">
            <div className="ev-eyebrow">
              <span className="ev-eyebrow-bar" />
              <span className="ev-eyebrow-text">Free Consultation</span>
            </div>

            <h2 className="ev-heading">
              Committed to <em>Helping</em><br />
              Our Clients Succeed.
            </h2>

            <p className="ev-body">
              Our team of seasoned attorneys brings precision, strategy, and unwavering advocacy to every case. Your first consultation is always free — and fully confidential.
            </p>

            <a href="#contact" className="ev-btn">
              <span>Request Evaluation</span>
              <span className="ev-btn-arrow">
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </a>
          </div>

          {/* Vertical divider */}
          <div className="ev-divider" />

          {/* RIGHT */}
          <div className="ev-right">
            <div className="ev-card">
              <div className="ev-icon-box">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="ev-card-title">Confidential & Secure</p>
                <p className="ev-card-desc">Every detail of your case is handled with absolute discretion and attorney-client privilege.</p>
              </div>
            </div>

            <div className="ev-card">
              <div className="ev-icon-box">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p className="ev-card-title">Swift & Strategic</p>
                <p className="ev-card-desc">We act decisively to protect your rights, minimizing delays and maximizing outcomes.</p>
              </div>
            </div>

            <div className="ev-card">
              <div className="ev-icon-box">
                <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <p className="ev-card-title">No Win, No Fee</p>
                <p className="ev-card-desc">Our contingency model means you pay nothing unless we secure a successful result for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}