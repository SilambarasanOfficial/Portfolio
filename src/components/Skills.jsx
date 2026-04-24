import { motion } from 'framer-motion';
import { Code, Server, Monitor, Brain, Plug, Cloud, Database, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { skillCategories } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

const iconMap = { Code, Server, Monitor, Brain, Plug, Cloud, Database, Sparkles };

export default function Skills() {
  const { dark } = useTheme();
  const bg = dark ? '#0a0a1f' : '#f8fafc';

  return (
    <section id="skills" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div className="section-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="Technical Skills"
          title="My Expertise"
          subtitle="Technologies I work with to build scalable, production-ready systems."
          light={!dark}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -7, transition: { duration: 0.25 } }}
                className="card-lift"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                  border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0',
                  cursor: 'default',
                  transition: 'border-color 0.25s',
                }}
              >
                {/* Icon + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${cat.color}18`, flexShrink: 0 }}>
                    <Icon size={21} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#1e293b' }}>{cat.category}</h3>
                    <p style={{ fontSize: '0.75rem', color: dark ? '#6b7280' : '#94a3b8', marginTop: '2px' }}>{cat.skills.length} technologies</p>
                  </div>
                </div>

                {/* Color accent line */}
                <div style={{ height: '2px', width: '36px', borderRadius: '2px', marginBottom: '18px', background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.07 }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        padding: '5px 12px',
                        borderRadius: '9999px',
                        background: `${cat.color}14`,
                        color: cat.color,
                        border: `1px solid ${cat.color}28`,
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
