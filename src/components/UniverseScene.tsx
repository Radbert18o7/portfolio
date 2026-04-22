/* eslint-disable */
"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { universeState } from "@/lib/universeState";

/* ── Star field ─────────────────────────────────────── */
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useState(() => {
    const p = new Float32Array(7000 * 3);
    for (let i = 0; i < 7000; i++) {
      const r = Math.random() * 45 + 10;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i*3]   = r*Math.sin(ph)*Math.cos(th);
      p[i*3+1] = r*Math.sin(ph)*Math.sin(th);
      p[i*3+2] = r*Math.cos(ph);
    }
    return p;
  });
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d*0.01; ref.current.rotation.x += d*0.003; } });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#4f8ef7" size={0.03} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

/* ── Galaxy spiral arms ─────────────────────────────── */
function GalaxyArms() {
  const ref = useRef<THREE.Points>(null!);
  const [[positions, colors]] = useState(() => {
    const n = 3000, pos = new Float32Array(n*3), col = new Float32Array(n*3);
    const ca = new THREE.Color("#4f8ef7"), cb = new THREE.Color("#a78bfa");
    for (let i = 0; i < n; i++) {
      const arm = i % 3, t = Math.random();
      const angle = (arm/3)*Math.PI*2 + t*0.9 + (Math.random()-0.5)*0.6;
      const r = t*8 + 0.5;
      pos[i*3]   = Math.cos(angle)*r + (Math.random()-0.5)*0.5;
      pos[i*3+1] = (Math.random()-0.5)*0.4;
      pos[i*3+2] = Math.sin(angle)*r + (Math.random()-0.5)*0.5;
      const c = ca.clone().lerp(cb, t);
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    return [pos, col];
  });
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d*0.05; });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent vertexColors size={0.045} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  );
}

/* ── Animated Sine Wave Ring (replaces torus) ────────
   A looping curve whose points animate like a sine wave
   opacity = 0.75 as requested
── */
function SineWaveRing({ radius, color, tilt, speed, freq }: {
  radius: number; color: string; tilt: number; speed: number; freq: number;
}) {
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const N = 256;
  const pos = useMemo(() => new Float32Array((N+1)*3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    for (let i = 0; i <= N; i++) {
      const a = (i/N)*Math.PI*2;
      const wave = Math.sin(a*freq + t)*0.35;
      pos[i*3]   = Math.cos(a)*(radius + wave);
      pos[i*3+1] = Math.sin(a*freq*0.5 + t)*0.28;
      pos[i*3+2] = Math.sin(a)*(radius + wave);
    }
    if (geoRef.current && geoRef.current.attributes.position) geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[tilt,0,0]}>
      {/* @ts-ignore */}
      <line>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.75} />
      </line>
    </group>
  );
}

/* ── Animated Bar Chart Ring ─────────────────────────
   Bars arranged in a circle, heights pulse like live data
── */
function BarChartRing({ radius, color, tilt, speed }: {
  radius: number; color: string; tilt: number; speed: number;
}) {
  const BAR = 36;
  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    refs.current.forEach((bar, i) => {
      if (!bar) return;
      const h = (Math.sin(t + i*0.38)*0.45 + 0.6)*1.4;
      bar.scale.y = h;
      bar.position.y = h*0.5;
    });
  });

  return (
    <group rotation={[tilt,0,0]}>
      {Array.from({length: BAR}).map((_, i) => {
        const a = (i/BAR)*Math.PI*2;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) refs.current[i] = el; }}
            position={[Math.cos(a)*radius, 0, Math.sin(a)*radius]}
          >
            <boxGeometry args={[0.07, 1, 0.07]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.75}
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── EKG / Heartbeat Wave ────────────────────────────
   Horizontal line that sweeps around origin like an EKG
── */
function EKGWave({ color, radius, tilt }: { color: string; radius: number; tilt: number }) {
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const N = 300;
  const pos = useMemo(() => new Float32Array((N+1)*3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.7;
    for (let i = 0; i <= N; i++) {
      const a = (i/N)*Math.PI*2;
      // EKG spike pattern: sharp peaks with flat sections
      const x = (a*6 + t) % (Math.PI*2);
      const ekg = x < 0.3 ? x*3
        : x < 0.6 ? (0.6-x)*3
        : x < 0.9 ? (x-0.6)*(-2)
        : x < 1.5 ? Math.sin((x-0.9)*Math.PI/0.6)*1.5
        : 0;
      pos[i*3]   = Math.cos(a)*radius;
      pos[i*3+1] = ekg*0.5;
      pos[i*3+2] = Math.sin(a)*radius;
    }
    if (geoRef.current && geoRef.current.attributes.position) geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[tilt,0,0]}>
      {/* @ts-ignore */}
      <line>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.75} linewidth={2} />
      </line>
    </group>
  );
}

