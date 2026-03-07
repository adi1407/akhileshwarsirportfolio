import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { id: 0, angle: 0,   label1: 'Healthcare',       label2: 'Platforms'      },
  { id: 1, angle: 60,  label1: 'Scalable Cloud',   label2: 'Infrastructure' },
  { id: 2, angle: 120, label1: 'Patient-Centered',  label2: 'Solutions'     },
  { id: 3, angle: 180, label1: 'Intelligent',       label2: 'Automation'    },
  { id: 4, angle: 240, label1: 'Healthcare',        label2: 'Workflow'       },
  { id: 5, angle: 300, label1: 'Secure Medical',    label2: 'Systems'       },
]

function getNodePos(angle, isMobile) {
  const rx  = isMobile ? 16 : 27
  const ry  = isMobile ? 13 : 18
  const cx  = 50
  const cy  = isMobile ? 64 : 50
  const rad = (angle * Math.PI) / 180
  return {
    x: parseFloat((cx + Math.cos(rad) * rx).toFixed(2)),
    y: parseFloat((cy + Math.sin(rad) * ry).toFixed(2)),
  }
}

function useIsMobile() {
  const [v, setV] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return v
}

export default function SceneIUI() {
  const [hovered, setHovered]   = useState(null)
  const [mouse,   setMouse]     = useState({ x: 0, y: 0 })
  const containerRef             = useRef(null)
  const isMobile                 = useIsMobile()
  const srcY                     = isMobile ? 64 : 50   // SVG line source y
  const nodeR                    = isMobile ? 8 : 10    // dot radius px

  const onMouseMove = useCallback(e => {
    if (isMobile || !containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setMouse({
      x: (e.clientX - r.left  - r.width  * 0.5) / r.width,
      y: (e.clientY - r.top   - r.height * 0.5) / r.height,
    })
  }, [isMobile])

  const onMouseLeave = useCallback(() => setMouse({ x: 0, y: 0 }), [])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse 130% 100% at 50% 0%, #0c0900 0%, #050408 40%, #030206 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* ── Blueprint grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.028) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* ── Soft center glow that follows the node ring ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: `radial-gradient(ellipse 55% 45% at 50% ${srcY}%, rgba(201,168,76,0.06) 0%, transparent 65%)`,
      }} />

      {/* ── Scene label ── */}
      <div style={{
        position: 'absolute', top: '2rem', left: '2rem', zIndex: 6,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
        color: 'rgba(201,168,76,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase',
      }}>
        07 / IUI Solutions
      </div>

      {/* ── Network SVG — lines drawn from center to each node ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {NODES.map((node, i) => {
          const pos = getNodePos(node.angle, isMobile)
          const lit = hovered === node.id
          return (
            <motion.path
              key={node.id}
              d={`M 50 ${srcY} L ${pos.x} ${pos.y}`}
              fill="none"
              style={{
                stroke: lit ? 'rgba(201,168,76,0.52)' : 'rgba(201,168,76,0.18)',
                strokeWidth: lit ? 0.22 : 0.13,
                strokeLinecap: 'round',
                transition: 'stroke 0.3s, stroke-width 0.3s',
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.9, delay: 1.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] },
                opacity:    { duration: 0.3, delay: 1.1 + i * 0.13 },
              }}
            />
          )
        })}
      </svg>

      {/* ── Central title block ── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: isMobile ? '22%' : '50%',
        transform: `translate(calc(-50% + ${mouse.x * 8}px), calc(-50% + ${mouse.y * 5}px))`,
        textAlign: 'center',
        zIndex: 5,
        pointerEvents: 'none',
        transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
        willChange: 'transform',
      }}>

        {/* IUI Solutions */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'var(--text-3xl)' : 'var(--text-4xl)',
            fontWeight: 700,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textShadow: '0 0 50px rgba(201,168,76,0.35), 0 0 120px rgba(201,168,76,0.1), 0 4px 24px rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
          }}
        >
          IUI Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.6)',
            letterSpacing: '0.04em',
            marginTop: '0.72rem',
            marginBottom: '1.4rem',
          }}
        >
          Engineering the future of healthcare technology.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: 'all' }}
        >
          <motion.a
            href="https://iuis.in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 28px rgba(201,168,76,0.28), 0 0 0 1px rgba(201,168,76,0.5)',
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.62rem 1.75rem',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '100px',
              background: 'rgba(201,168,76,0.06)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'rgba(201,168,76,0.85)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: 400,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 0 1px rgba(201,168,76,0.12)',
              transition: 'box-shadow 0.3s',
            }}
          >
            Visit IUI Solutions
            <span style={{ opacity: 0.65, fontSize: '0.85em' }}>→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Capability nodes ── */}
      {NODES.map((node, i) => {
        const pos    = getNodePos(node.angle, isMobile)
        const lit    = hovered === node.id
        const isRight  = pos.x > 55
        const isLeft   = pos.x < 45

        return (
          <motion.div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top:  `${pos.y}%`,
              width: 0, height: 0,
              overflow: 'visible',
              zIndex: 4,
              cursor: 'pointer',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={()   => setHovered(null)}
            onClick={()      => setHovered(hovered === node.id ? null : node.id)}
          >
            {/* Dot */}
            <motion.div
              animate={{
                scale:     lit ? 1.65 : [1, 1.14, 1],
                boxShadow: lit
                  ? '0 0 16px rgba(201,168,76,0.7), 0 0 34px rgba(201,168,76,0.25)'
                  : '0 0 5px rgba(201,168,76,0.2)',
              }}
              transition={
                lit
                  ? { duration: 0.3 }
                  : { duration: 2.6 + i * 0.45, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{
                position: 'absolute',
                left: `-${nodeR / 2}px`,
                top:  `-${nodeR / 2}px`,
                width:  `${nodeR}px`,
                height: `${nodeR}px`,
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.32)',
                border: `1px solid rgba(201,168,76,${lit ? 0.9 : 0.52})`,
                transition: 'border-color 0.3s',
              }}
            />

            {/* Label */}
            <div style={{
              position: 'absolute',
              ...(isRight  ? { left:  `${nodeR / 2 + 9}px`  } : {}),
              ...(isLeft   ? { right: `${nodeR / 2 + 9}px`  } : {}),
              ...(!isRight && !isLeft ? { left: '50%', transform: 'translateX(-50%)' } : {}),
              top:       (!isRight && !isLeft) ? `${nodeR / 2 + 7}px` : '-14px',
              textAlign: isRight ? 'left' : isLeft ? 'right' : 'center',
              pointerEvents: 'none',
            }}>
              {[node.label1, node.label2].map((line, li) => (
                <div key={li} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: isMobile ? '0.56rem' : '0.62rem',
                  fontWeight: 400,
                  color: lit ? 'rgba(201,168,76,0.9)' : 'rgba(245,240,232,0.4)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}>
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}

    </div>
  )
}
