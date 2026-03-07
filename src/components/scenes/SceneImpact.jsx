import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Content ──────────────────────────────────────────────
const PANELS = [
  {
    num: '01',
    title: 'Revenue Cycle\nManagement',
    body: 'Mr. Singh recognised early that financial transparency is not a back-office function — it is the foundation of healthcare sustainability. His RCM work bridges administrative efficiency with clinical excellence, helping organisations reduce revenue leakage, accelerate collections, and maintain the financial health needed to keep patients at the centre.',
  },
  {
    num: '02',
    title: 'Entrepreneurship\n& Expansion',
    body: "A builder at heart, Mr. Singh continuously drives strategic planning, service expansion, and quality improvement across the organisations he leads. His newest ventures — including IUI Solutions' growing reproductive healthcare division — reflect a lifelong commitment to advancing access to specialised, high-quality treatment for those who need it most.",
  },
]

const LEGACY_PARA = [
  "Akhileshwar K. Singh's legacy is measured not in titles alone, but in the professionals he has mentored,",
  "the institutions he has strengthened, and the systems he has reformed.",
  "He remains an active voice in the healthcare community — and his work with IUI Solutions is the latest expression",
  "of his enduring mission: to leave healthcare better than he found it.",
]

const TILES = [
  { num: '01', title: 'Active\nMentorship',    desc: 'Developing the next generation of healthcare leaders.' },
  { num: '02', title: 'Institutional\nPartner', desc: 'Collaborating with healthcare organisations nationwide.' },
  { num: '03', title: 'Industry\nAdvocacy',     desc: 'Championing efficient, ethical management at every level.' },
  { num: '04', title: 'Continuous\nInnovation', desc: 'Building ventures that advance care access and quality.' },
]

const ease = [0.16, 1, 0.3, 1]

function useReveal(amount = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

// ─── Main ─────────────────────────────────────────────────
export default function SceneImpact() {
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
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden auto',
      background: 'linear-gradient(170deg, #07060c 0%, #050508 50%, #040407 100%)',
    }}>
      <ThreeAmbient
        particleCount={isMobile ? 24 : 55}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <HeaderSection isMobile={isMobile} isTablet={isTablet} />
        <PanelsSection isMobile={isMobile} isTablet={isTablet} />
        <FoundationSection isMobile={isMobile} isTablet={isTablet} />
        <VisionSection isMobile={isMobile} isTablet={isTablet} />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  HEADER — Compact scene intro
