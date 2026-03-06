import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Milestone data ─────────────────────────────────────────
// Note: x/y are viewBox coords (0–100 in both axes)
// The SVG uses preserveAspectRatio="none", so x% = left%, y% = top%
const MILESTONES = [
  {
    era: 'Early Career',
    title: 'Foundations in Finance & Insurance',
    phase: 'Risk · Compliance · Healthcare Financing',
    desc: 'Launched in the insurance sector, building mastery in risk assessment, regulatory compliance, and healthcare financing — the structural backbone of everything built thereafter.',
    x: 14, y: 28, side: 'left',
  },
  {
    era: 'Mid Career',
    title: 'Hospital Administration',
    phase: 'Operations · Patient Care · Leadership',
    desc: 'Transitioned into hospital leadership, overseeing complex operations, redesigning patient pathways, and championing cultures of accountability, efficiency, and genuine compassion.',
    x: 82, y: 52, side: 'right',
  },
  {
    era: 'Today',
    title: 'Founding a Healthcare Platform',
    phase: 'RCM · Operations · Reproductive Care',
    desc: 'Channels three decades of expertise into a platform built for healthcare providers navigating a rapidly changing landscape, advancing RCM, operations, and reproductive care.',
    x: 14, y: 76, side: 'left',
  },
]

// Zig-zag cubic Bezier path in viewBox "0 0 100 100"
const PATH_D =
  'M 14,28 C 48,28 48,52 82,52 C 48,52 48,76 14,76'

// ms from scene mount when each card appears
const REVEAL_AT = [500, 1400, 2300]

