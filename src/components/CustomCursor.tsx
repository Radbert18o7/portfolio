"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; age: number; color: string };

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef<Point[]>([]);
  const isHovering = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Move DOM cursor head instantly for zero latency
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Track hover states for links/buttons
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, select, textarea")) {
        isHovering.current = true;
        cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1.15)`;
      } else {
        isHovering.current = false;
        cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
      }
    };
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    // Hide default cursor globally
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let animationFrameId: number;
    const MAX_AGE = 24;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine current color based on hover state (Cyan vs Emerald)
      const currentColor = isHovering.current ? "16, 185, 129" : "6, 182, 212";

      // Add current pos to trail
      trail.current.push({ x: pos.current.x, y: pos.current.y, age: 0, color: currentColor });

      // Age all points
      for (let i = 0; i < trail.current.length; i++) {
        trail.current[i].age += 1;
      }

      // Update and draw glowing trail
      if (trail.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        for (let i = 1; i < trail.current.length; i++) {
          const p1 = trail.current[i - 1];
          const p2 = trail.current[i];
          
          if (p1.age > MAX_AGE) continue;

          const life = 1 - p1.age / MAX_AGE; // 1 to 0
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          ctx.strokeStyle = `rgba(${p1.color}, ${life})`;
          ctx.lineWidth = life * 6; // Trail tapers off
          
          // Add glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${p1.color}, ${life})`;
          
          ctx.stroke();
        }
      }

      // Cleanup old points
      trail.current = trail.current.filter((p) => p.age <= MAX_AGE);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.head.removeChild(style);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998, // Below head, above UI
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999, // Absolute top
          marginLeft: "-3px",
          marginTop: "-3px",
          transition: "transform 0.05s linear", // Tiny smoothing for scale
          willChange: "transform",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Neon-Cyan arrowhead pointing exactly to 0,0 */}
          <path 
            d="M2.5 2.5L20 8.5L12 12L8.5 20L2.5 2.5Z" 
            fill="#06b6d4" 
            stroke="#e0f2fe" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
            style={{ filter: "drop-shadow(0px 0px 4px #06b6d4)" }}
          />
        </svg>
      </div>
    </>
  );
}
