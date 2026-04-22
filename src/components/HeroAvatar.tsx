/* eslint-disable */
"use client";
import { useRef, useMemo, useEffect, Suspense, useState } from "react";
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
 *   t=0.6–1.0 → Opacity fades to 0.
 *   t≥1.0   → canvas hidden.
 */

function AvatarScene() {
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

  // ── Store original transparency ──────────────────────────────────────────
  useEffect(() => {
    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m: any) => {
        if (m.userData.origTransparent === undefined) {
          m.userData.origTransparent = m.transparent;
          m.userData.origDepthWrite = m.depthWrite;
        }
      });
    });
  }, [scene]);

  // ── Idle animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!actions) return;
    const key = Object.keys(actions).find(k =>
      k.toLowerCase().includes("idle") || k.toLowerCase().includes("v4")
    ) ?? Object.keys(actions)[0];
    if (key && actions[key]) actions[key]!.setLoop(THREE.LoopRepeat, Infinity).reset().play();
  }, [actions]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (mixer) mixer.update(delta);

    // Read Head bone world position once, 0.5s after mount (animation settled)
    initTimer.current += delta;
    if (!initDone.current && initTimer.current > 0.5) {
      const headBone = groupRef.current.getObjectByName("Head");
      if (headBone) {
        const wp = new THREE.Vector3();
        headBone.getWorldPosition(wp);
        faceY.current  = wp.y + 0.12;  // slightly above Head bone = eye level
        startY.current = wp.y - 1.1;   // below head = full body start
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

    // Opacity
    const opacity = 1 - fadeP;
    const isFading = opacity < 1;
    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m: any) => {
        // Only force transparency if fading out. Otherwise, use the original setting.
        const targetTransparent = isFading ? true : m.userData.origTransparent;
        
        if (m.transparent !== targetTransparent) {
          m.transparent = targetTransparent;
          // Usually better to disable depthWrite during a full-object fade to avoid internal occlusion artifacts
          m.depthWrite = isFading ? false : m.userData.origDepthWrite;
          m.needsUpdate = true;
        }
        m.opacity = opacity;
      });
    });
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

  // Hide the canvas once the hero section is completely scrolled past
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      // Hide when bottom of hero is above viewport top
      setVisible(rect.bottom > 0);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      id="hero-avatar-overlay"
      style={{
        // FIXED so it doesn't scroll with the page
        position: "fixed",
        top: 0,
        right: 0,
        width: "55%",
        height: "100%",
        // Behind all text/UI
        zIndex: 0,
        pointerEvents: "none",
        display: visible ? "block" : "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]}  intensity={2.0} color="#e8f0ff" />
        <directionalLight position={[-3, 2, -4]} intensity={0.6} color="#a78bfa" />
        <pointLight       position={[0, 4, 5]}   intensity={1.5} color="#4f8ef7" distance={20} />
        <Suspense fallback={null}>
          <AvatarScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
