"use client";

import { useRef, useCallback, ReactNode } from "react";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  id?: string;
  onClick?: () => void;
}

export default function MagneticCard({
  children,
  className = "",
  style = {},
  intensity = 15,
  id,
  onClick,
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rx = -dy * intensity;
        const ry = dx * intensity;

        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;

        // Shine position
        if (shineRef.current) {
          const mx = ((e.clientX - rect.left) / rect.width) * 100;
          const my = ((e.clientY - rect.top) / rect.height) * 100;
          shineRef.current.style.setProperty("--mx", `${mx}%`);
          shineRef.current.style.setProperty("--my", `${my}%`);
          shineRef.current.style.opacity = "1";
        }
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      id={id}
      className={`glass-card ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Shine layer */}
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 10,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}
