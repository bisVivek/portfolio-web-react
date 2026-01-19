import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, MeshDistortMaterial, Float, Text } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import FullScreenBackground from './FullScreenBackground'
import TypingText from './TypingText'
import SectionIntro from './SectionIntro'

const projectsData = [
  { name: 'Multivendor Delivery', emoji: '🚛', color: '#DC2626' },
  { name: 'Jewellery Shop', emoji: '💎', color: '#3B82F6' },
  { name: 'Library Management', emoji: '📚', color: '#DC2626' },
]

function ProjectDiamond({ project, index, total }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const angle = (index / total) * Math.PI * 2
      const radius = 3.5
      const time = state.clock.elapsedTime
      
      meshRef.current.position.x = Math.cos(angle + time * 0.3) * radius
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.8
      meshRef.current.position.z = Math.sin(angle + time * 0.3) * radius
      
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(time + index) * 0.3
    }
  })

  return (
    <group ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh castShadow>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={project.color}
            metalness={0.9}
            roughness={0.1}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
          />
        </mesh>
      </Float>
      
      {/* Project name as 3D text - using sprite instead if Text doesn't work */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {project.name}
      </Text>
    </group>
  )
}

function Scene3D({ mouse }) {
  const meshRef = useRef(null)
  const groupRef = useRef(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.5 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-mouse.y * 0.3 - groupRef.current.rotation.x) * 0.05
    }
    
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main big diamond in center */}
      <Float speed={1.75} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#DC2626"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Project diamonds orbiting around */}
      {projectsData.map((project, i) => (
        <ProjectDiamond key={i} project={project} index={i} total={projectsData.length} />
      ))}

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4.5}
      />
    </group>
  )
}

function Lighting() {
  return (
    <>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 2, -5]} intensity={0.3} color="#3B82F6" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#DC2626" />
      <ambientLight intensity={0.4} />
      <Environment preset="studio" />
    </>
  )
}

function Render3DCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      style={{ willChange: 'transform' }}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Scene3D mouse={mouse} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default function RealTimeRendering() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length)
    }, 4000) // Change project every 4 seconds

    return () => clearInterval(interval)
  }, [isInView])

  const useCases = [
    { title: 'Product Visualization', description: 'Showcase products in interactive 3D environments', icon: '🎯' },
    { title: 'Interactive Storytelling', description: 'Immerse users in narrative-driven experiences', icon: '📖' },
    { title: 'Immersive Brand Experiences', description: 'Create memorable brand interactions', icon: '✨' },
  ]

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/spiderman-city-swing.png"
      overlay="dark"
      parallax={true}
    >
      <section
        id="realtime-rendering"
        ref={ref}
        className="min-h-screen py-20 px-4 relative"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.p
              className="text-3xl md:text-5xl font-heading font-bold text-electric-blue mb-8 drop-shadow-2xl italic"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              "Code that breathes."
            </motion.p>
            <div className="mb-8">
              <SectionIntro
                eyebrow="S E C T I O N  0 5  •  A B O U T"
                title="ABOUT ME"
                subtitle={null}
                isInView={isInView}
              />
            </div>
            <motion.div
              className="max-w-4xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="mb-6">
                To secure a challenging position in a reputed organization where I can utilize my skills, learn new technologies, and contribute effectively to organizational growth. I aim to leverage my expertise in technology and my enthusiasm for learning to deliver innovative solutions and achieve professional excellence.
              </p>
              <div className="bg-gray-dark/30 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-6 md:p-8 mt-8 text-left">
                <h3 className="text-2xl font-heading font-bold text-spidey-red mb-4">Education</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="border-l-4 border-spidey-red pl-4">
                    <p className="font-semibold text-gray-light">Master of Computer Application</p>
                    <p className="text-sm text-gray-400">Uttaranchal University • 2022–2024 • CGPA: 8.0</p>
                  </div>
                  <div className="border-l-4 border-electric-blue pl-4">
                    <p className="font-semibold text-gray-light">10+2 (PCM)</p>
                    <p className="text-sm text-gray-400">Jawahar Navodaya Vidyalaya, Rudra Prayag • 2018–2019 • Percentage: 77%</p>
                  </div>
                  <div className="border-l-4 border-electric-blue pl-4">
                    <p className="font-semibold text-gray-light">High School</p>
                    <p className="text-sm text-gray-400">Jawahar Navodaya Vidyalaya, Rudra Prayag • 2016–2017 • CGPA: 8.8</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-mono mb-2">Extra-Curricular Achievement</p>
                <p className="text-spidey-red font-semibold">🏆 Secured second place in college Web Craft Event</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden border-2 border-gray-700 mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            whileHover={{ borderColor: '#DC2626' }}
          >
            <Render3DCanvas />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Typing animation overlay for projects */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-black/70 backdrop-blur-sm border-2 border-spidey-red rounded-lg p-4 max-w-2xl">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-spidey-red font-mono text-sm mb-2">Active Project:</p>
                  <div className="text-xl md:text-2xl font-heading font-bold text-gray-light min-h-[2rem]">
                    <TypingText 
                      key={currentProjectIndex}
                      text={projectsData[currentProjectIndex].name}
                      speed={80}
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{projectsData[currentProjectIndex].emoji}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className="bg-gray-dark/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-6 hover:border-spidey-red transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
                  scale: 1.02,
                }}
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-heading font-bold text-spidey-red mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-3xl font-heading font-bold text-gray-light mb-6">
              Tech Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Three.js', 'WebGL', 'React Three Fiber', 'GPU Acceleration'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-6 py-3 bg-black/50 border-2 border-spidey-red rounded-full text-gray-light font-mono text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: '#3B82F6',
                    color: '#3B82F6',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-12 text-center text-gray-400 text-sm font-mono max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p>
              Optimized with GPU acceleration, shadow mapping, and dynamic pixel ratio for smooth 60fps performance.
              Real-time lighting and reflections powered by WebGL.
            </p>
          </motion.div>
        </div>
      </section>
    </FullScreenBackground>
  )
}

