"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = async () => {
      setShowButton(true);
      if (isPlaying) return;

      try {
        if (audio.volume === 1) {
          audio.volume = 0;
        }
        
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
        
        if (audio.volume === 0) {
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 0.4) {
              vol += 0.05;
              audio.volume = Math.min(vol, 0.4);
            } else {
              clearInterval(fadeInterval);
            }
          }, 200);
        }
      } catch (err) {
        // Silently catch autoplay errors
      }
    };

    const handleFallbackInteraction = () => {
      if (!isPlaying && audio.paused && !hasInteracted) {
        startAudio();
      }
    };

    window.addEventListener("enter-experience", startAudio);
    
    // Fallback listeners just in case
    window.addEventListener("click", handleFallbackInteraction);
    window.addEventListener("scroll", handleFallbackInteraction);
    window.addEventListener("touchstart", handleFallbackInteraction);

    return () => {
      window.removeEventListener("enter-experience", startAudio);
      window.removeEventListener("click", handleFallbackInteraction);
      window.removeEventListener("scroll", handleFallbackInteraction);
      window.removeEventListener("touchstart", handleFallbackInteraction);
    };
  }, [isPlaying, hasInteracted]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click from bubbling to the window and instantly un-pausing it!
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.4;
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} autoPlay loop src="/portfolio/audio/light-awash.mp3" />
      
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onClick={toggleAudio}
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "2rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(2, 7, 20, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "rgba(255,255,255,0.8)",
              cursor: "none",
              outline: "none",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(79, 142, 247, 0.15)";
              e.currentTarget.style.borderColor = "rgba(79, 142, 247, 0.4)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(2, 7, 20, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
            }}
            aria-label="Toggle background music"
            className="interactive"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
                <path d="M5 3L19 12L5 21V3Z" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
