import { motion } from 'framer-motion';
import { Heart, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer style={{ width: '100%', backgroundColor: dark ? '#030712' : '#ffffff', borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', padding: '32px 0' }}>
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem' }}>VS</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: dark ? '#d1d5db' : '#374151' }}>{personalInfo.name}</span>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '0.82rem', color: dark ? '#6b7280' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Built with <Heart size={12} style={{ color: '#f87171', fill: '#f87171' }} /> using React & Tailwind CSS
        </p>

        {/* Social + scroll top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { icon: GithubIcon,   href: personalInfo.github },
            { icon: LinkedinIcon, href: personalInfo.linkedin },
            { icon: Mail,         href: `mailto:${personalInfo.email}` },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#6b7280' : '#94a3b8', background: 'transparent', textDecoration: 'none', transition: 'color 0.2s' }}
            >
              <Icon size={15} />
            </motion.a>
          ))}

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: 'none', cursor: 'pointer', marginLeft: '4px' }}
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
