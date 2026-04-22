"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2.5rem 0",
        position: "relative",
        zIndex: 2,
      }}
      aria-label="Site footer"
    >
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--gradient-hero)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#fff",
              }}
            >
              RJ
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                }}
              >
                Rahul Jogi
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-text-dim)",
                }}
              >
                IT Business Analyst
              </div>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                flexWrap: "wrap",
              }}
            >
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "var(--transition-base)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + Copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="https://www.linkedin.com/in/rauljogi/"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-link"
              aria-label="LinkedIn profile"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)",
                transition: "var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-primary-light)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:rahuljogi187@gmail.com"
              id="footer-email-link"
              aria-label="Send email"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)",
                transition: "var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-primary-light)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-text-dim)",
              }}
            >
              © {year} Rahul Jogi
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
