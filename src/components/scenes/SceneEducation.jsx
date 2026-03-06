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
    id: 'analytical',
    num: '01',
    title: 'Analytical\nReasoning',
    desc: 'Structured thinking and evidence-based decision-making.',
  },
  {
    id: 'empathy',
    num: '02',
    title: 'Deep\nEmpathy',
    desc: 'Genuine understanding of patients and professionals alike.',
  },
  {
    id: 'ethics',
    num: '03',
    title: 'Philosophical\nEthics',
    desc: 'Long-term vision anchored in principle and integrity.',
  },
]

// ─── Reveal hook ──────────────────────────────────────────
function useReveal(amount = 0.2) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

// ─── Variants ─────────────────────────────────────────────
const vFadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
}
const vFade = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.85, delay: d, ease: 'easeOut' },
  }),
}

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

  const pad = isMobile
    ? '4.5rem 1.5rem 7rem'
    : isTablet
    ? '5rem 3rem 8rem'
    : '6rem 5rem 8rem'

  return (
    <div
      style={{
        width: '100%', height: '100%',
        position: 'relative',
        overflow: 'hidden auto',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 25%, #09080f 0%, #060608 55%, #030304 100%)',
      }}
    >
      {/* Ambient particles — fixed so they don't scroll */}
      <ThreeAmbient
        particleCount={isMobile ? 28 : 55}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Warm top glow */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '320px',
        background:
          'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Edge vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 28%, rgba(0,0,0,0.68) 100%)',
      }} />

      {/* ── Content column ── */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: '980px',
          margin: '0 auto',
          padding: pad,
        }}
      >
        <HeroSection isMobile={isMobile} />
        <CredentialsSection isMobile={isMobile} />
        <PsychologySection isMobile={isMobile} />
        <PillarsSection isMobile={isMobile} isTablet={isTablet} />
        <ContinueBtn navigate={navigate} />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// SECTION 1 — Opening
// ══════════════════════════════════════════════════════════
function HeroSection({ isMobile }) {
  return (
    <div style={{ marginBottom: isMobile ? '4rem' : '6rem' }}>

      {/* Section label */}
      <motion.div
        variants={vFade} initial="hidden" animate="visible" custom={0.05}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          marginBottom: '1.8rem',
        }}
      >
        03&nbsp;&nbsp;/&nbsp;&nbsp;Foundations
      </motion.div>

      {/* Animated golden rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(201,168,76,0.9), rgba(201,168,76,0.08))',
          transformOrigin: 'left',
          marginBottom: '2.4rem',
          maxWidth: isMobile ? '100%' : '520px',
        }}
      />

      {/* Big heading */}
      <motion.h2
        variants={vFadeUp} initial="hidden" animate="visible" custom={0.35}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(2.1rem, 9vw, 2.9rem)'
            : 'clamp(3rem, 5.5vw, 4.4rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.028em',
          lineHeight: 1.08,
          marginBottom: '1.6rem',
        }}
      >
        Education &amp;<br />
        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
          Intellectual Foundations
        </em>
      </motion.h2>

      {/* Tagline */}
      <motion.p
        variants={vFadeUp} initial="hidden" animate="visible" custom={0.6}
        style={{
          fontFamily: 'var(--font-sans)',
          fontStyle: 'italic',
          fontSize: isMobile ? '0.88rem' : '1rem',
          color: 'rgba(245,240,232,0.42)',
          lineHeight: 1.75,
          maxWidth: '440px',
          fontWeight: 300,
          margin: 0,
        }}
      >
        A lifelong student of philosophy — shaping his ethical framework
        and long-term strategic vision.
      </motion.p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// SECTION 2 — Credentials
