import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Config ─────────────────────────────────────────────────

const EMAIL  = 'founder@iuis.in'
const MAILTO = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent('Hello Akhileshwar K Singh')}`

const SOCIALS = [
  {
    id:    'linkedin',
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/akhileshwar-kumar-singh/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    id:    'instagram',
    label: 'Instagram',
    href:  'https://www.instagram.com/akhileshwarkumarsingh.g/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    id:    'twitter',
    label: 'Twitter / X',
    href:  'https://x.com/Akhileshwa32343',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id:    'facebook',
    label: 'Facebook',
    href:  'https://www.facebook.com/profile.php?id=61585189745246',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
]

// ─── Stagger helper ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

// ─── Main component ─────────────────────────────────────────

export default function SceneContact() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const maxW = isMobile ? '100%' : isTablet ? '520px' : '500px'

  return (
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden auto',
        background:
          'radial-gradient(ellipse 90% 70% at 50% 50%, #080810 0%, #060608 55%, #030304 100%)',
      }}
    >
      {/* ── Slow ambient dust ── */}
      <ThreeAmbient
        particleCount={isMobile ? 28 : 55}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      />

      {/* ── Warm golden center glow ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '720px', height: '520px',
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(52px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Edge vignette ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════
          Content column
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: maxW,
          padding: isMobile ? '5rem 1.6rem 6rem' : '4rem 2rem',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <motion.div
          {...fadeUp(0)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          09&nbsp;&nbsp;/&nbsp;&nbsp;Contact
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.15)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(2.4rem, 10vw, 3rem)'
              : 'clamp(2.8rem, 5vw, 3.8rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '1.2rem',
          }}
        >
          Let's<br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Connect</em>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--white-muted)',
            fontWeight: 300,
            lineHeight: 1.72,
            maxWidth: '360px',
            marginBottom: '3rem',
          }}
        >
          If you would like to discuss ideas, collaborations, or opportunities,
          feel free to reach out.
        </motion.p>

        {/* ── Email card ── */}
        <motion.div {...fadeUp(0.45)} style={{ width: '100%', marginBottom: '2.5rem' }}>
          <EmailCard isMobile={isMobile} />
        </motion.div>

        {/* Social label */}
        <motion.div
          {...fadeUp(0.6)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--white-muted)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1.3rem',
          }}
        >
          Connect on Social
        </motion.div>

        {/* ── Social icons ── */}
        <motion.div
          {...fadeUp(0.72)}
          style={{
            display: 'flex',
            gap: isMobile ? '1.1rem' : '0.95rem',
            marginBottom: '3.8rem',
          }}
        >
          {SOCIALS.map(social => (
            <SocialIcon key={social.id} social={social} isMobile={isMobile} />
          ))}
        </motion.div>

        {/* ── Closing footer ── */}
        <motion.div
          {...fadeUp(0.88)}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.45rem',
          }}
        >
          <div
            style={{
              width: '40px', height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(201,168,76,0.32), transparent)',
              marginBottom: '0.85rem',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--text-sm)',
              color: 'rgba(245,240,232,0.3)',
              letterSpacing: '0.04em',
            }}
          >
            Thank you for visiting.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'rgba(245,240,232,0.18)',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            © IUI Solutions
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// ─── EmailCard ───────────────────────────────────────────────

function EmailCard({ isMobile }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow:
          '0 28px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.38)',
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(12,12,20,0.76)',
        border: '1px solid rgba(201,168,76,0.18)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '16px',
        padding: isMobile ? '1.9rem 1.5rem 2rem' : '2.3rem 2.6rem 2.4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow:
          '0 12px 48px rgba(0,0,0,0.42), 0 0 0 1px rgba(201,168,76,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top inner light line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: '15%',
          width: '70%', height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Email label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
        }}
      >
        Email
      </div>

      {/* Email address */}
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: isMobile
            ? 'clamp(0.95rem, 3.8vw, 1.1rem)'
            : 'clamp(1rem, 1.6vw, 1.18rem)',
          color: 'rgba(245,240,232,0.82)',
          letterSpacing: '0.02em',
          marginBottom: '1.6rem',
          wordBreak: 'break-all',
        }}
      >
        {EMAIL}
      </div>

      {/* CTA */}
      <a
        href={MAILTO}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{
          textDecoration: 'none',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.2em',
          padding: '0.85rem 2.2rem',
        }}
      >
        Send an Email
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M1.5 6.5h10M6.5 1.5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </motion.div>
  )
}

// ─── SocialIcon ──────────────────────────────────────────────

function SocialIcon({ social, isMobile }) {
  const size = isMobile ? 58 : 52

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      whileHover={{
        scale: 1.13,
        boxShadow:
          '0 0 26px rgba(201,168,76,0.3), 0 0 0 1px rgba(201,168,76,0.4)',
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.6)' }}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: 'rgba(12,12,20,0.76)',
        border: '1px solid rgba(201,168,76,0.18)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(201,168,76,0.6)',
        textDecoration: 'none',
        boxShadow: '0 6px 22px rgba(0,0,0,0.35)',
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      {social.icon}
    </motion.a>
  )
}