/* ── Graph Scatter Plot Ring ─────────────────────────
   Dots in a ring that bounce like a scatter plot
── */
function ScatterPlotRing({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  const DOTS = 48;
  const refs = useRef<THREE.Mesh[]>([]);
  const [seeds] = useState(() => Array.from({length: DOTS}, () => Math.random()*Math.PI*2));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((dot, i) => {
      if (!dot) return;
      const bounce = Math.sin(t*1.2 + seeds[i])*0.5 + 0.2;
      dot.position.y = bounce;
      const s = 0.6 + Math.sin(t + seeds[i])*0.3;
      dot.scale.setScalar(s);
    });
  });

  return (
    <group rotation={[tilt,0,0]}>
      {Array.from({length: DOTS}).map((_, i) => {
        const a = (i/DOTS)*Math.PI*2;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) refs.current[i] = el; }}
            position={[Math.cos(a)*radius, 0, Math.sin(a)*radius]}
          >
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.75} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── LAPTOP ──────────────────────────────────────────
   Lid opens/closes based on scrollProgress
   Keys fly off and show skill words when keyScatter > 0
── */

const SKILL_WORDS = [
  "BSA","AGILE","SCRUM","JIRA","SQL","EXCEL","CONFLUENCE","MIRO",
  "VISIO","KANBAN","ROADMAP","STAKEHOLDER","ISO","UAT","SDLC",
  "SaaS","FINTECH","CBAP","PMI","BABOK","RISK","BUDGET","UML",
  "BRD","FSD","SPRINT","BACKLOG","CRM","KPI","API",
];

// Build keyboard positions — 5 rows of 13 keys (realistic laptop layout)
const COLS = 13;
const ROWS = 5;
const SPACING_X = 0.21;
const SPACING_Z = 0.21;
const START_X = -((COLS-1)*SPACING_X)/2;
const START_Z = -0.55;

const KEYBOARD_POSITIONS: [number,number,number][] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    KEYBOARD_POSITIONS.push([START_X + c*SPACING_X, 0.065, START_Z + r*SPACING_Z]);
  }
}

// Pre-generate scatter positions (fixed so they don't re-randomize)
const SCATTER_POSITIONS: [number,number,number][] = KEYBOARD_POSITIONS.map((_, i) => {
  const seed = i * 2.618;
  const rad = 4 + (i % 7) * 1.0;
  const a = (i / KEYBOARD_POSITIONS.length) * Math.PI * 2 + seed;
  const y = Math.sin(seed) * 4;
  return [Math.cos(a)*rad, y, Math.sin(a)*rad];
});

