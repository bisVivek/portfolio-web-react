import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

// Jaquier.dev-inspired smooth scroll reveal animation
export default function ScrollReveal({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = 0.8,
  once = true,
  amount = 0.3
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })
  const reduceMotion = useReducedMotion()

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  }

  const directionValues = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: directionValues.y,
        x: directionValues.x,
        filter: reduceMotion ? 'none' : 'blur(10px)',
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: reduceMotion ? 0.01 : duration,
          delay: reduceMotion ? 0 : delay,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      } : {}}
    >
      {children}
    </motion.div>
  )
}

