import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars({ count = 5000 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#915eff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

function FloatingOrbs() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh1.current) {
      mesh1.current.position.y = Math.sin(t * 0.5) * 0.5
      mesh1.current.rotation.x = t * 0.3
      mesh1.current.rotation.z = t * 0.2
    }
    if (mesh2.current) {
      mesh2.current.position.y = Math.cos(t * 0.4) * 0.4
      mesh2.current.position.x = Math.sin(t * 0.3) * 0.3 + 3
      mesh2.current.rotation.y = t * 0.4
    }
    if (mesh3.current) {
      mesh3.current.position.y = Math.sin(t * 0.6 + 1) * 0.3
      mesh3.current.position.x = Math.cos(t * 0.2) * 0.3 - 3
      mesh3.current.rotation.x = t * 0.2
      mesh3.current.rotation.z = t * 0.3
    }
  })

  return (
    <>
      <mesh ref={mesh1} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#915eff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={mesh2} position={[3, 0, -1]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh ref={mesh3} position={[-3, 0, -1]}>
        <tetrahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#00ff9d"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      <Stars />
      <FloatingOrbs />
    </Canvas>
  )
}
