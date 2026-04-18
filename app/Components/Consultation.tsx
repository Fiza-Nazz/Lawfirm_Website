"use client";
import { useState } from "react";

export default function Consultation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const caseTypes = [
    "Personal Injury",
    "Car Accident",
    "Bankruptcy",
    "Family Law",
    "Criminal Defense",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    // ── Attempt 1: AJAX fetch ──────────────────────────────────────────────
    try {
      const res = await fetch("https://formsubmit.co/ajax/Aminlawassociates7@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Full Name": form.name,
          "Email Address": form.email,
          "Phone Number": form.phone || "Not provided",
          "Case Type": form.caseType || "Not specified",
          "Message / Case Description": form.message,
          _subject: `New Consultation Request — ${form.name} | Amin Law Associates`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
          _autoresponse: `Dear ${form.name},\n\nThank you for reaching out to Amin Law Associates. We have received your consultation request and our team will review your matter carefully.\n\nA member of our legal team will contact you within 24 hours.\n\nWarm regards,\nAmin Law Associates`,
        }),
      });

      // ✅ FIX: parse body — res.ok alone is NOT enough for FormSubmit
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success === "true") {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", caseType: "", message: "" });
        return;
      }
    } catch {
      // CORS or network error — fall through to hidden form fallback
    }

    // ── Attempt 2: hidden <form> POST (bypasses CORS completely) ──────────
    try {
      const hiddenForm = document.createElement("form");
      hiddenForm.method = "POST";
      hiddenForm.action = "https://formsubmit.co/Aminlawassociates7@gmail.com";
      hiddenForm.target = "_blank";
      hiddenForm.style.display = "none";

      const fields: Record<string, string> = {
        "Full Name": form.name,
        "Email Address": form.email,
        "Phone Number": form.phone || "Not provided",
        "Case Type": form.caseType || "Not specified",
        "Message / Case Description": form.message,
        _subject: `New Consultation Request — ${form.name} | Amin Law Associates`,
        _replyto: form.email,
        _template: "table",
        _captcha: "false",
        _next: window.location.href,
        _autoresponse: `Dear ${form.name},\n\nThank you for reaching out to Amin Law Associates. We have received your consultation request and our team will review your matter carefully.\n\nA member of our legal team will contact you within 24 hours.\n\nWarm regards,\nAmin Law Associates`,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      document.body.removeChild(hiddenForm);

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", caseType: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .consult-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .consult-section {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }

        .consult-section::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -120px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(30, 80, 60, 0.06);
          animation: rotateSlow 30s linear infinite;
        }
        .consult-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          border: 1px solid rgba(180, 150, 80, 0.1);
          animation: rotateSlow 20s linear infinite reverse;
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .consult-inner {
          max-width: 960px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 0;
          background: #fff;
          border: 1px solid #e8e2d9;
          box-shadow: 0 40px 80px rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.04);
          position: relative;
          z-index: 1;
          animation: fadeUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .consult-left {
          background: #1a4a38;
          padding: 52px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .consult-left::before {
          content: '"';
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-size: 220px;
          color: rgba(255,255,255,0.04);
          top: -20px;
          left: -10px;
          line-height: 1;
          pointer-events: none;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(180,150,80,0.15);
          border: 1px solid rgba(180,150,80,0.3);
          padding: 6px 14px;
          width: fit-content;
          margin-bottom: 28px;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #b89848;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .badge-text {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
        }

        .left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .left-title em {
          font-style: italic;
          color: #b89848;
        }

        .left-desc {
          font-size: 13px;
          color: rgba(245,240,232,0.6);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 36px;
        }

        .info-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .info-icon {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(184,152,72,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #b89848;
          font-size: 13px;
        }
        .info-text strong {
          display: block;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
          margin-bottom: 2px;
        }
        .info-text span {
          font-size: 13px;
          color: rgba(245,240,232,0.6);
          font-weight: 300;
        }

        .consult-right {
          padding: 52px 48px;
          background: #ffffff;
        }

        .right-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b89848;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .right-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 32px;
          line-height: 1.3;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .form-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #888;
          font-weight: 500;
        }

        .form-input, .form-select, .form-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          background: transparent;
          border: none;
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
          outline: none;
          width: 100%;
          transition: border-color 0.3s ease;
          font-weight: 300;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-bottom-color: #1a4a38;
        }
        .form-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 4px center;
        }
        .form-textarea {
          resize: none;
          height: 80px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: #1a4a38;
          color: #f5f0e8;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(184,152,72,0.15);
          transition: left 0.4s ease;
        }
        .submit-btn:hover { background: #133829; }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .status-msg {
          margin-top: 14px;
          font-size: 12px;
          text-align: center;
          letter-spacing: 0.5px;
        }
        .status-sent { color: #1a4a38; font-weight: 500; }
        .status-error { color: #c0392b; }
        .status-sending { color: #888; }

        @media (max-width: 1024px) and (min-width: 769px) {
          .consult-section { padding: 60px 20px; }
          .consult-inner { grid-template-columns: 1fr 1.4fr; max-width: 100%; }
          .consult-left { padding: 44px 32px; }
          .left-title { font-size: 32px; }
          .consult-right { padding: 44px 36px; }
          .right-title { font-size: 24px; margin-bottom: 24px; }
        }

        @media (max-width: 768px) {
          .consult-section { padding: 40px 16px; align-items: flex-start; }
          .consult-inner { grid-template-columns: 1fr; }
          .consult-left { padding: 36px 24px; }
          .consult-left::before { font-size: 160px; }
          .left-title { font-size: 30px; }
          .left-desc { margin-bottom: 28px; }
          .info-list { gap: 14px; }
          .consult-right { padding: 36px 24px; }
          .right-title { font-size: 24px; margin-bottom: 24px; }
          .form-row { grid-template-columns: 1fr; gap: 0; margin-bottom: 0; }
          .form-group { margin-bottom: 14px; }
        }

        @media (max-width: 480px) {
          .consult-section { padding: 24px 12px; }
          .consult-left { padding: 28px 20px; }
          .consult-left::before { font-size: 120px; }
          .badge { padding: 5px 10px; margin-bottom: 20px; }
          .badge-text { font-size: 9px; letter-spacing: 1.5px; }
          .left-title { font-size: 26px; margin-bottom: 12px; }
          .left-desc { font-size: 12px; margin-bottom: 24px; }
          .info-icon { width: 28px; height: 28px; font-size: 11px; }
          .info-text strong { font-size: 10px; }
          .info-text span { font-size: 12px; }
          .consult-right { padding: 28px 20px; }
          .right-label { font-size: 9px; letter-spacing: 2px; }
          .right-title { font-size: 22px; margin-bottom: 20px; }
          .form-label { font-size: 9px; }
          .form-input, .form-select, .form-textarea { font-size: 14px; padding: 10px 0; }
          .form-textarea { height: 90px; }
          .submit-btn { padding: 14px; font-size: 10px; letter-spacing: 2px; }
          .status-msg { font-size: 11px; }
        }

        @media (max-width: 360px) {
          .left-title { font-size: 22px; }
          .right-title { font-size: 20px; }
          .consult-left, .consult-right { padding: 24px 16px; }
        }
      `}</style>

      <section className="consult-section">
        <div className="consult-inner">
          {/* LEFT */}
          <div className="consult-left">
            <div>
              <div className="badge">
                <span className="badge-dot" />
                <span className="badge-text">Free Consultation</span>
              </div>
              <h2 className="left-title">
                Legal Help,<br /><em>When It Matters</em><br />Most.
              </h2>
              <p className="left-desc">
                Our attorneys are ready to evaluate your case confidentially and without obligation.
              </p>
            </div>
            <ul className="info-list">
              <li className="info-item">
                <span className="info-icon">✦</span>
                <div className="info-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">◎</span>
                <div className="info-text">
                  <strong>Confidential</strong>
                  <span>100% private &amp; secure</span>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">◈</span>
                <div className="info-text">
                  <strong>No Obligation</strong>
                  <span>Completely free to book</span>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="consult-right">
            <p className="right-label">Book a Session</p>
            <h3 className="right-title">Schedule Your Consultation</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-input"
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-input"
                  name="phone"
                  placeholder="+1 (000) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Case Type</label>
                <select
                  className="form-select"
                  name="caseType"
                  value={form.caseType}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  {caseTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Brief Description *</label>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="Briefly describe your legal matter..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={status === "sending" || status === "sent"}
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Request Sent ✓"
                : "Submit Consultation Request"}
            </button>

            {status === "sent" && (
              <p className="status-msg status-sent">
                ✓ Thank you! We&apos;ll be in touch within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="status-msg status-error">
                Something went wrong. Please email us directly.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}