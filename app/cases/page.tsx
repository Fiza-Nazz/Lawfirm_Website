"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const GOLD = "#C9A84C";
const TEAL = "#1B4A42";

const attorney = {
  name: "Muzamil Husaain Metlo",
  role: "Associate",
  specialty: "Advocate High Court",
  img: "/advocate4.png",
  firm: "Amin Law Associates",
  bio: "Muzamil Husaain Metlo is a distinguished Advocate of the High Court with a proven track record in complex litigation. His strategic approach and thorough legal analysis have secured landmark victories for his clients across multiple practice areas.",
};

const caseDocuments = [
  {
    id: 1,
    title: "Case Document I",
    filename: "document1.pdf",
    path: "/document1.pdf",
    description: "Official court document pertaining to case records filed at Sindh High Court.",
    badge: "Court Filing",
  },
  {
    id: 2,
    title: "Case Document II",
    filename: "document2.pdf",
    path: "/document2.pdf",
    description: "Supplementary legal documentation and supporting evidence submitted on record.",
    badge: "Legal Evidence",
  },
  {
    id: 3,
    title: "Case Document III",
    filename: "document3.pdf",
    path: "/document3.pdf",
    description: "Final judgment and order copy certified by the Honourable High Court.",
    badge: "Judgment Copy",
  },
  {
    id: 4,
    title: "Case Document IV",
    filename: "document4.pdf",
    path: "/document4.pdf",
    description: "Additional court filing and procedural record submitted during the proceedings.",
    badge: "Court Filing",
  },
  {
    id: 5,
    title: "Case Document V",
    filename: "document5.pdf",
    path: "/document5.pdf",
    description: "Certified legal record and supplementary order issued by the court authority.",
    badge: "Legal Record",
  },
];

