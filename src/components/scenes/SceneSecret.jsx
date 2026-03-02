import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAMES = [
  { id: 0, name: 'HealthDoc',  isReal: true  },
  { id: 1, name: 'MediSphere', isReal: false },
  { id: 2, name: 'CareBridge', isReal: false },
  { id: 3, name: 'PulseCare',  isReal: false },
  { id: 4, name: 'VitaVault',  isReal: false },
  { id: 5, name: 'MediCore',   isReal: false },
  { id: 6, name: 'HealthNest', isReal: false },
  { id: 7, name: 'DocPulse',   isReal: false },
]

// Elliptical ring — center (50%, 62%), rx=22%, ry=20%
const DESKTOP_POS = [
  { x: 50,   y: 42   },
  { x: 65.6, y: 47.9 },
  { x: 72,   y: 62   },
  { x: 65.6, y: 76.1 },
  { x: 50,   y: 82   },
  { x: 34.4, y: 76.1 },
  { x: 28,   y: 62   },
  { x: 34.4, y: 47.9 },
]

// Two-column staggered for portrait mobile
const MOBILE_POS = [
  { x: 26, y: 37 },
  { x: 74, y: 41 },
  { x: 22, y: 54 },
  { x: 78, y: 58 },
  { x: 26, y: 71 },
  { x: 74, y: 75 },
  { x: 36, y: 87 },
  { x: 64, y: 87 },
]

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 4 + Math.random() * 92,
  size: 1 + Math.random() * 1.4,
  duration: 14 + Math.random() * 10,
  delay: Math.random() * 10,
  opacity: 0.12 + Math.random() * 0.22,
}))

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

export default function SceneSecret() {
  const [selected, setSelected] = useState(null)
  const isMobile = useIsMobile()
  const positions = isMobile ? MOBILE_POS : DESKTOP_POS
  const bubbleSize = isMobile ? 76 : 92

  // Auto-dismiss after 2.2 s
  useEffect(() => {
    if (selected === null) return
    const t = setTimeout(() => setSelected(null), 2200)
    return () => clearTimeout(t)
  }, [selected])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'radial-gradient(ellipse 130% 90% at 50% 5%, #100800 0%, #060406 35%, #030208 65%, #020106 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => setSelected(null)}
    >
      {/* Fog */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 70% at 50% 65%, rgba(201,168,76,0.045) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Rising particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '100%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.7)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          animate={{ y: [0, -1080], opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Ambient pulsing light rings (fixed large element, scaled up) */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '62%',
            width: '120px',
            height: '120px',
            marginLeft: '-60px',
            marginTop: '-60px',
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.07)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          animate={{ scale: [1, 4.8], opacity: [0.5, 0] }}
          transition={{
            duration: 5.5,
            delay: i * 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Scene label */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(201,168,76,0.38)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        07 / ???
      </div>

      {/* ── Headline ── */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '9%' : '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: isMobile ? '88%' : '68%',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-2xl)',
            fontWeight: 300,
            color: 'rgba(245,240,232,0.88)',
            letterSpacing: '0.025em',
            lineHeight: 1.35,
            marginBottom: '0.7rem',
          }}
        >
          A new healthcare platform is coming.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.65)',
            letterSpacing: '0.06em',
          }}
        >
          Can you guess its name?
        </motion.p>
      </div>

      {/* ── Floating name bubbles ── */}
      {NAMES.map((item, i) => {
        const pos = positions[i]
        const isSelected = selected === item.id
        const isFaded = selected !== null && !isSelected

        // Unique float path per bubble
        const dy = 7 + (i % 4) * 2.5
        const dx = i % 2 === 0 ? 4 : -4

        return (
          <motion.div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: isSelected ? 8 : 4,
              pointerEvents: 'none',
            }}
            animate={{ y: [0, -dy, 0], x: [0, dx, 0] }}
            transition={{
              duration: 5.5 + i * 0.65,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.button
              onClick={e => { e.stopPropagation(); setSelected(isSelected ? null : item.id) }}
              style={{
                position: 'absolute',
                left: `-${bubbleSize / 2}px`,
                top: `-${bubbleSize / 2}px`,
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.28)',
                background:
                  'radial-gradient(circle at 33% 28%, rgba(255,255,255,0.09) 0%, rgba(201,168,76,0.05) 45%, rgba(6,4,14,0.78) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none',
                pointerEvents: 'all',
              }}
              animate={{
                scale: isSelected ? 0.88 : 1,
                opacity: isFaded ? 0.18 : 1,
                boxShadow: isSelected
                  ? '0 0 30px rgba(201,168,76,0.28), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : '0 0 10px rgba(201,168,76,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={selected === null ? {
                scale: 1.1,
                boxShadow: '0 0 42px rgba(201,168,76,0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
              } : {}}
            >
              {/* Glass reflection highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '13%',
                  left: '15%',
                  width: '33%',
                  height: '28%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.11) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Name */}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: isMobile ? '0.62rem' : '0.7rem',
                  fontWeight: 400,
                  color: 'rgba(245,240,232,0.6)',
                  letterSpacing: '0.03em',
                  userSelect: 'none',
                  textAlign: 'center',
                  padding: '0 6px',
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </span>
            </motion.button>
          </motion.div>
        )
      })}

      {/* ── Center reveal orb ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="reveal"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 16,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Ripple rings */}
            {[0, 1, 2].map(ri => (
              <motion.div
                key={ri}
                style={{
                  position: 'absolute',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.35)',
                  pointerEvents: 'none',
                }}
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 2.8 + ri * 0.9, opacity: 0 }}
                transition={{ duration: 1.4, delay: ri * 0.22, ease: 'easeOut' }}
              />
            ))}

            {/* Orb */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.15, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '185px',
                height: '185px',
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.55)',
                background:
                  'radial-gradient(circle at 34% 27%, rgba(255,255,255,0.13) 0%, rgba(201,168,76,0.1) 40%, rgba(6,4,14,0.92) 100%)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow:
                  '0 0 80px rgba(201,168,76,0.38), 0 0 160px rgba(201,168,76,0.14)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '15%',
                  width: '35%',
                  height: '28%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 100%)',
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.08rem',
                    fontWeight: 300,
                    color: 'rgba(201,168,76,0.95)',
                    letterSpacing: '0.06em',
                    lineHeight: 1.4,
                  }}
                >
                  Announced
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.08rem',
                    fontWeight: 300,
                    color: 'rgba(201,168,76,0.95)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Soon
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.57rem',
                    color: 'rgba(245,240,232,0.42)',
                    letterSpacing: '0.14em',
                    marginTop: '0.55rem',
                  }}
                >
                  STAY TUNED
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(201,168,76,0.28)',
          letterSpacing: '0.22em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {isMobile ? '[ tap a name ]' : '[ hover · click to reveal ]'}
      </motion.div>
    </div>
  )
}
