import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// logo: path under /public/logos/ — null means use emoji fallback
const skills = [
  { label: 'Python',       color: '#3776AB', bg: 'rgba(55,118,171,0.13)',  logo: '/logos/python.jpeg' },
  { label: 'Java',         color: '#ED8B00', bg: 'rgba(237,139,0,0.11)',   logo: '/logos/java.png'    },
  { label: 'PHP',          color: '#777BB4', bg: 'rgba(119,123,180,0.13)', logo: '/logos/php.png'     },
  { label: 'Django',       color: '#0C4B33', bg: 'rgba(9,46,32,0.18)',     logo: '/logos/django.png'  },
  { label: 'FastAPI',      color: '#009688', bg: 'rgba(0,150,136,0.13)',   logo: '/logos/fastapi.png' },
  { label: 'Angular',      color: '#DD0031', bg: 'rgba(221,0,49,0.11)',    logo: '/logos/angular.jpeg'},
  { label: 'React Native', color: '#61DAFB', bg: 'rgba(97,218,251,0.11)',  logo: '/logos/react.webp'  },
  { label: 'LLM',          color: '#8B5CF6', bg: 'rgba(139,92,246,0.13)', logo: '/logos/llm.webp'    },
  { label: 'Gemini',       color: '#4285F4', bg: 'rgba(66,133,244,0.11)', logo: '/logos/gemini.webp' },
  { label: 'Docker',       color: '#2496ED', bg: 'rgba(36,150,237,0.13)', logo: '/logos/docker.png'  },
  { label: 'AWS',          color: '#FF9900', bg: 'rgba(255,153,0,0.11)',   logo: '/logos/aws.png'     },
  { label: 'Nginx',        color: '#009639', bg: 'rgba(0,150,57,0.13)',    logo: '/logos/nginx.webp'  },
  // newly added logos
  { label: 'Flask',        color: '#94a3b8', bg: 'rgba(148,163,184,0.10)', logo: '/logos/flask.png'      },
  { label: 'Laravel',      color: '#FF2D20', bg: 'rgba(255,45,32,0.11)',   logo: '/logos/laravel.jpeg'   },
  { label: 'MongoDB',      color: '#47A248', bg: 'rgba(71,162,72,0.12)',   logo: '/logos/mongodb.png'    },
  { label: 'MySQL',        color: '#4479A1', bg: 'rgba(68,121,161,0.12)',  logo: '/logos/mysql.jpg'      },
  { label: 'PostgreSQL',   color: '#336791', bg: 'rgba(51,103,145,0.12)',  logo: '/logos/postgresql.jpg' },
  { label: 'REST API',     color: '#6366F1', bg: 'rgba(99,102,241,0.12)',  logo: '/logos/restapi.png'    },
  { label: 'Vector DB',    color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)',  logo: '/logos/vectorDB.jpeg'  },
  { label: 'WhatsApp',     color: '#25D366', bg: 'rgba(37,211,102,0.11)',  logo: '/logos/whatsapp.png'   },
  // remaining emoji fallbacks
  { label: 'JavaScript',   color: '#F7DF1E', bg: 'rgba(247,223,30,0.10)', logo: null, icon: '⚡' },
  { label: 'OpenAI',       color: '#10A37F', bg: 'rgba(16,163,127,0.12)', logo: null, icon: '🤖' },
];

