"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticCard from "./MagneticCard";

const skillGroups = [
  {
    title: "Technical & Analytical", icon: "⚙️", color: "#4f8ef7",
    gradient: "linear-gradient(135deg,#4f8ef7,#38bdf8)",
    skills: [
      { name: "Business Systems Analysis (BSA)", level: "Advanced", pct: 95 },
      { name: "Agile / Scrum & SDLC", level: "Advanced", pct: 95 },
      { name: "SQL Queries & Excel Pivot Tables", level: "Advanced", pct: 90 },
      { name: "Visual Modelling — JIRA, Confluence, Visio", level: "Advanced", pct: 92 },
      { name: "Application Architecture Definition", level: "Intermediate", pct: 72 },
      { name: "Functional Testing & Validation", level: "Intermediate", pct: 75 },
      { name: "ISO 9001 / 27000 / 27001 Compliance", level: "Intermediate", pct: 70 },
    ],
  },
  {
    title: "Product & Stakeholder", icon: "🤝", color: "#a78bfa",
    gradient: "linear-gradient(135deg,#a78bfa,#f472b6)",
    skills: [
      { name: "Product Roadmapping & Backlog Prioritization", level: "Advanced", pct: 93 },
      { name: "Stakeholder Communication", level: "Advanced", pct: 97 },
      { name: "Client Manager Engagement", level: "Advanced", pct: 94 },
      { name: "Merchant Integration & Payment Reconciliation", level: "Intermediate", pct: 76 },
      { name: "Risk Management", level: "Advanced", pct: 88 },
      { name: "Budget Management", level: "Advanced", pct: 85 },
    ],
  },
];

const levelConfig: Record<string, { color: string; bg: string }> = {
  Advanced:     { color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  Intermediate: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
};

const tools = [
  "JIRA","Confluence","MS Visio","SQL","Excel","PowerPoint","Miro","Slack",
  "MS Teams","Trello","Figma","ServiceNow","Salesforce CRM","Postman","SharePoint","Power BI",
];

export default function Skills() {
  const [animated, setAnimated] = useState(false);

  return (
    <section
      id="skills"
      aria-label="Skills and expertise"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 90% 100% at 50% 50%, rgba(2,7,20,0.55) 0%, rgba(2,7,20,0.10) 75%, transparent 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>Expertise</p>
          <h2 className="section-title">
            Skills &amp; <span>Proficiencies</span>
          </h2>
          <p className="section-description" style={{ margin: "1rem auto 0", textAlign: "center" }}>
            A decade of hands-on experience translates into deep proficiency across
            technical analysis, product management, and stakeholder engagement.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {skillGroups.map((group, gi) => (
            <MagneticCard
              key={group.title}
              id={`skills-group-${gi + 1}`}
              intensity={10}
              style={{ padding: "2.25rem" }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "0.85rem",
                  marginBottom: "1.75rem", paddingBottom: "1.1rem",
                  borderBottom: `1px solid ${group.color}25`,
                }}
              >
                <div
                  style={{
                    width: 46, height: 46, borderRadius: 13,
                    background: `${group.color}14`, border: `1px solid ${group.color}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.35rem",
                  }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text)" }}>
                    {group.title}
                  </h3>
                  <div style={{ width: 44, height: 2, borderRadius: 1, background: group.gradient, marginTop: 5 }} />
                </div>
              </div>

              {/* Skills */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}
                ref={(el) => {
                  if (el && !animated) {
                    const obs = new IntersectionObserver(([e]) => {
                      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
                    }, { threshold: 0.2 });
                    obs.observe(el);
                  }
                }}
              >
                {group.skills.map((skill) => {
                  const lv = levelConfig[skill.level];
                  return (
                    <div key={skill.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.84rem", fontWeight: 500, color: "var(--color-text)" }}>
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.67rem", fontWeight: 700,
                            color: lv.color, background: lv.bg,
                            padding: "0.18rem 0.6rem", borderRadius: 7, border: `1px solid ${lv.color}30`,
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <div className="skill-bar-bg">
                        <div
                          className={`skill-bar-fill${animated ? " animate" : ""}`}
                          style={{
                            width: `${skill.pct}%`,
                            background: `linear-gradient(90deg,${group.color},${group.color}80)`,
                            boxShadow: animated ? `0 0 10px ${group.color}60` : "none",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </MagneticCard>
          ))}
        </div>

        {/* Tools marquee */}
        <div style={{ marginTop: "2rem" }} id="skills-tools-row">
          <MagneticCard intensity={4} style={{ padding: "1.75rem 2rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Tools &amp; Platforms
            </p>
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...tools, ...tools].map((tool, i) => (
                  <span key={i} className="tag" style={{ whiteSpace: "nowrap" }}>{tool}</span>
                ))}
              </div>
            </div>
          </MagneticCard>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #skills .container > div:nth-child(2){
            grid-template-columns:1fr!important;
          }
        }
      `}</style>
    </section>
  );
}
