import { useEffect, useState } from 'react'

export default function WebCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Create trail
      setTrails((prev) => [
        ...prev.slice(-5),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ])
    }

    const handleMouseLeave = () => {
      // Hide cursor when mouse leaves
      setPosition({ x: -100, y: -100 })
    }

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.filter((trail) => Date.now() - trail.id < 200))
    }, 50)

    return () => clearInterval(interval)
  }, [])

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
