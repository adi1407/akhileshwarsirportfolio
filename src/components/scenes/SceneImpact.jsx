import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
  { num: '01', title: 'Active\nMentorship',   desc: 'Developing the next generation of healthcare leaders.' },
  { num: '02', title: 'Institutional\nPartner', desc: 'Collaborating with healthcare organisations nationwide.' },
  { num: '03', title: 'Industry\nAdvocacy',    desc: 'Championing efficient, ethical management at every level.' },
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
  const scrollRef = useRef(null)

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
      background: 'radial-gradient(ellipse 100% 55% at 50% 0%, #0b0a10 0%, #07060a 55%, #030304 100%)',
    }} ref={scrollRef}>

      {/* Fixed ambient layers */}
      <ThreeAmbient
        particleCount={isMobile ? 24 : 55}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1200px', height: '420px',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SpecializationsSection isMobile={isMobile} isTablet={isTablet} scrollRef={scrollRef} />
        <BridgeSection isMobile={isMobile} isTablet={isTablet} />
        <VisionSection isMobile={isMobile} isTablet={isTablet} />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  SECTION 1 — Full-screen split columns
// ══════════════════════════════════════════════════════════
function SpecializationsSection({ isMobile, isTablet, scrollRef }) {
  // Scroll-parallax: columns drift apart as user scrolls
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, container: scrollRef, offset: ['start start', 'end start'] })
  const leftX   = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '-6%'])
  const rightX  = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '6%'])
  const fade    = useTransform(scrollYProgress, [0, 0.7], [1, 0.35])

  return (
    <div
      ref={ref}
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile ? '4.5rem 1.5rem 3rem' : isTablet ? '5rem 3rem 4rem' : '6rem 5rem 5rem',
        maxWidth: isMobile ? '100%' : isTablet ? '900px' : '1080px',
        margin: '0 auto',
      }}
    >
      {/* Opening header */}
      <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          05&nbsp;&nbsp;/&nbsp;&nbsp;Impact &amp; Legacy
        </motion.div>

        {/* Animated gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease }}
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.04))',
            transformOrigin: 'left',
            marginBottom: '2.8rem',
          }}
        />

        <div style={{
          display: isMobile || isTablet ? 'block' : 'flex',
          alignItems: 'flex-end',
          gap: '4rem',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.2rem)' : isTablet ? 'clamp(3rem, 6vw, 4.2rem)' : 'clamp(4rem, 6vw, 5.5rem)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '-0.032em',
              lineHeight: 1.05,
              flex: '0 0 auto',
            }}
          >
            Speciali-<br />
            <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>zations</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontStyle: 'italic',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: 'var(--white-muted)',
              lineHeight: 1.75,
              maxWidth: '340px',
              marginTop: isMobile || isTablet ? '1.2rem' : 0,
              paddingBottom: '0.5rem',
            }}
          >
            Where Expertise Meets Impact
          </motion.p>
        </div>
      </div>

      {/* Two panels — with scroll parallax on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '1.2rem' : '0',
        position: 'relative',
      }}>
        {/* Center divider on desktop */}
        {!isMobile && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease }}
            style={{
              position: 'absolute',
              left: '50%', top: '8%', bottom: '8%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.28), transparent)',
              transformOrigin: 'top',
              zIndex: 1, pointerEvents: 'none',
            }}
          />
        )}

        {/* Left panel */}
        <motion.div style={{ x: leftX, opacity: fade }}>
          <ExpertisePanel
            panel={PANELS[0]}
            side="left"
            isMobile={isMobile}
            isTablet={isTablet}
            animDelay={0.7}
          />
        </motion.div>

        {/* Right panel */}
        <motion.div style={{ x: rightX, opacity: fade }}>
          <ExpertisePanel
            panel={PANELS[1]}
            side="right"
            isMobile={isMobile}
            isTablet={isTablet}
            animDelay={0.88}
          />
        </motion.div>
      </div>
    </div>
  )
}

