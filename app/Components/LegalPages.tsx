"use client";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type PageKey = "privacy" | "terms" | "disclaimer" | "sitemap";

// ─── Sitemap Data ─────────────────────────────────────────────────────────────
const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home",              href: "/" },
      { label: "About Our Firm",    href: "/#about" },
      { label: "Our Lawyers",       href: "/#lawer" },
      { label: "Expertise",         href: "/#expertise" },
      { label: "Practice Areas",    href: "/#practiceareas" },
      { label: "Testimonials",      href: "/#testimonials" },
      { label: "Free Consultation", href: "/#consultation" },
      { label: "Contact Us",        href: "/#contact" },
    ],
  },
  {
    title: "Practice Areas",
    links: [
      { label: "Personal Injury",    href: "/#personal-injury" },
      { label: "Medical Malpractice",href: "/#health-law" },
      { label: "Car Accidents",      href: "/#civil-litigation" },
      { label: "Workers Compensation",href:"/#labour-law" },
      { label: "Wrongful Death",     href: "/#civil-litigation" },
      { label: "Product Liability",  href: "/#corporate-law" },
      { label: "Slip & Fall",        href: "/#personal-injury" },
      { label: "Brain Injuries",     href: "/#health-law" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",  href: "/privacy-policy" },
      { label: "Terms of Service",href: "/terms-of-service" },
      { label: "Disclaimer",      href: "/disclaimer" },
      { label: "Sitemap",         href: "/sitemap" },
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// ─── Shared Section Wrapper ───────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lp-section">
      <h2 className="lp-section-title">{title}</h2>
      <div className="lp-section-body">{children}</div>
    </div>
  );
}

// ─── PAGE CONTENT ─────────────────────────────────────────────────────────────

function PrivacyPage() {
  return (
    <>
      <Section title="Information We Collect">
        <p>We collect information you provide directly to us, including when you fill out our contact form, request a free consultation, or communicate with our attorneys. This may include your name, email address, phone number, and details regarding your legal matter.</p>
        <p>We may also automatically collect certain technical information when you visit our website, such as your IP address, browser type, and pages viewed, solely for the purpose of improving our services.</p>
      </Section>
      <Section title="How We Use Your Information">
        <p>The information we collect is used exclusively to respond to your inquiries, provide legal services, schedule consultations, and improve the quality of our website and client communications.</p>
        <p>We do not sell, trade, or rent your personal information to third parties. Any information shared with us is treated with strict professional confidentiality, consistent with our obligations as legal practitioners.</p>
      </Section>
      <Section title="Attorney-Client Privilege">
        <p>Any information you share with our attorneys in the context of seeking legal representation is protected by attorney-client privilege. This information will not be disclosed to any third party without your explicit consent, except where required by law.</p>
      </Section>
      <Section title="Cookies">
        <p>Our website may use cookies to enhance your browsing experience. These are small files stored on your device that help us understand how visitors use our site. You may disable cookies in your browser settings without affecting your ability to use our website.</p>
      </Section>
      <Section title="Data Security">
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
      </Section>
      <Section title="Contact Us About Privacy">
        <p>If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:Aminlawassociates7@gmail.com" className="lp-inline-link">Aminlawassociates7@gmail.com</a> or call <a href="tel:03009209003" className="lp-inline-link">0300-9209003</a>.</p>
      </Section>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <Section title="Acceptance of Terms">
        <p>By accessing and using the website of Amin Law Associates, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our website.</p>
      </Section>
      <Section title="No Attorney-Client Relationship">
        <p>The information provided on this website is for general informational purposes only and does not constitute legal advice. Visiting this website or contacting us via the website does not create an attorney-client relationship. An attorney-client relationship is only formed upon execution of a formal engagement agreement.</p>
      </Section>
      <Section title="Use of Website">
        <p>You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others. You must not misuse our website by knowingly introducing viruses or other harmful material.</p>
      </Section>
      <Section title="Intellectual Property">
        <p>All content on this website, including text, graphics, logos, and images, is the property of Amin Law Associates and is protected by applicable copyright and intellectual property laws. You may not reproduce or redistribute any content without our written permission.</p>
      </Section>
      <Section title="Limitation of Liability">
        <p>Amin Law Associates shall not be liable for any indirect, incidental, or consequential damages arising out of your use of, or inability to use, this website or its content. Our total liability in any matter related to the website is limited to the maximum extent permitted by Pakistani law.</p>
      </Section>
      <Section title="Governing Law">
        <p>These Terms of Service are governed by the laws of Pakistan. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.</p>
      </Section>
      <Section title="Changes to Terms">
        <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the website following changes constitutes acceptance of the updated terms.</p>
      </Section>
    </>
  );
}

function DisclaimerPage() {
  return (
    <>
      <Section title="Legal Advice Disclaimer">
        <p>The information contained on this website is provided for general informational purposes only. It is not intended to constitute legal advice and should not be relied upon as such. Legal matters are highly fact-specific, and the law is constantly changing.</p>
        <p>We strongly encourage you to consult with a qualified attorney before making any legal decisions. Contacting Amin Law Associates through this website does not establish an attorney-client relationship.</p>
      </Section>
      <Section title="No Guarantee of Results">
        <p>Past case results and client testimonials presented on this website are for illustrative purposes only. Every legal matter is unique, and prior outcomes do not guarantee or predict similar results in future cases. Amin Law Associates makes no warranty regarding the outcome of any legal matter.</p>
      </Section>
      <Section title="Accuracy of Information">
        <p>While we strive to keep the information on this website accurate and current, we make no representations or warranties of any kind regarding the completeness, accuracy, or suitability of the information provided. The law changes frequently and the information on this site may not reflect the most current legal developments.</p>
      </Section>
      <Section title="Third-Party Links">
        <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
      </Section>
      <Section title="Professional Regulation">
        <p>Amin Law Associates is regulated by the Pakistan Bar Council and the Sindh Bar Council. Our attorneys are licensed to practice law in Pakistan. Nothing on this website should be construed as an offer to represent clients outside our area of competence or jurisdiction.</p>
      </Section>
    </>
  );
}

function SitemapPage() {
  return (
    <div className="lp-sitemap-grid">
      {sitemapSections.map((section) => (
        <div key={section.title} className="lp-sitemap-col">
          <h2 className="lp-section-title">{section.title}</h2>
          <ul className="lp-sitemap-list">
            {section.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="lp-sitemap-link">
                  <IconChevronRight />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Page Config ──────────────────────────────────────────────────────────────
const pages: Record<PageKey, { title: string; subtitle: string; content: React.ReactNode }> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your privacy is a fundamental right. Learn how we collect, use, and protect your information.",
    content: <PrivacyPage />,
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Please read these terms carefully before using our website and services.",
    content: <TermsPage />,
  },
  disclaimer: {
    title: "Disclaimer",
    subtitle: "Important legal information regarding the use of this website and its content.",
    content: <DisclaimerPage />,
  },
  sitemap: {
    title: "Sitemap",
    subtitle: "A complete overview of all pages and sections available on our website.",
    content: <SitemapPage />,
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
// Usage: Pass `page` prop — "privacy" | "terms" | "disclaimer" | "sitemap"
// Or use standalone with the demo switcher below.
export default function LegalPage({ page: pageProp }: { page?: PageKey }) {
  // For standalone demo — remove this state if using as separate pages
  const [activePage, setActivePage] = useState<PageKey>(pageProp ?? "privacy");
  const current = pages[activePage];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap');

        /* ── Root ── */
        .lp-root {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Raleway', sans-serif;
        }

        /* ── Hero / Header ── */
        .lp-hero {
          background: #0D4A3A;
          padding: 72px 24px 56px;
          position: relative;
          overflow: hidden;
        }
        .lp-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 320px; height: 320px;
          border: 1px solid rgba(201,145,58,0.15);
          transform: rotate(15deg);
        }
        .lp-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 10%;
          width: 180px; height: 180px;
          border: 1px solid rgba(201,145,58,0.1);
          transform: rotate(-10deg);
        }
        .lp-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .lp-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9913A;
          margin-bottom: 20px;
        }
        .lp-hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #C9913A;
        }
        .lp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .lp-hero-subtitle {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          max-width: 600px;
          margin: 0 0 32px;
        }
        .lp-hero-meta {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.05em;
        }
        .lp-hero-meta strong {
          color: rgba(255,255,255,0.55);
          font-weight: 600;
        }

        /* ── Tab Nav ── */
        .lp-tab-bar {
          background: #F9F6F1;
          border-bottom: 1px solid rgba(201,145,58,0.2);
          padding: 0 24px;
        }
        .lp-tab-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          gap: 0;
          overflow-x: auto;
        }
        .lp-tab-btn {
          padding: 18px 28px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888888;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          margin-bottom: -1px;
        }
        .lp-tab-btn:hover { color: #0D4A3A; }
        .lp-tab-btn.active {
          color: #0D4A3A;
          border-bottom-color: #C9913A;
        }

        /* ── Body ── */
        .lp-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        /* ── Section ── */
        .lp-section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .lp-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .lp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 600;
          color: #1A1A1A;
          margin: 0 0 20px;
          padding-bottom: 14px;
          position: relative;
        }
        .lp-section-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 32px; height: 2px;
          background: #C9913A;
        }
        .lp-section-body p {
          font-size: 14px;
          line-height: 1.9;
          color: #555555;
          margin: 0 0 16px;
        }
        .lp-section-body p:last-child { margin-bottom: 0; }
        .lp-inline-link {
          color: #0D4A3A;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid rgba(13,74,58,0.3);
          transition: border-color 0.2s;
        }
        .lp-inline-link:hover { border-color: #C9913A; color: #C9913A; }

        /* ── Sitemap ── */
        .lp-sitemap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        .lp-sitemap-col .lp-section-title {
          font-size: 18px;
          margin-bottom: 24px;
        }
        .lp-sitemap-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lp-sitemap-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #555555;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          transition: color 0.2s, gap 0.2s;
        }
        .lp-sitemap-link svg { opacity: 0.4; flex-shrink: 0; transition: opacity 0.2s, color 0.2s; }
        .lp-sitemap-link:hover { color: #0D4A3A; gap: 12px; }
        .lp-sitemap-link:hover svg { opacity: 1; color: #C9913A; }

        /* ── Bottom Bar ── */
        .lp-bottom {
          background: #0D4A3A;
          padding: 20px 24px;
          text-align: center;
        }
        .lp-bottom p {
          font-family: 'Raleway', sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .lp-bottom a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          margin: 0 10px;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .lp-bottom a:hover { color: #E0A84E; }

        /* ── Breadcrumb ── */
        .lp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 28px;
        }
        .lp-breadcrumb a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-breadcrumb a:hover { color: #C9913A; }
        .lp-breadcrumb span { color: rgba(255,255,255,0.25); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .lp-hero { padding: 56px 20px 40px; }
          .lp-body { padding: 40px 20px 60px; }
          .lp-tab-btn { padding: 16px 18px; font-size: 10px; }
          .lp-sitemap-grid { grid-template-columns: 1fr; gap: 0; }
          .lp-sitemap-col { padding-bottom: 32px; margin-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.07); }
          .lp-sitemap-col:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="lp-root">

        {/* ── Hero ── */}
        <div className="lp-hero">
          <div className="lp-hero-inner">
            <div className="lp-breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span>{current.title}</span>
            </div>
            <div className="lp-hero-eyebrow">Amin Law Associates</div>
            <h1 className="lp-hero-title">{current.title}</h1>
            <p className="lp-hero-subtitle">{current.subtitle}</p>
            <p className="lp-hero-meta">
              <strong>Last Updated:</strong> January 1, 2025 &nbsp;·&nbsp; Karachi, Pakistan
            </p>
          </div>
        </div>

        {/* ── Tab Nav ── */}
        <div className="lp-tab-bar">
          <div className="lp-tab-inner">
            {(Object.keys(pages) as PageKey[]).map((key) => (
              <button
                key={key}
                className={`lp-tab-btn${activePage === key ? " active" : ""}`}
                onClick={() => setActivePage(key)}
              >
                {pages[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="lp-body">
          {current.content}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="lp-bottom">
          <p>
            © {new Date().getFullYear()} Amin Law Associates, Karachi. All rights reserved.
            &nbsp;&nbsp;
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/sitemap">Sitemap</a>
          </p>
        </div>

      </div>
    </>
  );
}