function useInView(threshold = 0.1) {
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

export default function CasesPage() {
  const router = useRouter();
  const hero = useInView(0.05);
  const profile = useInView(0.05);
  const docsSection = useInView(0.05);

  return (
    <main
      style={{
        background: "#f8f6f2",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#1a1a1a",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.d1 { transition-delay: 0.05s; }
        .fade-up.d2 { transition-delay: 0.15s; }
        .fade-up.d3 { transition-delay: 0.25s; }
        .fade-up.d4 { transition-delay: 0.35s; }
        .fade-up.d5 { transition-delay: 0.45s; }

        .back-btn {
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 8px;
          background: ${TEAL};
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
        }
        .back-btn:hover { background: ${GOLD}; transform: translateX(-2px); }

        .cases-hero {
          position: relative;
          background: ${TEAL};
          padding: 120px 60px 80px;
          overflow: hidden;
        }
        .cases-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 60px solid rgba(201,168,76,0.07);
        }
        .cases-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 10%;
          width: 240px; height: 240px;
          border-radius: 50%;
          border: 40px solid rgba(255,255,255,0.04);
        }
        .cases-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .cases-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 16px;
        }
        .cases-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 300;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .cases-hero-title em { font-style: italic; color: ${GOLD}; }
        .cases-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 1px;
        }
        .hero-gold-line {
          width: 56px;
          height: 2px;
          background: ${GOLD};
          margin: 20px 0;
        }
        .cases-hero-divider {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          background: #f8f6f2;
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        .profile-strip {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 60px 48px;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 48px;
          align-items: center;
          background: #fff;
          border-bottom: 1px solid #ede8df;
        }
        .profile-img-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .profile-img {
          width: 160px;
          height: 200px;
          object-fit: cover;
          object-position: top center;
          display: block;
          border: 3px solid ${GOLD};
        }
        .profile-img-accent {
          position: absolute;
          bottom: -10px; right: -10px;
          width: 50px; height: 50px;
          border: 2px solid ${TEAL};
        }
        .profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 300;
          color: #111;
          margin-bottom: 4px;
          line-height: 1.1;
        }
        .profile-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.1rem;
          color: ${TEAL};
          letter-spacing: 4px;
          margin-bottom: 4px;
        }
        .profile-firm {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: ${GOLD};
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .profile-bio {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.85;
          color: #666;
          max-width: 600px;
        }
        .cases-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${TEAL};
          color: #fff;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .cases-count-badge span {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.4rem;
          color: ${GOLD};
          line-height: 1;
        }

        .docs-section {
          background: ${TEAL};
          position: relative;
          overflow: hidden;
        }
        .docs-section::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 50px solid rgba(201,168,76,0.06);
          pointer-events: none;
        }
        .docs-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 60px 90px;
          position: relative;
          z-index: 1;
        }
        .docs-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 12px;
        }
        .docs-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 2.8vw, 2.4rem);
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .docs-heading em { font-style: italic; color: ${GOLD}; }
        .docs-subheading {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.5px;
          margin-bottom: 48px;
        }
        .docs-gold-line {
          width: 56px;
          height: 2px;
          background: ${GOLD};
          margin: 16px 0 40px;
        }
        .docs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .pdf-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          flex-direction: column;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .pdf-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          border-color: ${GOLD};
        }
        .pdf-card-top {
          padding: 28px 24px 20px;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .pdf-icon-wrap {
          width: 48px;
          height: 56px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .pdf-icon-wrap::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-top: 10px solid rgba(201,168,76,0.35);
        }
        .pdf-icon-svg {
          width: 22px;
          height: 22px;
          fill: ${GOLD};
        }
        .pdf-badge {
          display: inline-block;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          color: ${GOLD};
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 3px 8px;
          margin-bottom: 8px;
        }
        .pdf-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.2;
        }
        .pdf-card-body {
          padding: 20px 24px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }
        .pdf-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.5);
        }
        .pdf-download-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.4);
          color: ${GOLD};
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease;
          width: 100%;
        }
        .pdf-download-btn:hover {
          background: rgba(201,168,76,0.1);
        }
        .pdf-filename {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
          margin-top: 8px;
        }

        @media (max-width: 900px) {
          .cases-hero { padding: 100px 24px 70px; }
          .profile-strip { grid-template-columns: 1fr; padding: 48px 24px 40px; gap: 28px; }
          .profile-img { width: 140px; height: 175px; }
          .docs-wrapper { padding: 60px 24px 70px; }
          .docs-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
        }

        @media (max-width: 600px) {
          .cases-hero { padding: 80px 16px 60px; }
          .profile-strip { padding: 40px 16px 32px; }
          .back-btn { top: 16px; left: 16px; padding: 8px 14px; }
          .docs-wrapper { padding: 48px 16px 56px; }
          .docs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <button className="back-btn" onClick={() => router.back()}>
        ← Back
      </button>

      {/* ── HERO ── */}
      <section className="cases-hero" ref={hero.ref}>
        <div className="cases-hero-inner">
          <div className={`fade-up ${hero.inView ? "visible" : ""}`}>
            <p className="cases-eyebrow">Amin Law Associates · Case Records</p>
            <h1 className="cases-hero-title">
              Cases <em>Won</em>
            </h1>
            <div className="hero-gold-line" />
            <p className="cases-hero-sub">
              Documented victories — Muzamil Husaain Metlo, Advocate High Court
            </p>
          </div>
        </div>
        <div className="cases-hero-divider" />
      </section>

      {/* ── PROFILE STRIP ── */}
      <div ref={profile.ref} style={{ background: "#fff" }}>
        <div className={`profile-strip fade-up ${profile.inView ? "visible" : ""}`}>
          <div className="profile-img-wrap">
            <img src={attorney.img} alt={attorney.name} className="profile-img" />
            <div className="profile-img-accent" />
          </div>
          <div>
            <div className="cases-count-badge">
              <span>5</span> Documents on Record
            </div>
            <div className="profile-name">{attorney.name}</div>
            <div className="profile-title">{attorney.specialty}</div>
            <div className="profile-firm">{attorney.firm}</div>
            <p className="profile-bio">{attorney.bio}</p>
          </div>
        </div>
      </div>

      {/* ── DOCUMENTS SECTION ── */}
      <section className="docs-section" ref={docsSection.ref}>
        <div className="docs-wrapper">
          <p className={`docs-eyebrow fade-up ${docsSection.inView ? "visible" : ""}`}>
            Official Records · Amin Law Associates
          </p>
          <h2 className={`docs-heading fade-up d1 ${docsSection.inView ? "visible" : ""}`}>
            Legal <em>Documents</em>
          </h2>
          <div className={`docs-gold-line fade-up d1 ${docsSection.inView ? "visible" : ""}`} />
          <p className={`docs-subheading fade-up d2 ${docsSection.inView ? "visible" : ""}`}>
            Official court filings, evidence records, and certified judgment copies on file.
          </p>

          <div className="docs-grid">
            {caseDocuments.map((doc, i) => (
              <a
                key={doc.id}
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`pdf-card fade-up d${Math.min(i + 1, 5)} ${docsSection.inView ? "visible" : ""}`}
              >
                <div className="pdf-card-top">
                  <div className="pdf-icon-wrap">
                    <svg
                      className="pdf-icon-svg"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v1.5H8V15zm0-3h8v1.5H8V12zm0-3h4v1.5H8V9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="pdf-badge">{doc.badge}</div>
                    <div className="pdf-card-title">{doc.title}</div>
                  </div>
                </div>

                <div className="pdf-card-body">
                  <p className="pdf-description">{doc.description}</p>
                  <div>
                    <div className="pdf-download-btn">
                      <span>View Document</span>
                      <span>↗</span>
                    </div>
                    <p className="pdf-filename">📄 {doc.filename}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}