function ExpertisePanel({ panel, side, isMobile, isTablet, animDelay }) {
  const [hovered, setHovered] = useState(false)
  const pad = isMobile
    ? '1.8rem 1.6rem'
    : isTablet
    ? '2.2rem 2rem'
    : side === 'left'
    ? '2.8rem 3rem 2.8rem 0'
    : '2.8rem 0 2.8rem 3rem'

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: animDelay, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: pad,
        background: isMobile || isTablet
          ? (hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.72)')
          : 'transparent',
        border: isMobile || isTablet
          ? `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`
          : 'none',
        borderRadius: isMobile || isTablet ? '16px' : 0,
        backdropFilter: isMobile || isTablet ? 'blur(20px)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
        cursor: 'default',
      }}
    >
      {/* Large faint background number */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '4rem' : isTablet ? '5rem' : '8rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.055'})`,
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
        fontSize: isMobile ? '1.65rem' : isTablet ? '1.85rem' : 'clamp(1.9rem, 2.8vw, 2.6rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'var(--white-dim)',
        lineHeight: 1.1,
        letterSpacing: '-0.022em',
        whiteSpace: 'pre-line',
        marginBottom: '1.2rem',
        transition: 'color 0.4s',
      }}>
        {panel.title}
      </div>

      {/* Animated underline */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
          transformOrigin: 'left',
          marginBottom: '1.3rem',
        }}
      />

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: isMobile ? '0.88rem' : '0.96rem',
        color: hovered ? 'var(--white)' : isMobile ? 'rgba(245,240,232,0.62)' : 'rgba(245,240,232,0.85)',
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
//  SECTION 2 — Bridge / Psychology
// ══════════════════════════════════════════════════════════
function BridgeSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.2)

  const sentences = LEGACY_PARA

  return (
    <div
      ref={ref}
      style={{
        padding: isMobile ? '4rem 1.5rem' : isTablet ? '5rem 3rem' : '7rem 5rem',
        maxWidth: isMobile ? '100%' : isTablet ? '900px' : '1080px',
        margin: '0 auto',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Section divider label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: isMobile || isTablet ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.82)',
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
          transition={{ duration: 0.9, delay: 0.15, ease }}
          style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.32), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      <div style={{
        display: isMobile || isTablet ? 'block' : 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
      }}>
        {/* Left: heading */}
        <motion.h3
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.1, ease }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'clamp(1.7rem, 7vw, 2.3rem)' : isTablet ? 'clamp(2rem, 4vw, 2.8rem)' : 'clamp(2.3rem, 3.5vw, 3.2rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginBottom: isMobile || isTablet ? '1.5rem' : 0,
          }}
        >
          Where Psychology<br />Meets{' '}
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Leadership</em>
        </motion.h3>

        {/* Right: staggered sentences */}
        <div style={{ position: 'relative', paddingLeft: !isMobile && !isTablet ? '2rem' : 0 }}>
          {!isMobile && !isTablet && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease }}
              style={{
                position: 'absolute', left: 0, top: '3px',
                width: '2px', height: 'calc(100% - 3px)',
                background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.08))',
                transformOrigin: 'top',
              }}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
            {sentences.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.18, ease }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: isMobile ? 'var(--white-muted)' : 'rgba(245,240,232,0.88)',
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
//  SECTION 3 — Vision & Legacy with rising pillars
// ══════════════════════════════════════════════════════════
function VisionSection({ isMobile, isTablet }) {
  const headRef = useReveal(0.18)
  const tilesRef = useReveal(0.1)

  return (
    <div style={{
      padding: isMobile ? '4rem 1.5rem 7rem' : isTablet ? '5rem 3rem 8rem' : '7rem 5rem 9rem',
      maxWidth: isMobile ? '100%' : isTablet ? '900px' : '1080px',
      margin: '0 auto',
    }}>

      {/* Heading */}
      <div style={{
        marginBottom: isMobile ? '3rem' : '5rem',
        display: isMobile || isTablet ? 'block' : 'flex',
        alignItems: 'flex-end',
        gap: '4rem',
      }}>
        <motion.h2
          ref={headRef.ref}
          initial={{ opacity: 0, y: 40 }}
          animate={headRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.05, ease }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.2rem)' : isTablet ? 'clamp(3rem, 5vw, 4rem)' : 'clamp(3.8rem, 5.5vw, 5rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1.07,
            flex: '0 0 auto',
          }}
        >
          Vision &amp;<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Legacy</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headRef.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.22, ease }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            lineHeight: 1.75,
            maxWidth: '300px',
            marginTop: isMobile || isTablet ? '1.2rem' : 0,
            paddingBottom: '0.5rem',
          }}
        >
          Mentoring. Collaborating. Advocating.
        </motion.p>
      </div>

      {/* Pillars — rise from bottom */}
      <div
        ref={tilesRef.ref}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: isMobile ? '1.2rem' : '1.2rem',
        }}
      >
        {TILES.map((tile, i) => (
          <PillarTile
            key={tile.num}
            tile={tile}
            inView={tilesRef.inView}
            delay={0.06 + i * 0.15}
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
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -7 }}
      style={{
        padding: isMobile ? '1.7rem 1.5rem' : isTablet ? '2rem 1.8rem' : '2.4rem 2rem',
        background: hovered ? 'rgba(16,12,4,0.96)' : 'rgba(10,8,3,0.7)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.42)' : 'rgba(201,168,76,0.11)'}`,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.14)'
          : '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.05)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 'auto' : '190px',
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
        position: 'absolute', right: '0.9rem', top: '0.7rem',
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '4.5rem' : '6rem',
        fontWeight: 300,
        color: `rgba(201,168,76,${hovered ? '0.1' : '0.055'})`,
        lineHeight: 1, letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none',
        transition: 'color 0.4s',
      }}>
        {tile.num}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile ? '1.45rem' : isTablet ? '1.4rem' : 'clamp(1.25rem, 1.8vw, 1.5rem)',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'var(--white-dim)',
        lineHeight: 1.12,
        letterSpacing: '-0.018em',
        whiteSpace: 'pre-line',
        position: 'relative', zIndex: 1,
        transition: 'color 0.4s',
      }}>
        {tile.title}
      </div>

      {/* Description area */}
      <div style={{ position: 'relative', zIndex: 1 }}>
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
          fontSize: isMobile ? '0.82rem' : '0.8rem',
          color: hovered ? 'var(--white)' : isMobile ? 'rgba(245,240,232,0.55)' : 'rgba(245,240,232,0.75)',
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

