"use client";

export default function LawyerSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lawyer-section {
          background: #ffffff;
          width: 100%;
          font-family: 'Lora', serif;
          color: #1a1a1a;
          padding: 80px 0 60px;
          position: relative;
          overflow: hidden;
        }

        .justice-watermark {
          position: absolute;
          left: 0;
          top: 60px;
          bottom: 0;
          width: 340px;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          opacity: 1;
        }

        .justice-img {
          width: 280px;
          height: auto;
          opacity: 0.12;
          filter: grayscale(1);
          object-fit: contain;
        }

        .lawyer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 0 360px;
          position: relative;
          z-index: 1;
        }

        .top-row {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 60px;
          align-items: flex-start;
          margin-bottom: 56px;
        }

        .section-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          font-size: 2.1rem;
          line-height: 1.25;
          color: #1a1a1a;
          letter-spacing: -0.01em;
        }

        .dropcap-para {
          font-family: 'Lora', serif;
          font-size: 0.93rem;
          line-height: 1.85;
          color: #333333;
          position: relative;
        }

        .dropcap-para::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 5.2rem;
          font-weight: 400;
          line-height: 0.75;
          float: left;
          margin-right: 8px;
          margin-top: 6px;
          color: #1a1a1a;
        }

        .dropcap-para a {
          color: #b5451b;
          text-decoration: underline;
        }

        .images-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 20px;
        }

        .img-wrapper {
          overflow: hidden;
          position: relative;
        }

        .img-wrapper img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .img-wrapper:hover img {
          transform: scale(1.04);
        }

        .captions-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 44px;
        }

        .img-caption {
          font-family: 'Lora', serif;
          font-size: 0.82rem;
          color: #555555;
          text-align: center;
          font-style: italic;
          padding-top: 10px;
        }

        .bottom-para {
          font-family: 'Lora', serif;
          font-size: 0.93rem;
          line-height: 1.85;
          color: #333333;
          max-width: 860px;
        }

        .bottom-para a {
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (max-width: 1024px) {
          .lawyer-inner {
            padding: 0 32px 0 32px;
          }
          .justice-watermark {
            display: none;
          }
          .top-row {
            grid-template-columns: 260px 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .top-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .images-row,
          .captions-row {
            grid-template-columns: 1fr;
          }
          .section-heading {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 480px) {
          .lawyer-section {
            padding: 48px 0 40px;
          }
          .lawyer-inner {
            padding: 0 20px;
          }
        }
      `}</style>

      <section className="lawyer-section" id="lawer">
        <div className="justice-watermark">
          <img
            className="justice-img"
            src="/skull.png"
            alt=""
          />
        </div>

        <div className="lawyer-inner">
          {/* Top row */}
          <div className="top-row">
            <h2 className="section-heading">
              Experienced Attorneys,<br />Unwavering<br />Commitment.
            </h2>
            <p className="dropcap-para">
              Since its establishment in 2000, Amin Law Associates has been one of Karachi's trusted
              legal and consultancy firms, built on a foundation of{" "}
              <a href="/#expertise">integrity, expertise, and results</a>. Founded to serve
              individuals, families, and businesses across Pakistan, our firm offers a comprehensive
              range of services spanning Legal Consultation, Tax Advisory, Property Documentation
              &amp; Registration, Corporate Governance, Civil Litigation, Banking Law, Real Estate,
              Health Law, and Labour Rights. We believe that every person who walks through our door
              deserves access to the highest calibre of legal counsel — regardless of the complexity
              of their matter. Our attorneys combine deep courtroom experience with sharp analytical
              thinking to deliver outcomes that protect your interests and secure your future.
            </p>
          </div>

          {/* Images */}
          <div className="images-row">
            <div className="img-wrapper">
              <img
                src="/wakeel1.png"
                alt="Amin Law Associates attorneys in consultation"
              />
            </div>
            <div className="img-wrapper">
              <img
                src="/wakeel2.png"
                alt="Amin Law Associates legal professionals at work"
              />
            </div>
          </div>

          {/* Captions */}
          <div className="captions-row">
            <p className="img-caption">"Counsel You Can Trust"</p>
            <p className="img-caption">"Justice Through Dedication"</p>
          </div>

          {/* Bottom paragraph */}
          <p className="bottom-para">
            <a href="/#contact">Reach us at our Karachi office</a> — Mezzanine Floor, Plot #61
            Commercial, Jamshaid II, District East — or call us any time on{" "}
            <a href="tel:03009209003">0300-9209003</a>. Our team operates six days a week with a
            dedicated 24/7 emergency line, because legal crises rarely follow office hours. Whether
            you are facing a commercial dispute, need assistance with property documentation,
            require tax consultation, or are seeking resolution of a civil matter, our senior
            advocates are prepared to guide you from the first consultation to the final verdict.
            At Amin Law Associates,{" "}
            <a href="/#expertise">your legal matter is handled with full professional commitment</a>.
          </p>
        </div>
      </section>
    </>
  );
}