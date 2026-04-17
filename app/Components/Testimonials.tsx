"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    avatar: "/law1.png",
    text: "Pri soluta aeterno luptatum et, an omnes invidunt has. Ei accusamus dignissim vis. Their counsel was decisive and unflinching.",
    name: "Louis Cole",
    title: "CEO, Cole Industries",
    rating: 5,
  },
  {
    avatar: "/law2.png",
    text: "Est ea modus vidisse apeirian. Nusquam accusata nec te, feugait percipitur no mei. Exceptional legal strategy from start to finish.",
    name: "Jeffrey Luck",
    title: "Managing Partner",
    rating: 5,
  },
  {
    avatar: "/law3.png",
    text: "Lorem Ipsum. Proin gravida nibh vel velit auctor ali an sollicitudin, lorem quis bibendum auctor. Outstanding representation.",
    name: "Simona Perez",
    title: "Director, Perez Group",
    rating: 5,
  },
  {
    avatar: "/law4.png",
    text: "Adipiscing magna fusce dapibus convallis lorem ipsum dolor sit amet consectetur elit. A firm that truly fights for its clients.",
    name: "Michael Torres",
    title: "Entrepreneur",
    rating: 5,
  },
  {
    avatar: "/law5.png",
    text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Professionalism redefined.",
    name: "Anna Whitfield",
    title: "Senior Executive",
    rating: 5,
  },
  {
    avatar: "/law6.png",
    text: "Curabitur pretium tincidunt lacus nulla mauris nibh fusce accumsan dictum malesuada. Results beyond expectation.",
    name: "Robert Chang",
    title: "Founder, Chang LLC",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setPrev(active);
    setActive(idx);
    setAnimating(true);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  };

  const next = () => goTo((active + 1) % testimonials.length);
  const prev_ = () => goTo((active - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active]);

  const t = testimonials[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

        .ts-root {
          background: #fff;
          padding: 80px 40px;
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background cross-hatch pattern */
        .ts-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(11,77,70,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,77,70,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .ts-inner {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .ts-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .ts-eyebrow-line {
          width: 36px;
          height: 1px;
          background: #0b4d46;
        }

        .ts-eyebrow-text {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #0b4d46;
        }

        .ts-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 400;
          color: #0f0f0f;
          margin: 0 0 48px 0;
          line-height: 1.15;
        }

        .ts-title em {
          font-style: italic;
          color: #0b4d46;
        }

        /* Main layout */
        .ts-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 0;
          border: 1px solid #e5e0d8;
        }

        /* Left: main testimonial */
        .ts-main {
          padding: 48px 48px 40px;
          position: relative;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #e5e0d8;
        }

        .ts-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 120px;
          color: #0b4d46;
          line-height: 0.7;
          opacity: 0.12;
          position: absolute;
          top: 32px;
          left: 40px;
          user-select: none;
          pointer-events: none;
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ts-text-block {
          animation: fadeSlideIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        .ts-quote-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 400;
          font-style: italic;
          color: #1a1a1a;
          line-height: 1.7;
          margin: 0 0 36px 0;
          position: relative;
          z-index: 1;
          padding-top: 24px;
        }

        .ts-author {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .ts-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(60%);
          border: 2px solid #0b4d46;
          flex-shrink: 0;
        }

        .ts-author-name {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #0f0f0f;
          letter-spacing: 0.5px;
          margin: 0 0 2px 0;
        }

        .ts-author-title {
          font-size: 12px;
          color: #888;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .ts-stars {
          display: flex;
          gap: 3px;
          margin-top: 4px;
        }

        .ts-star {
          color: #c0622a;
          font-size: 11px;
        }

        /* Bottom controls */
        .ts-controls {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 32px;
          border-top: 1px solid #e5e0d8;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .ts-arrow {
          width: 42px;
          height: 42px;
          border: 1px solid #0b4d46;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, color 0.25s;
          color: #0b4d46;
          flex-shrink: 0;
        }

        .ts-arrow:hover {
          background: #0b4d46;
          color: #fff;
        }

        .ts-arrow svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ts-progress {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }

        .ts-pip {
          width: 20px;
          height: 2px;
          background: #d8d3cc;
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          border: none;
          padding: 0;
        }

        .ts-pip.active {
          background: #0b4d46;
          width: 36px;
        }

        .ts-count {
          margin-left: auto;
          font-size: 12px;
          color: #aaa;
          letter-spacing: 1px;
        }

        /* Right: stacked list */
        .ts-sidebar {
          display: flex;
          flex-direction: column;
        }

        .ts-sidebar-item {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e0d8;
          cursor: pointer;
          position: relative;
          transition: background 0.25s;
          display: flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
        }

        .ts-sidebar-item:last-child { border-bottom: none; }

        .ts-sidebar-item.active {
          background: #0b4d46;
        }

        .ts-sidebar-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #c0622a;
          transform: scaleY(0);
          transition: transform 0.3s;
        }

        .ts-sidebar-item:not(.active):hover::before {
          transform: scaleY(1);
        }

        .ts-sidebar-item:not(.active):hover {
          background: #f9f7f4;
        }

        .ts-sidebar-av {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(50%);
          flex-shrink: 0;
          opacity: 0.85;
        }

        .ts-sidebar-item.active .ts-sidebar-av {
          filter: grayscale(0%);
          opacity: 1;
        }

        .ts-sidebar-name {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 2px 0;
        }

        .ts-sidebar-item.active .ts-sidebar-name {
          color: #fff;
        }

        .ts-sidebar-role {
          font-size: 11px;
          color: #999;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .ts-sidebar-item.active .ts-sidebar-role {
          color: rgba(255,255,255,0.6);
        }

        .ts-sidebar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c0622a;
          margin-left: auto;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .ts-sidebar-item.active .ts-sidebar-dot {
          opacity: 1;
        }

        /* Video strip */
        .ts-video-strip {
          margin-top: 32px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          height: 80px;
          background: #0b4d46;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 28px;
          transition: background 0.3s;
        }

        .ts-video-strip:hover { background: #083d38; }

        .ts-play-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s, transform 0.3s;
        }

        .ts-video-strip:hover .ts-play-circle {
          border-color: #fff;
          transform: scale(1.08);
        }

        .ts-play-tri {
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 14px solid #c0622a;
          margin-left: 3px;
        }

        .ts-video-label {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: #fff;
          font-style: italic;
        }

        .ts-video-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
          margin-top: 2px;
        }

        /* Modal */
        .ts-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeSlideIn 0.3s ease;
          padding: 20px;
        }

        .ts-modal {
          position: relative;
          width: 80%;
          max-width: 860px;
        }

        .ts-modal video {
          width: 100%;
          display: block;
        }

        .ts-modal-close {
          position: absolute;
          top: -48px;
          right: 0;
          background: none;
          border: none;
          color: #fff;
          font-size: 34px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .ts-modal-close:hover { opacity: 1; }

        /* ─── RESPONSIVE BREAKPOINTS ─── */

        /* Large tablets: 769px – 1024px */
        @media (max-width: 1024px) and (min-width: 769px) {
          .ts-root {
            padding: 60px 28px;
          }
          .ts-layout {
            grid-template-columns: 1fr 300px;
          }
          .ts-title {
            font-size: 34px;
            margin-bottom: 36px;
          }
          .ts-main {
            padding: 36px 32px 32px;
          }
          .ts-quote-text {
            font-size: 19px;
          }
          .ts-sidebar-item {
            padding: 16px 18px;
          }
        }

        /* Tablets: up to 768px — sidebar hidden, single column */
        @media (max-width: 768px) {
          .ts-root {
            padding: 52px 20px;
          }
          .ts-layout {
            grid-template-columns: 1fr;
          }
          .ts-sidebar {
            display: none;
          }
          .ts-main {
            padding: 32px 24px 28px;
            border-right: none;
            min-height: unset;
          }
          .ts-title {
            font-size: 28px;
            margin-bottom: 28px;
          }
          .ts-quote-text {
            font-size: 17px;
            margin-bottom: 24px;
          }
          .ts-quote-mark {
            font-size: 90px;
            top: 20px;
            left: 20px;
          }
          .ts-video-strip {
            height: 72px;
            gap: 16px;
            padding: 0 20px;
            margin-top: 24px;
          }
          .ts-video-label {
            font-size: 14px;
          }
        }

        /* Mobile phones: up to 480px */
        @media (max-width: 480px) {
          .ts-root {
            padding: 40px 16px;
          }
          .ts-title {
            font-size: 24px;
            margin-bottom: 24px;
          }
          .ts-eyebrow-text {
            font-size: 10px;
            letter-spacing: 2px;
          }
          .ts-main {
            padding: 24px 18px 22px;
          }
          .ts-quote-mark {
            font-size: 70px;
            top: 14px;
            left: 14px;
          }
          .ts-quote-text {
            font-size: 15px;
            line-height: 1.65;
            margin-bottom: 20px;
            padding-top: 18px;
          }
          .ts-avatar {
            width: 44px;
            height: 44px;
          }
          .ts-author-name {
            font-size: 13px;
          }
          .ts-author-title {
            font-size: 11px;
          }
          .ts-controls {
            gap: 12px;
            padding-top: 20px;
            margin-top: 20px;
          }
          .ts-arrow {
            width: 36px;
            height: 36px;
          }
          .ts-arrow svg {
            width: 14px;
            height: 14px;
          }
          .ts-count {
            font-size: 11px;
          }
          .ts-video-strip {
            height: 64px;
            padding: 0 16px;
            gap: 14px;
            margin-top: 20px;
          }
          .ts-play-circle {
            width: 36px;
            height: 36px;
          }
          .ts-play-tri {
            border-top-width: 6px;
            border-bottom-width: 6px;
            border-left-width: 11px;
          }
          .ts-video-label {
            font-size: 13px;
          }
          .ts-video-sub {
            font-size: 10px;
          }
          .ts-modal {
            width: 95%;
          }
          .ts-modal-close {
            top: -38px;
            font-size: 28px;
          }
        }

        /* Very small phones: up to 360px */
        @media (max-width: 360px) {
          .ts-root {
            padding: 32px 12px;
          }
          .ts-title {
            font-size: 21px;
          }
          .ts-quote-text {
            font-size: 14px;
          }
          .ts-main {
            padding: 20px 14px 18px;
          }
          .ts-video-label {
            font-size: 12px;
          }
          .ts-video-sub {
            display: none;
          }
        }
      `}</style>

      <section className="ts-root">
        <div className="ts-inner">
          <div className="ts-eyebrow">
            <span className="ts-eyebrow-line" />
            <span className="ts-eyebrow-text">Client Voices</span>
          </div>
          <h2 className="ts-title">What Our Clients <em>Say</em></h2>

          <div className="ts-layout">
            {/* Main testimonial pane */}
            <div className="ts-main">
              <span className="ts-quote-mark">&ldquo;</span>

              <div className="ts-text-block" key={active}>
                <p className="ts-quote-text">{t.text}</p>
                <div className="ts-author">
                  <img src={t.avatar} alt={t.name} className="ts-avatar" />
                  <div>
                    <p className="ts-author-name">{t.name}</p>
                    <p className="ts-author-title">{t.title}</p>
                    <div className="ts-stars">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="ts-star">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ts-controls">
                <button className="ts-arrow" onClick={prev_} aria-label="Previous">
                  <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="ts-arrow" onClick={next} aria-label="Next">
                  <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div className="ts-progress">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={`ts-pip ${i === active ? "active" : ""}`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
                <span className="ts-count">{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Sidebar list */}
            <div className="ts-sidebar">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className={`ts-sidebar-item ${i === active ? "active" : ""}`}
                  onClick={() => goTo(i)}
                >
                  <img src={item.avatar} alt={item.name} className="ts-sidebar-av" />
                  <div>
                    <p className="ts-sidebar-name">{item.name}</p>
                    <p className="ts-sidebar-role">{item.title}</p>
                  </div>
                  <span className="ts-sidebar-dot" />
                </div>
              ))}
            </div>
          </div>

          {/* Video strip */}
          <div className="ts-video-strip" onClick={() => setIsVideoOpen(true)}>
            <div className="ts-play-circle">
              <div className="ts-play-tri" />
            </div>
            <div>
              <div className="ts-video-label">Watch: An Interview With Raymond King</div>
              <div className="ts-video-sub">Client Story · 4 min</div>
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="ts-backdrop" onClick={() => setIsVideoOpen(false)}>
          <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ts-modal-close" onClick={() => setIsVideoOpen(false)}>×</button>
            <video src="/video.mp4" controls autoPlay />
          </div>
        </div>
      )}
    </>
  );
}