// ─── Main component ─────────────────────────────────────────
export default function SceneMilestone() {
  const prefersReduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const pathRef  = useRef(null)  // SVG <path> element
  const dotRef   = useRef(null)  // SVG <circle> indicator
  const rafRef   = useRef(null)

  const [revealed, setRevealed] = useState(new Set())
  const [milestones]            = useState(MILESTONES)

  // ── Animation sequence ──────────────────────────────────
  useEffect(() => {
    if (isMobile || prefersReduced) {
      setRevealed(new Set([0, 1, 2, 3, 4]))
      return
    }

    // Card reveal timers
    const timers = REVEAL_AT.map((ms, i) =>
      setTimeout(() => setRevealed(prev => new Set([...prev, i])), ms)
    )

    // Dot travel along path
    const dotStart = setTimeout(() => {
      const path = pathRef.current
      if (!path) return
      let totalLen = 0
      try { totalLen = path.getTotalLength() } catch { return }
      if (!totalLen) return

      let t0 = null
      const DURATION = 3000

      const tick = (now) => {
        if (!t0) t0 = now
        const p  = Math.min((now - t0) / DURATION, 1)
        // ease-in-out quad
        const ep = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
        const pt = path.getPointAtLength(ep * totalLen)

        if (dotRef.current) {
          dotRef.current.setAttribute('cx', pt.x)
          dotRef.current.setAttribute('cy', pt.y)
          dotRef.current.setAttribute('opacity', p < 0.97 ? '1' : '0')
        }
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, 380)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(dotStart)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, prefersReduced])

  return (
    <div
      style={{
        width: '100%', height: '100%',
        position: 'relative', overflow: 'hidden',
        background:
          'radial-gradient(ellipse 90% 70% at 50% 40%, #08070f 0%, #060608 60%, #000 100%)',
      }}
    >
      {/* ── Ambient particles ── */}
      <ThreeAmbient
        particleCount={isMobile ? 70 : 180}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* ── Blueprint grid ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(201,168,76,0.045) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(201,168,76,0.045) 1px, transparent 1px)',
            'linear-gradient(45deg, rgba(201,168,76,0.018) 1px, transparent 1px)',
            'linear-gradient(-45deg, rgba(201,168,76,0.018) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '48px 48px, 48px 48px, 68px 68px, 68px 68px',
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 22%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ════════════════════════════════════════════════════
          DESKTOP — Full zig-zag experience
      ════════════════════════════════════════════════════ */}
      {!isMobile && (
        <>
          {/* Header */}
          <div
            style={{
              position: 'absolute', top: '3.5%', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10, textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--gold)',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
              }}
            >
              04&nbsp;&nbsp;/&nbsp;&nbsp;Journey
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 2vw, 1.9rem)',
                fontWeight: 300,
                color: 'var(--white)',
                letterSpacing: '-0.01em',
              }}
            >
              Milestones of a&nbsp;<em style={{ color: 'var(--gold)' }}>Mission</em>
            </motion.div>
          </div>

          {/* ── SVG — path + glow + traveling dot ── */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              zIndex: 2, pointerEvents: 'none',
            }}
          >
            <defs>
              <filter id="path-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer glow pass */}
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="rgba(201,168,76,0.15)"
              strokeWidth="2.2"
              filter="url(#path-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, delay: 0.38, ease: 'easeOut' }}
            />

            {/* Crisp main path — ref needed for getPointAtLength */}
            <motion.path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke="rgba(201,168,76,0.6)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, delay: 0.38, ease: 'easeOut' }}
            />

            {/* Node outer rings — appear as cards reveal */}
            {milestones.map((m, i) =>
              revealed.has(i) && (
                <circle
                  key={i}
                  cx={m.x} cy={m.y} r="2.2"
                  fill="none"
                  stroke="rgba(201,168,76,0.22)"
                  strokeWidth="0.35"
                />
              )
            )}

            {/* Traveling indicator dot */}
            <circle
              ref={dotRef}
              cx={14} cy={28}
              r="1.1"
              fill="rgba(201,168,76,1)"
              opacity="0"
              filter="url(#dot-glow)"
            />
          </svg>

          {/* ── Milestone nodes + cards ── */}
          {milestones.map((m, i) => {
            const isRevealed = revealed.has(i)
            const isLeft     = m.side === 'left'

            return (
              <div
                key={i}
                style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}
              >
                {/* ── Node dot ── */}
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        left: `${m.x}%`, top: `${m.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          repeat: Infinity, duration: 2.8,
                          ease: 'easeInOut', delay: i * 0.35,
                        }}
                        style={{
                          position: 'absolute',
                          width: '32px', height: '32px',
                          border: '1px solid rgba(201,168,76,0.45)',
                          borderRadius: '50%',
                          top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                      {/* Inner ring */}
                      <div
                        style={{
                          position: 'absolute',
                          width: '18px', height: '18px',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: '50%',
                          top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                      {/* Core */}
                      <div
                        style={{
                          width: '10px', height: '10px',
                          borderRadius: '50%',
                          background: 'var(--gold)',
                          boxShadow:
                            '0 0 14px rgba(201,168,76,0.9), 0 0 30px rgba(201,168,76,0.35)',
                          position: 'relative', zIndex: 1,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Connector line ── */}
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        top: `${m.y}%`,
                        // Left nodes: connector goes rightward from node to card
                        // Right nodes: connector goes leftward from card to node
                        left: isLeft ? `${m.x + 0.8}%` : `${m.x - 9}%`,
                        width: '8.5%',
                        height: '1px',
                        background: isLeft
                          ? 'linear-gradient(90deg, rgba(201,168,76,0.55), rgba(201,168,76,0.12))'
                          : 'linear-gradient(90deg, rgba(201,168,76,0.12), rgba(201,168,76,0.55))',
                        transformOrigin: isLeft ? 'left' : 'right',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* ── Milestone card ── */}
                <AnimatePresence>
                  {isRevealed && (
                    <div
                      style={{
                        position: 'absolute',
                        // Vertical: centered on node y
                        top: `${m.y}%`,
                        transform: 'translateY(-50%)',
                        // Horizontal: card is 10% past the node
                        ...(isLeft
                          ? { left: `${m.x + 10}%` }
                          : { right: `${100 - m.x + 10}%` }),
                        width: 'clamp(190px, 25vw, 320px)',
                        zIndex: 7,
                        pointerEvents: 'auto',
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 22, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            background: 'rgba(10,8,4,0.84)',
                            border: '1px solid rgba(201,168,76,0.16)',
                            backdropFilter: 'blur(18px)',
                            borderRadius: '8px',
                            padding: '1.3rem 1.5rem',
                            boxShadow:
                              '0 22px 65px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.04)',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {/* Top shimmer line */}
                          <div
                            style={{
                              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                              background:
                                'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
                            }}
                          />

                          {/* Glass reflection */}
                          <div
                            style={{
                              position: 'absolute', top: 0, left: '-40%',
                              width: '80%', height: '100%',
                              background:
                                'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)',
                              transform: 'skewX(-12deg)',
                              pointerEvents: 'none',
                            }}
                          />

                          {/* Era */}
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'var(--gold)',
                              letterSpacing: '0.24em',
                              textTransform: 'uppercase',
                              marginBottom: '0.45rem',
                            }}
                          >
                            {m.era}
                          </div>

                          {/* Title */}
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)',
                              fontWeight: 300,
                              color: 'var(--white)',
                              lineHeight: 1.2,
                              marginBottom: '0.28rem',
                            }}
                          >
                            {m.title}
                          </div>

                          {/* Phase badge */}
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.58rem',
                              color: 'rgba(201,168,76,0.58)',
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              marginBottom: '0.7rem',
                            }}
                          >
                            {m.phase}
                          </div>

                          {/* Description */}
                          <p
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.76rem',
                              color: 'var(--white-muted)',
                              lineHeight: 1.65,
                              fontWeight: 300,
                              margin: 0,
                            }}
                          >
                            {m.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </>
      )}

      {/* ════════════════════════════════════════════════════
          MOBILE — Vertical list layout
      ════════════════════════════════════════════════════ */}
      {isMobile && (
        <div
          style={{
            position: 'relative', zIndex: 5,
            height: '100%', overflowY: 'auto',
            padding: '2.5rem 1.2rem 7rem',
          }}
        >
          {/* Mobile header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--gold)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: '0.45rem',
              }}
            >
              04 / Journey
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 7vw, 2rem)',
                fontWeight: 300,
                color: 'var(--white)',
              }}
            >
              Milestones of a&nbsp;<em style={{ color: 'var(--gold)' }}>Mission</em>
            </div>
          </div>

          {/* Vertical guide line */}
          <div
            style={{
              position: 'absolute',
              left: '2rem', top: '130px', bottom: '80px',
              width: '1px',
              background:
                'linear-gradient(to bottom, transparent, rgba(201,168,76,0.22), transparent)',
            }}
          />

          {/* Cards */}
          <div style={{ paddingLeft: '3rem' }}>
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', marginBottom: '1.8rem' }}
              >
                {/* Node dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.15rem', top: '1.15rem',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 12px rgba(201,168,76,0.7)',
                    transform: 'translateX(-50%)',
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    background: 'rgba(10,8,4,0.78)',
                    border: '1px solid rgba(201,168,76,0.14)',
                    backdropFilter: 'blur(14px)',
                    borderRadius: '8px',
                    padding: '1.1rem 1.3rem',
                    boxShadow: '0 14px 40px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                  }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {m.era}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 300, color: 'var(--white)', marginBottom: '0.2rem' }}>
                    {m.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'rgba(201,168,76,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    {m.phase}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--white-muted)', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
