import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

// ─── Network data ──────────────────────────────────────────
// All positions in viewBox "0 0 100 100" (preserveAspectRatio="none")
const CENTER = { x: 50, y: 40 }

const DEGREES = [
  {
    id: 'masters',
    label: "Master's Degree",
    sub: 'Clinical Psychology',
    x: 20, y: 18,
  },
  {
    id: 'bachelors',
    label: 'Bachelor of Arts',
    sub: 'Psychology',
    x: 80, y: 18,
  },
]

const PRINCIPLES = [
  {
    id: 'analytical',
    title: 'Analytical Reasoning',
    desc: 'Structured thinking and evidence-based decision-making',
    x: 18, y: 70,
  },
  {
    id: 'empathy',
    title: 'Deep Empathy',
    desc: 'Genuine understanding of patients and professionals alike',
    x: 50, y: 80,
  },
  {
    id: 'ethics',
    title: 'Philosophical Ethics',
    desc: 'Long-term vision anchored in principle and integrity',
    x: 82, y: 70,
  },
]

// ─── Animation helpers ────────────────────────────────────
const fadeUp = (delay = 0, duration = 0.7) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

// ─── SVG line path between two % points ──────────────────
function LinePath({ x1, y1, x2, y2, delay = 0, color = 'rgba(201,168,76,0.35)' }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="0.25"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
    />
  )
}

// ─── Main component ───────────────────────────────────────
export default function SceneEducation({ navigate }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [hoveredNode, setHoveredNode] = useState(null)

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
    <div
      style={{
        width: '100%', height: '100%',
        position: 'relative', overflow: 'hidden',
        background:
          'radial-gradient(ellipse 90% 80% at 50% 40%, #07070f 0%, #060608 60%, #000 100%)',
      }}
    >
      {/* ── Ambient particles ── */}
      <ThreeAmbient
        particleCount={isMobile ? 40 : 90}
        color="#c9a84c"
        mouseReact={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* ── Blueprint grid ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '52px 52px',
        }}
      />

      {/* ── Vignette ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ════════════════════════════════════════════════════
          DESKTOP / TABLET — Network layout
      ════════════════════════════════════════════════════ */}
      {!isMobile && (
        <DesktopNetwork
          isTablet={isTablet}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
          navigate={navigate}
        />
      )}

      {/* ════════════════════════════════════════════════════
          MOBILE — Vertical list
      ════════════════════════════════════════════════════ */}
      {isMobile && (
        <MobileLayout navigate={navigate} />
      )}
    </div>
  )
}

