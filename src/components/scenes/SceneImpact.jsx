import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Content ──────────────────────────────────────────────
const PANELS = [
  {
    num: '01',
    title: 'Revenue Cycle\nManagement',
    body:
      'Mr. Singh recognised early that financial transparency is not a back-office function — it is the foundation of healthcare sustainability. His RCM work bridges administrative efficiency with clinical excellence, helping organisations reduce revenue leakage, accelerate collections, and maintain the financial health needed to keep patients at the centre.',
  },
  {
    num: '02',
    title: 'Entrepreneurship\n& Expansion',
    body:
      "A builder at heart, Mr. Singh continuously drives strategic planning, service expansion, and quality improvement across the organisations he leads. His newest ventures — including IUI Solutions' growing reproductive healthcare division — reflect a lifelong commitment to advancing access to specialised, high-quality treatment for those who need it most.",
  },
]

const TILES = [
  {
    num: '01',
    title: 'Active\nMentorship',
    desc: 'Developing the next generation of healthcare leaders.',
  },
  {
    num: '02',
    title: 'Institutional\nPartner',
    desc: 'Collaborating with healthcare organisations nationwide.',
  },
  {
    num: '03',
    title: 'Industry\nAdvocacy',
    desc: 'Championing efficient, ethical management at every level.',
  },
  {
    num: '04',
    title: 'Continuous\nInnovation',
    desc: 'Building ventures that advance care access and quality.',
  },
]

// ─── Helpers ──────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1]

function useReveal(amount = 0.18) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

const vUp = (inView, delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
  transition: { duration: 0.95, delay, ease },
})

const vFade = (inView, delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    inView ? { opacity: 1 } : { opacity: 0 },
  transition: { duration: 0.85, delay, ease: 'easeOut' },
})

// ─── Main ─────────────────────────────────────────────────
export default function SceneImpact({ navigate }) {
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
        'radial-gradient(ellipse 100% 55% at 50% 0%, #0b0a10 0%, #070608 50%, #030304 100%)',
    }}>

      {/* Ambient particles */}
      <ThreeAmbient
        particleCount={isMobile ? 28 : 60}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Top glow */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1100px', height: '380px',
        background:
          'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.52) 100%)',
      }} />

      {/* ── Scrollable column ── */}
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

        <SpecializationsSection isMobile={isMobile} isTablet={isTablet} />
        <VisionSection isMobile={isMobile} isTablet={isTablet} />
        <ContinueBtn navigate={navigate} />

      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  SECTION 1 — Specializations
// ══════════════════════════════════════════════════════════
function SpecializationsSection({ isMobile, isTablet }) {
  // Opening is always visible (animate on mount)
  return (
    <div style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.08 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          marginBottom: '1.6rem',
        }}
      >
        05&nbsp;&nbsp;/&nbsp;&nbsp;Impact &amp; Legacy
      </motion.div>

      {/* Rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
          transformOrigin: 'left',
          marginBottom: '2.6rem',
        }}
      />

      {/* Heading block */}
      <div style={{
        marginBottom: isMobile ? '3rem' : '5rem',
        display: isMobile || isTablet ? 'block' : 'flex',
        alignItems: 'flex-end',
        gap: '4rem',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.32, ease }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(2.2rem, 10vw, 3rem)'
              : isTablet
              ? 'clamp(3rem, 6vw, 4rem)'
              : 'clamp(3.8rem, 5.8vw, 5.2rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
            flex: '0 0 auto',
          }}
        >
          Speciali-<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>zations</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.52, ease }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'var(--white-muted)',
            lineHeight: 1.75,
            fontWeight: 300,
            maxWidth: '380px',
            marginTop: isMobile || isTablet ? '1.4rem' : 0,
            paddingBottom: isMobile || isTablet ? 0 : '0.6rem',
          }}
        >
          Where Expertise Meets Impact
        </motion.p>
      </div>

      {/* Panels */}
      {PANELS.map((panel, i) => (
        <FeaturePanel
          key={panel.num}
          panel={panel}
          index={i}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}
    </div>
  )
}

function FeaturePanel({ panel, index, isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.15)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      {...vUp(inView, 0.08 + index * 0.16)}
      style={{ marginBottom: index === 0 ? (isMobile ? '1.5rem' : '2rem') : 0 }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.32, ease }}
        style={{
          padding: isMobile ? '1.8rem 1.6rem' : isTablet ? '2.2rem' : '2.8rem 3rem',
          background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.72)',
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.14)'}`,
          borderRadius: '18px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: hovered
            ? '0 36px 90px rgba(0,0,0,0.68), 0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.14)'
            : '0 14px 52px rgba(0,0,0,0.42), inset 0 1px 0 rgba(201,168,76,0.06)',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '36% 1fr',
          gap: isMobile ? 0 : isTablet ? 0 : '3.5rem',
          alignItems: 'start',
          position: 'relative', overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: '6%', width: '88%', height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.55' : '0.22'}), transparent)`,
          transition: 'background 0.4s',
        }} />

        {/* Left: number + title */}
        <div style={{ marginBottom: isMobile || isTablet ? '1.4rem' : 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: hovered ? 'var(--gold-bright)' : 'var(--gold)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            transition: 'color 0.4s',
          }}>
            {panel.num}
          </div>

          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? '1.65rem' : isTablet ? '1.8rem' : 'clamp(1.8rem, 2.6vw, 2.4rem)',
            fontWeight: 300,
            color: hovered ? 'var(--white)' : 'var(--white-dim)',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            whiteSpace: 'pre-line',
            transition: 'color 0.4s',
          }}>
            {panel.title}
          </div>

          {/* Animated underline */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.42, ease }}
            style={{
              height: '1.5px',
              background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.08))',
              transformOrigin: 'left',
              marginTop: '1rem',
              maxWidth: '160px',
            }}
          />
        </div>

        {/* Right: body text */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.88rem' : '0.95rem',
          color: hovered ? 'var(--white-muted)' : 'rgba(245,240,232,0.52)',
          lineHeight: 1.85,
          fontWeight: 300,
          margin: 0,
          transition: 'color 0.4s',
        }}>
          {panel.body}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
