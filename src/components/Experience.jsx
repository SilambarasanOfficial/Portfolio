import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { experiences } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

export default function Experience() {
  const { dark } = useTheme();
  const bg = dark ? '#0a0a1f' : '#f8fafc';

  return (
    <section id="experience" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="Work Experience"
          title="Where I've Worked"
          subtitle="3+ years of hands-on experience across startups and international firms."
          light={!dark}
        />

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, #6366f1, #8b5cf6, #06b6d4)',
            borderRadius: '2px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                style={{ position: 'relative', paddingLeft: '56px' }}
              >
                {/* Timeline dot */}
                <div className="timeline-dot" />

                {/* Card */}
                <motion.div
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  style={{
                    padding: '32px 36px',
                    borderRadius: '20px',
                    background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                    border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: dark ? '#f1f5f9' : '#0f172a', marginBottom: '4px' }}>{exp.title}</h3>
                      <p style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem' }}>{exp.subtitle}</p>
                    </div>
                    <span
                      className="mono"
                      style={{ fontSize: '0.72rem', fontWeight: 600, padding: '6px 14px', borderRadius: '9999px', background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.22)', whiteSpace: 'nowrap' }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    {[
                      { icon: Briefcase, value: exp.company, bold: true },
                      { icon: MapPin, value: exp.location },
                      { icon: Calendar, value: exp.period, mono: true },
                    ].map(({ icon: Icon, value, bold, mono }) => (
                      <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <Icon size={14} style={{ color: '#818cf8', flexShrink: 0 }} />
                        <span className={mono ? 'mono' : ''} style={{ fontSize: '0.875rem', fontWeight: bold ? 600 : 400, color: bold ? (dark ? '#e2e8f0' : '#374151') : (dark ? '#9ca3af' : '#6b7280') }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {exp.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.06 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem', lineHeight: 1.7, color: dark ? '#d1d5db' : '#475569', listStyle: 'none' }}
                      >
                        <span style={{ marginTop: '8px', width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, boxShadow: '0 0 6px rgba(99,102,241,0.5)' }} />
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.tech.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
