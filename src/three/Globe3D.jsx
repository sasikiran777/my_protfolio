import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

function AnimatedSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
  })

  return (
    <Sphere ref={meshRef} args={[1.6, 64, 64]}>
      <MeshDistortMaterial
        color="#915eff"
        attach="material"
        distort={0.45}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </Sphere>
  )
}

function RingMesh({ rotation, color }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.3
  })
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[2.4, 0.015, 16, 120]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#915eff" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#00ff9d" />
      <AnimatedSphere />
      <RingMesh rotation={[Math.PI / 2, 0, 0]} color="#00d4ff" />
      <RingMesh rotation={[Math.PI / 4, Math.PI / 4, 0]} color="#915eff" />
      <RingMesh rotation={[-Math.PI / 4, Math.PI / 3, 0]} color="#00ff9d" />
    </Canvas>
  )
}
