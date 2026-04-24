import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolio';
import SectionTitle from './ui/SectionTitle';

export default function Contact() {
  const { dark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const bg = dark ? '#0a0a1f' : '#f8fafc';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1300));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
    background: dark ? 'rgba(255,255,255,0.05)' : '#ffffff',
    color: dark ? '#f1f5f9' : '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  const contactItems = [
    { icon: Mail,   label: 'Email',    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
    { icon: Phone,  label: 'Phone',    value: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
  ];

  return (
    <section id="contact" style={{ width: '100%', backgroundColor: bg, padding: '100px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <SectionTitle
          label="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          light={!dark}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '56px' }}>

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: dark ? '#9ca3af' : '#64748b', marginBottom: '40px' }}>
              I'm currently open to new opportunities. Whether it's a full-time role, freelance project,
              or just a conversation about tech — feel free to reach out. I'll get back to you promptly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 22px', borderRadius: '16px', background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0', boxShadow: dark ? 'none' : '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={17} style={{ color: '#818cf8' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: dark ? '#6b7280' : '#94a3b8', marginBottom: '3px' }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ fontSize: '0.9rem', fontWeight: 600, color: dark ? '#e2e8f0' : '#374151', textDecoration: 'none' }}>
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: dark ? '#e2e8f0' : '#374151' }}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: GithubIcon, href: personalInfo.github,   label: 'GitHub' },
                { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  aria-label={label}
                  style={{ width: '46px', height: '46px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', color: dark ? '#9ca3af' : '#64748b', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', textDecoration: 'none', transition: 'all 0.2s' }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ padding: '36px', borderRadius: '24px', background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid #e2e8f0', boxShadow: dark ? 'none' : '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: dark ? '#9ca3af' : '#64748b', marginBottom: '8px' }}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: dark ? '#9ca3af' : '#64748b', marginBottom: '8px' }}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: dark ? '#9ca3af' : '#64748b', marginBottom: '8px' }}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="contact-input"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: dark ? '#9ca3af' : '#64748b', marginBottom: '8px' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="contact-input"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={!sending && !sent ? { scale: 1.02 } : {}}
                whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '13px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: sending || sent ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '9px',
                  background: sent ? '#22c55e' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#ffffff',
                  transition: 'all 0.3s',
                }}
              >
                {sent ? (
                  <><CheckCircle size={17} /> Message Sent!</>
                ) : sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      style={{ width: '17px', height: '17px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff' }}
                    />
                    Sending...
                  </>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
