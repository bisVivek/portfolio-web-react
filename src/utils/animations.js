// Cinematic Animation Variants for Spider-Man Portfolio
// Optimized for 60fps performance

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99], // Custom easing for cinematic feel
    },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const letterStagger = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const slideInBottom = {
  hidden: { 
    opacity: 0, 
    y: 100,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const buttonHover = {
  scale: 1.05,
  boxShadow: '0 10px 40px rgba(220, 38, 38, 0.6)',
  filter: 'brightness(1.2)',
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
}

export const cardHover3D = {
  rotateY: 5,
  rotateX: -5,
  scale: 1.02,
  transition: {
    duration: 0.4,
    ease: 'easeOut',
  },
}

// Check for reduced motion preference
export const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Respect reduced motion in animations
export const getTransition = (defaultTransition) => {
  if (prefersReducedMotion) {
    return { duration: 0.01 }
  }
  return defaultTransition
}

// Jaquier.dev-inspired animations
export const letterSpacedReveal = {
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
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const smoothReveal = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const staggerLetters = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
}