// ══════════════════════════════════════════════════════════
function CredentialsSection({ isMobile }) {
  const { ref, inView } = useReveal(0.2)

  return (
    <div
      ref={ref}
      style={{
        marginBottom: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid rgba(201,168,76,0.09)',
      }}
    >
      <motion.div
        variants={vFade} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(201,168,76,0.45)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          marginBottom: '2.4rem',
        }}
      >
        Academic Background
      </motion.div>

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1.2rem' : '2rem',
      }}>
        {DEGREES.map((d, i) => (
          <motion.div
            key={d.label}
            variants={vFadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={0.12 + i * 0.18}
            style={{ flex: 1 }}
          >
            <DegreeCard degree={d} isMobile={isMobile} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DegreeCard({ degree, isMobile }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: isMobile ? '1.5rem 1.6rem' : '2rem 2.2rem',
        background: hovered
          ? 'rgba(14,11,4,0.92)'
          : 'rgba(10,8,3,0.7)',
        border: `1px solid ${hovered
          ? 'rgba(201,168,76,0.4)'
          : 'rgba(201,168,76,0.11)'}`,
        borderRadius: '14px',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        boxShadow: hovered
          ? '0 28px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)'
          : '0 12px 42px rgba(0,0,0,0.38)',
        transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top inner shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.48' : '0.22'}), transparent)`,
        transition: 'background 0.35s',
      }} />

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: hovered ? 'var(--gold)' : 'rgba(201,168,76,0.5)',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
        transition: 'color 0.35s',
      }}>
        {degree.label}
      </div>

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: isMobile ? '1.4rem' : 'clamp(1.35rem, 2.4vw, 1.75rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'rgba(245,240,232,0.82)',
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        transition: 'color 0.35s',
      }}>
        {degree.field}
      </div>

      {/* Reveal underline on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, var(--gold), rgba(201,168,76,0.12))',
          transformOrigin: 'left',
          marginTop: '1.1rem',
        }}
      />
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// SECTION 3 — Psychology text
// ══════════════════════════════════════════════════════════
function PsychologySection({ isMobile }) {
  const { ref, inView } = useReveal(0.2)

  return (
    <div
      ref={ref}
      style={{
        marginBottom: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        borderBottom: '1px solid rgba(201,168,76,0.09)',
        maxWidth: '660px',
      }}
    >
      <motion.h3
        variants={vFadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(1.5rem, 6.5vw, 1.9rem)'
            : 'clamp(1.7rem, 3vw, 2.4rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.018em',
          lineHeight: 1.12,
          marginBottom: '1.6rem',
        }}
      >
        Where Psychology Meets&nbsp;
        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Leadership</em>
      </motion.h3>

      <motion.p
        variants={vFadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.22}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.9rem' : '0.98rem',
          color: 'rgba(245,240,232,0.55)',
          lineHeight: 1.85,
          fontWeight: 300,
          margin: 0,
        }}
      >
        His training in Clinical Psychology is not incidental to his leadership
        — it is foundational. He reads organisations the way a psychologist reads
        people: with curiosity, precision, and a commitment to uncovering root
        causes rather than surface symptoms.
      </motion.p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// SECTION 4 — Three pillars
// ══════════════════════════════════════════════════════════
function PillarsSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.15)

  const cols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr'

  return (
    <div ref={ref} style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>

      <motion.div
        variants={vFade} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'rgba(201,168,76,0.45)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          marginBottom: '2.4rem',
        }}
      >
        Core Intellectual Principles
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: cols,
        gap: isMobile ? '1.2rem' : '1.4rem',
      }}>
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.id}
            variants={vFadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={0.08 + i * 0.2}
          >
            <PillarCard pillar={p} isMobile={isMobile} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PillarCard({ pillar, isMobile }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: isMobile ? '1.6rem 1.5rem' : '2.2rem 1.8rem 2.4rem',
        background: hovered ? 'rgba(14,11,4,0.92)' : 'rgba(10,8,3,0.65)',
        border: `1px solid ${hovered
          ? 'rgba(201,168,76,0.38)'
          : 'rgba(201,168,76,0.09)'}`,
        borderRadius: '14px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.07)'
          : '0 10px 36px rgba(0,0,0,0.35)',
        transition: 'background 0.38s, border-color 0.38s, box-shadow 0.38s',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: isMobile ? 'auto' : '195px',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.5' : '0.18'}), transparent)`,
        transition: 'background 0.38s',
      }} />

      <div>
        {/* Number badge */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: hovered ? 'rgba(201,168,76,0.72)' : 'rgba(201,168,76,0.28)',
          letterSpacing: '0.2em',
          marginBottom: '1.1rem',
          transition: 'color 0.38s',
        }}>
          {pillar.num}
        </div>

        {/* Pillar title */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? '1.5rem'
            : 'clamp(1.35rem, 2.1vw, 1.65rem)',
          fontWeight: 300,
          color: hovered ? 'var(--white)' : 'rgba(245,240,232,0.86)',
          lineHeight: 1.12,
          letterSpacing: '-0.018em',
          whiteSpace: 'pre-line',
          marginBottom: '1rem',
          transition: 'color 0.38s',
        }}>
          {pillar.title}
        </div>
      </div>

      <div>
        {/* Animated golden underline */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, var(--gold), rgba(201,168,76,0.1))',
            transformOrigin: 'left',
            marginBottom: '0.9rem',
          }}
        />

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.84rem' : '0.78rem',
          color: hovered ? 'rgba(245,240,232,0.6)' : 'rgba(245,240,232,0.28)',
          lineHeight: 1.65,
          fontWeight: 300,
          margin: 0,
          transition: 'color 0.38s',
        }}>
          {pillar.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
// Continue button
// ══════════════════════════════════════════════════════════
function ContinueBtn({ navigate }) {
  const { ref, inView } = useReveal(0.5)

  return (
    <motion.div
      ref={ref}
      variants={vFade} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.3}
      onClick={() => navigate(4)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.4rem', cursor: 'pointer',
        marginTop: '3rem', paddingBottom: '1rem',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        color: 'rgba(245,240,232,0.25)',
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
          width: '1px', height: '24px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.42))',
        }} />
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1l3 3 3-3" stroke="rgba(201,168,76,0.42)"
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
