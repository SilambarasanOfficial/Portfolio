import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects, projectCategories } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

function useTilt() {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -14
    el.style.transition = 'transform 0.1s ease'
    el.style.transform  = `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) translateY(-6px) scale(1.01)`
  }, [])
  const onMouseLeave = useCallback((e) => {
    const el = e.currentTarget
    el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
    el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
  }, [])
  return { onMouseMove, onMouseLeave }
}

export default function Projects() {
  const { dark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const tilt = useTilt();
  const bg = dark ? '#030712' : '#ffffff';

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div className="section-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="Key Projects"
          title="What I've Built"
          subtitle="Production systems serving real users — from AI engines to enterprise ERPs."
          light={!dark}
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '56px' }}
        >
          {projectCategories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === cat
                  ? '#6366f1'
                  : dark ? 'rgba(255,255,255,0.07)' : '#f1f5f9',
                color: activeFilter === cat
                  ? '#ffffff'
                  : dark ? '#9ca3af' : '#64748b',
                boxShadow: activeFilter === cat ? '0 4px 20px rgba(99,102,241,0.35)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '28px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                className="tilt-card"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                  border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  willChange: 'transform',
                }}
              >
                {/* Top color bar */}
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${p.color}, ${p.color}60)`, width: '100%' }} />

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Category badge */}
                  <div style={{ marginBottom: '16px' }}>
                    <span
                      className="mono"
                      style={{ fontSize: '0.7rem', fontWeight: 600, padding: '5px 14px', borderRadius: '9999px', background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}
                    >
                      {p.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: dark ? '#f1f5f9' : '#0f172a', marginBottom: '12px', lineHeight: 1.35 }}>
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: dark ? '#9ca3af' : '#64748b', marginBottom: '20px', flex: 1 }}>
                    {p.description}
                  </p>

                  {/* Metrics */}
                  {p.metrics.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', padding: '14px 16px', borderRadius: '12px', background: dark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
                      {p.metrics.map((m, mi) => (
                        <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <TrendingUp size={12} style={{ color: p.color }} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: dark ? '#e5e7eb' : '#1e293b' }}>{m.value}</span>
                          <span style={{ fontSize: '0.78rem', color: dark ? '#6b7280' : '#94a3b8' }}>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {p.tech.slice(0, 5).map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                    {p.tech.length > 5 && (
                      <span className="mono" style={{ fontSize: '0.72rem', color: dark ? '#6b7280' : '#94a3b8', padding: '4px 10px' }}>
                        +{p.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
