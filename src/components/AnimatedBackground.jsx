import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedBackground() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.2])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Spider-Man City Swing - Main Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1, opacity }}
      >
        <motion.img
          src="/images/backgrounds/spiderman-city-swing.png"
          alt="Spider-Man City"
          className="w-full h-full object-cover opacity-40 mix-blend-soft-light animated-bg-image"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Miles & Gwen Floating */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-96 opacity-25 hidden md:block"
        style={{ y: y2 }}
        animate={{
          y: [0, -40, 0],
          rotate: [0, 8, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="/images/backgrounds/miles-gwen.png"
          alt="Miles & Gwen"
          className="w-full h-full object-contain filter drop-shadow-2xl animated-bg-image"
          animate={{
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Silhouette with Fire - Left Side */}
      <motion.div
        className="absolute bottom-20 left-10 w-52 h-72 opacity-30 hidden lg:block"
        style={{ y: y3 }}
        animate={{
          x: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="/images/backgrounds/silhouette-fire.png"
          alt="Fire Silhouette"
          className="w-full h-full object-contain animated-bg-image"
          animate={{
            filter: [
              'brightness(1) drop-shadow(0 0 15px rgba(220, 38, 38, 0.6))',
              'brightness(1.6) drop-shadow(0 0 35px rgba(220, 38, 38, 1))',
              'brightness(1) drop-shadow(0 0 15px rgba(220, 38, 38, 0.6))',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Baseball Bat Character - Floating Element */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-36 h-48 opacity-20 hidden md:block"
        style={{ y: y2 }}
        animate={{
          rotate: [0, 12, -12, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src="/images/backgrounds/baseball-character.png"
          alt="Character"
          className="w-full h-full object-contain animated-bg-image"
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Glitch Overlay Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.05, 0],
          clipPath: [
            'inset(0 0 0 0)',
            'inset(20% 10% 20% 10%)',
            'inset(0 0 0 0)',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-spidey-red/20 via-transparent to-electric-blue/20" />
      </motion.div>

      {/* Animated Web Lines Overlay */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `linear-gradient(${i * 30}deg, transparent 0%, rgba(220, 38, 38, 0.1) 50%, transparent 100%)`,
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
