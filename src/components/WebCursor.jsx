import { useEffect, useRef, useState } from 'react'

export default function WebCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState([])
  const [ribbons, setRibbons] = useState([])
  const [enabled, setEnabled] = useState(true)
  const targetRef = useRef({ x: -100, y: -100 })
  const ribbonPositionsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    // Disable cursor for users who prefer reduced motion (and keep mobile behavior as-is via CSS).
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const updateEnabled = () => setEnabled(!(mediaQuery && mediaQuery.matches))
    updateEnabled()
    mediaQuery?.addEventListener?.('change', updateEnabled)

    const updateCursor = (e) => {
      if (!enabled) return
      const nextPosition = { x: e.clientX, y: e.clientY }
      targetRef.current = nextPosition
      setPosition(nextPosition)
      
      // Create trail
      setTrails((prev) => [
        ...prev.slice(-5),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ])
    }

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 })
    }

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      mediaQuery?.removeEventListener?.('change', updateEnabled)
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const interval = setInterval(() => {
      setTrails((prev) => prev.filter((trail) => Date.now() - trail.id < 200))
    }, 50)

    return () => clearInterval(interval)
  }, [enabled])

  // Ribbon animation loop inspired by ReactBits ribbons article:
  // https://reactbits.dev/animations/ribbons
  useEffect(() => {
    if (!enabled) return

    const SEGMENTS = 12
    if (ribbonPositionsRef.current.length === 0) {
      ribbonPositionsRef.current = Array.from({ length: SEGMENTS }, (_, i) => ({
        x: -100,
        y: -100,
        opacity: 1 - i / SEGMENTS,
      }))
    }

    const lerp = (start, end, amount) => start + (end - start) * amount

    const animate = () => {
      const next = ribbonPositionsRef.current.map((pos, index) => {
        const leader = index === 0
          ? targetRef.current
          : ribbonPositionsRef.current[index - 1]

        const followStrength = 0.22 - index * 0.006
        const x = lerp(pos.x, leader.x, Math.max(followStrength, 0.08))
        const y = lerp(pos.y, leader.y, Math.max(followStrength, 0.08))
        return { ...pos, x, y }
      })

      ribbonPositionsRef.current = next
      setRibbons(next)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        className="web-cursor"
        style={{
          left: `${position.x - 10}px`,
          top: `${position.y - 10}px`,
          display: position.x < 0 ? 'none' : 'block',
        }}
      />

      {ribbons.map((ribbon, index) => {
        const prev = index === 0 ? targetRef.current : ribbons[index - 1] || ribbon
        const dx = ribbon.x - prev.x
        const dy = ribbon.y - prev.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
        const width = 26 - index * 1.3
        const length = 38 - index * 1.8
        const opacity = Math.max(0, (ribbon.opacity ?? 1) * 0.9)

        return (
          <div
            key={`ribbon-${index}`}
            className="web-cursor-ribbon"
            style={{
              left: `${ribbon.x}px`,
              top: `${ribbon.y}px`,
              width: `${width}px`,
              height: `${length}px`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              opacity,
              filter: `blur(${index * 0.12}px)`,
              backgroundImage: `linear-gradient(120deg, rgba(127,29,29,0.9), rgba(30,58,138,0.6))`,
            }}
          />
        )
      })}

      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="web-cursor-trail"
          style={{
            left: `${trail.x - 4}px`,
            top: `${trail.y - 4}px`,
            opacity: (index + 1) / trails.length * 0.4,
            transform: `scale(${(index + 1) / trails.length})`,
          }}
        />
      ))}
    </>
  )
}
