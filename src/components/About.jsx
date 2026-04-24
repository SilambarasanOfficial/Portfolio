import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Zap, Users, Rocket, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

const highlights = [
  { icon: Zap,    title: 'Fast Delivery',   desc: 'Ships production-grade systems end-to-end — from schema to deployment.', color: '#6366f1' },
  { icon: Rocket, title: 'AI-First Builder', desc: 'Deep expertise in LLM integration, AI analytics, and intelligent automation.', color: '#8b5cf6' },
  { icon: Users,  title: 'Team Leader',      desc: 'Mentored junior developers and led architecture across 5+ concurrent systems.', color: '#06b6d4' },
  { icon: Award,  title: 'Rapid Growth',     desc: 'Promoted from Junior to Senior Developer driven by results and ownership.', color: '#f59e0b' },
];

export default function About() {
  const { dark } = useTheme();
  const bg   = dark ? '#030712' : '#ffffff';
  const text = dark ? '#e5e7eb' : '#1e293b';
  const sub  = dark ? '#9ca3af' : '#64748b';

  return (
    <section id="about" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="About Me"
          title="Who I Am"
          subtitle="A developer who takes full ownership — from architecture to deployment."
          light={!dark}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '64px', alignItems: 'center' }}>

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Profile card */}
            <div style={{ borderRadius: '20px', padding: '28px', marginBottom: '24px', background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
                  <img
                    src="/myprofile.jpg"
                    alt="V. Silambarasan"
                    style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                  <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '11px', height: '11px', borderRadius: '50%', background: '#4ade80', border: dark ? '2px solid #0a0a1f' : '2px solid #f8fafc', display: 'block' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem', color: text }}>{personalInfo.name}</p>
                  <p style={{ fontSize: '0.85rem', color: sub, marginTop: '2px' }}>Senior Software Developer</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.75rem', color: sub }}>Open to work</span>
                </div>
              </div>

              {/* Code snippet */}
              <div style={{ borderRadius: '14px', padding: '20px 24px', background: dark ? 'rgba(0,0,0,0.4)' : '#ffffff', border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
                <pre className="mono" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: dark ? '#d1d5db' : '#475569', overflow: 'auto' }}>
{`const developer = {
  name: "V. Silambarasan",
  role: "Senior Software Developer",
  experience: "3+ years",
  focus: ["Backend", "AI Systems", "Scale"],
  available: true,
}`}
                </pre>
              </div>
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: MapPin, value: personalInfo.location },
                { icon: Mail,   value: personalInfo.email },
                { icon: Phone,  value: personalInfo.phone },
              ].map(({ icon: Icon, value }) => (
                <motion.div
                  key={value}
                  whileHover={{ x: 5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '12px', background: dark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #f1f5f9' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} style={{ color: '#818cf8' }} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: sub }}>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: sub, marginBottom: '40px' }}>
              {personalInfo.summary}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-lift"
                  style={{ padding: '22px', borderRadius: '16px', background: dark ? 'rgba(255,255,255,0.04)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0', cursor: 'default' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${h.color}18`, marginBottom: '14px' }}>
                    <h.icon size={19} style={{ color: h.color }} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.92rem', color: text, marginBottom: '6px' }}>{h.title}</h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: sub }}>{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
