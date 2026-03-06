import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Content ──────────────────────────────────────────────
const DEGREES = [
  { label: "Master's Degree", field: 'Clinical Psychology' },
  { label: 'Bachelor of Arts', field: 'Psychology' },
]

const PILLARS = [
  {
    num: '01',
    title: 'Analytical\nReasoning',
    desc: 'Structured thinking and evidence-based decision-making that turns complexity into clarity.',
  },
  {
    num: '02',
    title: 'Deep\nEmpathy',
    desc: 'Genuine understanding of patients and professionals — the human centre of every decision.',
  },
  {
    num: '03',
    title: 'Philosophical\nEthics',
    desc: 'Long-term vision anchored in principle and integrity, never compromised by short-term gain.',
  },
]

// ─── Shared hooks & helpers ───────────────────────────────
function useReveal(amount = 0.18) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

const ease = [0.16, 1, 0.3, 1]

const vUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.95, delay, ease },
})

const vFade = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.85, delay, ease: 'easeOut' },
})

const vUpInView = (inView, delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
  transition: { duration: 0.95, delay, ease },
})

const vFadeInView = (inView, delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    inView ? { opacity: 1 } : { opacity: 0 },
  transition: { duration: 0.85, delay, ease: 'easeOut' },
})

// ─── Main ─────────────────────────────────────────────────
export default function SceneEducation({ navigate }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1100)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      width: '100%', height: '100%',
      position: 'relative',
      overflow: 'hidden auto',
      background:
        'radial-gradient(ellipse 100% 55% at 50% 0%, #0c0a12 0%, #07060a 50%, #030304 100%)',
    }}>

      {/* Fixed ambient layers */}
      <ThreeAmbient
        particleCount={isMobile ? 28 : 65}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Top warm glow */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1200px', height: '420px',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Subtle vignette — lighter than before */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.52) 100%)',
      }} />

      {/* ══ Scrollable content ══ */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '900px' : '1080px',
        margin: '0 auto',
        padding: isMobile
          ? '4.5rem 1.5rem 7rem'
          : isTablet
          ? '5.5rem 3rem 8rem'
          : '6.5rem 5rem 9rem',
      }}>

        <HeroSection isMobile={isMobile} isTablet={isTablet} />
        <CredentialsSection isMobile={isMobile} isTablet={isTablet} />
        <PsychologySection isMobile={isMobile} isTablet={isTablet} />
        <PillarsSection isMobile={isMobile} isTablet={isTablet} />
        {!isMobile && <ContinueBtn navigate={navigate} />}

      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  HERO
