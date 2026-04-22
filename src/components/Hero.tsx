"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroAvatar = dynamic(() => import("@/components/HeroAvatar"), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { id: 0, value: "9+",   label: "Years Experience", color: "#4f8ef7" },
  { id: 1, value: "7+",   label: "Years in FinTech",  color: "#a78bfa" },
  { id: 2, value: "50+",  label: "Projects Delivered", color: "#38bdf8" },
  { id: 3, value: "100%", label: "Client Satisfaction", color: "#34d399" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Hero section"
      style={{ position: "relative", zIndex: 2 }}
    >
      {/* Vignette so text pops against the universe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 100% at 25% 50%, rgba(2,7,20,0.65) 0%, rgba(2,7,20,0.30) 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 3D Avatar — overlays the right half of the hero */}
      <HeroAvatar />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div id="hero-badge" style={{ marginBottom: "1.75rem" }}>
          <span className="status-badge">
            <span className="status-dot" />
            Available for Opportunities
          </span>
        </div>

        {/* Greeting */}
        <p
          id="hero-greeting"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: "var(--color-primary)",
            marginBottom: "0.85rem",
            letterSpacing: "0.07em",
          }}
        >
          Hi there, I&apos;m
        </p>

        {/* Name */}
        <div id="hero-name" style={{ marginBottom: "0.5rem" }}>
          <h1
            style={{
              fontSize: "clamp(3.2rem,9vw,6rem)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "var(--color-text)" }}>Rahul </span>
            <span
              style={{
                background: "var(--gradient-hero)",
                backgroundSize: "250% 250%",
                animation: "gradientShift 6s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(79,142,247,0.6))",
              }}
            >
              Jogi
            </span>
          </h1>
        </div>

        {/* Alias */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--color-text-muted)",
            marginBottom: "1.35rem",
          }}
        >
          also known as{" "}
          <span style={{ color: "var(--color-secondary)", fontWeight: 700 }}>Raul</span>
        </p>

        {/* Title */}
        <div
          id="hero-subtitle"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            flexWrap: "wrap",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem,3vw,1.6rem)",
              fontWeight: 800,
              color: "var(--color-text)",
              fontFamily: "var(--font-heading)",
              textShadow: "0 0 30px rgba(79,142,247,0.3)",
            }}
          >
            IT Business Analyst
          </span>
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--gradient-hero)",
              boxShadow: "0 0 10px rgba(79,142,247,0.8)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "clamp(0.95rem,2.5vw,1.3rem)",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
            }}
          >
            FinTech &amp; InsureTech
          </span>
        </div>

        {/* Bio */}
        <p
          id="hero-bio"
          style={{
            fontSize: "1.05rem",
            color: "var(--color-text-muted)",
            maxWidth: 520,
            lineHeight: 1.85,
            marginBottom: "2.5rem",
          }}
        >
          9 years crafting solutions at the intersection of business and technology.
          Expert in requirements gathering, Agile delivery, and stakeholder management
          across FinTech &amp; InsureTech domains.
        </p>

        {/* CTAs */}
        <div
          id="hero-ctas"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "4rem" }}
        >
          <a href="#portfolio" className="btn btn-primary" id="hero-view-work-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline" id="hero-contact-btn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get In Touch
          </a>
          <a
            href="/files/RAHUL%20JOGI_Resume.pdf"
            download="RAHUL JOGI_Resume.pdf"
            className="btn btn-outline"
            id="hero-resume-btn"
            style={{ padding: "0.9rem 1.6rem" }}
            aria-label="Download Resume"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Résumé/CV
          </a>
          <a
            href="https://www.linkedin.com/in/rauljogi/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="hero-linkedin-btn"
            style={{ padding: "0.9rem 1.25rem" }}
            aria-label="LinkedIn Profile"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="hero-stat"
              id={`hero-stat-${stat.id}`}
              style={{
                padding: "1.1rem 1.7rem",
                borderRadius: 18,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--color-border)",
                backdropFilter: "blur(16px)",
                position: "relative",
                overflow: "hidden",
                minWidth: 100,
              }}
            >
              {/* Corner gradient */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 30% 30%, ${stat.color}14, transparent 70%)`,
                }}
              />
              <div
                id={`stat-val-${stat.id}`}
                style={{
                  fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
                  fontWeight: 900,
                  fontFamily: "var(--font-heading)",
                  color: stat.color,
                  filter: `drop-shadow(0 0 16px ${stat.color}80)`,
                  lineHeight: 1.1,
                  position: "relative",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-text-dim)",
                  marginTop: 4,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  position: "relative",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.6rem", zIndex: 2,
        }}
        aria-label="Scroll down"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            color: "var(--color-text-dim)", letterSpacing: "0.18em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: 28, height: 46, borderRadius: 14,
            border: "1.5px solid rgba(79,142,247,0.35)",
            display: "flex", alignItems: "flex-start",
            justifyContent: "center", paddingTop: 6,
            boxShadow: "0 0 20px rgba(79,142,247,0.15)",
          }}
        >
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: 4, height: 9,
              background: "var(--gradient-hero)",
              borderRadius: 2,
              boxShadow: "0 0 8px rgba(79,142,247,0.8)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
