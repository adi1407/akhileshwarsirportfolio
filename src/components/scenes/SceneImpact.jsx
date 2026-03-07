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
      {/* Fixed ambient particles */}
      <ThreeAmbient
        particleCount={isMobile ? 24 : 55}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Edge vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Gallery content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <OpeningSection isMobile={isMobile} isTablet={isTablet} />
        <InstallationSection panel={PANELS[0]} side="left"  isMobile={isMobile} isTablet={isTablet} />
        <InstallationSection panel={PANELS[1]} side="right" isMobile={isMobile} isTablet={isTablet} />
        <FoundationSection isMobile={isMobile} isTablet={isTablet} />
        <VisionSection isMobile={isMobile} isTablet={isTablet} />
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  OPENING — Full-viewport hero with spotlight
// ══════════════════════════════════════════════════════════
function OpeningSection({ isMobile, isTablet }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '4rem 1.6rem 3rem' : '4rem 3rem 3rem',
    }}>
      {/* Spotlight cone from top */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '320px' : '640px',
        height: isMobile ? '420px' : '760px',
        background: 'conic-gradient(from 90deg at 50% 0%, transparent 35%, rgba(201,168,76,0.06) 44%, rgba(201,168,76,0.12) 50%, rgba(201,168,76,0.06) 56%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Spotlight center glow */}
      <div style={{
        position: 'absolute',
        top: '-50px', left: '50%',
        transform: 'translateX(-50%)',
        width: '320px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.14) 0%, transparent 70%)',
        filter: 'blur(35px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px' }}>

        {/* Scene label */}
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
            marginBottom: '2.2rem',
          }}
        >
          05&nbsp;&nbsp;/&nbsp;&nbsp;Impact &amp; Legacy
        </motion.div>

        {/* Large title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(3.2rem, 13vw, 4.8rem)'
              : isTablet
              ? 'clamp(4.2rem, 8vw, 6.2rem)'
              : 'clamp(5.5rem, 9vw, 8rem)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '1.4rem',
          }}
        >
          Impact &amp;<br />
          <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Legacy</em>
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.52, ease }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            transformOrigin: 'center',
            maxWidth: '200px',
            margin: '0 auto 1.8rem',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            fontSize: isMobile ? '0.92rem' : '1.05rem',
            color: 'rgba(245,240,232,0.55)',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
          }}
        >
          Specializations — Where Expertise Meets Impact
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          style={{ marginTop: isMobile ? '2rem' : '2.5rem' }}
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              color: 'rgba(201,168,76,0.4)',
              userSelect: 'none',
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  INSTALLATION — Floating glass panel, alternating L / R
// ══════════════════════════════════════════════════════════
function InstallationSection({ panel, side, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useReveal(0.18)
  const isLeft = side === 'left'

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile || isTablet ? 'center' : isLeft ? 'flex-start' : 'flex-end',
        padding: isMobile ? '2rem 1.4rem' : isTablet ? '2.5rem 2.5rem' : '3rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow behind the panel */}
      <motion.div
        animate={inView ? { opacity: hovered ? 1 : 0.65 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          [isLeft ? 'left' : 'right']: isMobile ? '0' : '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: isMobile ? '100%' : '65%',
          height: '80%',
          background: `radial-gradient(ellipse 60% 60% at ${isLeft ? '25%' : '75%'} 50%, rgba(201,168,76,0.08) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Glass installation panel */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -90 : 90 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, ease }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -10 }}
        style={{
          position: 'relative', zIndex: 1,
          width: isMobile ? '100%' : isTablet ? '88%' : '52%',
          background: hovered ? 'rgba(16,13,5,0.97)' : 'rgba(11,9,4,0.84)',
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.48)' : 'rgba(201,168,76,0.14)'}`,
          borderRadius: isMobile ? '14px' : '20px',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          padding: isMobile ? '2.2rem 1.8rem' : isTablet ? '2.8rem 2.6rem' : '3.6rem 3.8rem',
          boxShadow: hovered
            ? '0 40px 100px rgba(0,0,0,0.72), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.22)'
            : '0 20px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(201,168,76,0.07)',
          transition: 'background 0.5s, border-color 0.5s, box-shadow 0.5s',
          overflow: 'hidden',
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: 'absolute',
          top: 0, left: '6%', width: '88%', height: '1.5px',
          background: `linear-gradient(90deg, transparent, rgba(201,168,76,${hovered ? '0.7' : '0.22'}), transparent)`,
          transition: 'background 0.5s',
        }} />

        {/* Large faint number */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile ? '5rem' : '9rem',
          fontWeight: 300,
          color: `rgba(201,168,76,${hovered ? '0.11' : '0.055'})`,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          marginBottom: isMobile ? '-1.2rem' : '-2.2rem',
          userSelect: 'none',
          transition: 'color 0.5s',
        }}>
          {panel.num}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(1.7rem, 6vw, 2.2rem)'
            : isTablet
            ? 'clamp(2rem, 4vw, 2.8rem)'
            : 'clamp(2.3rem, 3.5vw, 3.2rem)',
          fontWeight: 300,
          color: hovered ? 'var(--white)' : 'var(--white-dim)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          whiteSpace: 'pre-line',
          marginBottom: '1.4rem',
          transition: 'color 0.5s',
        }}>
          {panel.title}
        </div>

        {/* Gold accent line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.28, opacity: hovered ? 1 : 0.42 }}
          transition={{ duration: 0.5, ease }}
          style={{
            height: '1.5px',
            background: 'linear-gradient(90deg, var(--gold-bright), rgba(201,168,76,0.06))',
            transformOrigin: 'left',
            marginBottom: '1.8rem',
            maxWidth: '180px',
          }}
        />

        {/* Body text */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: isMobile ? '0.92rem' : '1.02rem',
          color: hovered ? 'var(--white)' : isMobile ? 'rgba(245,240,232,0.68)' : 'rgba(245,240,232,0.88)',
          lineHeight: 1.88,
          fontWeight: 300,
          margin: 0,
          transition: 'color 0.5s',
          maxWidth: '560px',
        }}>
          {panel.body}
        </p>
      </motion.div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  FOUNDATION — Centered philosophical pause