// ─── Desktop network ──────────────────────────────────────
function DesktopNetwork({ isTablet, hoveredNode, setHoveredNode, navigate }) {
  const compact = isTablet

  return (
    <>
      {/* Section label */}
      <motion.div
        {...fadeIn(0.1)}
        style={{
          position: 'absolute', top: '3.5%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, textAlign: 'center', pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>
          03&nbsp;&nbsp;/&nbsp;&nbsp;Foundations
        </div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: compact ? '1.3rem' : 'clamp(1.4rem, 2.2vw, 2rem)',
          fontWeight: 300,
          color: 'var(--white)',
          letterSpacing: '-0.01em',
        }}>
          The Architecture of&nbsp;<em style={{ color: 'var(--gold)' }}>Thought</em>
        </div>
      </motion.div>

      {/* ── SVG connecting lines ── */}
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
          <filter id="edu-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center → Degree lines */}
        {DEGREES.map((d, i) => (
          <LinePath
            key={d.id}
            x1={CENTER.x} y1={CENTER.y}
            x2={d.x} y2={d.y}
            delay={1.1 + i * 0.15}
            color={
              hoveredNode === d.id
                ? 'rgba(201,168,76,0.75)'
                : 'rgba(201,168,76,0.32)'
            }
          />
        ))}

        {/* Center → Principle lines */}
        {PRINCIPLES.map((p, i) => (
          <LinePath
            key={p.id}
            x1={CENTER.x} y1={CENTER.y}
            x2={p.x} y2={p.y}
            delay={2.6 + i * 0.2}
            color={
              hoveredNode === p.id
                ? 'rgba(201,168,76,0.75)'
                : 'rgba(201,168,76,0.28)'
            }
          />
        ))}

        {/* Degree glow outer rings */}
        {DEGREES.map(d => (
          <motion.circle
            key={d.id}
            cx={d.x} cy={d.y} r="1.5"
            fill="none"
            stroke="rgba(201,168,76,0.18)"
            strokeWidth="0.3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          />
        ))}

        {/* Principle glow outer rings */}
        {PRINCIPLES.map(p => (
          <motion.circle
            key={p.id}
            cx={p.x} cy={p.y} r="1.5"
            fill="none"
            stroke="rgba(201,168,76,0.18)"
            strokeWidth="0.3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          />
        ))}
      </svg>

      {/* ── Central node ── */}
      <motion.div
        {...fadeUp(0.2, 0.9)}
        style={{
          position: 'absolute',
          left: `${CENTER.x}%`, top: `${CENTER.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 8,
        }}
      >
        <CentralNode compact={compact} />
      </motion.div>

      {/* ── Tagline below center ── */}
      <motion.div
        {...fadeIn(0.7)}
        style={{
          position: 'absolute',
          left: '50%', top: `calc(${CENTER.y}% + ${compact ? '5.5rem' : '6.2rem'})`,
          transform: 'translateX(-50%)',
          zIndex: 8, textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          fontStyle: 'italic',
          fontSize: compact ? '0.72rem' : '0.8rem',
          color: 'rgba(245,240,232,0.45)',
          letterSpacing: '0.03em',
          maxWidth: compact ? '260px' : '340px',
          lineHeight: 1.6,
          pointerEvents: 'none',
        }}
      >
        A lifelong student of philosophy — shaping his ethical framework and long-term strategic vision.
      </motion.div>

      {/* ── Degree nodes ── */}
      {DEGREES.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredNode(d.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            position: 'absolute',
            left: `${d.x}%`, top: `${d.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 8,
            cursor: 'default',
          }}
        >
          <DegreeNode node={d} hovered={hoveredNode === d.id} compact={compact} />
        </motion.div>
      ))}

      {/* ── Psychology meets leadership text ── */}
      <motion.div
        {...fadeUp(2.1)}
        style={{
          position: 'absolute',
          left: '50%',
          top: `calc(${CENTER.y}% + ${compact ? '8.5rem' : '9.5rem'})`,
          transform: 'translateX(-50%)',
          zIndex: 8,
          textAlign: 'center',
          maxWidth: compact ? '300px' : '420px',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: compact ? '0.85rem' : 'clamp(0.9rem, 1.3vw, 1.05rem)',
          fontWeight: 300,
          color: 'var(--white)',
          marginBottom: '0.55rem',
          letterSpacing: '0.01em',
        }}>
          Where Psychology Meets&nbsp;<em style={{ color: 'var(--gold)' }}>Leadership</em>
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: compact ? '0.7rem' : '0.76rem',
          color: 'var(--white-muted)',
          lineHeight: 1.72,
          fontWeight: 300,
          margin: 0,
        }}>
          His training in Clinical Psychology is not incidental to his leadership — it is foundational.
          He reads organisations the way a psychologist reads people: with curiosity, precision,
          and a commitment to uncovering root causes rather than surface symptoms.
        </p>
      </motion.div>

      {/* ── Principle nodes ── */}
      {PRINCIPLES.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.7 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredNode(p.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 8,
            cursor: 'default',
          }}
        >
          <PrincipleNode node={p} hovered={hoveredNode === p.id} compact={compact} />
        </motion.div>
      ))}

      {/* ── Continue indicator ── */}
      <ContinueBtn delay={3.6} navigate={navigate} />
    </>
  )
}

