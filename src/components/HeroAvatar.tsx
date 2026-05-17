/* eslint-disable */
"use client";
import { useRef, useMemo, useEffect, Suspense, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroAvatar — fixed-position overlay that stays visible while the hero
 * section is in the viewport. The canvas is position:fixed on the RIGHT
 * half of the screen so it never scrolls away mid-animation.
 *
 * t = clamp(scrollY / heroHeight, 0, 1.2)
 *   t=0.00  → Full body, side-profile (~108°).
 *   t=0–0.6 → Camera zooms from z=7.5→1.8 and pans lookAt up to the face.
 *              Avatar rotates to face camera.
 *   t=0.6–1.0 → CSS opacity fades entire canvas to 0 (simultaneous for all meshes).
 *   t≥1.0   → canvas hidden.
 */

function AvatarScene({ onFade }: { onFade: (opacity: number) => void }) {
  const groupRef   = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const { scene, animations } = useGLTF("/portfolio/models/avatar.glb");
  const { actions, mixer }    = useAnimations(animations, groupRef);

  // ── Scale + centre (bounding box) ───────────────────────────────────────
  const { sf, centreY } = useMemo(() => {
    const box    = new THREE.Box3().setFromObject(scene);
    const height = box.max.y - box.min.y;
    const sf     = 3.0 / Math.max(height, 0.01);
    const centreY = -((box.min.y + box.max.y) / 2) * sf;
    return { sf, centreY };
  }, [scene]);

  // Refs for Head bone world position (set after idle settles)
  const faceY     = useRef(1.2);
  const startY    = useRef(-0.3);
  const initTimer = useRef(0);
  const initDone  = useRef(false);

  // ── Clone materials & Fix Avaturn Render Order ────────────────────────────
  // useGLTF caches the scene — on re-mount, materials may retain corrupted
  // state from the previous mount. Cloning ensures a clean slate every time.
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Clone materials so cached originals stay pristine across re-mounts
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m: any) => m.clone());
        } else {
          child.material = child.material.clone();
        }

        const name = child.name.toLowerCase();

        // Enforce strict renderOrder to prevent depth-sorting issues
        if (name.includes("hair")) {
          child.renderOrder = 2;
        } else if (name.includes("glass")) {
          child.renderOrder = 3;
        } else if (name.includes("body") || name.includes("look") || name.includes("shoes")) {
          child.renderOrder = 1;
        }

        child.frustumCulled = false;

        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m: any) => {
          // Disable alphaHash — causes black triangle stippling on skin
          m.alphaHash = false;

          // Fix transparency per mesh type
          if (name.includes("body") || name.includes("look") || name.includes("shoes")) {
            m.alphaTest = 0.5;
            m.transparent = false;
            m.depthWrite = true;
            m.side = THREE.FrontSide;
          } else if (name.includes("hair")) {
            m.alphaTest = 0.1;
            m.transparent = true;
            m.depthWrite = false;
            m.side = THREE.DoubleSide;
          } else {
            // glasses etc
            m.transparent = true;
            m.depthWrite = false;
          }

          m.needsUpdate = true;
        });

        // Lighten the skin tone — warm fair tint on body texture
        if (name.includes("body")) {
          mats.forEach((m: any) => {
            if (m.color) {
              m.color.setRGB(1.35, 1.22, 1.12);
              m.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [scene]);

  // ── Idle animation FROZEN at frame 0 — natural pose, no movement ─────────
  useEffect(() => {
    if (!actions) return;
    const key = Object.keys(actions).find(k =>
      k.toLowerCase().includes("idle") || k.toLowerCase().includes("v4")
    ) ?? Object.keys(actions)[0];
    if (key && actions[key]) {
      const action = actions[key]!;
      action.reset().play();
      action.paused = true;
      action.time = 0;
      if (mixer) mixer.update(0);
    }
  }, [actions, mixer]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Read Head bone world position once, 0.5s after mount
    initTimer.current += delta;
    if (!initDone.current && initTimer.current > 0.5) {
      const headBone = groupRef.current.getObjectByName("Head");
      if (headBone) {
        const wp = new THREE.Vector3();
        headBone.getWorldPosition(wp);
        faceY.current  = wp.y + 0.12;
        startY.current = wp.y - 1.1;
        initDone.current = true;
      }
    }

    // t: 0 at top of page → 1 when hero bottom exits viewport
    const heroEl = document.getElementById("hero");
    const heroH  = heroEl ? heroEl.offsetHeight : window.innerHeight;
    const t      = Math.min((window.scrollY ?? 0) / heroH, 1.2);

    const zoomP = Math.min(t / 0.60, 1);
    const fadeP = Math.max(0, Math.min((t - 0.60) / 0.40, 1));

    // Camera: body centre → face, z=7.5 → 1.8
    const lookY = startY.current + (faceY.current - startY.current) * zoomP;
    const camZ  = 7.5 - zoomP * 5.7;
    camera.position.set(0, lookY, camZ);
    camera.lookAt(0, lookY, 0);

    // Rotation: side-profile (108°) → facing camera (0°)
    const ease = zoomP < 0.5 ? 2 * zoomP * zoomP : -1 + (4 - 2 * zoomP) * zoomP;
    groupRef.current.rotation.y = (1 - ease) * (Math.PI * 0.6);

    // Fade — delegate to CSS opacity on the container (simultaneous for ALL meshes)
    onFade(1 - fadeP);
  });

  return (
    <group ref={groupRef} position={[0, centreY, 0]} scale={sf}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/portfolio/models/avatar.glb");

export default function HeroAvatar() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide the canvas once the hero section is completely scrolled past
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom > 0);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // CSS opacity callback — applied to the container div so ALL avatar
  // features (body, hair, glasses, etc.) fade simultaneously as one unit
  const handleFade = useCallback((opacity: number) => {
    if (containerRef.current) {
      containerRef.current.style.opacity = String(opacity);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-avatar-overlay"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "55%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: visible ? "block" : "none",
        // GPU-accelerated opacity transition
        willChange: "opacity",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", logarithmicDepthBuffer: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]}  intensity={2.0} color="#e8f0ff" />
        <directionalLight position={[-3, 2, -4]} intensity={0.6} color="#a78bfa" />
        <pointLight       position={[0, 4, 5]}   intensity={1.5} color="#4f8ef7" distance={20} />
        <Suspense fallback={null}>
          <AvatarScene onFade={handleFade} />
        </Suspense>
      </Canvas>
    </div>
  );
}
