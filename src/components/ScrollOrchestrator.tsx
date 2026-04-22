"use client";

/**
 * ScrollOrchestrator.tsx
 *
 * Mounts once in the root. Uses GSAP ScrollTrigger to:
 *  1. Update universeState.scrollProgress (0→1) as the page scrolls
 *  2. Update universeState.mouseX/Y from mouse events
 *  3. Trigger per-section GSAP entrance animations
 */

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { universeState } from "@/lib/universeState";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator() {
  useEffect(() => {
    /* ── 1. Mouse tracking ───────────────────────────────── */
    const handleMouse = (e: MouseEvent) => {
      universeState.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      universeState.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    /* ── 2. Scroll → camera orbit ────────────────────────── */
    const scrollProxy = { progress: 0 };
    const mainTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        universeState.scrollProgress = p;
        // Keys scatter during skills (≈35%) → portfolio (≈72%)
        if (p > 0.35 && p < 0.72) {
          universeState.keyScatter = Math.min(1, (p - 0.35) / 0.09);
        } else if (p >= 0.72) {
          universeState.keyScatter = Math.max(0, 1 - (p - 0.72) / 0.09);
        } else {
          universeState.keyScatter = 0;
        }
      },
    });

    /* ── 3. SECTION ENTRANCE ANIMATIONS ─────────────────── */

    // Helper: char-split a heading
    function splitChars(selector: string) {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return [];
      const text = el.innerText;
      el.innerHTML = "";
      return text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        el.appendChild(span);
        return span;
      });
    }

    const ctx = gsap.context(() => {

      /* ── HERO ────────────────────────────────────────────── */
      gsap.from("#hero-badge", {
        opacity: 0, y: 30, duration: 1.2, ease: "expo.out", delay: 0.2,
      });
      gsap.from("#hero-greeting", {
        opacity: 0, x: -40, duration: 1, ease: "expo.out", delay: 0.4,
      });
      gsap.from("#hero-name h1 span", {
        opacity: 0, y: 60, stagger: 0.06, duration: 1.1, ease: "expo.out", delay: 0.6,
      });
      gsap.from("#hero-subtitle", {
        opacity: 0, y: 30, duration: 1, ease: "expo.out", delay: 0.9,
      });
      gsap.from("#hero-bio", {
        opacity: 0, y: 20, duration: 0.9, ease: "expo.out", delay: 1.1,
      });
      gsap.from("#hero-ctas .btn", {
        opacity: 0, y: 30, scale: 0.85, stagger: 0.12, duration: 1, ease: "back.out(2)", delay: 1.3,
      });
      gsap.from(".hero-stat", {
        opacity: 0, y: 40, scale: 0.8, stagger: 0.1, duration: 1, ease: "back.out(2.5)", delay: 1.55,
      });

      /* ── ABOUT ───────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 75%",
        onEnter: () => {
          gsap.from("#about .section-label", { opacity: 0, x: -40, duration: 0.8, ease: "expo.out" });
          gsap.from("#about h2", { opacity: 0, y: 50, duration: 1, ease: "expo.out", delay: 0.1 });
          gsap.from("#about .about-bio p", { opacity: 0, y: 30, stagger: 0.15, duration: 0.9, ease: "expo.out", delay: 0.2 });
          gsap.from("#about .availability-tag", { opacity: 0, scale: 0, stagger: 0.05, duration: 0.6, ease: "back.out(3)", delay: 0.5 });
          gsap.from("#about .about-link", { opacity: 0, x: -20, stagger: 0.1, duration: 0.7, ease: "expo.out", delay: 0.7 });
          gsap.from(".about-card", {
            opacity: 0, rotateY: -25, rotateX: 10, scale: 0.85,
            stagger: 0.12, duration: 1, ease: "back.out(1.5)", delay: 0.2,
            transformPerspective: 1000,
          });
        },
        once: true,
      });

      /* ── SKILLS ──────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: "#skills",
        start: "top 70%",
        onEnter: () => {
          gsap.from("#skills .section-label", { opacity: 0, x: -40, duration: 0.8, ease: "expo.out" });
          gsap.from("#skills h2", { opacity: 0, y: 50, duration: 1, ease: "expo.out", delay: 0.1 });
          gsap.from("#skills-group-1", {
            opacity: 0, x: -80, rotateY: 20, duration: 1.1, ease: "expo.out", delay: 0.2, transformPerspective: 1200,
          });
          gsap.from("#skills-group-2", {
            opacity: 0, x: 80, rotateY: -20, duration: 1.1, ease: "expo.out", delay: 0.35, transformPerspective: 1200,
          });
          gsap.from("#skills-tools-row", {
            opacity: 0, y: 40, duration: 0.9, ease: "expo.out", delay: 0.65,
          });
        },
        once: true,
      });

      /* ── PORTFOLIO ───────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: "#portfolio",
        start: "top 70%",
        onEnter: () => {
          gsap.from("#portfolio .section-label", { opacity: 0, x: -40, duration: 0.8, ease: "expo.out" });
          gsap.from("#portfolio h2", { opacity: 0, y: 50, duration: 1, ease: "expo.out", delay: 0.1 });
          gsap.from(".filter-btn", { opacity: 0, y: 20, stagger: 0.08, duration: 0.7, ease: "back.out(2)", delay: 0.2 });
          gsap.from(".project-card-wrapper", {
            opacity: 0, y: 80, rotateX: 20, scale: 0.88,
            stagger: 0.12, duration: 1.1, ease: "expo.out", delay: 0.4,
            transformPerspective: 1200,
          });
        },
        once: true,
      });

      /* ── CERTIFICATIONS ──────────────────────────────────── */
      ScrollTrigger.create({
        trigger: "#certifications",
        start: "top 72%",
        onEnter: () => {
          gsap.from("#certifications .section-label", { opacity: 0, x: -40, duration: 0.8, ease: "expo.out" });
          gsap.from("#certifications h2", { opacity: 0, y: 50, duration: 1, ease: "expo.out", delay: 0.1 });
          gsap.from("#cert-cbap®", {
            opacity: 0, x: -100, rotateY: 30, duration: 1.2, ease: "expo.out", delay: 0.2, transformPerspective: 1200,
          });
          gsap.from("#cert-pmi-pba", {
            opacity: 0, x: 100, rotateY: -30, duration: 1.2, ease: "expo.out", delay: 0.35, transformPerspective: 1200,
          });
          gsap.from("#cert-babok-note", { opacity: 0, y: 30, duration: 0.9, ease: "expo.out", delay: 0.6 });
        },
        once: true,
      });

      /* ── CONTACT ─────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 72%",
        onEnter: () => {
          gsap.from("#contact .section-label", { opacity: 0, x: -40, duration: 0.8, ease: "expo.out" });
          gsap.from("#contact h2", { opacity: 0, y: 50, duration: 1, ease: "expo.out", delay: 0.1 });
          gsap.from(".contact-method-card", {
            opacity: 0, x: -60, stagger: 0.1, duration: 0.9, ease: "expo.out", delay: 0.2,
          });
          gsap.from("#contact-form-card", {
            opacity: 0, x: 80, rotateY: -15, duration: 1.2, ease: "expo.out", delay: 0.3, transformPerspective: 1200,
          });
        },
        once: true,
      });

      /* ── COUNTER ANIMATION on hero stats ─────────────────── */
      const counters = [
        { el: "#stat-val-0", to: 9,   suffix: "+" },
        { el: "#stat-val-1", to: 7,   suffix: "+" },
        { el: "#stat-val-2", to: 50,  suffix: "+" },
        { el: "#stat-val-3", to: 100, suffix: "%" },
      ];
      counters.forEach(({ el, to, suffix }, i) => {
        const target = document.querySelector<HTMLElement>(el);
        if (!target) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: to,
          duration: 2,
          delay: 1.6 + i * 0.12,
          ease: "power3.out",
          onUpdate: () => {
            target.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

    });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      mainTrigger.kill();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null; // pure side-effect component
}
