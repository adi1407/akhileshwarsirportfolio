import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Content ────────────────────────────────────────────────

const SENTENCES = [
  {
    id: 0,
    segments: [
      { text: 'I am a builder at the intersection of clinical need and technological imagination.' },
    ],
  },
  {
    id: 1,
    segments: [
      { text: 'For over a decade, I have dedicated myself to one central belief — that technology, when thoughtfully designed, can ' },
      { text: 'reshape how it serves people', key: true },
      { text: '.' },
    ],
  },
  {
    id: 2,
    segments: [
      { text: 'At IUI Solutions, we craft enterprise-grade systems for healthcare — security-first, compliance by design, relentlessly human.' },
    ],
  },
  {
    id: 3,
    segments: [
      { text: 'I have architected infrastructure that handles millions of patient records with sub-second precision, and built products that reduced physician burnout across entire health systems.' },
    ],
  },
  {
    id: 4,
    segments: [
      { text: 'The work has never been about scale for its own sake. It has always been about ' },
      { text: 'simplifying complexity through technology', key: true },
      { text: ' — making the difficult feel effortless.' },
    ],
  },
  {
    id: 5,
    segments: [
      { text: 'We are now at a pivotal moment. ' },
      { text: 'Innovation in healthcare systems', key: true },
      { text: ' is no longer optional. The vision ahead is clear, deliberate, and deeply personal.' },
    ],
  },
  {
    id: 6,
    segments: [
      { text: 'This portfolio is not a retrospective.' },
    ],
  },
  {
    id: 7,
    segments: [
      { text: 'It is a prelude.' },
    ],
  },
]

// Delays in ms after the opening line finishes drawing
const REVEAL_DELAYS = [400, 2200, 4400, 6700, 9100, 11700, 14200, 16000]
const LINE_PAUSE_MS  = 700
const LINE_DUR_MS    = 1500

// ─── Main component ─────────────────────────────────────────

export default function SceneAbout({ navigate }) {
  const [isMobile, setIsMobile]         = useState(false)
  const [isTablet, setIsTablet]         = useState(false)
  const [lineDrawn, setLineDrawn]       = useState(false)
  const [revealedCount, setRevealedCount] = useState(-1)
  const [showSignature, setShowSignature] = useState(false)

  // ── Responsive layout ──
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Animation sequence — runs once on mount ──
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed   = window.innerWidth < 640 ? 0.78 : 1

    if (reduced) {
      setLineDrawn(true)
      setRevealedCount(SENTENCES.length)
      setShowSignature(true)
      return
    }

    const timers = []

    // Draw line
    timers.push(setTimeout(() => setLineDrawn(true), LINE_PAUSE_MS * speed))

    // Progressive sentence reveal
    REVEAL_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(
        () => setRevealedCount(i),
        (LINE_PAUSE_MS + LINE_DUR_MS + delay) * speed,
      ))
    })

    // Signature — appears after last sentence, then dims all text
    const sigMs = (LINE_PAUSE_MS + LINE_DUR_MS + REVEAL_DELAYS.at(-1) + 1400) * speed
    timers.push(setTimeout(() => {
      setShowSignature(true)
      setRevealedCount(SENTENCES.length) // dim all; signature becomes focal point
    }, sigMs))

    return () => timers.forEach(clearTimeout)
  }, [])

  // Resolved from state (avoids SSR issues)
  const maxW      = isMobile ? '100%' : isTablet ? '640px' : '780px'
  const bodyAlign = isMobile ? 'flex-start' : 'center'
  const textAlign = isMobile ? 'left'       : 'center'

  return (
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background:
          'radial-gradient(ellipse 100% 80% at 50% 50%, #07060e 0%, #050508 55%, #030303 100%)',
      }}
    >
      {/* ── Slow ambient dust particles ── */}
      <ThreeAmbient
        particleCount={isMobile ? 22 : 44}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      />

      {/* ── Golden ambient glow behind the text column ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '560px',
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(55px)',
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

      {/* ════════════════════════════════════════════════
          Main content — centered editorial column
      ════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: maxW,
          padding: isMobile ? '5rem 1.6rem 7rem' : '4rem 2rem',
          display: 'flex', flexDirection: 'column',
          alignItems: bodyAlign,
          textAlign,
          margin: '0 auto',
          overflowY: 'auto',
          maxHeight: '100%',
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            marginBottom: '2.8rem',
          }}
        >
          02&nbsp;&nbsp;/&nbsp;&nbsp;About
        </motion.div>

        {/* ── The opening golden line ── */}
        <div style={{ width: '100%', height: '1px', marginBottom: '3.8rem', position: 'relative' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineDrawn ? 1 : 0 }}
            transition={{ duration: LINE_DUR_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', inset: 0,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 20%, var(--gold) 50%, rgba(201,168,76,0.35) 80%, transparent 100%)',
              transformOrigin: 'left center',
              boxShadow: '0 0 14px rgba(201,168,76,0.28)',
            }}
          />
          {/* Pulse glow that fades after line draws */}
          {lineDrawn && (
            <motion.div
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2.0, delay: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-8px 0',
                background:
                  'linear-gradient(90deg, transparent 10%, rgba(201,168,76,0.14) 50%, transparent 90%)',
                filter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* ── Progressive sentences ── */}
        <div
          style={{
            display: 'flex', flexDirection: 'column',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: '3.5rem',
            width: '100%',
          }}
        >
          {SENTENCES.map((sentence, i) => {
            const revealed   = i <= revealedCount
            const isCurrent  = i === revealedCount
            const isEnded    = revealedCount >= SENTENCES.length
            return (
              <SentenceBlock
                key={sentence.id}
                sentence={sentence}
                revealed={revealed}
                isCurrent={isCurrent}
                isEnded={isEnded}
                isMobile={isMobile}
              />
            )
          })}
        </div>

        {/* ── Signature ── */}
        {showSignature && (
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: bodyAlign,
              marginTop: '0.5rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
                color: 'rgba(245,240,232,0.7)',
                letterSpacing: '0.03em',
              }}
            >
              — Akhileshwar K. Singh
            </motion.div>

            {/* Signature underline — handwritten stroke */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                width: isMobile ? '180px' : '240px',
                background:
                  'linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.4) 55%, transparent 100%)',
                transformOrigin: isMobile ? 'left center' : 'left center',
                marginTop: '0.5rem',
                boxShadow: '0 0 10px rgba(201,168,76,0.22)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Continue indicator (desktop only) ── */}
      {showSignature && !isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.9 }}
          onClick={() => navigate(3)}
          style={{
            position: 'absolute',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.4rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: 'rgba(245,240,232,0.25)',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            Continue Journey
          </span>
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.22, 0.55, 0.22] }}
            transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          >
            <div
              style={{
                width: '1px', height: '24px',
                background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.42))',
              }}
            />
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path
                d="M1 1l3 3 3-3"
                stroke="rgba(201,168,76,0.42)"
                strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

