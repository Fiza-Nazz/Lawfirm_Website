"use client";
import { useState } from "react";

const services = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" width="44" height="44">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="7" />
        <line x1="24" y1="6" x2="24" y2="17" />
        <line x1="24" y1="31" x2="24" y2="42" />
        <line x1="6" y1="24" x2="17" y2="24" />
        <line x1="31" y1="24" x2="42" y2="24" />
      </svg>
    ),
    title: "Bankrupcy",
    short: "We'll take care of your finance.",
    desc: "Our expert attorneys guide you through every stage of the bankruptcy process, protecting your assets and helping you achieve a fresh financial start with confidence.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" width="44" height="44">
        <ellipse cx="24" cy="20" rx="10" ry="14" />
        <line x1="24" y1="34" x2="24" y2="42" />
        <line x1="18" y1="42" x2="30" y2="42" />
        <circle cx="24" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Personal Injury",
    short: "Solve any kind of issues easily.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" width="44" height="44">
        <rect x="10" y="16" width="28" height="18" rx="2" />
        <path d="M16 16V12a4 4 0 018 0v4" />
        <line x1="10" y1="24" x2="38" y2="24" />
      </svg>
    ),
    title: "Car Accidents",
    short: "At your service every single day.",
    desc: "From minor fender-benders to major collisions, our legal team fights to secure the compensation you deserve for injuries, damages, and lost wages.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" width="44" height="44">
        <path d="M8 42V22L24 8l16 14v20" />
        <rect x="18" y="30" width="12" height="12" />
        <line x1="8" y1="22" x2="40" y2="22" />
      </svg>
    ),
    title: "Estate Planning",
    short: "Buy or sell an apartment easily.",
    desc: "Secure your legacy with comprehensive estate planning services including wills, trusts, power of attorney, and probate guidance for you and your family.",
  },
];

export default function LawServices() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .law-section {
          background: #0e4c47;
          width: 100%;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          font-family: 'Jost', sans-serif;
        }

        .law-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
          max-width: 1200px;
          position: relative;
        }

        /* Vertical dividers */
        .law-card:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 10%;
          right: 0;
          height: 80%;
          width: 1px;
          background: rgba(255,255,255,0.18);
        }

        .law-card {
          position: relative;
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.4s ease;
        }

        /* Default state elements */
        .card-icon {
          color: #c9965a;
          margin-bottom: 20px;
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease;
          flex-shrink: 0;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.55rem;
          color: #ffffff !important;
          letter-spacing: 0.02em;
          margin-bottom: 12px;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
        }

        .card-short {
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(255,255,255,0.72);
          letter-spacing: 0.03em;
          line-height: 1.6;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
        }

        /* Hover overlay content */
        .card-hover-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 32px;
          pointer-events: none;
          /* starts below */
          transform: translateY(60px);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }

        .hover-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.45rem;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
        }

        .hover-divider {
          width: 28px;
          height: 2px;
          background: #c9965a;
          margin: 0 auto 14px;
          border-radius: 2px;
        }

        .hover-desc {
          font-size: 0.80rem;
          font-weight: 300;
          color: rgba(255,255,255,0.78);
          line-height: 1.75;
          letter-spacing: 0.02em;
          margin-bottom: 18px;
        }

        .hover-arrow {
          color: #c9965a;
          font-size: 1.2rem;
          letter-spacing: 3px;
          transition: transform 0.3s ease;
        }

        /* Active hover state */
        .law-card.is-hovered .card-icon {
          transform: translateY(-30px);
          opacity: 0;
        }

        .law-card.is-hovered .card-title {
          transform: translateY(-30px);
          opacity: 0;
        }

        .law-card.is-hovered .card-short {
          transform: translateY(-30px);
          opacity: 0;
        }

        .law-card.is-hovered .card-hover-content {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .law-card.is-hovered .hover-arrow {
          transform: translateX(4px);
        }

        /* Stagger delays for smooth cascade on hover */
        .law-card.is-hovered .hover-title   { transition-delay: 0.04s; }
        .law-card.is-hovered .hover-divider { transition-delay: 0.08s; }
        .law-card.is-hovered .hover-desc    { transition-delay: 0.12s; }
        .law-card.is-hovered .hover-arrow   { transition-delay: 0.16s; }

        /* Responsive */
        @media (max-width: 900px) {
          .law-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .law-card:nth-child(2)::after { display: none; }
        }

        @media (max-width: 540px) {
          .law-grid {
            grid-template-columns: 1fr;
          }
          .law-card::after { display: none !important; }
        }
      `}</style>

      <section className="law-section">
        <div className="law-grid">
          {services.map((svc) => {
            const active = hovered === svc.id;
            return (
              <div
                key={svc.id}
                className={`law-card${active ? " is-hovered" : ""}`}
                onMouseEnter={() => setHovered(svc.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Default visible content */}
                <div className="card-icon">{svc.icon}</div>
                <div className="card-title">{svc.title}</div>
                <div className="card-short">{svc.short}</div>

                {/* Hover revealed content — slides up from bottom */}
                <div className="card-hover-content">
                  <div className="hover-title">{svc.title}</div>
                  <div className="hover-divider" />
                  <div className="hover-desc">{svc.desc}</div>
                  <div className="hover-arrow">→</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}