"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the loader visible for a fixed time to ensure WebGL compiles
    const timer = setTimeout(() => {
      setReady(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setLoading(false);
    window.dispatchEvent(new Event("enter-experience"));
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--color-bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* CSS 3D Loader Container */}
          <div className="loader-3d-container">
            <div className="loader-core"></div>
            <div className="loader-orbit loader-orbit-1"></div>
            <div className="loader-orbit loader-orbit-2"></div>
            <div className="loader-orbit loader-orbit-3"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(0.85rem, 3.5vw, 1.2rem)",
                color: "var(--color-text)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textAlign: "center",
                padding: "0 1rem",
              }}
            >
              Taking you to the Journey of Raul
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--color-accent)",
                opacity: ready ? 0 : 0.8,
                transition: "opacity 0.5s ease",
                height: "20px",
              }}
            >
              Loading Portfolio . . . 
            </p>

            <AnimatePresence>
              {ready && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="interactive btn btn-outline"
                  style={{ 
                    marginTop: "0.5rem", 
                    borderRadius: "99px", 
                    padding: "0.75rem 2.5rem",
                    border: "1px solid rgba(6, 182, 212, 0.4)",
                    color: "var(--color-secondary)",
                    background: "rgba(6, 182, 212, 0.05)",
                    cursor: "none"
                  }}
                >
                  Enter Experience
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