// ══════════════════════════════════════════════════════════
function HeroSection({ isMobile, isTablet }) {
  return (
    <div style={{
      marginBottom: isMobile ? '4.5rem' : '7rem',
      display: isMobile || isTablet ? 'block' : 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'flex-end',
    }}>

      {/* Left: label + rule + heading */}
      <div>
        <motion.div {...vFade(0.05)} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          marginBottom: '1.6rem',
        }}>
          03&nbsp;&nbsp;/&nbsp;&nbsp;Foundations
        </motion.div>

        {/* Animated gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.18, ease }}
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginBottom: '2.6rem',
          }}
        />

        <motion.h2 {...vUp(0.32)} style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(2.2rem, 10vw, 3rem)'
            : isTablet
            ? 'clamp(3rem, 6vw, 4.2rem)'
            : 'clamp(3.8rem, 6vw, 5.6rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.03em',
          lineHeight: 1.06,
          marginBottom: 0,
        }}>
          Education &amp;<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>
            Intellectual
          </em><br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
            Foundations
          </em>
        </motion.h2>
      </div>

      {/* Right: tagline block (desktop only shown separately, mobile inline) */}
      <div style={{ paddingBottom: isMobile || isTablet ? 0 : '0.6rem' }}>
        <motion.p {...vUp(isMobile || isTablet ? 0.62 : 0.5)} style={{
          fontFamily: 'var(--font-sans)',
          fontStyle: 'italic',
          fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.08rem',
          color: 'var(--white-muted)',
          lineHeight: 1.82,
          fontWeight: 300,
          marginTop: isMobile ? '1.8rem' : 0,
          maxWidth: isMobile ? '100%' : '380px',
        }}>
          A lifelong student of philosophy — shaping his ethical framework
          and long-term strategic vision.
        </motion.p>

        {/* Decorative quote mark on desktop */}
        {!isMobile && !isTablet && (
          <motion.div {...vFade(0.75)} style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '7rem',
            color: 'rgba(201,168,76,0.07)',
            lineHeight: 0.7,
            marginTop: '1.5rem',
            userSelect: 'none',
            letterSpacing: '-0.05em',
          }}>
            "
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  CREDENTIALS
// ══════════════════════════════════════════════════════════
function CredentialsSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal()

  return (
    <div ref={ref} style={{
      marginBottom: isMobile ? '4.5rem' : '7rem',
      paddingBottom: isMobile ? '4.5rem' : '7rem',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
    }}>

      {/* Section header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: isMobile ? '2.5rem' : '3.5rem',
      }}>
        <motion.div {...vFadeInView(inView, 0)} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(201,168,76,0.55)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          Academic Background
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.35), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Two degree columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
      }}>
        {DEGREES.map((d, i) => (
          <motion.div key={d.label} {...vUpInView(inView, 0.12 + i * 0.22)}>
            <DegreeBlock degree={d} isMobile={isMobile} isTablet={isTablet} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DegreeBlock({ degree, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.32, ease }}
      style={{
        padding: isMobile ? '1.6rem' : isTablet ? '2rem' : '2.4rem 2.8rem',
        background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.72)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.14)'}`,
        borderRadius: '16px',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.12)'
          : '0 14px 48px rgba(0,0,0,0.42), inset 0 1px 0 rgba(201,168,76,0.06)',
        transition: 'background 0.38s, border-color 0.38s, box-shadow 0.38s',
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top inner glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.55' : '0.2'}), transparent)`,
        transition: 'background 0.38s',
      }} />

      {/* Degree label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        color: hovered ? 'var(--gold-bright)' : 'var(--gold)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        marginBottom: '0.9rem',
        transition: 'color 0.38s',
      }}>
        {degree.label}
      </div>

      {/* Field — big, italic, serif */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: isMobile ? '1.6rem' : isTablet ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.4rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'var(--white-dim)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        transition: 'color 0.38s',
      }}>
        {degree.field}
      </div>

      {/* Animated underline */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.42, ease }}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.08))',
          transformOrigin: 'left',
          marginTop: '1.2rem',
        }}
      />
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
//  PSYCHOLOGY SECTION
// ══════════════════════════════════════════════════════════
function PsychologySection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal()

  return (
    <div ref={ref} style={{
      marginBottom: isMobile ? '4.5rem' : '7rem',
      paddingBottom: isMobile ? '4.5rem' : '7rem',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
      display: isMobile || isTablet ? 'block' : 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'start',
    }}>

      {/* Left — heading */}
      <div>
        <motion.h3 {...vUpInView(inView, 0)} style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(1.6rem, 7vw, 2.1rem)'
            : isTablet
            ? 'clamp(1.8rem, 4vw, 2.5rem)'
            : 'clamp(2.2rem, 3.5vw, 3rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.022em',
          lineHeight: 1.1,
          marginBottom: isMobile || isTablet ? '1.5rem' : 0,
        }}>
          Where Psychology<br />
          Meets&nbsp;
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Leadership</em>
        </motion.h3>
      </div>

      {/* Right — body + gold bar */}
      <div style={{ position: 'relative', paddingLeft: !isMobile && !isTablet ? '2rem' : 0 }}>
        {/* Gold vertical bar on desktop */}
        {!isMobile && !isTablet && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            style={{
              position: 'absolute', left: 0, top: '4px',
              width: '2px', height: 'calc(100% - 4px)',
              background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.1))',
              transformOrigin: 'top',
            }}
          />
        )}

        <motion.p {...vUpInView(inView, 0.18)} style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.92rem' : '1rem',
          color: 'var(--white-muted)',
          lineHeight: 1.88,
          fontWeight: 300,
          margin: 0,
        }}>
          His training in Clinical Psychology is not incidental to his leadership
          — it is foundational. He reads organisations the way a psychologist reads
          people: with curiosity, precision, and a commitment to uncovering root causes
          rather than surface symptoms.
        </motion.p>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  PILLARS