// ══════════════════════════════════════════════════════════
function FoundationSection({ isMobile, isTablet }) {
  const { ref, inView } = useReveal(0.2)

  return (
    <div
      ref={ref}
      style={{
        padding: isMobile ? '2.5rem 1.6rem' : isTablet ? '3rem 3rem' : '4rem 5rem',
        maxWidth: isMobile ? '100%' : isTablet ? '820px' : '1000px',
        margin: '0 auto',
        textAlign: isMobile ? 'left' : 'center',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        position: 'relative',
      }}
    >
      {/* Section label with flanking lines */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        marginBottom: isMobile ? '2rem' : '3.5rem',
        justifyContent: isMobile ? 'flex-start' : 'center',
      }}>
        {!isMobile && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease }}
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.32))',
              transformOrigin: 'right',
            }}
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: isMobile ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.82)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          The Foundation
        </motion.div>
        {!isMobile && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease }}
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(201,168,76,0.32), transparent)',
              transformOrigin: 'left',
            }}
          />
        )}
      </div>

      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay: 0.1, ease }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: isMobile
            ? 'clamp(1.8rem, 7vw, 2.5rem)'
            : isTablet
            ? 'clamp(2.2rem, 4vw, 3rem)'
            : 'clamp(2.8rem, 4vw, 3.8rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginBottom: isMobile ? '2rem' : '3rem',
        }}
      >
        Where Psychology<br />Meets{' '}
        <em style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>Leadership</em>
      </motion.h3>

      {/* Staggered sentences */}
      <div style={{
        maxWidth: isMobile ? '100%' : '640px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4em',
        textAlign: isMobile ? 'left' : 'center',
      }}>
        {LEGACY_PARA.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, delay: 0.28 + i * 0.18, ease }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isMobile ? '0.9rem' : '1.02rem',
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
  )
}

// ══════════════════════════════════════════════════════════
//  VISION — 4 rising pillar cards
// ══════════════════════════════════════════════════════════
function VisionSection({ isMobile, isTablet }) {
  const headRef  = useReveal(0.18)
  const tilesRef = useReveal(0.1)

  return (
    <div style={{
      padding: isMobile ? '2.5rem 1.5rem 4rem' : isTablet ? '3rem 3rem 5rem' : '4rem 5rem 6rem',
      maxWidth: isMobile ? '100%' : isTablet ? '900px' : '1080px',
      margin: '0 auto',
    }}>
      {/* Heading row */}
      <div style={{
        marginBottom: isMobile ? '2rem' : '3rem',
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
            fontSize: isMobile
              ? 'clamp(2.4rem, 9vw, 3.2rem)'
              : isTablet
              ? 'clamp(3rem, 5vw, 4rem)'
              : 'clamp(3.8rem, 5.5vw, 5rem)',
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

      {/* Pillar grid */}
      <div
        ref={tilesRef.ref}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: '1.2rem',
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

      {/* Description */}
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
