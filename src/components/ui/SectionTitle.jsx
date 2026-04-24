import { motion } from 'framer-motion';

export default function SectionTitle({ label, title, subtitle, light }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      style={{ textAlign: 'center', marginBottom: '64px' }}
    >
      <span
        className="mono"
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '6px 18px',
          borderRadius: '9999px',
          border: light ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(99,102,241,0.3)',
          background: light ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.1)',
          color: light ? '#4f46e5' : '#818cf8',
          display: 'inline-block',
        }}
      >
        {label}
      </span>

      <h2
        style={{
          fontSize: 'clamp(1.9rem, 4vw, 3rem)',
          fontWeight: 800,
          marginTop: '18px',
          marginBottom: '16px',
          color: light ? '#0f172a' : '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p style={{ fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 20px', lineHeight: 1.65, color: light ? '#6b7280' : '#9ca3af' }}>
          {subtitle}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, #6366f1)' }} />
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
      </div>
    </motion.div>
  );
}
