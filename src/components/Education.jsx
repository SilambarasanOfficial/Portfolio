import { motion } from 'framer-motion';
import { GraduationCap, Award, Star, FileText, Trophy, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { education, achievements } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

const achieveIconMap = { FileText, Trophy, Heart };

export default function Education() {
  const { dark } = useTheme();
  const bg = dark ? '#030712' : '#ffffff';

  return (
    <section id="education" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="Education & Achievements"
          title="Academic Background"
          subtitle="Strong academic foundation paired with real-world certifications."
          light={!dark}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '56px' }}>

          {/* Education column */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <GraduationCap size={22} style={{ color: '#818cf8' }} />
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="card-lift"
                  style={{ padding: '26px 28px', borderRadius: '18px', background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.12)' }}>
                      {e.type === 'Certification'
                        ? <Award size={20} style={{ color: '#818cf8' }} />
                        : <GraduationCap size={20} style={{ color: '#818cf8' }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#0f172a' }}>{e.score}</span>
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#0f172a', marginBottom: '6px' }}>{e.degree}</h4>
                  <p style={{ fontWeight: 600, fontSize: '0.87rem', color: '#818cf8', marginBottom: '4px' }}>{e.institution}</p>
                  <p style={{ fontSize: '0.8rem', color: dark ? '#6b7280' : '#94a3b8', marginBottom: '10px' }}>{e.university}</p>
                  <span className="mono" style={{ fontSize: '0.78rem', color: dark ? '#6b7280' : '#94a3b8' }}>{e.period}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements column */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <Trophy size={22} style={{ color: '#fbbf24' }} />
              Achievements & Activities
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {achievements.map((a, i) => {
                const Icon = achieveIconMap[a.icon] || FileText;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', padding: '22px 24px', borderRadius: '16px', background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0' }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))', flexShrink: 0 }}>
                      <Icon size={18} style={{ color: '#818cf8' }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: dark ? '#f1f5f9' : '#0f172a', marginBottom: '6px' }}>{a.title}</h4>
                      <p style={{ fontSize: '0.83rem', lineHeight: 1.65, color: dark ? '#9ca3af' : '#6b7280' }}>{a.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certification highlight */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ padding: '28px', borderRadius: '18px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.22)' }}
            >
              <Award size={32} style={{ color: '#818cf8', margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#0f172a', marginBottom: '6px' }}>
                Python Programming Certified
              </p>
              <p style={{ fontSize: '0.85rem', color: dark ? '#9ca3af' : '#6b7280' }}>
                Ministry of MSME · Govt. of India ·{' '}
                <span style={{ fontWeight: 700, color: '#818cf8' }}>Score: 95.2%</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