//  SECTION 2 — Vision & Legacy
// ══════════════════════════════════════════════════════════
function VisionSection({ isMobile, isTablet }) {
  const headRef = useReveal(0.18)
  const paraRef = useReveal(0.18)
  const tilesRef = useReveal(0.1)

  return (
    <div style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>

      {/* Chapter divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        marginBottom: isMobile ? '3rem' : '5rem',
      }}>
        <motion.div
          {...vFade(headRef.inView, 0)}
          ref={headRef.ref}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'rgba(201,168,76,0.55)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Vision &amp; Legacy
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headRef.inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.35), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Heading + tagline */}
      <div style={{
        marginBottom: isMobile ? '3rem' : '5rem',
        display: isMobile || isTablet ? 'block' : 'flex',
        alignItems: 'flex-end',
        gap: '4rem',
      }}>
        <motion.h2
          {...vUp(headRef.inView, 0.1)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(2.2rem, 9vw, 3rem)'
              : isTablet
              ? 'clamp(2.8rem, 5vw, 3.8rem)'
              : 'clamp(3.5rem, 5.2vw, 4.8rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.028em',
            lineHeight: 1.08,
            flex: '0 0 auto',
          }}
        >
          Vision &amp;<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Legacy</em>
        </motion.h2>

        <motion.p
          {...vUp(headRef.inView, 0.26)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'var(--gold)',
            lineHeight: 1.75,
            fontWeight: 300,
            maxWidth: '320px',
            marginTop: isMobile || isTablet ? '1.4rem' : 0,
            paddingBottom: isMobile || isTablet ? 0 : '0.5rem',
            letterSpacing: '0.04em',
          }}
        >
          Mentoring. Collaborating. Advocating.
        </motion.p>
      </div>

      {/* Central paragraph */}
      <div
        ref={paraRef.ref}
        style={{
          marginBottom: isMobile ? '3.5rem' : '5.5rem',
          paddingBottom: isMobile ? '3.5rem' : '5.5rem',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          maxWidth: isMobile ? '100%' : '680px',
          position: 'relative',
        }}
      >
        {/* Gold bar accent on desktop */}
        {!isMobile && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={paraRef.inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            style={{
              position: 'absolute', left: '-2.5rem', top: '4px',
              width: '2px', height: 'calc(100% - 4px)',
              background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.08))',
              transformOrigin: 'top',
            }}
          />
        )}

        <motion.p
          {...vUp(paraRef.inView, 0.12)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile ? '0.92rem' : '1rem',
            color: 'var(--white-muted)',
            lineHeight: 1.9,
            fontWeight: 300,
            margin: 0,
          }}
        >
          Akhileshwar K. Singh's legacy is measured not in titles alone, but in the
          professionals he has mentored, the institutions he has strengthened, and the
          systems he has reformed. He remains an active voice in the healthcare community
          — and his work with IUI Solutions is the latest expression of his enduring
          mission: to leave healthcare better than he found it.
        </motion.p>
      </div>

      {/* Tiles */}
      <div ref={tilesRef.ref}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : isTablet
            ? '1fr 1fr'
            : '1fr 1fr 1fr 1fr',
          gap: isMobile ? '1.2rem' : '1.2rem',
        }}>
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.num}
              {...vUp(tilesRef.inView, 0.06 + i * 0.14)}
            >
              <LegacyTile tile={tile} isMobile={isMobile} isTablet={isTablet} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LegacyTile({ tile, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.32, ease }}
      style={{
        padding: isMobile ? '1.6rem' : isTablet ? '1.8rem' : '2.2rem 1.8rem',
        background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.68)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.42)' : 'rgba(201,168,76,0.11)'}`,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.14)'
          : '0 10px 38px rgba(0,0,0,0.38), inset 0 1px 0 rgba(201,168,76,0.05)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 'auto' : '180px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.55' : '0.18'}), transparent)`,
        transition: 'background 0.4s',
      }} />

      {/* Faint background number */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '0.8rem' : '0.9rem',
        top: isMobile ? '0.6rem' : '0.8rem',
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '4.5rem' : '6rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.055'})`,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        userSelect: 'none',
        transition: 'color 0.4s',
        pointerEvents: 'none',
      }}>
        {tile.num}
      </div>

      {/* Top content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile ? '1.45rem' : isTablet ? '1.4rem' : 'clamp(1.25rem, 1.8vw, 1.5rem)',
          fontWeight: 300,
          color: hovered ? 'var(--white)' : 'var(--white-dim)',
          lineHeight: 1.12,
          letterSpacing: '-0.018em',
          whiteSpace: 'pre-line',
          transition: 'color 0.4s',
        }}>
          {tile.title}
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Gold underline */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginBottom: '0.85rem',
          }}
        />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.82rem' : '0.76rem',
          color: hovered ? 'var(--white-muted)' : 'rgba(245,240,232,0.3)',
          lineHeight: 1.65,
          fontWeight: 300,
          margin: 0,
          transition: 'color 0.4s',
        }}>
          {tile.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Continue ─────────────────────────────────────────────
function ContinueBtn({ navigate }) {
  const { ref, inView } = useReveal(0.5)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.85, delay: 0.3 }}
      onClick={() => navigate(6)}
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
        Continue
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
