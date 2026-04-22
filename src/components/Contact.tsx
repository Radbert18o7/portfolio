"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MagneticCard from "./MagneticCard";

const contactMethods = [
  {
    id: "email", label: "Email", value: "rahuljogi187@gmail.com",
    href: "mailto:rahuljogi187@gmail.com", color: "#4f8ef7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "whatsapp", label: "WhatsApp", value: "+91 81283 85356",
    href: "https://wa.me/918128385356", color: "#34d399",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "phone-ca", label: "Phone (Canada)", value: "+1 (236) 865 2049",
    href: "tel:+12368652049", color: "#a78bfa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/rauljogi",
    href: "https://www.linkedin.com/in/rauljogi/", color: "#38bdf8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} aria-label="Contact Rahul Jogi" style={{ position: "relative", zIndex: 2 }}>
      {/* Universe vignette */}
      <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse 90% 100% at 50% 50%,rgba(2,7,20,0.55) 0%,rgba(2,7,20,0.10) 75%,transparent 100%)" }} />
      <div className="container" ref={ref} style={{ position:"relative", zIndex:1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>Contact</p>
          <h2 className="section-title">
            Let&apos;s <span>Work Together</span>
          </h2>
          <p className="section-description" style={{ margin: "1rem auto 0", textAlign: "center" }}>
            Open to new opportunities — remote, hybrid, contract, or full-time.
            Let&apos;s discuss how I can add value to your team.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.45fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — Contact Methods */}
          <motion.div style={{ y: leftY }}>
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
              style={{ perspective: 1000 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800,
                  color: "var(--color-text)", marginBottom: "0.5rem",
                }}
              >
                Get In Touch
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Whether you have a project in mind, a position to fill, or just want to connect — I&apos;d love to hear from you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.id}
                    href={method.href}
                    target={method.id === "linkedin" || method.id === "whatsapp" ? "_blank" : undefined}
                    rel={method.id === "linkedin" || method.id === "whatsapp" ? "noopener noreferrer" : undefined}
                    id={`contact-${method.id}`}
                    className="contact-method-card"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
                    whileHover={{ scale: 1.025, x: 4 }}
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 1.3rem", borderRadius: 16,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--color-border)",
                      textDecoration: "none",
                      transition: "border-color 0.3s, background 0.3s",
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${method.color}50`;
                      el.style.background = `${method.color}06`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--color-border)";
                      el.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    {/* Left glow */}
                    <div
                      style={{
                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                        background: method.color, borderRadius: "16px 0 0 16px", opacity: 0.7,
                      }}
                    />
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${method.color}14`, border: `1px solid ${method.color}28`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: method.color, flexShrink: 0, marginLeft: "0.5rem",
                      }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.67rem",
                          color: "var(--color-text-dim)", letterSpacing: "0.1em",
                          textTransform: "uppercase", marginBottom: "0.15rem",
                        }}
                      >
                        {method.label}
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-text)" }}>
                        {method.value}
                      </div>
                    </div>
                    <motion.div
                      style={{ marginLeft: "auto", color: "var(--color-text-dim)" }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div style={{ y: rightY }}>
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.2, 0.64, 1] }}
              style={{ perspective: 1000 }}
            >
              <MagneticCard id="contact-form-card" intensity={6} style={{ padding: "2.5rem" }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    style={{ textAlign: "center", padding: "2.5rem 0" }}
                    id="contact-success-message"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      style={{ fontSize: "4rem", marginBottom: "1.2rem" }}
                    >
                      ✅
                    </motion.div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800,
                        color: "var(--color-text)", marginBottom: "0.6rem",
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn btn-outline"
                      style={{ marginTop: "1.75rem" }}
                      id="contact-send-another-btn"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} id="contact-form" noValidate>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800,
                        color: "var(--color-text)", marginBottom: "1.85rem",
                      }}
                    >
                      Send a Message
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      {[
                        { id: "contact-name", label: "Name", key: "name", type: "text", placeholder: "John Smith" },
                        { id: "contact-email", label: "Email", key: "email", type: "email", placeholder: "you@company.com" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
                          <input
                            id={f.id} type={f.type} placeholder={f.placeholder} required
                            value={formState[f.key as keyof typeof formState]}
                            onChange={(e) => setFormState({ ...formState, [f.key]: e.target.value })}
                            style={inputStyle}
                            onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.1)"; }}
                            onBlur={(e) => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
                      <input
                        id="contact-subject" type="text"
                        placeholder="e.g. Business Analyst Role — Remote" required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <div style={{ marginBottom: "1.65rem" }}>
                      <label htmlFor="contact-message" style={labelStyle}>Message</label>
                      <textarea
                        id="contact-message" rows={5} required
                        placeholder="Tell me about the opportunity or project..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties}
                        onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      id="contact-submit-btn"
                      className="btn btn-primary"
                      disabled={submitting}
                      whileTap={{ scale: 0.97 }}
                      style={{ width: "100%", justifyContent: "center", opacity: submitting ? 0.75 : 1 }}
                    >
                      {submitting ? (
                        <>
                          <motion.svg
                            width="17" height="17" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                          >
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                            <path d="M21 12a9 9 0 00-9-9" />
                          </motion.svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </MagneticCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #contact .container > div:last-child{
            grid-template-columns:1fr!important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-dim)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "0.45rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(255,255,255,0.025)",
  border: "1.5px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-text)",
  fontSize: "0.9rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
};
