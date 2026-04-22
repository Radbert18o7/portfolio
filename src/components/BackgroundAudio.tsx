"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Wait for the loader to finish (2800ms) before showing the button
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showButton || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0; // Start at 0 for fade in

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // Smoothly fade in volume over 1.6 seconds to 40%
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 0.4) {
            vol += 0.05;
            audio.volume = Math.min(vol, 0.4);
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      } catch (err) {
        // Autoplay blocked by browser. Wait for user interaction.
        console.warn("Audio autoplay blocked. Waiting for user interaction.");
      }
    };

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (!isPlaying) {
          playAudio();
        }
      }
    };

    // Attempt to play immediately (sometimes allowed if user clicked during loader)
    playAudio();

    // Listeners for first interaction
    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [showButton, hasInteracted, isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.4; // Ensure volume is set when manually playing
      setIsPlaying(true);
    }
  };

  if (!showButton) return null;

  return (
    <>
      {/* Audio element points to the public folder. Make sure to download the mp3 here! */}
      <audio ref={audioRef} loop src="/portfolio/audio/light-awash.mp3" />
      
      {/* Elegant minimalist sound toggle button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          cursor: "none", /* matches the custom cursor */
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
          // Pause Icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // Play Icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
            <path d="M5 3L19 12L5 21V3Z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
