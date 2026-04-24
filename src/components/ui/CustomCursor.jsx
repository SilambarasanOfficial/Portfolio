import { useEffect, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false)
  const [pointer,  setPointer]  = useState(false)
  const [clicking, setClicking] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Ring follows with spring lag — gives it the satisfying "trailing" feel
  const ringX = useSpring(mx, { damping: 28, stiffness: 260, mass: 0.45 })
  const ringY = useSpring(my, { damping: 28, stiffness: 260, mass: 0.45 })

  const onMove = useCallback((e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
    setVisible(true)
  }, [mx, my])

  const onDown  = useCallback(() => setClicking(true),  [])
  const onUp    = useCallback(() => setClicking(false), [])
  const onLeave = useCallback(() => setVisible(false),  [])
  const onEnter = useCallback(() => setVisible(true),   [])

  const checkPointer = useCallback((e) => {
    setPointer(!!e.target.closest('a, button, [role="button"], input, textarea, select, label'))
  }, [])

  useEffect(() => {
    // Touch devices — bail out
    if (window.matchMedia('(pointer: coarse)').matches) return

    window.addEventListener('mousemove', onMove,        { passive: true })
    window.addEventListener('mousemove', checkPointer,  { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', checkPointer)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [onMove, onDown, onUp, onLeave, onEnter, checkPointer])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const dotSize    = clicking ? 4  : 8
  const ringSize   = pointer  ? 48 : clicking ? 18 : 34
  const ringBorder = pointer
    ? 'rgba(6,182,212,0.75)'
    : 'rgba(99,102,241,0.65)'

  return (
    <>
      {/* ── Small dot — moves instantly ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: mx, y: my,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          borderRadius: '50%',
          background: pointer ? '#06b6d4' : '#6366f1',
          mixBlendMode: 'difference',
        }}
        animate={{ width: dotSize, height: dotSize, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />

      {/* ── Outer ring — spring-lagged ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99998,
          borderRadius: '50%',
          border: `1.5px solid ${ringBorder}`,
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          borderColor: ringBorder,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      />

      {/* ── Click ripple ── */}
      {clicking && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            x: mx, y: my,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 99997,
            borderRadius: '50%',
            border: '1px solid rgba(99,102,241,0.4)',
          }}
          initial={{ width: 10, height: 10, opacity: 0.8 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </>
  )
}
