import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from 'three'

import { heroMouse } from './heroMouse'
export { heroMouse }

// ── Background clear color ────────────────────────────────────────────────────
function SceneSetup({ dark }) {
  const { gl } = useThree()
  useLayoutEffect(() => {
    gl.setClearColor(dark ? 0x030712 : 0xf8fafc, 1)
  }, [dark, gl])
  return null
}

// ── Main glass icosahedron ────────────────────────────────────────────────────
// Single hero object — glass transmission material, slow rotation, mouse parallax
function GlassObject({ dark }) {
  const mesh  = useRef()
  const group = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.07
      mesh.current.rotation.z = t * 0.05
      // Gentle vertical float
      mesh.current.position.y = Math.sin(t * 0.4) * 0.22
    }
    if (group.current) {
      // Smooth mouse parallax — very subtle
      group.current.rotation.x += (heroMouse.y * 0.12 - group.current.rotation.x) * 0.05
      group.current.rotation.y += (heroMouse.x * 0.18 - group.current.rotation.y) * 0.05
    }
  })

  return (
    <group ref={group} position={[2.2, 0, -0.5]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmission={dark ? 0.92 : 0.85}
          ior={1.5}
          chromaticAberration={0.04}
          color={dark ? '#818cf8' : '#6366f1'}
          distortionScale={0.1}
          temporalDistortion={0.08}
        />
      </mesh>
    </group>
  )
}

// ── Thin elegant accent ring around the object ────────────────────────────────
function AccentRing({ dark }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.003
  })
  return (
    <mesh ref={ref} position={[2.2, 0, -0.5]} rotation={[1.1, 0, 0]}>
      <torusGeometry args={[2.1, 0.012, 6, 120]} />
      <meshBasicMaterial
        color={dark ? '#6366f1' : '#818cf8'}
        transparent
        opacity={dark ? 0.35 : 0.22}
      />
    </mesh>
  )
}

// Second ring at a different angle for depth
function AccentRing2({ dark }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.rotation.y -= 0.002
  })
  return (
    <mesh ref={ref} position={[2.2, 0, -0.5]} rotation={[0.3, 0.5, 0]}>
      <torusGeometry args={[2.6, 0.008, 6, 120]} />
      <meshBasicMaterial
        color={dark ? '#06b6d4' : '#0891b2'}
        transparent
        opacity={dark ? 0.2 : 0.13}
      />
    </mesh>
  )
}

// ── Sparse depth particle field ───────────────────────────────────────────────
// 160 particles spread across a large volume — size + opacity vary by depth
function DepthParticles({ dark }) {
  const ref = useRef()

  // Build positions + sizes deterministically (seeded-ish with index)
  const { positions, sizes } = useMemo(() => {
    const COUNT = 160
    const pos  = new Float32Array(COUNT * 3)
    const sz   = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      // Spread wide and deep — avoid the very centre where text sits
      const angle  = (i / COUNT) * Math.PI * 2 * 7.4   // golden-ish spiral
      const radius = 3.5 + (i % 11) * 0.9
      const depth  = -2 + (i % 9) * 1.1

      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = -6 + (i % 13) * 1.0
      pos[i * 3 + 2] = depth

      // Closer particles (depth > 0) are bigger
      sz[i] = 0.012 + (depth + 2) / 30
    }
    return { positions: pos, sizes: sz }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    // Very slow drift — full rotation takes ~5 minutes
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.008
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={dark ? '#818cf8' : '#6366f1'}
        size={0.022}
        transparent
        opacity={dark ? 0.38 : 0.18}
        sizeAttenuation
      />
    </points>
  )
}

// ── Full scene ────────────────────────────────────────────────────────────────
function Scene({ dark, isMobile }) {
  return (
    <>
      <SceneSetup dark={dark} />

      {/* Lighting — intentional and minimal */}
      <ambientLight intensity={dark ? 0.25 : 0.7} />

      {/* Key light — soft blue-white from top-left */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={dark ? 0.9 : 0.5}
        color={dark ? '#c7d2fe' : '#e0e7ff'}
      />

      {/* Rim light — cyan from behind-right, gives glass depth */}
      <pointLight
        position={[6, -2, -4]}
        intensity={dark ? 4 : 1.2}
        color="#06b6d4"
        distance={18}
        decay={2}
      />

      {/* Fill light — soft violet from below */}
      <pointLight
        position={[-3, -4, 2]}
        intensity={dark ? 2.5 : 0.7}
        color="#8b5cf6"
        distance={14}
        decay={2}
      />

      {/* Environment for glass reflections */}
      <Environment preset="city" />

      {/* Scene objects */}
      <DepthParticles dark={dark} />
      <GlassObject dark={dark} />
      {!isMobile && <AccentRing  dark={dark} />}
      {!isMobile && <AccentRing2 dark={dark} />}

      {/* Bloom — dark desktop only, conservative settings */}
      {dark && !isMobile && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.9}
            height={256}
          />
        </EffectComposer>
      )}
    </>
  )
}

// ── Canvas wrapper ────────────────────────────────────────────────────────────
export default function HeroScene({ dark, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !isMobile,
        powerPreference: 'high-performance',
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: dark ? 0.9 : 1.1,
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <Scene dark={dark} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  )
}
