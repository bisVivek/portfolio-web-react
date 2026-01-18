import { motion } from 'framer-motion'
import { letterStagger } from '../utils/animations'

// Staggered letter animation for cinematic text reveals
export default function AnimatedText({ text, className = '', delay = 0 }) {
  const letters = text.split('')

  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterStagger}
          style={{ display: 'inline-block' }}
          className="will-change-transform"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}

