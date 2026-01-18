import { motion, useScroll, useTransform } from 'framer-motion'
import { Target, TrendingUp, Webhook } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HUD({ currentSection, scrollProgress, scrollToSection }) {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  
  // Animate navbar visibility based on scroll
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const navY = useTransform(scrollY, [0, 100], [-20, 0])

  useEffect(() => {
    const updateVisibility = () => {
      if (typeof window !== 'undefined') {
        setIsVisible(window.scrollY > 50)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateVisibility)
      updateVisibility() // Initial check
      return () => window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  const sections = ['Hero', 'Skills', 'Experience', 'Projects', 'Contact']
  const currentLevel = currentSection + 1

  const missions = [
    { name: 'Hero', completed: currentSection >= 0 },
    { name: 'Skills', completed: currentSection >= 1 },
    { name: 'Experience', completed: currentSection >= 2 },
    { name: 'Projects', completed: currentSection >= 3 },
    { name: 'Contact', completed: currentSection >= 4 },
  ]

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b-2 border-spidey-red/50"
      style={{
        backgroundColor: isVisible ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0)',
        opacity: navOpacity,
        y: navY,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* HP/Skills Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <TrendingUp className="w-5 h-5 text-spidey-red" />
              </motion.div>
              <span className="text-sm font-mono text-gray-light">HP:</span>
              <div className="health-bar w-32">
                <motion.div
                  className="health-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((currentSection + 1) / 5 * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <motion.span
                key={currentSection}
                className="text-xs font-mono text-gray-light"
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.round((currentSection + 1) / 5 * 100)}%
              </motion.span>
            </div>

            {/* Level Counter */}
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-electric-blue" />
              <span className="text-sm font-mono text-gray-light">Level:</span>
              <motion.span
                key={currentLevel}
                className="text-lg font-bold text-spidey-red font-mono"
                initial={{ scale: 1.5, color: '#3B82F6' }}
                animate={{ scale: 1, color: '#DC2626' }}
                transition={{ duration: 0.4 }}
              >
                {currentLevel}/5
              </motion.span>
            </div>
          </div>

          {/* Mission Progress */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-light hidden md:inline">
              Missions:
            </span>
            <div className="flex gap-1">
              {missions.map((mission, index) => (
                <motion.button
                  key={mission.name}
                  onClick={() => scrollToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    mission.completed
                      ? 'bg-spidey-red shadow-lg shadow-spidey-red/50'
                      : 'bg-gray-dark border border-gray-600'
                  }`}
                  whileHover={{ scale: 1.8, boxShadow: '0 0 15px rgba(220, 38, 38, 0.8)' }}
                  whileTap={{ scale: 1.2 }}
                  animate={{
                    scale: mission.completed && index === currentSection ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  title={mission.name}
                />
              ))}
            </div>
          </div>

          {/* Web Ammo / Scroll Indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Webhook className="w-5 h-5 text-electric-blue" />
            </motion.div>
            <span className="text-sm font-mono text-gray-light">Web Ammo:</span>
            <span className="text-lg font-bold text-spidey-red font-mono">∞</span>
            <div className="w-16 h-2 bg-gray-dark rounded-full overflow-hidden border border-gray-600">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue to-spidey-red"
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}