// ─── Mobile vertical layout ───────────────────────────────
function MobileLayout({ navigate }) {
  return (
    <div
      style={{
        position: 'relative', zIndex: 5,
        height: '100%', overflowY: 'auto',
        padding: '2.5rem 1.3rem 7rem',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
        }}>
          03 / Foundations
        </div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 7vw, 2rem)',
          fontWeight: 300,
          color: 'var(--white)',
        }}>
          The Architecture of&nbsp;<em style={{ color: 'var(--gold)' }}>Thought</em>
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        {...fadeIn(0.2)}
        style={{
          fontFamily: 'var(--font-sans)',
          fontStyle: 'italic',
          fontSize: '0.8rem',
          color: 'rgba(245,240,232,0.45)',
          textAlign: 'center',
          lineHeight: 1.65,
          marginBottom: '2rem',
        }}
      >
        A lifelong student of philosophy — shaping his ethical framework and long-term strategic vision.
      </motion.p>

      {/* Central node */}
      <motion.div {...fadeUp(0.3)} style={{ marginBottom: '1.5rem' }}>
        <MobileCard
          topLabel="Intellectual Foundations"
          title="Education & Intellectual Foundations"
          isCenter
        />
      </motion.div>

      {/* Connector */}
      <MobileConnector />

      {/* Degree nodes */}
      {DEGREES.map((d, i) => (
        <motion.div key={d.id} {...fadeUp(0.5 + i * 0.15)} style={{ marginBottom: '1rem' }}>
          <MobileCard topLabel={d.label} title={d.sub} />
        </motion.div>
      ))}

      {/* Connector */}
      <MobileConnector />

      {/* Psychology section */}
      <motion.div {...fadeUp(0.85)} style={{ marginBottom: '1.5rem' }}>
        <div style={{
          background: 'rgba(10,8,4,0.72)',
          border: '1px solid rgba(201,168,76,0.13)',
          borderRadius: '10px',
          padding: '1.2rem 1.3rem',
          backdropFilter: 'blur(14px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.38), transparent)',
          }} />
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--white)',
            marginBottom: '0.6rem',
          }}>
            Where Psychology Meets&nbsp;<em style={{ color: 'var(--gold)' }}>Leadership</em>
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'var(--white-muted)',
            lineHeight: 1.68,
            fontWeight: 300,
            margin: 0,
          }}>
            His training in Clinical Psychology is not incidental to his leadership — it is foundational.
            He reads organisations the way a psychologist reads people: with curiosity, precision,
            and a commitment to uncovering root causes rather than surface symptoms.
          </p>
        </div>
      </motion.div>

      {/* Connector */}
      <MobileConnector />

      {/* Principle nodes */}
      {PRINCIPLES.map((p, i) => (
        <motion.div key={p.id} {...fadeUp(1.0 + i * 0.14)} style={{ marginBottom: '1rem' }}>
          <MobileCard topLabel={p.title} title={p.desc} />
        </motion.div>
      ))}

      <ContinueBtn delay={0.5} navigate={navigate} mobile />
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────

function CentralNode({ compact }) {
  return (
    <motion.div
      whileHover={{ boxShadow: '0 0 48px rgba(201,168,76,0.22), 0 0 0 1px rgba(201,168,76,0.45)' }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'rgba(8,7,3,0.88)',
        border: '1px solid rgba(201,168,76,0.35)',
        backdropFilter: 'blur(22px)',
        borderRadius: '12px',
        padding: compact ? '1.1rem 1.5rem' : '1.3rem 2rem',
        textAlign: 'center',
        boxShadow: '0 0 28px rgba(201,168,76,0.12), 0 14px 48px rgba(0,0,0,0.55)',
        minWidth: compact ? '190px' : '230px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', width: '80%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.55), transparent)',
      }} />
      {/* Center glow dot */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          width: '7px', height: '7px',
          borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 16px rgba(201,168,76,0.9)',
          margin: '0 auto 0.8rem',
        }}
      />
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'rgba(201,168,76,0.6)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        marginBottom: '0.35rem',
      }}>
        Central Node
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: compact ? '0.85rem' : '0.95rem',
        fontWeight: 300,
        color: 'var(--white)',
        lineHeight: 1.3,
      }}>
        Education &amp;<br />Intellectual Foundations
      </div>
    </motion.div>
  )
}

