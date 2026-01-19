import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import LetterSpacedText from './LetterSpacedText'

/**
 * Jaquier-inspired section intro with enhanced animations:
 * - Eyebrow label with wide letter spacing and letter-by-letter reveal
 * - Strong title with smooth reveal
 * - Optional subtitle with max width
 */
export default function SectionIntro({
  eyebrow,
  title,
  subtitle,
  align = 'center', // 'center' | 'left'
  accent = 'spidey', // 'spidey' | 'blue'
  isInView = true,
}) {
  const reduceMotion = useReducedMotion()

  const isCenter = align === 'center'
  const accentClass = accent === 'blue' ? 'text-electric-blue' : 'text-spidey-red'

  return (
    <div className={isCenter ? 'text-center' : 'text-left'}>
      {eyebrow ? (
        <ScrollReveal delay={0} direction="up" distance={20}>
          <p className={`mb-4 font-mono text-xs uppercase tracking-[0.45em] ${accentClass} section-eyebrow`}>
            <LetterSpacedText text={eyebrow} spacing="0.45em" delay={0} />
          </p>
        </ScrollReveal>
      ) : null}

      <ScrollReveal delay={0.1} direction="up" distance={40}>
        <h2 className={`text-5xl md:text-7xl font-heading font-bold text-gray-light drop-shadow-2xl ${isCenter ? '' : ''}`}>
          <span className={accentClass}>{title}</span>
        </h2>
      </ScrollReveal>

      {subtitle ? (
        <ScrollReveal delay={0.2} direction="up" distance={30}>
          <p className={`mt-6 text-lg md:text-xl text-gray-300 leading-relaxed drop-shadow-lg ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}>
            {subtitle}
          </p>
        </ScrollReveal>
      ) : null}
    </div>
  )
}


