import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [active,      setActive]      = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    links.forEach(l => { const el = document.querySelector(l.href); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navBg = scrolled
    ? dark
      ? 'rgba(3,7,18,0.88)'
      : 'rgba(255,255,255,0.88)'
    : 'transparent';

  const navBorder = scrolled
    ? dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)'
    : 'none';

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          transition: 'background 0.3s, border-color 0.3s',
          padding: scrolled ? '14px 0' : '22px 0',
        }}
      >
        <div className="section-inner" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="mono" style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>VS</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#1e293b' }}>
              Silambarasan
            </span>
          </motion.a>

          {/* Desktop links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {links.map(l => (
              <motion.button
                key={l.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: active === l.href.slice(1) ? 'rgba(99,102,241,0.12)' : 'transparent',
                  color: active === l.href.slice(1)
                    ? '#818cf8'
                    : dark ? '#9ca3af' : '#64748b',
                }}
              >
                {l.label}
              </motion.button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              download
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.22)', color: '#818cf8', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
            >
              <Download size={14} />
              Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              style={{ width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', color: dark ? '#d1d5db' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(o => !o)}
              style={{ width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', color: dark ? '#d1d5db' : '#64748b', border: 'none', cursor: 'pointer' }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Desktop nav inline styles can't use media queries — use a <style> tag */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
        }
      `}</style>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: '16px',
              right: '16px',
              zIndex: 40,
              borderRadius: '20px',
              padding: '12px',
              background: dark ? 'rgba(10,10,31,0.95)' : 'rgba(255,255,255,0.95)',
              border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0',
              backdropFilter: 'blur(18px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(l.href)}
                style={{ width: '100%', textAlign: 'left', padding: '12px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 500, border: 'none', cursor: 'pointer', background: active === l.href.slice(1) ? 'rgba(99,102,241,0.12)' : 'transparent', color: active === l.href.slice(1) ? '#818cf8' : dark ? '#d1d5db' : '#374151', transition: 'all 0.15s' }}
              >
                {l.label}
              </motion.button>
            ))}
            <a
              href="/resume.pdf"
              download
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', padding: '12px 18px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#818cf8', textDecoration: 'none' }}
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
