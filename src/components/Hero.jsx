import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Download, ChevronRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons'
import { useTheme } from '../context/ThemeContext'
import { personalInfo, stats } from '../data/portfolio'
import FloatingSkills from './ui/FloatingSkills'
import { useMagnetic } from '../hooks/useMagnetic'

// ── Typing animation ─────────────────────────────────────────────────────────
function TypeWriter({ texts }) {
  const [idx,      setIdx]      = useState(0)
  const [display,  setDisplay]  = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pause,    setPause]    = useState(false)

  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1600); return () => clearTimeout(t) }
    const current = texts[idx]
    const speed   = deleting ? 38 : 75
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1))
        if (display.length + 1 === current.length) { setPause(true); setDeleting(true) }
      } else {
        setDisplay(current.slice(0, display.length - 1))
        if (display.length === 0) { setDeleting(false); setIdx((idx + 1) % texts.length) }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [display, deleting, pause, idx, texts])

  return (
    <span className="gradient-text" style={{ fontWeight: 700 }}>
      {display}<span className="cursor-blink" />
    </span>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { dark } = useTheme()

  // Magnetic effect for primary CTA
  const magnetic = useMagnetic(0.32)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: dark ? '#030712' : '#f8fafc',
      }}
    >
      {/* ── Floating skill badges ── */}
      <FloatingSkills />

      {/* ── Ambient gradient blobs ── */}
      <div style={{ position: 'absolute', top: '20%', left: '8%',  width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(99,102,241,0.07)',  filter: 'blur(80px)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(6,182,212,0.06)',   filter: 'blur(80px)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(139,92,246,0.04)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 2 }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

        {/* Profile avatar with spinning gradient ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)', zIndex: 0 }}
            />
            <div style={{ position: 'absolute', inset: '-1px', borderRadius: '50%', background: dark ? '#030712' : '#f8fafc', zIndex: 1 }} />
            <img
              src="/myprofile.jpg"
              alt="V. Silambarasan"
              style={{ position: 'relative', zIndex: 2, width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <span style={{ position: 'absolute', bottom: '6px', right: '6px', zIndex: 3, width: '16px', height: '16px', borderRadius: '50%', background: '#4ade80', border: `3px solid ${dark ? '#030712' : '#f8fafc'}`, display: 'block' }} />
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '9999px', border: '1px solid rgba(99,102,241,0.28)', background: 'rgba(99,102,241,0.08)', marginBottom: '24px' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
          />
          <span className="mono" style={{ fontSize: '0.72rem', color: '#818cf8', letterSpacing: '0.12em' }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.08, marginBottom: '16px', color: dark ? '#ffffff' : '#0f172a', letterSpacing: '-0.02em' }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.75rem)', fontWeight: 600, marginBottom: '24px', minHeight: '2.4rem' }}
        >
          <TypeWriter texts={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 40px', lineHeight: 1.7, color: dark ? '#9ca3af' : '#6b7280' }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '40px' }}
        >
          {/* Magnetic primary CTA */}
          <div ref={magnetic.ref} onMouseMove={magnetic.onMouseMove} onMouseLeave={magnetic.onMouseLeave} style={{ display: 'inline-block' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 30px', borderRadius: '12px', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', letterSpacing: '0.01em' }}
            >
              <Mail size={17} />
              Get In Touch
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', border: `1.5px solid ${dark ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`, color: dark ? '#e5e7eb' : '#374151', background: 'transparent', cursor: 'pointer' }}
          >
            View Projects <ChevronRight size={16} />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="/resume.pdf"
            download
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', border: '1.5px solid rgba(99,102,241,0.35)', color: '#818cf8', background: 'rgba(99,102,241,0.08)', textDecoration: 'none' }}
          >
            <Download size={16} /> Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '56px' }}
        >
          {[
            { icon: GithubIcon,   href: personalInfo.github,                label: 'GitHub'   },
            { icon: LinkedinIcon, href: personalInfo.linkedin,              label: 'LinkedIn' },
            { icon: Mail,         href: `mailto:${personalInfo.email}`,     label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              aria-label={label}
              style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', color: dark ? '#9ca3af' : '#6b7280', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', textDecoration: 'none' }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', maxWidth: '700px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)', border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0', backdropFilter: 'blur(16px)' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ background: dark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.05)' }}
              style={{ padding: '28px 16px', textAlign: 'center', borderRight: i < stats.length - 1 ? (dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #f1f5f9') : 'none', transition: 'background 0.2s' }}
            >
              <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', marginTop: '6px', color: dark ? '#6b7280' : '#9ca3af' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          onClick={() => scrollTo('about')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: dark ? '#6b7280' : '#9ca3af' }}
        >
          <span className="mono" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>SCROLL</span>
          <ArrowDown size={15} />
        </motion.button>
      </motion.div>
    </section>
  )
}
