import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

// Jaquier.dev-inspired double text effect (like "View more" links)
export default function DoubleText({ 
  text, 
  className = '',
  delay = 0,
  href,
  onClick,
  type,
  disabled,
  as: Component = href ? 'a' : 'button',
  ...props
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative inline-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            duration: reduceMotion ? 0.01 : 0.6,
          },
        },
      }}
    >
      <Component
        href={href}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`relative z-10 ${className}`}
        {...props}
      >
        <motion.span
          className="block"
          whileHover={!reduceMotion ? {
            y: -2,
            transition: { duration: 0.2 }
          } : undefined}
        >
          {text}
        </motion.span>
        {/* Duplicate text behind for depth effect */}
        <motion.span
          className="absolute inset-0 block opacity-30 blur-[1px]"
          aria-hidden="true"
          initial={{ y: 2, opacity: 0.2 }}
          whileHover={!reduceMotion ? {
            y: 4,
            opacity: 0.4,
            transition: { duration: 0.2 }
          } : undefined}
        >
          {text}
        </motion.span>
      </Component>
    </motion.div>
  )
}

