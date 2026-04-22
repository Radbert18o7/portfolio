"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Use motion values for better performance than state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Create smooth springs for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device supports hover (ignore touch devices)
    if (window.matchMedia("(hover: none)").matches) {
      setHidden(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we're hovering a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isMounted || hidden) return null;

  return (
    <>
      {/* Central Dot - Cyan */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full mix-blend-screen pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer Trailing Ring - Emerald */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-emerald-400 rounded-full pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.0 : 1,
          backgroundColor: isHovering ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0)",
          borderColor: isHovering ? "rgba(6, 182, 212, 0.6)" : "rgba(16, 185, 129, 0.8)",
          borderWidth: isHovering ? "1px" : "1.5px",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Inner magnetic glow when hovering */}
        {isHovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            className="w-full h-full bg-cyan-400/20 rounded-full blur-[4px]"
          />
        )}
      </motion.div>
    </>
  );
}
