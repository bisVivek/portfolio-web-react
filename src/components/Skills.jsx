import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Database, Smartphone, Zap, Terminal, Github } from 'lucide-react'
import FullScreenBackground from './FullScreenBackground'
import { slideInBottom } from '../utils/animations'
import { useMouse3D } from '../hooks/useMouse3D'

const skills = [
  { name: 'Java', level: 90, icon: Code2, color: '#ED8B00' },
  { name: 'Spring Boot', level: 85, icon: Code2, color: '#6DB33F' },
  { name: 'Flutter', level: 88, icon: Smartphone, color: '#02569B' },
  { name: 'Dart', level: 90, icon: Terminal, color: '#0175C2' },
  { name: 'Firebase', level: 85, icon: Database, color: '#FFCA28' },
  { name: 'REST APIs', level: 88, icon: Zap, color: '#DC2626' },
  { name: 'MySQL', level: 85, icon: Database, color: '#4479A1' },
  { name: 'Git', level: 90, icon: Github, color: '#F05032' },
  { name: 'Android Studio', level: 87, icon: Smartphone, color: '#3DDC84' },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/silhouette-fire.png"
      overlay="red"
      parallax={true}
    >
      <section
        id="skills"
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
          POWER-UPS
        </motion.h2>

        <motion.p
          className="text-xl text-gray-light text-center mb-16 max-w-2xl mx-auto drop-shadow-lg"
          variants={slideInBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          Skills that power my web-slinging adventures
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            const cardRef = useRef(null)
            const { rotateX, rotateY } = useMouse3D(cardRef)
            
            return (
              <motion.div
                key={skill.name}
                ref={cardRef}
                className="relative bg-gray-dark/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-6 hover:border-spidey-red transition-all duration-300 group will-change-transform"
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 20px 40px rgba(220, 38, 38, 0.5)',
                  scale: 1.02,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="p-3 rounded-lg bg-black/50"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} color={skill.color} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-semibold text-gray-light">
                    {skill.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono text-gray-light">Level</span>
                    <motion.span
                      className="text-lg font-bold font-mono text-spidey-red"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  <div className="health-bar">
                    <motion.div
                      className="health-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: index * 0.1 + 0.2, duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <motion.p
                  className="mt-4 text-gray-400 text-sm font-mono"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  Mastery: {skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Advanced' : 'Proficient'}
                </motion.p>
              </motion.div>
            )
          })}
        </div>
      </div>
      </section>
    </FullScreenBackground>
  )
}