// Layout grid: x (vw %), yStart/yEnd (vh %), avoids centre text zone (30–70vw × 15–85vh)
const layout = [
  // ── far left ──
  { i: 0,  x: 1,   yStart: 6,  yEnd: 18, dur: 18, delay: 0  , scale: 0.88, op: 0.62 },
  { i: 1,  x: 4,   yStart: 32, yEnd: 46, dur: 22, delay: 3  , scale: 0.9,  op: 0.58 },
  { i: 2,  x: 2,   yStart: 60, yEnd: 74, dur: 20, delay: 7  , scale: 0.85, op: 0.54 },
  { i: 3,  x: 6,   yStart: 84, yEnd: 95, dur: 16, delay: 1  , scale: 0.85, op: 0.56 },
  // ── left band ──
  { i: 4,  x: 13,  yStart: 4,  yEnd: 16, dur: 24, delay: 5  , scale: 0.9,  op: 0.52 },
  { i: 5,  x: 15,  yStart: 53, yEnd: 68, dur: 19, delay: 9  , scale: 0.87, op: 0.55 },
  { i: 6,  x: 11,  yStart: 86, yEnd: 96, dur: 21, delay: 2  , scale: 0.82, op: 0.5  },
  // ── left fringe (top/bottom only to avoid text) ──
  { i: 7,  x: 24,  yStart: 2,  yEnd: 11, dur: 17, delay: 4  , scale: 0.8,  op: 0.44 },
  { i: 8,  x: 27,  yStart: 88, yEnd: 97, dur: 23, delay: 8  , scale: 0.8,  op: 0.44 },
  // ── top centre ──
  { i: 9,  x: 38,  yStart: 1,  yEnd: 9,  dur: 15, delay: 12 , scale: 0.76, op: 0.38 },
  { i: 10, x: 50,  yStart: 1,  yEnd: 8,  dur: 20, delay: 14 , scale: 0.74, op: 0.35 },
  { i: 11, x: 62,  yStart: 2,  yEnd: 10, dur: 17, delay: 6  , scale: 0.76, op: 0.38 },
  // ── bottom centre ──
  { i: 12, x: 40,  yStart: 91, yEnd: 98, dur: 16, delay: 0  , scale: 0.76, op: 0.38 },
  { i: 13, x: 52,  yStart: 92, yEnd: 99, dur: 19, delay: 10 , scale: 0.74, op: 0.35 },
  { i: 14, x: 64,  yStart: 90, yEnd: 97, dur: 18, delay: 5  , scale: 0.76, op: 0.38 },
  // ── right fringe ──
  { i: 15, x: 72,  yStart: 2,  yEnd: 12, dur: 20, delay: 6  , scale: 0.8,  op: 0.44 },
  { i: 16, x: 74,  yStart: 88, yEnd: 97, dur: 18, delay: 11 , scale: 0.8,  op: 0.44 },
  // ── right band ──
  { i: 17, x: 82,  yStart: 7,  yEnd: 20, dur: 22, delay: 2  , scale: 0.88, op: 0.55 },
  { i: 18, x: 84,  yStart: 48, yEnd: 64, dur: 19, delay: 7  , scale: 0.87, op: 0.54 },
  { i: 19, x: 80,  yStart: 82, yEnd: 94, dur: 25, delay: 4  , scale: 0.84, op: 0.5  },
  // ── far right ──
  { i: 20, x: 91,  yStart: 4,  yEnd: 17, dur: 17, delay: 1  , scale: 0.88, op: 0.6  },
  { i: 21, x: 94,  yStart: 28, yEnd: 44, dur: 21, delay: 9  , scale: 0.9,  op: 0.58 },
];

export default function FloatingSkills() {
  const { dark } = useTheme();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {layout.map((item) => {
        const skill = skills[item.i % skills.length];
        const driftX = item.i % 2 === 0 ? 2.5 : -2.5;

        return (
          <motion.div
            key={item.i}
            initial={{ y: `${item.yStart}vh`, x: `${item.x}vw`, opacity: 0 }}
            animate={{
              y:       [`${item.yStart}vh`, `${item.yEnd}vh`, `${item.yStart}vh`],
              x:       [`${item.x}vw`, `${item.x + driftX}vw`, `${item.x}vw`],
              opacity: [0, item.op, item.op, 0],
            }}
            transition={{ duration: item.dur, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, item.i % 2 === 0 ? 3 : -3, 0] }}
              transition={{ duration: item.dur * 0.65, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px 6px 8px',
                borderRadius: '9999px',
                background: dark
                  ? skill.bg
                  : skill.bg.replace(/0\.(1[0-9]|[0-9]+)\)/, (_, n) => `${(parseFloat(n) * 0.6).toFixed(2)})`),
                border: `1px solid ${skill.color}30`,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                transform: `scale(${item.scale})`,
                transformOrigin: 'top left',
                whiteSpace: 'nowrap',
                boxShadow: `0 2px 12px ${skill.color}18`,
              }}
            >
              {/* Icon: real logo image or emoji fallback */}
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.label}
                  style={{ width: '20px', height: '20px', borderRadius: '4px', objectFit: 'contain', display: 'block', flexShrink: 0 }}
                />
              ) : (
                <span style={{ fontSize: '0.9rem', lineHeight: 1, flexShrink: 0 }}>{skill.icon}</span>
              )}
              <span
                className="mono"
                style={{ fontSize: '0.72rem', fontWeight: 600, color: skill.color, letterSpacing: '0.02em' }}
              >
                {skill.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
