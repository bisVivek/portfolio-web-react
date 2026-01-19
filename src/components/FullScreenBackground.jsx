import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FullScreenBackground({ 
  imageSrc, 
  overlay = 'dark', 
  parallax = true,
  children 
}) {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Enhanced parallax with smooth vertical movement
  const y = parallax && !reduceMotion ? useTransform(scrollYProgress, [0, 1], [0, -200]) : 0
  const scale = parallax && !reduceMotion ? useTransform(scrollYProgress, [0, 1], [1, 1.08]) : 1
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 0.7])

  const overlayStyles = {
    dark: 'bg-gradient-to-b from-black/70 via-black/60 to-black/80',
    red: 'bg-gradient-to-b from-black/80 via-spidey-red/40 to-black/80',
    blue: 'bg-gradient-to-b from-black/80 via-electric-blue/30 to-black/80',
    minimal: 'bg-black/50',
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Full Screen Background Image with Enhanced Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <motion.img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover will-change-transform"
          style={{ opacity }}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.03, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className={`absolute inset-0 ${overlayStyles[overlay] || overlayStyles.dark}`} />
        
        {/* Animated gradient overlay for premium look */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-spidey-red/10"
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }
          }
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
