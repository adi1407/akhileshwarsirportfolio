import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// ─── Award data ─────────────────────────────────────────────
const AWARDS_STATIC = [
  {
    _id: '1',
    title: 'Healthcare Innovation Award',
    year: '2023',
    organization: 'Digital Health Summit',
    category: 'RECOGNITION',
    description: 'Recognized for pioneering patient engagement technology that improved adherence rates by 47% across three major health systems, setting a new benchmark for digital therapeutics design.',
    accentColor: '#c9a84c',
  },
  {
    _id: '2',
    title: 'Excellence in Health Technology',
    year: '2022',
    organization: 'MedTech Leadership Council',
    category: 'EXCELLENCE',
    description: 'Awarded for building interoperability infrastructure connecting 12 disparate EHR systems, enabling seamless longitudinal patient records for the first time across a regional health network.',
    accentColor: '#d4af37',
  },
]

// ─── Award SVG icons ─────────────────────────────────────────
function AwardIcon({ category, size = 44 }) {
  const s = { width: size, height: size, flexShrink: 0 }
  if (category === 'RECOGNITION')
    return (
      <svg viewBox="0 0 44 44" fill="none" style={s}>
        <polygon points="22,4 40,14 40,30 22,40 4,30 4,14"
          stroke="currentColor" strokeWidth="0.9" />
        <polygon points="22,10 34,17 34,27 22,34 10,27 10,17"
          stroke="currentColor" strokeWidth="0.45" opacity="0.45" />
        <circle cx="22" cy="22" r="3.5" fill="currentColor" opacity="0.7" />
      </svg>
    )
  if (category === 'EXCELLENCE')
    return (
      <svg viewBox="0 0 44 44" fill="none" style={s}>
        <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="22" cy="22" r="4" fill="currentColor" opacity="0.7" />
        {[0, 60, 120, 180, 240, 300].map(a => {
          const r1 = 14, r2 = 19
          const rad = a * Math.PI / 180
          return (
            <line key={a}
              x1={22 + r1 * Math.cos(rad)} y1={22 + r1 * Math.sin(rad)}
              x2={22 + r2 * Math.cos(rad)} y2={22 + r2 * Math.sin(rad)}
              stroke="currentColor" strokeWidth="0.9"
            />
          )
        })}
      </svg>
    )
  if (category === 'DESIGN')
    return (
      <svg viewBox="0 0 44 44" fill="none" style={s}>
        <path d="M8,36 L22,5 L36,36 Z" stroke="currentColor" strokeWidth="0.9" />
        <line x1="13" y1="27" x2="31" y2="27" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="22" cy="22" r="2.5" fill="currentColor" opacity="0.7" />
      </svg>
    )
  return (
    <svg viewBox="0 0 44 44" fill="none" style={s}>
      <polygon
        points="22,4 26,16 40,16 29,24 33,37 22,30 11,37 15,24 4,16 18,16"
        stroke="currentColor" strokeWidth="0.9"
      />
    </svg>
  )
}

