import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Quote ──────────────────────────────────────────────────

const QUOTE_LINES = [
  '\u201CIn healthcare, time is never just time.',
  'It becomes the difference between uncertainty and clarity,',
  'between hesitation and decision.',
  '',
  'Every system we build must respect that reality.',
  'Because when every second matters,',
  'technology must serve with purpose.\u201D',
]

// ─── Main component ─────────────────────────────────────────

export default function SceneReflection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [imgError, setImgError]  = useState(false)

  const parallaxRef = useRef(null)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const lerpRef     = useRef({ x: 0, y: 0 })
  const rafRef      = useRef(null)

  // ── Responsive ──
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Subtle cursor parallax on the image ──
  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth  - 0.5
      mouseRef.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      const ease = 0.055
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * ease
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * ease
      if (parallaxRef.current) {
        parallaxRef.current.style.transform =
          `translate(${lerpRef.current.x * -14}px, ${lerpRef.current.y * -9}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  // Image is a wide text banner (~9:1 ratio) — fill the column width
  const imgW = isMobile ? '95%' : '100%'
  const textAlign = isMobile ? 'left' : 'center'
  const alignItems = isMobile ? 'flex-start' : 'center'

  // Stagger delay for each quote line (after image settles at ~1.5s)
  const lineDelay = (i) => 1.7 + i * 0.2
  const authorDelay = lineDelay(QUOTE_LINES.length) + 0.25

  return (
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse 95% 75% at 50% 46%, #07060e 0%, #050508 55%, #020202 100%)',
      }}
    >
      {/* ── Ambient dust ── */}
      <ThreeAmbient
        particleCount={isMobile ? 20 : 40}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      />

      {/* ── Breathing center glow ── */}
      <GlowPulse />

      {/* ── Edge vignette ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 25%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════
          Scrollable content column
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          width: '100%',
          maxWidth: isMobile ? '100%' : isTablet ? '680px' : '880px',
          padding: isMobile ? '4.5rem 1.6rem 8rem' : '3.5rem 2rem 6rem',
          display: 'flex', flexDirection: 'column',
          alignItems,
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
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            marginBottom: '2.4rem',
          }}
        >
          09&nbsp;&nbsp;/&nbsp;&nbsp;Reflection
        </motion.div>

        {/* ── Image block ── */}
        {/* Outer: entry animation (framer handles opacity/blur/scale) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)'  }}
          transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: imgW,
            marginBottom: '3.8rem',
            flexShrink: 0,
          }}
        >
          {/* Golden halo glow — wide & flat to match the text banner shape */}
          <div
            style={{
              position: 'absolute',
              inset: '-40px -60px',
              background:
                'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)',
              filter: 'blur(32px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Middle: parallax layer (JS sets transform) */}
          <div ref={parallaxRef} style={{ position: 'relative', zIndex: 1 }}>
            {/* Inner: gentle float animation */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              {imgError ? (
                <TextImage />
              ) : (
                <img
                  src="/every-second-matters.png"
                  alt="Every Second Matters"
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    display: 'block',
                    // drop-shadow traces the actual text pixels (respects transparency)
                    filter:
                      'drop-shadow(0 0 28px rgba(201,168,76,0.38)) drop-shadow(0 0 60px rgba(201,168,76,0.15))',
                  }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Quote lines ── */}
        <div
          style={{
            display: 'flex', flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '2.2rem',
            maxWidth: isMobile ? '100%' : '640px',
          }}
        >
          {QUOTE_LINES.map((line, i) => {
            if (line === '') return <div key={i} style={{ height: '0.65rem' }} />
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                transition={{ duration: 0.78, delay: lineDelay(i), ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: isMobile
                    ? 'clamp(0.95rem, 3.8vw, 1.05rem)'
                    : 'clamp(1.15rem, 1.9vw, 1.42rem)',
                  color: isMobile ? 'rgba(245,240,232,0.78)' : 'rgba(245,240,232,0.93)',
                  lineHeight: 1.82,
                  fontWeight: isMobile ? 300 : 400,
                  letterSpacing: '0.01em',
                  margin: 0,
                }}
              >
                {line}
              </motion.p>
            )
          })}
        </div>

        {/* ── Author ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: authorDelay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems,
            gap: '0.45rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: isMobile ? 'clamp(0.92rem, 1.55vw, 1.05rem)' : 'clamp(1rem, 1.65vw, 1.18rem)',
              color: isMobile ? 'rgba(245,240,232,0.52)' : 'rgba(245,240,232,0.72)',
              letterSpacing: '0.04em',
            }}
          >
            — Akhileshwar K. Singh
          </span>

          {/* Signature underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: authorDelay + 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '1px',
              width: isMobile ? '155px' : '195px',
              background:
                'linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.32) 55%, transparent 100%)',
              transformOrigin: 'left center',
              boxShadow: '0 0 8px rgba(201,168,76,0.18)',
            }}
          />
        </motion.div>
      </div>

    </div>
  )
}

// ─── Pulsing background glow ────────────────────────────────

function GlowPulse() {
  return (
    <>
      <style>{`
        @keyframes esmGlow {
          0%, 100% { opacity: 0.42; transform: translate(-50%, -50%) scale(1);   }
          50%       { opacity: 0.7;  transform: translate(-50%, -50%) scale(1.06); }
        }
      `}</style>
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '44%',
          width: '800px', height: '560px',
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(201,168,76,0.065) 0%, transparent 68%)',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'esmGlow 5s ease-in-out infinite',
        }}
      />
    </>
  )
}

// ─── Text fallback (shown if image file is missing) ──────────

function TextImage() {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 7',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10,8,18,0.85)',
        border: '1px solid rgba(201,168,76,0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: '14px',
        boxShadow: '0 28px 90px rgba(0,0,0,0.72)',
        padding: '2.5rem 2rem',
        gap: '0.6rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.68rem)',
          color: 'rgba(201,168,76,0.45)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
        }}
      >
        IUI Solutions
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: 'rgba(245,240,232,0.9)',
          lineHeight: 1.15,
          textAlign: 'center',
        }}
      >
        Every Second <em style={{ color: 'var(--gold)' }}>Matters</em>
      </div>
      <div
        style={{
          width: '50px', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          marginTop: '0.4rem',
        }}
      />
    </div>
  )
}