function LaptopKeys() {
  const groupRef = useRef<THREE.Group>(null!);
  const keyRefs = useRef<THREE.Mesh[]>([]);
  const htmlRefs = useRef<HTMLDivElement[]>([]);

  useFrame(() => {
    const scatter = universeState.keyScatter;
    keyRefs.current.forEach((key, i) => {
      if (!key) return;
      const kp = KEYBOARD_POSITIONS[i];
      const sp = SCATTER_POSITIONS[i];
      key.position.x += (kp[0] + (sp[0]-kp[0])*scatter - key.position.x) * 0.08;
      key.position.y += (kp[1] + (sp[1]-kp[1])*scatter - key.position.y) * 0.08;
      key.position.z += (kp[2] + (sp[2]-kp[2])*scatter - key.position.z) * 0.08;
      if (scatter > 0.1) {
        key.rotation.x += 0.012 * scatter;
        key.rotation.y += 0.008 * scatter;
      } else {
        key.rotation.x *= 0.85;
        key.rotation.y *= 0.85;
      }
      // Show/hide HTML div based on scatter
      if (htmlRefs.current[i]) {
        htmlRefs.current[i].style.opacity = scatter > 0.05 ? String(Math.min(1, scatter * 2)) : "0";
      }
    });
  });

  return (
    <group ref={groupRef}>
      {KEYBOARD_POSITIONS.map((kp, i) => {
        const word = i < SKILL_WORDS.length ? SKILL_WORDS[i] : null;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) keyRefs.current[i] = el; }}
            position={kp}
          >
            <boxGeometry args={[0.18, 0.02, 0.18]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e293b"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.4}
            />
            {/* Skill word — visible only when flying */}
            {word && (
              <Html
                transform
                position={[0, 0.035, 0]}
                rotation={[-Math.PI/2, 0, 0]}
                style={{ pointerEvents: "none" }}
              >
                <div
                  ref={(el) => { if (el) htmlRefs.current[i] = el; }}
                  style={{
                    color: "#06b6d4",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    textShadow: "0 0 8px rgba(6,182,212,0.8)",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    opacity: 0,
                    transition: "opacity 0.2s ease"
                  }}
                >
                  {word}
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

function Laptop() {
  const lidGroupRef = useRef<THREE.Group>(null!);
  const scatterRef = useRef(0);

  useFrame(() => {
    const progress = universeState.scrollProgress;
    // Lid animation: open from the start, close at 0.82→0.95
    let targetLid: number;
    if (progress < 0.82) targetLid = -Math.PI * 0.42;                      // open ~75°
    else if (progress < 0.95) targetLid = -Math.PI*0.42 + ((progress-0.82)/0.13)*Math.PI*1.3; // closing
    else targetLid = Math.PI * 0.88;                                       // closed

    if (lidGroupRef.current) {
      lidGroupRef.current.rotation.x += (targetLid - lidGroupRef.current.rotation.x) * 0.06;
    }

    // Key scatter: max during skills/portfolio (scroll ~0.35–0.72)
    const p = progress;
    const targetScatter =
      p > 0.35 && p < 0.72
        ? Math.min(1, (p - 0.35) / 0.09)
        : p >= 0.72
          ? Math.max(0, 1 - (p - 0.72) / 0.09)
          : 0;
    scatterRef.current += (targetScatter - scatterRef.current) * 0.06;
    universeState.keyScatter = scatterRef.current;
  });

  return (
    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0}>
      <group position={[0, -0.4, 0]} rotation={[0.15, 0.3, 0]}>
        <pointLight position={[0, 2, -0.5]} intensity={3} color="#e0f2fe" distance={5} />
        
        {/* BASE — keyboard deck */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.1, 2.1]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Base bottom chamfer */}
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[3.1, 0.02, 2.0]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Keyboard inset recess */}
        <mesh position={[0, 0.05, -0.15]}>
          <boxGeometry args={[2.9, 0.01, 1.15]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.8} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.055, 0.65]}>
          <boxGeometry args={[1.0, 0.005, 0.6]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* LID HINGE GROUP — pivot at back top edge */}
        <group ref={lidGroupRef} position={[0, 0.05, -1.05]}>
          {/* Lid shell */}
          <mesh position={[0, -1.0, -0.04]}>
            <boxGeometry args={[3.2, 2.0, 0.08]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Screen bezel */}
          <mesh position={[0, -1.0, 0.025]}>
            <boxGeometry args={[2.95, 1.78, 0.01]} />
            <meshStandardMaterial color="#060d1c" />
          </mesh>
          {/* Screen glow — the "display" */}
          <mesh position={[0, -1.0, 0.046]}>
            <planeGeometry args={[2.7, 1.6]} />
            <meshStandardMaterial
              color="#081628"
              emissive="#4f8ef7"
              emissiveIntensity={0.45}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Screen content — graph lines on the screen */}
          <mesh position={[0, -1.0, 0.047]}>
            <planeGeometry args={[2.5, 1.4]} />
            <meshStandardMaterial
              color="#0a1e3a"
              emissive="#38bdf8"
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
          {/* Apple-style logo on back of lid */}
          <mesh position={[0, -1.0, -0.055]}>
            <circleGeometry args={[0.22, 32]} />
            <meshStandardMaterial
              color="#4f8ef7"
              emissive="#4f8ef7"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>

        {/* KEYBOARD KEYS — live scatter driven by universeState.keyScatter */}
        <LaptopKeys />
      </group>
    </Float>
  );
}

/* ── Live scatter-aware keys wrapper ─────────────────
   This reads universeState.keyScatter and passes it
── */
function LiveKeys() {
  const scatter = useRef(0);
  // We use a dummy group to drive re-render via useFrame
  useFrame(() => {
    scatter.current = universeState.keyScatter;
  });
  return null; // keys are handled inside Laptop
}