function DegreeNode({ node, hovered, compact }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 0 36px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.5)' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: hovered ? 'rgba(12,10,4,0.95)' : 'rgba(10,8,3,0.84)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
        backdropFilter: 'blur(18px)',
        borderRadius: '10px',
        padding: compact ? '0.85rem 1.1rem' : '1rem 1.4rem',
        textAlign: 'center',
        boxShadow: '0 10px 38px rgba(0,0,0,0.5)',
        minWidth: compact ? '130px' : '155px',
        transition: 'border-color 0.3s, background 0.3s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: '15%', width: '70%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        color: 'var(--gold)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '0.3rem',
      }}>
        {node.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: compact ? '0.82rem' : '0.9rem',
        color: hovered ? 'var(--white)' : 'rgba(245,240,232,0.78)',
        lineHeight: 1.25,
        transition: 'color 0.3s',
      }}>
        {node.sub}
      </div>
    </motion.div>
  )
}

function PrincipleNode({ node, hovered, compact }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 0 36px rgba(201,168,76,0.2), 0 0 0 1px rgba(201,168,76,0.45)' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: hovered ? 'rgba(12,10,4,0.95)' : 'rgba(10,8,3,0.82)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.16)'}`,
        backdropFilter: 'blur(16px)',
        borderRadius: '10px',
        padding: compact ? '0.8rem 1rem' : '0.95rem 1.25rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.48)',
        maxWidth: compact ? '130px' : '155px',
        transition: 'border-color 0.3s, background 0.3s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: '15%', width: '70%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.32), transparent)',
      }} />
      {/* Principle dot */}
      <div style={{
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: hovered ? 'var(--gold)' : 'rgba(201,168,76,0.5)',
        boxShadow: hovered ? '0 0 10px rgba(201,168,76,0.8)' : 'none',
        margin: '0 auto 0.55rem',
        transition: 'background 0.3s, box-shadow 0.3s',
      }} />
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: compact ? '0.78rem' : '0.85rem',
        fontWeight: 300,
        color: hovered ? 'var(--white)' : 'rgba(245,240,232,0.82)',
        lineHeight: 1.25,
        marginBottom: '0.4rem',
        transition: 'color 0.3s',
      }}>
        {node.title}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.62rem',
        color: hovered ? 'rgba(245,240,232,0.62)' : 'rgba(245,240,232,0.35)',
        lineHeight: 1.5,
        transition: 'color 0.3s',
      }}>
        {node.desc}
      </div>
    </motion.div>
  )
}

function MobileCard({ topLabel, title, isCenter }) {
  return (
    <div style={{
      background: 'rgba(10,8,4,0.82)',
      border: `1px solid ${isCenter ? 'rgba(201,168,76,0.32)' : 'rgba(201,168,76,0.16)'}`,
      borderRadius: '10px',
      padding: '1rem 1.3rem',
      backdropFilter: 'blur(14px)',
      boxShadow: isCenter
        ? '0 0 22px rgba(201,168,76,0.1), 0 12px 40px rgba(0,0,0,0.5)'
        : '0 10px 32px rgba(0,0,0,0.45)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.38), transparent)',
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--gold)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        marginBottom: '0.3rem',
      }}>
        {topLabel}
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: isCenter ? 'normal' : 'italic',
        fontSize: '0.92rem',
        fontWeight: 300,
        color: 'var(--white)',
        lineHeight: 1.3,
      }}>
        {title}
      </div>
    </div>
  )
}

function MobileConnector() {
  return (
    <div style={{
      width: '1px',
      height: '28px',
      background: 'linear-gradient(to bottom, rgba(201,168,76,0.28), rgba(201,168,76,0.08))',
      margin: '0 auto 1rem',
    }} />
  )
}

function ContinueBtn({ delay, navigate, mobile }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      onClick={() => navigate(4)}
      style={{
        position: mobile ? 'relative' : 'fixed',
        bottom: mobile ? undefined : 'calc(env(safe-area-inset-bottom, 0px) + 1.4rem)',
        left: mobile ? undefined : '50%',
        transform: mobile ? undefined : 'translateX(-50%)',
        marginTop: mobile ? '1.5rem' : undefined,
        zIndex: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        cursor: 'pointer',
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
        Continue
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
