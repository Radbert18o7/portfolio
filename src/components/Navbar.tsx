"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <a
              href="#hero"
              style={{ textDecoration: "none" }}
              aria-label="Rahul Jogi — Home"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--gradient-hero)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(79,142,247,0.4)",
                  }}
                >
                  RJ
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Rahul Jogi
                </span>
              </motion.div>
            </a>

            {/* Desktop Nav */}
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hide-mobile"
              style={{
                display: "flex",
                gap: "0.25rem",
                listStyle: "none",
                alignItems: "center",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: 8,
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color:
                        activeSection === link.href.slice(1)
                          ? "var(--color-primary-light)"
                          : "var(--color-text-muted)",
                      textDecoration: "none",
                      transition: "var(--transition-base)",
                      background:
                        activeSection === link.href.slice(1)
                          ? "rgba(79,142,247,0.1)"
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        activeSection === link.href.slice(1)
                          ? "var(--color-primary-light)"
                          : "var(--color-text-muted)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* CTA + Hamburger */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <a
                href="#contact"
                className="btn btn-primary hide-mobile"
                style={{ padding: "0.55rem 1.25rem", fontSize: "0.85rem" }}
                id="nav-hire-me-btn"
              >
                Hire Me
              </a>
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                style={{
                  display: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem",
                  color: "var(--color-text)",
                }}
                className="hamburger-btn"
                id="mobile-menu-toggle"
              >
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "currentColor",
                    borderRadius: 1,
                    marginBottom: 5,
                    transition: "var(--transition-base)",
                    transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                  }}
                />
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "currentColor",
                    borderRadius: 1,
                    marginBottom: 5,
                    opacity: menuOpen ? 0 : 1,
                    transition: "var(--transition-base)",
                  }}
                />
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "currentColor",
                    borderRadius: 1,
                    transition: "var(--transition-base)",
                    transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(5,9,20,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--color-border)",
              padding: "1rem",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "0.85rem 1rem",
                  color: "var(--color-text)",
                  textDecoration: "none",
                  fontWeight: 500,
                  borderRadius: 8,
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", marginTop: "1rem" }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