// ══════════════════════════════════════════════════════════
function HeaderSection({ isMobile, isTablet }) {
  const maxW = isMobile ? '100%' : isTablet ? '820px' : '1080px'
  return (
    <div style={{
      maxWidth: maxW,
      margin: '0 auto',
      padding: isMobile ? '3.5rem 1.5rem 2rem' : isTablet ? '4rem 3rem 2.5rem' : '4.5rem 5rem 2.5rem',
      position: 'relative',
    }}>
      {/* Spotlight glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '300px' : '700px',
        height: isMobile ? '200px' : '340px',
        background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            marginBottom: isMobile ? '1.2rem' : '1.5rem',
          }}
        >
          05&nbsp;&nbsp;/&nbsp;&nbsp;Impact &amp; Legacy
        </motion.div>

        <div style={{
          display: isMobile ? 'block' : 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile
                ? 'clamp(2.8rem, 11vw, 4rem)'
                : isTablet
                ? 'clamp(3.5rem, 7vw, 5rem)'
                : 'clamp(4rem, 6.5vw, 6rem)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Impact &amp;<br />
            <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Legacy</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontStyle: 'italic',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: 'rgba(245,240,232,0.52)',
              lineHeight: 1.7,
              maxWidth: '320px',
              marginTop: isMobile ? '0.8rem' : 0,
              paddingBottom: isMobile ? 0 : '0.4rem',
              flexShrink: 0,
            }}
          >
            Specializations —<br />Where Expertise Meets Impact
          </motion.p>
        </div>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginTop: isMobile ? '1.5rem' : '2rem',
          }}
        />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  PANELS — Side-by-side glass cards (desktop) / stacked (mobile)
// ══════════════════════════════════════════════════════════
function PanelsSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.12)
  const maxW = isMobile ? '100%' : isTablet ? '820px' : '1080px'

  return (
    <div
      ref={ref}
      style={{
        maxWidth: maxW,
        margin: '0 auto',
        padding: isMobile ? '1.5rem 1.5rem 2rem' : isTablet ? '2rem 3rem 2.5rem' : '2rem 5rem 3rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '1.2rem' : '1.5rem',
      }}
    >
      {PANELS.map((panel, i) => (
        <GlassPanel
          key={panel.num}
          panel={panel}
          inView={inView}
          delay={i * 0.14}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}
    </div>
  )
}

function GlassPanel({ panel, inView, delay, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        background: hovered ? 'rgba(16,13,5,0.97)' : 'rgba(11,9,4,0.82)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.13)'}`,
        borderRadius: isMobile ? '14px' : '18px',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        padding: isMobile ? '1.8rem 1.6rem' : isTablet ? '2.2rem 2rem' : '2.6rem 2.8rem',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.68), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.2)'
          : '0 14px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(201,168,76,0.07)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute',
        top: 0, left: '6%', width: '88%', height: '1.5px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.65' : '0.2'}), transparent)`,
        transition: 'background 0.4s',
      }} />

      {/* Faint number */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '4.5rem' : '7rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.05'})`,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        marginBottom: isMobile ? '-1rem' : '-1.8rem',
        userSelect: 'none',
        transition: 'color 0.4s',
      }}>
        {panel.num}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? 'clamp(1.5rem, 5.5vw, 1.9rem)' : isTablet ? '1.75rem' : 'clamp(1.75rem, 2.2vw, 2.2rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'var(--white-dim)',
        lineHeight: 1.08,
        letterSpacing: '-0.022em',
        whiteSpace: 'pre-line',
        marginBottom: '1rem',
        transition: 'color 0.4s',
      }}>
        {panel.title}
      </div>

      {/* Gold accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0.25, opacity: hovered ? 1 : 0.38 }}
        transition={{ duration: 0.45, ease }}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
          transformOrigin: 'left',
          marginBottom: '1.2rem',
          maxWidth: '140px',
        }}
      />

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: isMobile ? '0.88rem' : '0.96rem',
        color: hovered ? 'var(--white)' : isMobile ? 'rgba(245,240,232,0.68)' : 'rgba(245,240,232,0.86)',
        lineHeight: 1.85,
        fontWeight: 300,
        margin: 0,
        transition: 'color 0.4s',
      }}>
        {panel.body}
      </p>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════
//  FOUNDATION — Centered philosophical pause
// ══════════════════════════════════════════════════════════
function FoundationSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.2)
  const maxW = isMobile ? '100%' : isTablet ? '820px' : '1080px'

  return (
    <div
      ref={ref}
      style={{
        maxWidth: maxW,
        margin: '0 auto',
        padding: isMobile ? '2rem 1.5rem' : isTablet ? '2.5rem 3rem' : '3rem 5rem',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div style={{ display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

        {/* Left: heading */}
        <div>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: isMobile ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.82)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              The Foundation
            </motion.div>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease }}
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)',
                transformOrigin: 'left',
              }}
            />
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile
                ? 'clamp(1.7rem, 6.5vw, 2.3rem)'
                : isTablet
                ? 'clamp(2rem, 3.5vw, 2.6rem)'
                : 'clamp(2.2rem, 3vw, 3rem)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '-0.022em',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: isMobile ? '1.5rem' : 0,
            }}
          >
            Where Psychology<br />Meets{' '}
            <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Leadership</em>
          </motion.h3>
        </div>

        {/* Right: sentences */}
        <div style={{
          paddingLeft: !isMobile && !isTablet ? '1.5rem' : 0,
          borderLeft: !isMobile && !isTablet ? '2px solid linear-gradient(to bottom, var(--gold), transparent)' : 'none',
          position: 'relative',
        }}>
          {!isMobile && !isTablet && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.15, ease }}
              style={{
                position: 'absolute', left: 0, top: '2px',
                width: '2px', height: 'calc(100% - 2px)',
                background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.06))',
                transformOrigin: 'top',
              }}
            />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35em' }}>
            {LEGACY_PARA.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.7, delay: 0.22 + i * 0.15, ease }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: isMobile ? '0.9rem' : '0.98rem',
                  color: isMobile ? 'var(--white-muted)' : 'rgba(245,240,232,0.86)',
                  lineHeight: 1.82,
                  fontWeight: 300,
                  display: 'block',
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  VISION — 4 rising pillar cards
// ══════════════════════════════════════════════════════════
function VisionSection({ isMobile, isTablet }) {
  const headRef  = useReveal(0.18)
  const tilesRef = useReveal(0.1)
  const maxW = isMobile ? '100%' : isTablet ? '820px' : '1080px'

  return (
    <div style={{
      maxWidth: maxW,
      margin: '0 auto',
      padding: isMobile ? '2rem 1.5rem 4rem' : isTablet ? '2.5rem 3rem 5rem' : '3rem 5rem 5rem',
    }}>
      {/* Heading */}
      <div style={{
        marginBottom: isMobile ? '1.5rem' : '2rem',
        display: isMobile ? 'block' : 'flex',
        alignItems: 'flex-end',
        gap: '3rem',
      }}>
        <motion.h2
          ref={headRef.ref}
          initial={{ opacity: 0, y: 32 }}
          animate={headRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.05, ease }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(2rem, 8vw, 2.8rem)'
              : isTablet
              ? 'clamp(2.5rem, 4.5vw, 3.4rem)'
              : 'clamp(3rem, 4.5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1.07,
            flex: '0 0 auto',
            margin: 0,
          }}
        >
          Vision &amp;<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Legacy</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.88rem' : '0.96rem',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
            maxWidth: '280px',
            marginTop: isMobile ? '0.8rem' : 0,
            paddingBottom: '0.3rem',
          }}
        >
          Mentoring. Collaborating. Advocating.
        </motion.p>
      </div>

      {/* Pillar grid */}
      <div
        ref={tilesRef.ref}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: isMobile ? '0.9rem' : '1.1rem',
        }}
      >
        {TILES.map((tile, i) => (
          <PillarTile
            key={tile.num}
            tile={tile}
            inView={tilesRef.inView}
            delay={0.05 + i * 0.12}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ))}
      </div>
    </div>
  )
}

function PillarTile({ tile, inView, delay, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      style={{
        padding: isMobile ? '1.3rem 1.1rem' : isTablet ? '1.7rem 1.5rem' : '2rem 1.8rem',
        background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.7)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.42)' : 'rgba(201,168,76,0.11)'}`,
        borderRadius: '14px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? '0 24px 64px rgba(0,0,0,0.62), inset 0 1px 0 rgba(201,168,76,0.14)'
          : '0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(201,168,76,0.05)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isMobile ? '140px' : '170px',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', width: '84%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.55' : '0.16'}), transparent)`,
        transition: 'background 0.4s',
      }} />

      {/* Faint number */}
      <div style={{
        position: 'absolute', right: '0.7rem', top: '0.5rem',
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '3.8rem' : '5.5rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.05'})`,
        lineHeight: 1, letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none',
        transition: 'color 0.4s',
      }}>
        {tile.num}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '1.1rem' : isTablet ? '1.25rem' : 'clamp(1.1rem, 1.5vw, 1.35rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'var(--white-dim)',
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        whiteSpace: 'pre-line',
        position: 'relative', zIndex: 1,
        transition: 'color 0.4s',
      }}>
        {tile.title}
      </div>

      {/* Description */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginBottom: '0.6rem',
          }}
        />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.75rem' : '0.78rem',
          color: hovered ? 'var(--white)' : isMobile ? 'rgba(245,240,232,0.52)' : 'rgba(245,240,232,0.72)',
          lineHeight: 1.6,
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
