import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ done }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (done) { setProgress(100); return }
    const steps = [
      { target: 30, delay: 0,    duration: 300 },
      { target: 60, delay: 300,  duration: 400 },
      { target: 85, delay: 700,  duration: 500 },
      { target: 95, delay: 1200, duration: 400 },
    ]
    const timers = steps.map(({ target, delay, duration }) =>
      setTimeout(() => {
        const start = Date.now()
        const from  = progress
        const tick  = () => {
          const p = Math.min(1, (Date.now() - start) / duration)
          setProgress(Math.round(from + (target - from) * p))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [done])

  useEffect(() => {
    if (done) setProgress(100)
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#030712', overflow: 'hidden',
          }}
        >
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }} />

          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(99,102,241,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: 'relative', marginBottom: '40px' }}
          >
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '-6px', borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, transparent, #6366f1)',
                filter: 'blur(1px)',
              }}
            />
            <div style={{
              position: 'relative', width: '88px', height: '88px',
              borderRadius: '50%', overflow: 'hidden',
              border: '3px solid rgba(99,102,241,0.3)',
              zIndex: 1,
            }}>
              <img src="/myprofile.jpg" alt="VS" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{ marginBottom: '8px', textAlign: 'center' }}
          >
            <span style={{ fontWeight: 800, fontSize: '1.35rem', color: '#f1f5f9', letterSpacing: '-0.01em' }}>
              V. Silambarasan
            </span>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mono"
            style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#6366f1', marginBottom: '48px' }}
          >
            INITIALIZING PORTFOLIO
          </motion.p>

          {/* Progress bar + counter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
          >
            {/* Track */}
            <div style={{ width: '100%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>

            {/* Counter row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span className="mono" style={{ fontSize: '0.62rem', color: '#4b5563', letterSpacing: '0.1em' }}>LOADING</span>
              <span className="mono" style={{ fontSize: '0.62rem', color: '#818cf8', letterSpacing: '0.06em' }}>{progress}%</span>
            </div>
          </motion.div>

          {/* Blinking dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: '6px', marginTop: '32px' }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6366f1' }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
