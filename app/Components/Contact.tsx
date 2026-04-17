"use client";
import { useState, useEffect } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const info = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Our Office",
      lines: [
        "Mezzanine Floor, Plot No. 61",
        "Commercial Jamshaid II",
        "District East, Karachi",
      ],
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .9h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: "Phone Numbers",
      lines: ["0300 920 9003", "021-34899996 (PTCL)"],
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: "Office Hours",
      lines: ["Monday – Saturday", "9:00 AM – 6:00 PM"],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ct * { box-sizing: border-box; margin: 0; padding: 0; }

        .ct {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          min-height: 100vh;
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .ct::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(26,74,56,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,74,56,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .ct-wrap {
          max-width: 1000px;
          width: 100%;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ct-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ct-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          border-bottom: 1px solid #ede8e0;
          padding-bottom: 32px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .ct-eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ct-eyebrow::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background: #b89848;
        }
        .ct-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 300;
          color: #0f0f0f;
          line-height: 1.1;
        }
        .ct-heading em {
          font-style: italic;
          color: #1a4a38;
        }
        .ct-sub {
          font-size: 13px;
          color: #888;
          max-width: 260px;
          line-height: 1.7;
          font-weight: 300;
          text-align: right;
        }

        .ct-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
        }

        .ct-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ct-card {
          border: 1px solid #ede8e0;
          padding: 28px 32px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          transition: border-color 0.3s, box-shadow 0.3s;
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        .ct-card::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #1a4a38;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .ct-card:hover { border-color: #c8bfb0; box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
        .ct-card:hover::after { transform: scaleY(1); }

        .ct-card-icon {
          width: 42px; height: 42px;
          border: 1px solid #ede8e0;
          display: flex; align-items: center; justify-content: center;
          color: #1a4a38;
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .ct-card:hover .ct-card-icon {
          background: #1a4a38;
          color: #b89848;
          border-color: #1a4a38;
        }
        .ct-card-label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .ct-card-lines {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .ct-card-line {
          font-size: 13.5px;
          color: #2a2a2a;
          font-weight: 300;
          line-height: 1.5;
        }
        .ct-card-line a {
          color: #2a2a2a;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ct-card-line a:hover { color: #1a4a38; }

        .ct-cta {
          margin-top: 4px;
          border: 1px solid #1a4a38;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #f9f8f5;
          flex-wrap: wrap;
        }
        .ct-cta-text {
          font-size: 13px;
          color: #444;
          font-weight: 300;
        }
        .ct-cta-text strong {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 400;
          color: #0f0f0f;
          margin-bottom: 2px;
        }
        .ct-cta-btn {
          display: inline-block;
          padding: 11px 24px;
          background: #1a4a38;
          color: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.3s;
          border: none;
          cursor: pointer;
        }
        .ct-cta-btn:hover { background: #133829; }

        .ct-map-wrap {
          display: flex;
          flex-direction: column;
        }
        .ct-map-label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-map-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #ede8e0;
        }
        .ct-map-frame {
          border: 1px solid #ede8e0;
          overflow: hidden;
          flex: 1;
          min-height: 340px;
          position: relative;
        }
        .ct-map-frame iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          min-height: 340px;
          filter: grayscale(20%) contrast(1.02);
        }
        .ct-map-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: #1a4a38;
          color: #f5f0e8;
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.5px;
          pointer-events: none;
        }
        .ct-map-badge span {
          color: #b89848;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          display: block;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ct { padding: 60px 20px; }
          .ct-grid { grid-template-columns: 1fr; }
          .ct-map-frame { min-height: 300px; }
          .ct-map-frame iframe { min-height: 300px; }
        }

        @media (max-width: 600px) {
          .ct { padding: 40px 16px; }
          .ct-header {
            margin-bottom: 36px;
            padding-bottom: 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .ct-sub { text-align: left; max-width: 100%; }
          .ct-card { padding: 20px; }
          .ct-cta {
            padding: 16px 20px;
            flex-direction: column;
            align-items: flex-start;
          }
          .ct-cta-btn { width: 100%; text-align: center; }
          .ct-map-frame { min-height: 240px; }
          .ct-map-frame iframe { min-height: 240px; }
        }

        @media (max-width: 400px) {
          .ct-card { padding: 16px; }
          .ct-card-icon { width: 36px; height: 36px; }
        }
      `}</style>

      <div className="ct">
        <div className={`ct-wrap ${visible ? "visible" : ""}`}>
          <div className="ct-header">
            <div>
              <p className="ct-eyebrow">Amin Law Associates</p>
              <h1 className="ct-heading">Find <em>Us</em><br />Here.</h1>
            </div>
            <p className="ct-sub">
              Visit our office or reach out by phone. We're here to serve you
              Monday through Saturday.
            </p>
          </div>

          <div className="ct-grid">
            <div className="ct-cards">
              {info.map((item, i) => (
                <div className="ct-card" key={i}>
                  <div className="ct-card-icon">{item.icon}</div>
                  <div className="ct-card-body">
                    <p className="ct-card-label">{item.label}</p>
                    <div className="ct-card-lines">
                      {item.lines.map((line, j) => (
                        <span className="ct-card-line" key={j}>
                          {item.label === "Phone Numbers" ? (
                            <a href={`tel:${line.replace(/\s|-/g, "")}`}>{line}</a>
                          ) : (
                            line
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="ct-cta">
                <div className="ct-cta-text">
                  <strong>Need Legal Assistance?</strong>
                  Book a free consultation with our attorneys.
                </div>
                <a href="/consultation" className="ct-cta-btn">
                  Book Now →
                </a>
              </div>
            </div>

            <div className="ct-map-wrap">
              <p className="ct-map-label">Location</p>
              <div className="ct-map-frame">
                <iframe
                  title="Amin Law Associates Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.3!2d67.0787!3d24.8878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7b3f6d9c7f%3A0x0!2sJamshaid+II%2C+District+East%2C+Karachi!5e0!3m2!1sen!2s!4v1"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="ct-map-badge">
                  <span>Amin Law Associates</span>
                  Mezzanine Floor, Jamshaid II
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}