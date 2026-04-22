"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MagneticCard from "./MagneticCard";

const certifications = [
  {
    id: 1, title: "CBAP®", full: "Certified Business Analysis Professional",
    org: "IIBA — BABOK® Competencies", target: "Q3 2026", emoji: "📜",
    color: "#4f8ef7", gradBg: "linear-gradient(135deg,rgba(79,142,247,0.18),rgba(56,189,248,0.10))",
    status: "Pursuing",
    description: "The gold standard in Business Analysis. Validates advanced BA skills in requirements analysis, solution evaluation, and stakeholder engagement across domains.",
  },
  {
    id: 2, title: "PMI-PBA", full: "Professional in Business Analysis",
    org: "Project Management Institute", target: "Q3 2026", emoji: "🏆",
    color: "#a78bfa", gradBg: "linear-gradient(135deg,rgba(167,139,250,0.18),rgba(244,114,182,0.10))",
    status: "Pursuing",
    description: "PMI's certification focusing on needs assessment, traceability, solution validation, and stakeholder engagement within project contexts.",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="certifications" ref={sectionRef} aria-label="Certifications">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>Growth</p>
          <h2 className="section-title">
            Certifications <span>In Progress</span>
          </h2>
          <p className="section-description" style={{ margin: "1rem auto 0", textAlign: "center" }}>
            Committed to achieving the industry&apos;s most respected BA certifications by Q3 2026.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              style={{ y: i === 0 ? y1 : y2 }}
            >
              <motion.div
                initial={{ opacity: 0, rotateY: i === 0 ? -15 : 15, scale: 0.9 }}
                animate={inView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: i * 0.18, ease: [0.34, 1.2, 0.64, 1] }}
                style={{ perspective: 1000 }}
              >
                <MagneticCard
                  id={`cert-${cert.title.toLowerCase()}`}
                  intensity={12}
                  style={{ padding: "2.5rem", background: cert.gradBg }}
                >
                  {/* Orbiting ring decoration */}
                  <div
                    style={{
                      position: "absolute", top: "1.5rem", right: "1.75rem",
                      width: 70, height: 70, borderRadius: "50%",
                      border: `2px solid ${cert.color}30`,
                      animation: "orbFloat 6s ease-in-out infinite",
                      animationDelay: `${i * 2}s`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    style={{
                      position: "absolute", top: "2rem", right: "2.25rem",
                      width: 50, height: 50, borderRadius: "50%",
                      border: `1px solid ${cert.color}20`,
                      animation: "orbFloat 4s ease-in-out infinite",
                      animationDelay: `${i * 1.5 + 1}s`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Status */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.67rem", fontWeight: 700,
                        color: "var(--color-gold)",
                        background: "rgba(251,191,36,0.1)",
                        border: "1px solid rgba(251,191,36,0.22)",
                        padding: "0.2rem 0.65rem", borderRadius: 999, letterSpacing: "0.05em",
                      }}
                    >
                      🔄 {cert.status}
                    </span>
                  </div>

                  <div style={{ fontSize: "2.8rem", marginBottom: "0.85rem" }}>{cert.emoji}</div>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)", fontSize: "2.2rem", fontWeight: 900,
                      color: cert.color, marginBottom: "0.2rem", letterSpacing: "-0.04em",
                      filter: `drop-shadow(0 0 20px ${cert.color}50)`,
                    }}
                  >
                    {cert.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.3rem" }}>
                    {cert.full}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.73rem", color: "var(--color-text-dim)", marginBottom: "1.1rem" }}>
                    {cert.org}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.72, marginBottom: "1.6rem" }}>
                    {cert.description}
                  </p>

                  {/* Target date */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: "0.6rem",
                      padding: "0.75rem 1.1rem",
                      background: `${cert.color}10`,
                      border: `1px solid ${cert.color}22`,
                      borderRadius: 12,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cert.color} strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: cert.color, fontWeight: 700 }}>
                      Target: {cert.target}
                    </span>
                    {/* Progress dots */}
                    <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                      {[1,2,3,4].map((d) => (
                        <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: d <= 2 ? cert.color : `${cert.color}30` }} />
                      ))}
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* BABOK note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          id="cert-babok-note"
          style={{
            textAlign: "center", marginTop: "2.5rem", padding: "1.35rem 2rem",
            background: "rgba(79,142,247,0.04)", border: "1px solid var(--color-border)",
            borderRadius: 18, maxWidth: 620, margin: "2.5rem auto 0",
          }}
        >
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.75 }}>
            <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>BABOK® Competencies</span> —
            Actively studying the Business Analysis Body of Knowledge to align
            current practices with internationally recognised standards.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:640px){
          #certifications .container > div:nth-child(2){
            grid-template-columns:1fr!important;
          }
        }
      `}</style>
    </section>
  );
}