// ══════════════════════════════════════════════════════════
function PillarsSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.12)

  return (
    <div ref={ref} style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>

      {/* Header row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        marginBottom: isMobile ? '2.5rem' : '3.5rem',
      }}>
        <motion.div {...vFadeInView(inView, 0)} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(201,168,76,0.55)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          Core Intellectual Principles
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.35), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Pillar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
        gap: isMobile ? '1.2rem' : '1.5rem',
      }}>
        {PILLARS.map((p, i) => (
          <motion.div key={p.num} {...vUpInView(inView, 0.08 + i * 0.18)}>
            <PillarCard pillar={p} isMobile={isMobile} isTablet={isTablet} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PillarCard({ pillar, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.34, ease }}
      style={{
        padding: isMobile ? '1.8rem 1.6rem' : isTablet ? '2rem 1.8rem' : '2.6rem 2.2rem',
        background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.68)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.42)' : 'rgba(201,168,76,0.11)'}`,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? '0 36px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.14)'
          : '0 12px 42px rgba(0,0,0,0.38), inset 0 1px 0 rgba(201,168,76,0.05)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 'auto' : '230px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.55' : '0.18'}), transparent)`,
        transition: 'background 0.4s',
      }} />

      {/* Huge faint background number */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '0.8rem' : '1rem',
        top: isMobile ? '0.6rem' : '0.8rem',
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '5rem' : isTablet ? '6rem' : '7.5rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.06'})`,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        userSelect: 'none',
        transition: 'color 0.4s',
        pointerEvents: 'none',
      }}>
        {pillar.num}
      </div>

      {/* Top content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Small number badge */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: hovered ? 'var(--gold-bright)' : 'rgba(201,168,76,0.4)',
          letterSpacing: '0.22em',
          marginBottom: '1.2rem',
          transition: 'color 0.4s',
        }}>
          {pillar.num}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile ? '1.7rem' : isTablet ? '1.8rem' : 'clamp(1.7rem, 2.3vw, 2.1rem)',
          fontWeight: 300,
          color: hovered ? 'var(--white)' : 'var(--white-dim)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          whiteSpace: 'pre-line',
          transition: 'color 0.4s',
        }}>
          {pillar.title}
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Gold underline — animates in on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.42, ease }}
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginBottom: '0.95rem',
          }}
        />

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.85rem' : '0.8rem',
          color: hovered ? 'var(--white-muted)' : 'rgba(245,240,232,0.3)',
          lineHeight: 1.7,
          fontWeight: 300,
          margin: 0,
          transition: 'color 0.4s',
        }}>
          {pillar.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
//  CONTINUE
// ══════════════════════════════════════════════════════════
function ContinueBtn({ navigate }) {
  const { ref, inView } = useReveal(0.5)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.85, delay: 0.3 }}
      onClick={() => navigate(4)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.4rem', cursor: 'pointer',
        marginTop: '4rem', paddingBottom: '1rem',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        color: 'rgba(245,240,232,0.28)',
        letterSpacing: '0.38em',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>
        Continue Journey
      </span>
      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.22, 0.55, 0.22] }}
        transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
      >
        <div style={{
          width: '1px', height: '28px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5))',
        }} />
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1l3 3 3-3" stroke="rgba(201,168,76,0.5)"
            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
