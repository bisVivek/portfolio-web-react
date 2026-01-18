import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import HUD from './components/HUD'
import WebCursor from './components/WebCursor'
import ParticleDust from './components/ParticleDust'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  const lenisRef = useRef(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleScroll = (e) => {
      const progress = e.scroll / (e.limit - window.innerHeight)
      setScrollProgress(progress)

      // Determine current section based on scroll
      const sections = ['hero', 'skills', 'experience', 'projects', 'contact']
      const sectionIndex = Math.floor(progress * sections.length)
      setCurrentSection(Math.min(sectionIndex, sections.length - 1))
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.destroy()
    }
  }, [])

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('section[id]')
    if (sections[index]) {
      lenisRef.current?.scrollTo(sections[index], {
        offset: -80,
        duration: 1.5,
      })
    }
  }

  return (
    <div className="relative min-h-screen bg-dark-bg">
      <WebCursor />
      <ParticleDust count={25} />
      
      <HUD 
        currentSection={currentSection}
        scrollProgress={scrollProgress}
        scrollToSection={scrollToSection}
      />

      <main className="relative z-10">
        <Hero id="hero" />
        <Skills id="skills" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
    </div>
  )
}

export default App
