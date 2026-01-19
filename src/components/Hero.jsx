import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import SpiderModel from '../3D/SpiderModel'
import FullScreenBackground from './FullScreenBackground'
import AnimatedText from './AnimatedText'
import ParticleDust from './ParticleDust'
import ScrollReveal from './ScrollReveal'
import DoubleText from './DoubleText'
import { fadeInUp, staggerContainer } from '../utils/animations'

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [showParticles, setShowParticles] = useState(true)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const particles = []
    const canvas = document.getElementById('web-particles')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class WebParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(220, 38, 38, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(new WebParticle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(animate)
    }

    animate()
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      setShowParticles(false)
    }
  }, [])

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/spiderman-city-swing.png"
      overlay="dark"
      parallax={true}
    >
      <section
        id="hero"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center"
      >
        <canvas
          id="web-particles"
          className="absolute inset-0 z-5 pointer-events-none"
          style={{ display: showParticles ? 'block' : 'none' }}
        />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <SpiderModel />
        </div>

        <motion.div 
          className="relative z-20 container mx-auto px-4 text-center"
          style={{ scale }}
        >
          <ParticleDust count={20} />
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <AnimatedText 
              text="VIVEK BISHT" 
              className="glitch-text text-5xl md:text-7xl lg:text-9xl font-heading font-bold"
              delay={0.2}
            />

            <ScrollReveal delay={0.3} direction="up" distance={40}>
              <p className="text-2xl md:text-4xl font-heading text-gray-light font-semibold drop-shadow-2xl">
                Jr. Java Developer & Flutter Web-Slinger
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="up" distance={30}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 text-gray-400">
                <span className="font-mono">+91 8171152213</span>
                <span className="hidden md:inline">⋄</span>
                <span className="font-mono">Prem Nagar, Dehradun</span>
                <span className="hidden md:inline">⋄</span>
                <span className="font-mono">vivek5832017@gmail.com</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5} direction="up" distance={30}>
              <div className="flex flex-wrap gap-4 justify-center mt-12">
                <DoubleText
                  text="View Missions"
                  href="#projects"
                  className="web-button will-change-transform inline-block"
                />
                <DoubleText
                  text="Call Backup"
                  href="#contact"
                  className="web-button bg-transparent border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black will-change-transform inline-block"
                />
              </div>
            </ScrollReveal>

            <motion.div
              variants={fadeInUp}
              className="flex gap-6 justify-center mt-8"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-light hover:text-spidey-red transition-colors"
                title="GitHub"
              >
                <Github size={32} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-light hover:text-spidey-red transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-light hover:text-spidey-red transition-colors"
              >
                <Mail size={32} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <a href="#skills" className="text-spidey-red hover:text-electric-blue transition-colors">
              <ArrowDown size={32} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </FullScreenBackground>
  )
}