// ─── SentenceBlock ──────────────────────────────────────────

function SentenceBlock({ sentence, revealed, isCurrent, isEnded, isMobile }) {
  const opacity = !revealed
    ? 0
    : isEnded
      ? 0.45          // reading phase over — dim all, signature is focal point
      : isCurrent
        ? 1           // spotlight: freshly revealed sentence
        : 0.44        // already read — step back

  return (
    <motion.p
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{
        opacity,
        y: revealed ? 0 : 24,
        filter: revealed ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: isMobile
          ? 'clamp(1.05rem, 4.2vw, 1.18rem)'
          : 'clamp(1.15rem, 1.85vw, 1.32rem)',
        lineHeight: 1.82,
        color: 'var(--white)',
        fontWeight: 300,
        letterSpacing: '0.015em',
        margin: 0,
        willChange: 'opacity, transform, filter',
      }}
    >
      {sentence.segments.map((seg, i) =>
        seg.key ? (
          <KeyPhrase key={i} isCurrent={isCurrent} isEnded={isEnded}>
            {seg.text}
          </KeyPhrase>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </motion.p>
  )
}

// ─── KeyPhrase ──────────────────────────────────────────────

function KeyPhrase({ children, isCurrent, isEnded }) {
  return (
    <motion.span
      animate={
        isCurrent
          ? {
              scale: [1, 1.055, 1.055, 1],
              color: [
                'rgba(245,240,232,1)',
                'rgba(218,185,100,1)',
                'rgba(218,185,100,0.95)',
                'rgba(245,240,232,1)',
              ],
              textShadow: [
                '0 0 0px transparent',
                '0 0 28px rgba(201,168,76,0.52)',
                '0 0 28px rgba(201,168,76,0.42)',
                '0 0 0px transparent',
              ],
            }
          : {
              scale: 1,
              color: isEnded
                ? 'rgba(245,240,232,0.45)'
                : 'rgba(245,240,232,0.44)',
              textShadow: '0 0 0px transparent',
            }
      }
      transition={{
        duration: 2.4,
        delay: isCurrent ? 0.55 : 0,
        ease: 'easeInOut',
      }}
      style={{
        display: 'inline',
        fontStyle: 'italic',
      }}
    >
      {children}
    </motion.span>
  )
}
