import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

// Jaquier.dev-inspired letter-spaced text with hover animations
export default function LetterSpacedText({ 
  text, 
  className = '', 
  spacing = '0.35em',
  delay = 0,
  onHover = false 
}) {
  const reduceMotion = useReducedMotion()
  const letters = text.split('')

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.02,
            delayChildren: delay,
          },
        },
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 20,
              filter: 'blur(4px)',
            },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: reduceMotion ? 0.01 : 0.4,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            },
          }}
          style={{ 
            display: 'inline-block',
            letterSpacing: spacing,
          }}
          className="will-change-transform"
          whileHover={onHover && !reduceMotion ? {
            y: -4,
            scale: 1.1,
            transition: { duration: 0.2 }
          } : undefined}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