// ─── Examination modal ────────────────────────────────────────
function ExaminationRoom({ award, onClose }) {
  const lines = award.description.split('. ').filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(3,2,2,0.96)',
        backdropFilter: 'blur(24px)',
        zIndex: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={onClose}
    >
      {/* Spotlight halo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 45% 55% at 50% 42%,
          ${award.accentColor}18 0%, ${award.accentColor}06 40%, transparent 70%)`,
      }} />

      {/* Ring ripple */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0.7 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '80px', height: '80px',
          border: `1px solid ${award.accentColor}`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.82, y: 28, opacity: 0, filter: 'blur(8px)' }}
        animate={{ scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ scale: 0.88, y: -16, opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '540px', width: '100%',
          background: 'rgba(10,8,4,0.9)',
          border: `1px solid ${award.accentColor}28`,
          backdropFilter: 'blur(20px)',
          borderRadius: '10px',
          padding: '2.8rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${award.accentColor}60, transparent)`,
        }} />

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: award.accentColor, marginBottom: '1.6rem', display: 'flex' }}
        >
          <AwardIcon category={award.category} size={48} />
        </motion.div>

        {/* Category + year */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: award.accentColor, textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}
        >
          {award.category}&nbsp;&nbsp;—&nbsp;&nbsp;{award.year}
        </motion.div>

        {/* Title word-by-word */}
        <div style={{ marginBottom: '0.3rem' }}>
          {award.title.split(' ').map((word, wi) => (
            <motion.span
              key={wi}
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.38 + wi * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)',
                fontWeight: 300,
                color: 'var(--white)',
                marginRight: '0.25em',
                lineHeight: 1.2,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Gold underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px', width: '50%',
            background: `linear-gradient(90deg, ${award.accentColor}, transparent)`,
            transformOrigin: 'left', marginBottom: '0.8rem',
          }}
        />

        {/* Organization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
            color: 'var(--white-muted)', fontWeight: 300,
            marginBottom: '1.6rem', letterSpacing: '0.04em',
          }}
        >
          {award.organization}
        </motion.div>

        {/* Description */}
        <div style={{ borderTop: `1px solid ${award.accentColor}18`, paddingTop: '1.4rem' }}>
          {lines.map((line, li) => (
            <motion.p
              key={li}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.82 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.83rem',
                color: 'var(--white-dim)', lineHeight: 1.72,
                fontWeight: 300,
                marginBottom: li < lines.length - 1 ? '0.6rem' : 0,
              }}
            >
              {line}{line.endsWith('.') ? '' : '.'}
            </motion.p>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.4rem', right: '1.4rem',
            width: '30px', height: '30px',
            background: 'none', border: `1px solid ${award.accentColor}22`,
            borderRadius: '50%', color: 'var(--white-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = award.accentColor
            e.currentTarget.style.color = award.accentColor
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${award.accentColor}22`
            e.currentTarget.style.color = 'var(--white-muted)'
          }}
        >
          ×
        </button>
      </motion.div>

      {/* ESC hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: '2rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: 'rgba(245,240,232,0.2)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}
      >
        Click anywhere or press ESC to return
      </motion.div>
    </motion.div>
  )
}

// ─── Single plaque card ───────────────────────────────────────
function PlaqueCard({ award, relIdx, onClick, prefersReduced, isMobile, isRevealed }) {
  const W = isMobile ? 220 : 280
  const H = isMobile ? 310 : 390

  const isFocused = relIdx === 0
  const absRel = Math.abs(relIdx)

  const scale   = isFocused ? 1 : absRel === 1 ? 0.82 : 0.66
  const opacity = isFocused ? 1 : absRel === 1 ? 0.52 : 0.2
  const blur    = isFocused ? 0 : absRel === 1 ? 0.6 : 2.4
  const brightness = isFocused ? 1 : absRel === 1 ? 0.62 : 0.3

  const STEP = isMobile ? 240 : 310
  const xOffset = relIdx * STEP

  return (
    <motion.div
      animate={prefersReduced
        ? { x: xOffset, opacity: isRevealed ? opacity : 0 }
        : {
            x: xOffset,
            scale,
            opacity: isRevealed ? opacity : 0,
            filter: `blur(${blur}px) brightness(${brightness})`,
          }
      }
      transition={{ duration: 0.68, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: W, height: H,
        left: '50%',
        marginLeft: -W / 2,
        top: '50%',
        marginTop: -H / 2 - (isMobile ? 30 : 40),
        cursor: isFocused ? 'zoom-in' : 'pointer',
        zIndex: isFocused ? 10 : 5 - absRel,
      }}
    >
      {/* Glass plaque */}
      <div
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(160deg, rgba(20,16,8,0.75) 0%, rgba(8,6,3,0.92) 100%)',
          border: `1px solid rgba(201,168,76,${isFocused ? 0.35 : 0.1})`,
          backdropFilter: 'blur(12px)',
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.6s ease',
          boxShadow: isFocused
            ? `0 32px 90px rgba(0,0,0,0.8), 0 0 60px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.08)`
            : '0 16px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top gold rim — draws on reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${award.accentColor}80 30%, ${award.accentColor} 50%, ${award.accentColor}80 70%, transparent)`,
            transformOrigin: 'left',
          }}
        />

        {/* Glass reflection diagonal */}
        <div style={{
          position: 'absolute', top: 0, left: '-60%',
          width: '80%', height: '100%',
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.022) 50%, transparent 60%)',
          transform: 'skewX(-12deg)',
          pointerEvents: 'none',
        }} />

        {/* Bottom vignette */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to top, rgba(4,3,2,0.65), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '1.6rem 1.4rem' : '2rem 1.8rem',
          gap: isMobile ? '0.9rem' : '1.1rem',
        }}>
          {/* Icon */}
          <div style={{
            color: award.accentColor,
            opacity: isFocused ? 0.92 : 0.6,
            transition: 'opacity 0.6s',
          }}>
            <AwardIcon category={award.category} size={isMobile ? 38 : 48} />
          </div>

          {/* Category tag */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? '0.54rem' : '0.6rem',
            color: award.accentColor,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            opacity: isFocused ? 0.9 : 0.55,
            transition: 'opacity 0.6s',
            textAlign: 'center',
          }}>
            {award.category}
          </div>

          {/* Divider */}
          <div style={{
            width: isFocused ? '60%' : '35%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${award.accentColor}50, transparent)`,
            transition: 'width 0.6s ease',
          }} />

          {/* Title */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? '0.82rem' : 'clamp(0.85rem, 1.15vw, 1.05rem)',
            fontWeight: 300,
            color: isFocused ? 'var(--white)' : 'var(--white-muted)',
            lineHeight: 1.32,
            textAlign: 'center',
            transition: 'color 0.6s',
          }}>
            {award.title}
          </div>

          {/* Year */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? '0.64rem' : '0.7rem',
            color: 'rgba(245,240,232,0.28)',
            letterSpacing: '0.2em',
          }}>
            {award.year}
          </div>
        </div>

        {/* Focus: breathing base glow */}
        {isFocused && (
          <motion.div
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: '-1px', left: '15%', right: '15%', height: '1px',
              background: `linear-gradient(90deg, transparent, ${award.accentColor}, transparent)`,
              filter: 'blur(2px)',
            }}
          />
        )}
      </div>

      {/* Pedestal base */}
      <motion.div
        initial={{ scaleX: 0.4, opacity: 0 }}
        animate={isRevealed ? { scaleX: 1, opacity: 1 } : { scaleX: 0.4, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        style={{
          width: isMobile ? '55px' : '70px',
          height: '12px',
          margin: '0 auto',
          background: 'linear-gradient(to bottom, rgba(25,20,10,0.9), rgba(10,8,4,0.95))',
          borderTop: `1px solid rgba(201,168,76,${isFocused ? 0.38 : 0.12})`,
          transition: 'border-color 0.6s',
        }}
      />
      {/* Pedestal shadow */}
      <div style={{
        width: isMobile ? '70px' : '90px',
        height: '5px',
        background: 'rgba(0,0,0,0.5)',
        filter: 'blur(5px)',
        borderRadius: '50%',
        margin: '0 auto',
        opacity: isFocused ? 0.75 : 0.28,
        transition: 'opacity 0.6s',
      }} />
    </motion.div>
  )
}

