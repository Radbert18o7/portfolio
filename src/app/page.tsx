"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollOrchestrator from "@/components/ScrollOrchestrator";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";

// Dynamically import Three.js scene — avoids SSR issues
const UniverseScene = dynamic(() => import("@/components/UniverseScene"), {
  ssr: false,
  loading: () => null,
});

/* ── Scrolling marquee banner between sections ─────── */
const marqueeItems = [
  "Business Analysis","FinTech","InsureTech","Agile / Scrum","JIRA","Confluence",
  "SQL","Stakeholder Management","Product Roadmapping","ISO 9001","CBAP®","PMI-PBA",
  "Risk Management","Requirements Gathering","SDLC","AI Chatbot","SaaS Platforms",
];

function MarqueeBanner() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative", zIndex: 3,
        borderTop: "1px solid rgba(79,142,247,0.10)",
        borderBottom: "1px solid rgba(79,142,247,0.10)",
        background: "rgba(79,142,247,0.025)",
        backdropFilter: "blur(8px)",
        padding: "0.85rem 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.73rem",
                color: i % 5 === 0 ? "var(--color-primary)" : "var(--color-text-dim)",
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: i % 5 === 0 ? "var(--color-primary)" : "var(--color-text-dim)",
                  opacity: 0.6, flexShrink: 0,
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />

      {/* ── LAYER 0 — Fixed 3D Universe (always visible) ── */}
      <UniverseScene />

      {/* ── LAYER 1 — Cursor glow ─────────────────────── */}
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />

      {/* ── LAYER 2 — GSAP scroll orchestration ─────────── */}
      <ScrollOrchestrator />

      {/* ── LAYER 3 — All page content ───────────────────── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />
        <main>
          <Hero />
          <MarqueeBanner />

          <div className="glow-line" />
          <About />

          <div className="glow-line" />
          <MarqueeBanner />

          <Skills />

          <div className="glow-line" />
          <MarqueeBanner />

          <Portfolio />

          <div className="glow-line" />
          <Certifications />

          <div className="glow-line" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
