import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import FullScreenBackground from './FullScreenBackground'
import { slideInBottom } from '../utils/animations'
import { useMouse3D } from '../hooks/useMouse3D'

const projects = [
  {
    id: 1,
    name: 'Multivendor Delivery App',
    description: 'Developed a multi-vendor delivery app with vendor and product management, real-time data synchronization, Firebase authentication, and Play Store deployment.',
    tech: ['Dart', 'Flutter', 'Kotlin', 'Firebase', 'Android Studio'],
    image: '🚛',
    villainImage: '/images/villains/goblin.png',
    github: 'https://github.com',
    live: 'https://example.com',
    villain: 'Goblin',
    features: [
      'Vendor and product management',
      'Real-time data synchronization',
      'Firebase authentication',
      'Play Store deployment',
    ],
  },
  {
    id: 2,
    name: 'Jewellery Shop Management System',
    description: 'Backend system for managing inventory, sales, and customer data with RESTful APIs, optimized backend architecture, and system performance.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
    image: '💎',
    villainImage: '/images/villains/venom.png',
    github: 'https://github.com',
    live: 'https://example.com',
    villain: 'Venom',
    features: [
      'RESTful API development',
      'Backend architecture design',
      'System performance optimization',
      'Inventory and sales management',
    ],
  },
  {
    id: 3,
    name: 'Library Management System',
    description: 'Built a system for managing users, books, and transactions with an intuitive Java Swing interface and efficient database operations.',
    tech: ['Java', 'MySQL', 'Swing (Java GUI)'],
    image: '📚',
    villainImage: '/images/villains/doc-ock.png',
    github: 'https://github.com',
    live: 'https://example.com',
    villain: 'Doc Ock',
    features: [
      'User and book management',
      'Transaction handling',
      'Intuitive Java Swing GUI',
      'Efficient database operations',
    ],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/miles-gwen.png"
      overlay="blue"
      parallax={true}
    >
      <section
        id="projects"
        ref={ref}
        className="min-h-screen py-20 px-4 relative"
      >
        <div className="container mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-heading font-bold text-spidey-red mb-4 text-center drop-shadow-2xl"
          variants={slideInBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          VILLAIN DEFEATED
        </motion.h2>

        <motion.p
          className="text-xl text-gray-light text-center mb-16 max-w-2xl mx-auto drop-shadow-lg"
          variants={slideInBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          Projects that showcase my hero journey
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const cardRef = useRef(null)
            const { rotateX, rotateY } = useMouse3D(cardRef)
            
            return (
              <motion.div
                key={project.id}
                className="relative h-80 cursor-pointer"
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                onClick={() => setSelectedProject(project)}
              >
                <motion.div
                  ref={cardRef}
                  className="relative h-full bg-gray-dark/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg overflow-hidden group will-change-transform"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(220, 38, 38, 0.5)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                {/* Card Front */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-6xl">{project.image}</div>
                      {project.villainImage && (
                        <div className="w-16 h-16 rounded-full border-2 border-spidey-red overflow-hidden">
                          <img 
                            src={project.villainImage} 
                            alt={project.villain}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-spidey-red mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-black/50 border border-spidey-red rounded-full text-xs font-mono text-spidey-red"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Villain Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-spidey-red text-black font-bold text-xs rounded-full font-mono">
                  DEFEATED: {project.villain}
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-spidey-red/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.div>
            </motion.div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-gray-dark border-2 border-spidey-red rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-light hover:text-spidey-red transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-8xl">{selectedProject.image}</div>
                {selectedProject.villainImage && (
                  <div className="w-24 h-24 rounded-full border-4 border-spidey-red overflow-hidden">
                    <img 
                      src={selectedProject.villainImage} 
                      alt={selectedProject.villain}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
              <h3 className="text-4xl font-heading font-bold text-spidey-red mb-4">
                {selectedProject.name}
              </h3>
              <p className="text-gray-light mb-6">{selectedProject.description}</p>
              
              {selectedProject.features && (
                <div className="mb-6">
                  <h4 className="text-xl font-heading font-semibold text-spidey-red mb-3">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="font-mono text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-black/50 border border-spidey-red rounded-full text-sm font-mono text-spidey-red"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: selectedProject.tech.indexOf(tech) * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="web-button flex items-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="web-button bg-transparent border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black flex items-center gap-2"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </section>
    </FullScreenBackground>
  )
}