// ─── Main scene ───────────────────────────────────────────────
export default function SceneAwards() {
  const prefersReduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const [awards]                  = useState(AWARDS_STATIC)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [examined, setExamined]   = useState(null)
  const [revealed, setRevealed]   = useState(false)
  const [doorOpen, setDoorOpen]   = useState(false)

  // Touch tracking
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Wheel delta accumulator for snapping
  const wheelAccRef = useRef(0)
  const wheelTimerRef = useRef(null)

  // Door open + reveal
  useEffect(() => {
    const t1 = setTimeout(() => setDoorOpen(true), prefersReduced ? 0 : 80)
    const t2 = setTimeout(() => setRevealed(true), prefersReduced ? 0 : 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [prefersReduced])

  // ESC closes examination
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setExamined(null)
      if (e.key === 'ArrowLeft' && !examined)  setCurrentIdx(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight' && !examined) setCurrentIdx(i => Math.min(awards.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [awards.length, examined])

  // Horizontal wheel navigation
  const onWheel = (e) => {
    if (examined) return
    const isHorizDominant = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    const delta = isHorizDominant ? e.deltaX : 0
    if (!isHorizDominant) return

    e.preventDefault()
    e.stopPropagation()

    wheelAccRef.current += delta
    clearTimeout(wheelTimerRef.current)
    wheelTimerRef.current = setTimeout(() => { wheelAccRef.current = 0 }, 300)

    if (wheelAccRef.current > 60) {
      setCurrentIdx(i => Math.min(awards.length - 1, i + 1))
      wheelAccRef.current = 0
    } else if (wheelAccRef.current < -60) {
      setCurrentIdx(i => Math.max(0, i - 1))
      wheelAccRef.current = 0
    }
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (examined) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 38) {
      e.stopPropagation()
      if (dx > 0) setCurrentIdx(i => Math.min(awards.length - 1, i + 1))
      else         setCurrentIdx(i => Math.max(0, i - 1))
    }
  }

  const handlePlaqueClick = (award, i) => {
    if (i === currentIdx) setExamined(award)
    else setCurrentIdx(i)
  }

  const award = awards[currentIdx]

  return (
    <div
      style={{
        width: '100%', height: '100%',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 65% at 50% 35%, #0c0a04 0%, #07060a 45%, #040404 100%)',
      }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Blueprint grid background ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.06,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.45) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* ── Volume bands ── */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `linear-gradient(180deg,
            rgba(0,0,0,0.28) 0%, transparent 15%,
            rgba(201,168,76,0.012) 42%, transparent 60%,
            rgba(0,0,0,0.38) 100%)`,
        }}
      />

      {/* ── Central spotlight (fixed, breathing) ── */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: 0, right: 0,
          top: 0,
          height: '68%',
          pointerEvents: 'none',
          zIndex: 2,
          background: `conic-gradient(from 90deg at 50% -5%,
            transparent 32%,
            rgba(201,168,76,0.055) 43%,
            rgba(201,168,76,0.11) 50%,
            rgba(201,168,76,0.055) 57%,
            transparent 68%)`,
        }}
      />

      {/* ── Spotlight radial glow on floor ── */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: '30%', right: '30%',
          top: '50%', bottom: '20%',
          pointerEvents: 'none', zIndex: 2,
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 100%)',
        }}
      />

      {/* ── Floor reflection line ── */}
      <div
        style={{
          position: 'absolute', bottom: '18%', left: 0, right: 0,
          height: '1px', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.1) 30%, rgba(201,168,76,0.2) 50%, rgba(201,168,76,0.1) 70%, transparent 95%)',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '18%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, rgba(4,3,2,0.45) 100%)',
        }}
      />

      {/* ── Vignette ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 18%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ── Header ── */}
      <div
        style={{
          position: 'absolute', top: '4%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
            color: 'var(--gold)', letterSpacing: '0.38em',
            textTransform: 'uppercase', marginBottom: '0.3rem',
          }}
        >
          06&nbsp;&nbsp;/&nbsp;&nbsp;Honours
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 2vw, 1.8rem)',
            fontWeight: 300, color: 'var(--white)',
            letterSpacing: '-0.01em',
          }}
        >
          Hall of&nbsp;<em style={{ color: 'var(--gold)' }}>Recognition</em>
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
            color: 'rgba(245,240,232,0.2)',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            marginTop: '0.5rem',
          }}
        >
          Scroll or swipe horizontally&nbsp;·&nbsp;Click to focus&nbsp;·&nbsp;Click again to examine
        </motion.div>
      </div>

      {/* ── Carousel stage ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        {awards.map((a, i) => (
          <div key={a._id} style={{ pointerEvents: 'auto' }}>
            <PlaqueCard
              award={a}
              relIdx={i - currentIdx}
              onClick={() => handlePlaqueClick(a, i)}
              prefersReduced={prefersReduced}
              isMobile={isMobile}
              isRevealed={revealed}
            />
          </div>
        ))}
      </div>

      {/* ── Description strip ── */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '18%' : '16%',
          left: '50%', transform: 'translateX(-50%)',
          width: isMobile ? '85vw' : 'clamp(280px, 42vw, 500px)',
          zIndex: 10, textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Organization */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isMobile ? '0.57rem' : '0.62rem',
              color: award?.accentColor || 'var(--gold)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              marginBottom: '0.45rem',
            }}>
              {award?.organization}
            </div>
            {/* Short description */}
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isMobile ? '0.72rem' : 'clamp(0.78rem, 1.1vw, 0.9rem)',
              color: isMobile ? 'rgba(245,240,232,0.52)' : 'rgba(245,240,232,0.78)',
              fontWeight: 300, lineHeight: 1.65,
              letterSpacing: '0.01em',
            }}>
              {award?.description?.slice(0, isMobile ? 100 : 140)}
              {(award?.description?.length || 0) > (isMobile ? 100 : 140) ? '…' : ''}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Left / Right arrow buttons ── */}
      {!isMobile && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIdx > 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
            style={{
              position: 'absolute',
              left: 'clamp(1rem, 4vw, 3.5rem)',
              top: '50%', transform: 'translateY(-50%)',
              zIndex: 12,
              width: '44px', height: '44px',
              background: 'rgba(10,8,4,0.7)',
              border: '1px solid rgba(201,168,76,0.22)',
              borderRadius: '50%',
              color: 'var(--gold)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.25s, background 0.25s',
              pointerEvents: currentIdx > 0 ? 'auto' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
              e.currentTarget.style.background = 'rgba(20,16,8,0.85)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'
              e.currentTarget.style.background = 'rgba(10,8,4,0.7)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIdx < awards.length - 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentIdx(i => Math.min(awards.length - 1, i + 1))}
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 4vw, 3.5rem)',
              top: '50%', transform: 'translateY(-50%)',
              zIndex: 12,
              width: '44px', height: '44px',
              background: 'rgba(10,8,4,0.7)',
              border: '1px solid rgba(201,168,76,0.22)',
              borderRadius: '50%',
              color: 'var(--gold)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.25s, background 0.25s',
              pointerEvents: currentIdx < awards.length - 1 ? 'auto' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
              e.currentTarget.style.background = 'rgba(20,16,8,0.85)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'
              e.currentTarget.style.background = 'rgba(10,8,4,0.7)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </>
      )}

      {/* ── Dot indicators ── */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '12%' : '9%',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 12,
          display: 'flex', gap: '10px', alignItems: 'center',
        }}
      >
        {awards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            style={{
              width: i === currentIdx ? '22px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === currentIdx ? 'rgba(201,168,76,0.85)' : 'rgba(201,168,76,0.22)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.4s ease, background 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Door reveal panels ── */}
      {!prefersReduced && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? '-101%' : 0 }}
            transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute', inset: 0, right: '50%',
              background: 'linear-gradient(to right, #060608, #0a0806)',
              zIndex: 100,
            }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? '101%' : 0 }}
            transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute', inset: 0, left: '50%',
              background: 'linear-gradient(to left, #060608, #0a0806)',
              zIndex: 100,
            }}
          />
          {/* Gold seam line */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: doorOpen ? 0 : 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            style={{
              position: 'absolute', top: 0, bottom: 0,
              left: 'calc(50% - 0.5px)', width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.42), transparent)',
              zIndex: 101,
            }}
          />
        </>
      )}


      {/* ── Examination modal ── */}
      <AnimatePresence>
        {examined && (
          <ExaminationRoom award={examined} onClose={() => setExamined(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