/* ── Floating asteroids ─────────────────────────────── */
function FloatingAsteroids() {
  const items = [
    {pos:[6,2,-2] as [number,number,number], color:"#38bdf8", s:0.3, sp:0.6},
    {pos:[-7,-1,3] as [number,number,number], color:"#a78bfa", s:0.35, sp:-0.4},
    {pos:[2,4,4] as [number,number,number], color:"#4f8ef7", s:0.22, sp:0.8},
    {pos:[-4,3,-5] as [number,number,number], color:"#f472b6", s:0.28, sp:-0.5},
    {pos:[8,-2,1] as [number,number,number], color:"#34d399", s:0.2, sp:0.7},
  ];
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((_, d) => {
    items.forEach((o, i) => {
      if (refs.current[i]) {
        refs.current[i].rotation.x += d*o.sp;
        refs.current[i].rotation.y += d*o.sp*0.7;
      }
    });
  });
  return (
    <>
      {items.map((o, i) => (
        <Float key={i} speed={1+i*0.3} floatIntensity={1} rotationIntensity={0.3}>
          <mesh ref={(el)=>{ if(el) refs.current[i]=el; }} position={o.pos} scale={o.s}>
            <icosahedronGeometry args={[1,1]} />
            <meshStandardMaterial color={o.color} wireframe transparent opacity={0.5} emissive={o.color} emissiveIntensity={0.25} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ── Shooting stars ─────────────────────────────────── */
function ShootingStar({ delay=0 }: { delay?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [start] = useState(()=>new THREE.Vector3((Math.random()-0.5)*30,(Math.random()-0.5)*12,(Math.random()-0.5)*20));
  const [dir] = useState(()=>new THREE.Vector3(-3-Math.random()*4,-1-Math.random()*2,-2-Math.random()*3));
  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime+delay)%5)/5;
    ref.current.position.set(start.x+dir.x*t, start.y+dir.y*t, start.z+dir.z*t);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = t<0.1?t*8:t>0.8?(1-t)*5:0.9;
  });
  return (
    <mesh ref={ref} position={start}>
      <capsuleGeometry args={[0.012,0.6,4,8]} />
      <meshBasicMaterial color="#a0c4ff" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

/* ── Camera orbit ───────────────────────────────────── */
function CameraOrbit() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0,2,11));
  useFrame((_, delta) => {
    const t = universeState.scrollProgress;
    const angle = t * Math.PI * 1.67;
    const R = 11;
    const tx = Math.sin(angle)*R + universeState.mouseX*1.5;
    const ty = Math.sin(t*Math.PI*1.5)*3 + 1.5 - universeState.mouseY*1.2;
    const tz = Math.cos(angle)*R;
    target.current.set(tx,ty,tz);
    camera.position.lerp(target.current, delta*1.4);
    camera.lookAt(0,0,0);
  });
  return null;
}

/* ── Lights ─────────────────────────────────────────── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0,0,0]} color="#4a7aff" intensity={4} distance={20} />
      <pointLight position={[8,4,-4]} color="#a78bfa" intensity={2.5} distance={18} />
      <pointLight position={[-6,-3,6]} color="#38bdf8" intensity={2} distance={16} />
      <pointLight position={[0,8,0]} color="#ffffff" intensity={1.2} distance={18} />
    </>
  );
}


/* ── MAIN EXPORT ─────────────────────────────────────── */
export default function UniverseScene() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} aria-hidden="true">
      <Canvas
        camera={{ position:[0,2,11], fov:60, near:0.1, far:200 }}
        gl={{ antialias:true, alpha:true, powerPreference:"high-performance" }}
        dpr={[1,2]}
        style={{ width:"100%", height:"100%" }}
      >
        <Lights />
        <StarField />
        <GalaxyArms />

        {/* Data visualization waves — replaces planetary rings */}
        <SineWaveRing  radius={3.5} color="#4f8ef7" tilt={0}           speed={0.7} freq={5} />
        <SineWaveRing  radius={5.5} color="#a78bfa" tilt={1.1}         speed={0.5} freq={7} />
        <BarChartRing  radius={4.5} color="#38bdf8" tilt={0.35}        speed={0.8} />
        <EKGWave       radius={6.5} color="#34d399" tilt={0.55}         />
        <ScatterPlotRing radius={7.8} color="#f472b6" tilt={0.9}       />
        <SineWaveRing  radius={2.5} color="#fbbf24" tilt={Math.PI/2.2} speed={1.1} freq={4} />

        {/* Laptop replaces the galactic core planet */}
        <Laptop />



        <FloatingAsteroids />
        {[0,1.5,3,4.5].map((d) => <ShootingStar key={d} delay={d} />)}
        <CameraOrbit />
      </Canvas>
    </div>
  );
}
