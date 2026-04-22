"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticCard from "./MagneticCard";

const projects = [
  {
    id:1, title:"AI Chatbot", category:"AI / NLP", emoji:"🤖",
    color:"#4f8ef7", gradient:"linear-gradient(135deg,#4f8ef7,#7fb3ff)",
    description:"Designed and delivered requirements for an NLP-powered conversational AI chatbot for enterprise client support. Mapped user journeys, defined conversation flows, and coordinated between UX, ML engineering, and business teams.",
    tags:["NLP","Conversational AI","Requirements","UX Mapping"],
    highlights:["Intent classification","Multi-turn dialogue","CRM integration","Analytics dashboard"],
  },
  {
    id:2, title:"AI Voicebot", category:"AI / NLP", emoji:"🎙️",
    color:"#a78bfa", gradient:"linear-gradient(135deg,#a78bfa,#c4b5fd)",
    description:"Led BA activities for a voice-enabled AI assistant integrating with telephony systems. Defined speech-to-text requirements, IVR flow redesign, and fallback logic for complex financial queries.",
    tags:["Voice AI","IVR","Telephony","STT/TTS"],
    highlights:["Real-time STT","IVR redesign","Sentiment analysis","Compliance tagging"],
  },
  {
    id:3, title:"Fire Alarm System", category:"Web Application", emoji:"🔥",
    color:"#f97316", gradient:"linear-gradient(135deg,#f97316,#fbbf24)",
    description:"Spearheaded requirements for a web-based fire alarm monitoring platform. Covered real-time alerting, device registry, compliance reporting (ISO 9001), and role-based access control.",
    tags:["IoT","Real-time Alerts","ISO 9001","RBAC"],
    highlights:["Live device monitoring","Automated compliance","Incident audit trail","Multi-site support"],
  },
  {
    id:4, title:"E-Auction Platform", category:"Web Application", emoji:"🏷️",
    color:"#38bdf8", gradient:"linear-gradient(135deg,#38bdf8,#34d399)",
    description:"Gathered and documented requirements for a real-time online auction platform. Managed bidding engine specs, payment gateway integration, user authentication, and auction lifecycle management.",
    tags:["Real-time Bidding","Payment Gateway","Auth","FinTech"],
    highlights:["Real-time bid engine","Escrow payment flow","Seller/buyer portals","Fraud detection"],
  },
  {
    id:5, title:"AI Chatbot/Voicebot SaaS", category:"SaaS Platform", emoji:"🧠",
    color:"#34d399", gradient:"linear-gradient(135deg,#34d399,#4f8ef7)",
    description:"Defined the product roadmap, feature backlog, and multi-tenant architecture requirements for a white-label SaaS platform enabling businesses to deploy AI bots without deep ML expertise.",
    tags:["SaaS","Multi-tenant","White-label","Product Roadmap"],
    highlights:["Self-serve bot builder","White-label branding","Usage-based billing","API marketplace"],
  },
  {
    id:6, title:"E-Auction SaaS Platform", category:"SaaS Platform", emoji:"💎",
    color:"#fbbf24", gradient:"linear-gradient(135deg,#fbbf24,#f97316)",
    description:"Led the BA workstream for a multi-tenant SaaS auction platform. Defined tenant onboarding workflows, configurable auction templates, revenue share models, and compliance dashboards.",
    tags:["SaaS","Multi-tenant","Auction Engine","Compliance"],
    highlights:["Tenant self-onboarding","Configurable auction types","Revenue share engine","Regulator dashboard"],
  },
];

const categories = ["All","AI / NLP","Web Application","SaaS Platform"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      aria-label="Portfolio projects"
      style={{ position: "relative", zIndex: 2, padding: "var(--section-padding) 0" }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(79,142,247,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>Portfolio</p>
          <h2 className="section-title">Recent <span>Works</span></h2>
          <p className="section-description" style={{ margin: "1rem auto 0", textAlign: "center" }}>
            A selection of projects across AI, web applications, and SaaS platforms
            where I led business analysis and requirements engineering.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            display: "flex", 
            gap: "1rem", 
            justifyContent: "center", 
            alignItems: "center",
            flexWrap: "wrap", 
            marginBottom: "4.5rem",
            position: "relative",
            zIndex: 10
          }}
          role="tablist"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              id={`filter-${cat.toLowerCase().replace(/[\s/]+/g,"-")}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.8rem 2rem", 
                borderRadius: 999,
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                background: activeCategory === cat
                  ? "rgba(79,142,247,0.2)"
                  : "rgba(255,255,255,0.05)",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.85)",
                fontSize: "0.9rem", 
                fontWeight: 700, 
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                backdropFilter: "blur(16px)",
                boxShadow: activeCategory === cat ? "0 0 30px rgba(79,142,247,0.3)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                outline: "none",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <MagneticCard
                  id={`project-card-${project.id}`}
                  intensity={10}
                  onClick={() => setSelected(project)}
                  style={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  {/* ... card content ... */}
                  <div style={{ height: 4, background: project.gradient, width: "100%" }} />
                  <div style={{ padding: "2.25rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                      <span style={{ fontSize: "2.5rem" }}>{project.emoji}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700,
                        color: project.color, background: `${project.color}15`,
                        padding: "0.25rem 0.75rem", borderRadius: 8, textTransform: "uppercase"
                      }}>
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", marginBottom: "0.75rem" }}>
                      {project.title}
                    </h3>
                    
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      {project.description}
                    </p>
                    
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                      {project.tags.map((t) => (
                        <span key={t} className="tag" style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(2,7,20,0.88)", backdropFilter: "blur(20px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ position: "fixed", inset: 0, zIndex: 2001, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", perspective: 1200, pointerEvents: "none" }}
            >
              <div
                id={`project-modal-${selected.id}`}
                style={{
                  maxWidth: 620, width: "100%",
                  background: "rgba(6,12,30,0.95)", backdropFilter: "blur(40px)",
                  border: `1px solid ${selected.color}35`, borderRadius: 28, padding: "2.5rem",
                  position: "relative", maxHeight: "88vh", overflowY: "auto",
                  boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 60px ${selected.color}20`,
                  pointerEvents: "all",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: selected.gradient, borderRadius: "28px 28px 0 0" }} />

                <button
                  onClick={() => setSelected(null)}
                  id="project-modal-close"
                  aria-label="Close"
                  style={{
                    position: "absolute", top: "1.5rem", right: "1.5rem",
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                >
                  ✕
                </button>

                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{selected.emoji}</div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: selected.color, fontWeight: 700, letterSpacing: "0.08em" }}>
                  {selected.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 800, color: "var(--color-text)", margin: "0.5rem 0 1rem" }}>
                  {selected.title}
                </h2>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                  {selected.description}
                </p>

                <div style={{ background: `${selected.color}08`, border: `1px solid ${selected.color}20`, borderRadius: 16, padding: "1.4rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.67rem", color: "var(--color-text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    Key Deliverables
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {selected.highlights.map((h) => (
                      <div key={h} style={{ fontSize: "0.87rem", color: "var(--color-text)", display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: selected.color, boxShadow: `0 0 8px ${selected.color}`, flexShrink: 0 }} />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {selected.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:900px){ #portfolio .container > div:last-child { grid-template-columns:1fr 1fr!important; } }
        @media(max-width:560px){ #portfolio .container > div:last-child { grid-template-columns:1fr!important; } }
      `}</style>
    </section>
  );
}
