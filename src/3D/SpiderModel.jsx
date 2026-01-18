import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Simple Spider-Man placeholder model component
// For production, replace this with an actual GLB model from Sketchfab
function SpidermanSwing() {
  const meshRef = useRef(null)
  const webRef = useRef(null)
  const webGeometryRef = useRef(new THREE.BufferGeometry())

  useFrame((state) => {
    if (meshRef.current && webRef.current) {
      // Swing animation
      const time = state.clock.getElapsedTime()
      const x = Math.sin(time * 0.5) * 2
      const y = Math.abs(Math.sin(time * 0.5)) * 0.5 + 1
      
      meshRef.current.position.x = x
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2
      meshRef.current.position.y = y

      // Web line - update geometry
      const points = [
        new THREE.Vector3(x, y + 0.5, 0),
        new THREE.Vector3(3, 5, 0),
      ]
      webGeometryRef.current.setFromPoints(points)
    }
  })

  return (
    <group>
      {/* Web Line */}
      <line ref={webRef} geometry={webGeometryRef.current}>
        <lineBasicMaterial color="#DC2626" linewidth={2} />
      </line>

      {/* Spider-Man Silhouette (Simple Box for now - replace with GLB model) */}
      <mesh ref={meshRef} position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial
          color="#DC2626"
          emissive="#DC2626"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#DC2626"
          emissive="#DC2626"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 1.65, 0.26]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 1.65, 0.26]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

// Fallback component when GLB is loading
function SpiderPlaceholder() {
  return <SpidermanSwing />
}

// Load GLB Model (commented out - uncomment when you have a model)
// function SpiderManModel({ url }) {
//   const { scene } = useGLTF(url)
//   const meshRef = useRef(null)
//   const webRef = useRef(null)

//   useFrame((state) => {
//     if (meshRef.current) {
//       const time = state.clock.getElapsedTime()
//       meshRef.current.position.x = Math.sin(time * 0.5) * 2
//       meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2
//       meshRef.current.position.y = Math.abs(Math.sin(time * 0.5)) * 0.5 + 1
//     }
//   })

//   return (
//     <group>
//       <primitive object={scene} ref={meshRef} scale={0.5} />
//     </group>
//   )
// }

export default function SpiderModel() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#DC2626" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
        
        <Suspense fallback={null}>
          <SpiderPlaceholder />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

// Preload GLB model (uncomment when you have a model URL)
// useGLTF.preload('/models/spiderman.glb')
