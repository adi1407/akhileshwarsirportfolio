import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ─── Social links ──────────────────────────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/akhileshwar',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/akhileshwar',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/akhileshwar',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/akhileshwar',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
]

// ─── Stats ──────────────────────────────────────────────────
const STATS = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: 4,  suffix: '',  label: 'Sectors Mastered' },
  { value: 1,  suffix: '',  label: 'Defining Vision'  },
]

function CountUp({ target, suffix = '', startDelay = 0, duration = 1.5 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let raf
    const timer = setTimeout(() => {
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min((now - t0) / (duration * 1000), 1)
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, startDelay * 1000)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [target, duration, startDelay])
  return <>{count}{suffix}</>
}

// ─── Ambient particles ─────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  size: 1 + Math.random() * 1.6,
  duration: 16 + Math.random() * 14,
  delay: Math.random() * 12,
  opacity: 0.1 + Math.random() * 0.2,
}))

// ─── Magnetic CTA button ────────────────────────────────────
function MagneticButton({ children, onClick, compact }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    if (Math.hypot(dx, dy) < 90) {
      ref.current.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`
    }
  }
  const onLeave = () => {
    ref.current.style.transform = 'translate(0,0)'
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
  }
  return (
    <button
      ref={ref}
      className="btn-primary"
      onClick={onClick}
      style={{ transition: 'transform 0.12s', fontSize: 'var(--text-sm)', letterSpacing: '0.18em', padding: compact ? '0.65rem 1.2rem' : '0.9rem 2.8rem' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  )
}

// ─── Social icon with glass container ──────────────────────
function SocialIcon({ s, delay }) {
  return (
    <motion.a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      title={s.label}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.14,
        boxShadow: '0 0 22px rgba(201,168,76,0.28), 0 0 0 1px rgba(201,168,76,0.5)',
      }}
      style={{
        width: '42px', height: '42px',
        border: '1px solid rgba(201,168,76,0.22)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(245,240,232,0.65)',
        textDecoration: 'none',
        background: 'rgba(201,168,76,0.07)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'color 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'rgba(201,168,76,0.9)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(245,240,232,0.5)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'
      }}
    >
      {s.icon}
    </motion.a>
  )
}

// ──────────────────────────────────────────────────────────
export default function SceneHero({ navigate }) {
  const prefersReduced = useReducedMotion()
  const isMobile     = window.innerWidth  < 768
  const isSmallPhone = window.innerHeight < 700

  const textColRef  = useRef(null)
  const portraitRef = useRef(null)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const lerpRef     = useRef({ x: 0, y: 0 })
  const rafRef      = useRef(null)
  const startRef    = useRef(null)

  // ─── Smooth parallax + portrait 3D tilt + float ─────────
  useEffect(() => {
    if (isMobile || prefersReduced) return

    const onMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth - 0.5
      mouseRef.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Delay RAF start to avoid conflict with entrance animation
    const timeout = setTimeout(() => {
      startRef.current = performance.now()

      const tick = () => {
        const t = 0.07
        lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * t
        lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * t
        const lx = lerpRef.current.x
        const ly = lerpRef.current.y

        // Gentle float oscillation
        const elapsed = (performance.now() - startRef.current) / 1000
        const floatY  = Math.sin(elapsed * 0.45) * 7

        if (textColRef.current) {
          textColRef.current.style.transform = `translate(${-lx * 6}px, ${-ly * 4}px)`
        }
        if (portraitRef.current) {
          portraitRef.current.style.transform =
            `perspective(900px) rotateY(${lx * 6}deg) rotateX(${-ly * 4}deg) translate(${lx * 9}px, ${ly * 6 + floatY}px)`
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, 1400)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, prefersReduced])

  const portraitW = isMobile ? 'min(230px, 62vw)' : 'min(340px, 30vw)'
  const portraitH = isMobile ? 'min(210px, 58vw)' : 'min(440px, 62vh)'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 90% 70% at 60% 35%, #1a1400 0%, #0a0808 45%, #000000 100%)',
      }}
    >

      {/* ── Ambient particles ── */}
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
            background: 'rgba(201,168,76,0.65)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{ y: [0, -1080], opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* ── Cinematic vignette ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.38) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* ── Main grid ── */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: isMobile ? '1.5rem 1.2rem 3rem' : '0 5% 0 7%',
          gap: isMobile ? '1rem' : '3rem',
          overflow: 'hidden',
        }}
      >

        {/* ════ LEFT — Text ════ */}
        <div
          ref={textColRef}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
            order: isMobile ? 2 : 1,
            willChange: 'transform',
          }}
        >
          {/* Scene label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--gold)',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              marginBottom: isMobile ? '0.7rem' : '1.8rem',
            }}
          >
            01&nbsp;&nbsp;/&nbsp;&nbsp;Portfolio
          </motion.div>

          {/* Name — Line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
            }}>
              Akhileshwar K. Singh
            </span>
          </motion.div>

          {/* Line 2 */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(2rem, 9vw, 3.2rem)' : 'clamp(3.2rem, 5vw, 5.5rem)',
              fontWeight: 300,
              color: 'var(--white)',
              letterSpacing: '-0.01em',
              lineHeight: 1.0,
              marginTop: '0.1em',
            }}>
              Building the future of
            </span>
          </motion.div>

          {/* Line 3 — gold italic */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile ? 'clamp(2rem, 9vw, 3.2rem)' : 'clamp(3.2rem, 5vw, 5.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--gold-bright)',
                letterSpacing: '-0.01em',
                lineHeight: 1.0,
                textShadow: '0 0 60px rgba(232,201,106,0.55), 0 0 120px rgba(201,168,76,0.25)',
              }}
            >
              healthcare technology.
            </span>
          </motion.div>

          {/* Gold underline */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: isMobile ? '1px' : '1.5px',
              width: isMobile ? '50%' : '75%',
              background: isMobile
                ? 'linear-gradient(90deg, rgba(201,168,76,0.7), rgba(201,168,76,0.2), transparent)'
                : 'linear-gradient(90deg, rgba(232,201,106,0.9), rgba(201,168,76,0.45), transparent)',
              marginTop: isMobile ? '0.3rem' : '0.6rem',
              marginBottom: isMobile ? '0.8rem' : '2rem',
              transformOrigin: 'left center',
              alignSelf: isMobile ? 'center' : 'flex-start',
            }}
          />

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignSelf: isMobile ? 'center' : 'flex-start',
              marginBottom: isMobile ? '0.8rem' : '2rem',
            }}
          >
            {STATS.map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
                {i > 0 && (
                  <div style={{
                    width: '1px',
                    alignSelf: 'stretch',
                    background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
                    margin: `0 ${isMobile ? '0.9rem' : '1.4rem'}`,
                  }} />
                )}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: isMobile ? 'clamp(1.7rem, 7vw, 2.1rem)' : 'clamp(2.4rem, 3.4vw, 3.2rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'var(--gold-bright)',
                    textShadow: '0 0 40px rgba(232,201,106,0.5), 0 0 80px rgba(201,168,76,0.2)',
                    letterSpacing: '-0.01em',
                  }}>
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      startDelay={1.9 + i * 0.2}
                      duration={1.5}
                    />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? '0.52rem' : '0.6rem',
                    color: 'rgba(245,240,232,0.52)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginTop: '0.35rem',
                    lineHeight: 1.3,
                  }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isMobile ? 'var(--text-lg)' : 'clamp(1.1rem, 1.5vw, 1.3rem)',
              color: isMobile ? 'var(--white-muted)' : 'rgba(245,240,232,0.72)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: isMobile ? '0.8rem' : '2.5rem',
              display: isSmallPhone ? 'none' : 'block',
            }}
          >
            Designing intelligent digital ecosystems<br />
            for modern healthcare.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: isMobile ? '1rem' : '2.5rem' }}
          >
            <MagneticButton onClick={() => navigate(2)} compact={isMobile}>
              Begin the Journey
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '0.5rem' }}>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {SOCIALS.map((s, i) => (
              <SocialIcon key={s.label} s={s} delay={2.35 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* ════ RIGHT — Portrait ════ */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            order: isMobile ? 1 : 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Golden halo behind portrait */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '140%',
              height: '140%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse 65% 65% at 50% 48%, rgba(201,168,76,0.28) 0%, rgba(201,168,76,0.10) 45%, transparent 70%)',
              filter: 'blur(24px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Portrait card with tilt ref */}
          <div
            ref={portraitRef}
            style={{
              width: portraitW,
              height: portraitH,
              position: 'relative',
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              zIndex: 1,
            }}
          >
            {/* Drop shadow + outer gold glow */}
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '2px',
              boxShadow: '0 28px 90px rgba(0,0,0,0.88), 0 0 60px rgba(201,168,76,0.18), 0 0 120px rgba(201,168,76,0.07)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Portrait frame */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.22)',
              background: '#f0ece4',
            }}>
              {/* Portrait image */}
              <img
                src="/akhi.png"
                alt="Akhileshwar K. Singh"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: '65% top',
                  display: 'block',
                  zIndex: 1,
                }}
                onError={e => { e.target.style.display = 'none' }}
              />

              {/* Bottom vignette */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.9) 12%, rgba(6,6,8,0.45) 35%, transparent 62%)',
              }} />

              {/* Top vignette */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(6,6,8,0.72) 0%, rgba(6,6,8,0.08) 28%, transparent 52%)',
              }} />

              {/* Left vignette */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to right, rgba(6,6,8,0.78) 0%, rgba(6,6,8,0.18) 28%, transparent 58%)',
              }} />

              {/* Right rim light — gold tint */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to left, rgba(6,6,8,0.45) 0%, rgba(201,168,76,0.07) 22%, transparent 52%)',
              }} />

              {/* Caption */}
              <div style={{
                position: 'absolute',
                bottom: '1.2rem', left: '1.2rem', right: '1.2rem',
                zIndex: 4, pointerEvents: 'none',
                display: isMobile ? 'none' : 'block',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(245,240,232,0.58)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}>
                  Healthcare Technologist &amp; Visionary
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  )
}
