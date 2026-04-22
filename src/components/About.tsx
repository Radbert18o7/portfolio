"use client";

import { motion } from "framer-motion";
import MagneticCard from "./MagneticCard";

const highlights = [
  { icon: "🏦", title: "FinTech / InsureTech", desc: "7+ years in financial & insurance product delivery", color: "#4f8ef7" },
  { icon: "📊", title: "Agile Practitioner",   desc: "Expert in Scrum, SDLC, backlog & sprint ceremonies", color: "#a78bfa" },
  { icon: "🤝", title: "Stakeholder Champion", desc: "Bridging business goals with technical execution",   color: "#38bdf8" },
  { icon: "🌐", title: "Work Flexibility",     desc: "Remote, hybrid, on-site, relocation, all shifts",  color: "#34d399" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Rahul Jogi"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Deep vignette so text is legible against the universe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 100% at 50% 50%, rgba(2,7,20,0.55) 0%, rgba(2,7,20,0.15) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* LEFT — bio text */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              Turning Complex Requirements Into{" "}
              <span>Elegant Solutions</span>
            </h2>

            <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.88, marginBottom: "1.4rem" }}>
              Business Analyst with{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>9 years of experience</strong>,
              including{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>7+ years in FinTech &amp; InsureTech</strong>.
              Expertise in requirements gathering, process mapping, stakeholder management,
              and delivering solutions that drive measurable business value.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.88, marginBottom: "2rem" }}>
              I thrive at the intersection of business and technology, translating complex stakeholder
              needs into clear, actionable specifications. From ISO compliance frameworks to AI platforms,
              I ensure every project delivers both technical excellence and business impact.
            </p>

            {/* Availability */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
              {["Remote","Hybrid","On-site","Contract (C2H)","Short/Long Term","All Shifts","Open to Relocation"].map((t) => (
                <span
                  key={t}
                  className="tag availability-tag"
                  id={`availability-${t.toLowerCase().replace(/[\s/()]+/g,"-")}`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Contact links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
              {[
                { href: "mailto:rahuljogi187@gmail.com", label: "rahuljogi187@gmail.com", icon: "📧", id: "about-email-link" },
                { href: "https://www.linkedin.com/in/rauljogi/", label: "linkedin/rauljogi", icon: "💼", id: "about-linkedin-link", ext: true },
                { href: "/files/RAHUL%20JOGI_Resume.pdf", label: "Download Résumé/CV", icon: "📄", id: "about-resume-link", download: true },
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  id={link.id}
                  className="about-link"
                  target={link.ext ? "_blank" : undefined}
                  rel={link.ext ? "noopener noreferrer" : undefined}
                  download={link.download ? "RAHUL JOGI_Resume.pdf" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.55rem 1rem", borderRadius: 12,
                    background: "rgba(79,142,247,0.07)",
                    border: "1px solid var(--color-border)",
                    backdropFilter: "blur(12px)",
                    color: "var(--color-primary-light)",
                    textDecoration: "none", fontSize: "0.85rem", fontWeight: 500,
                    transition: "var(--transition-base)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--color-border-hover)";
                    el.style.color = "var(--color-text)";
                    el.style.background = "rgba(79,142,247,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--color-border)";
                    el.style.color = "var(--color-primary-light)";
                    el.style.background = "rgba(79,142,247,0.07)";
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Highlight cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticCard
                  id={`about-highlight-${i + 1}`}
                  className="about-card"
                  intensity={14}
                  style={{ padding: "1.65rem" }}
                >
                  {/* Corner radial glow */}
                  <div
                    style={{
                      position: "absolute", top: -20, right: -20,
                      width: 90, height: 90, borderRadius: "50%",
                      background: `radial-gradient(circle,${item.color}22,transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.55rem", marginBottom: "1rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.92rem",
                      fontWeight: 700, color: "var(--color-text)", marginBottom: "0.45rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #about .container > div { grid-template-columns:1fr!important; gap:2.5rem!important; }
        }
      `}</style>
    </section>
  );
}
