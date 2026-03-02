import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

export default function SceneIntro({ onComplete }) {
  // ─── Refs ────────────────────────────────────────────────
  const overlayRef    = useRef(null)
  const bgWrapRef     = useRef(null)
  const hazeRef       = useRef(null)
  const portalRef     = useRef(null)
  const glowRef       = useRef(null)
  const ringRef       = useRef(null)
  const shimmerRef    = useRef(null)
  const contentRef    = useRef(null)
  const eyebrowRef    = useRef(null)
  const word0Ref      = useRef(null)
  const word1Ref      = useRef(null)
  const word2Ref      = useRef(null)
  const underlineRef  = useRef(null)
  const taglineRef    = useRef(null)
  const sweepRef      = useRef(null)
  const enterRef      = useRef(null)
  const hintLeftRef   = useRef(null)
  const hintRightRef  = useRef(null)
  const panelLeftRef  = useRef(null)
  const panelRightRef = useRef(null)
  const rippleRef     = useRef(null)
  const esmRef        = useRef(null)   // ← Every Second Matters banner

  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  const openedRef   = useRef(false)
  const masterTlRef = useRef(null)
  const isMobile    = typeof window !== 'undefined' && window.innerWidth < 768
  const isTablet    = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024

  // ─── Book-open trigger ───────────────────────────────────
  const triggerOpen = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    if (masterTlRef.current) masterTlRef.current.kill()

    gsap.set(overlayRef.current, { perspective: 1400 })

    // One-shot ripple expands from ring center
    gsap.set(rippleRef.current, { display: 'block' })
    gsap.fromTo(
      rippleRef.current,
      { scale: 0.65, opacity: 0.75 },
      { scale: 4.5, opacity: 0, duration: 1.1, ease: 'power2.out' },
    )

    // Content flies upward
    const rect    = contentRef.current.getBoundingClientRect()
    const targetY = window.innerHeight * 0.06
    const deltaY  = targetY - rect.top
    gsap.to(contentRef.current, { y: deltaY, duration: 0.65, ease: 'power3.inOut' })
    gsap.to(contentRef.current, { opacity: 0, duration: 0.28, delay: 0.3 })

    // Fade portal, button, hints AND the ESM banner
    gsap.to(
      [portalRef.current, enterRef.current,
       hintLeftRef.current, hintRightRef.current,
       esmRef.current],
      { opacity: 0, duration: 0.38, ease: 'power2.in' },
    )

    // Snap panels into view then slide them off
    gsap.set([panelLeftRef.current, panelRightRef.current], { display: 'block', opacity: 1 })

    const openTl = gsap.timeline({ delay: 0.18 })
    openTl
      .to(panelLeftRef.current, {
        x: '-102%', rotationY: -13,
        transformOrigin: 'right center',
        duration: 0.92, ease: 'expo.inOut',
      })
      .to(panelRightRef.current, {
        x: '102%', rotationY: 13,
        transformOrigin: 'left center',
        duration: 0.92, ease: 'expo.inOut',
      }, '<')
      .to(hazeRef.current,    { opacity: 0, duration: 0.45 }, 0.5)
      .to(overlayRef.current, { opacity: 0, duration: 0.18 }, 0.87)
      .call(() => onCompleteRef.current(), [], 0.92)
  }, [])

  // ─── Master GSAP timeline ────────────────────────────────
  useEffect(() => {
    const words = [word0Ref.current, word1Ref.current, word2Ref.current]

    // Initial hidden states
    gsap.set(bgWrapRef.current,    { opacity: 0 })
    gsap.set(hazeRef.current,      { opacity: 0 })
    gsap.set(portalRef.current,    { opacity: 0, scale: 0.88 })
    gsap.set(glowRef.current,      { opacity: 0 })
    gsap.set(shimmerRef.current,   { x: '-150%' })
    gsap.set(contentRef.current,   { opacity: 0 })
    gsap.set(eyebrowRef.current,   { opacity: 0, y: 7 })
    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(taglineRef.current,   { opacity: 0, y: 8 })
    gsap.set(sweepRef.current,     { x: '-130%' })
    gsap.set(enterRef.current,     { opacity: 0, y: 15 })
    gsap.set([hintLeftRef.current, hintRightRef.current], { opacity: 0 })
    gsap.set([panelLeftRef.current, panelRightRef.current], { display: 'none' })
    gsap.set(rippleRef.current,    { display: 'none', opacity: 0 })
    gsap.set(esmRef.current,       { opacity: 0, y: -16, filter: 'blur(10px)' })
    words.forEach(w => { if (w) gsap.set(w, { filter: 'blur(14px)', opacity: 0, y: 10 }) })

    const tl = gsap.timeline()
    masterTlRef.current = tl

    // 0.00–0.50 — Background
    tl.to(bgWrapRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
    tl.to(hazeRef.current,   { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)

    // 0.20–1.10 — ESM banner slides down from top (appears FIRST)
    tl.to(esmRef.current, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.0, ease: 'power3.out',
    }, 0.2)

    // 0.50–1.40 — Portal ring + shimmer
    tl.to(portalRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 0.5)
    tl.to(glowRef.current,   { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.5)
    tl.to(shimmerRef.current, { x: '280%', duration: 1.1, ease: 'power1.inOut' }, 1.0)

    // 1.40–2.20 — Typography
    tl.to(contentRef.current, { opacity: 1, duration: 0.01 }, 1.4)
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.42)
    words.forEach((w, i) => {
      if (!w) return
      tl.to(w, { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.52 + i * 0.21)
    })
    tl.to(taglineRef.current,   { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }, 1.95)
    tl.to(underlineRef.current, { scaleX: 1,         duration: 0.55, ease: 'power3.out' }, 2.02)
    tl.to(sweepRef.current,     { x: '150%',          duration: 0.9,  ease: 'power2.inOut' }, 1.62)

    // 2.20–3.00 — Prepare open
    tl.to([hintLeftRef.current, hintRightRef.current],
      { opacity: 1, duration: 0.4, ease: 'power2.out' }, 2.25)
    tl.to(enterRef.current,  { opacity: 1, y: 0,   duration: 0.45, ease: 'power2.out' }, 2.4)
    tl.to(portalRef.current, { scale: 1.06,          duration: 0.8,  ease: 'power2.out' }, 2.2)

    // 3.00 — Auto-open
    tl.call(() => triggerOpen(), [], 3.0)

    return () => tl.kill()
  }, [triggerOpen])

  // Mobile: scroll to skip
  useEffect(() => {
    if (!isMobile) return
    const fn = () => triggerOpen()
    window.addEventListener('scroll', fn, { passive: true, once: true })
    return () => window.removeEventListener('scroll', fn)
  }, [isMobile, triggerOpen])

  // ─── Render ──────────────────────────────────────────────
  const ringSize = isMobile ? 170 : 230

  // ESM banner width — responsive
  const esmW = isMobile ? 'min(86vw, 340px)' : isTablet ? 'min(72vw, 580px)' : 'min(62vw, 740px)'

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        overflow: 'hidden',
        background: '#060608',
      }}
    >
      {/* ── Three.js particles ── */}
      <div ref={bgWrapRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ThreeAmbient
          particleCount={isMobile ? 220 : 580}
          color="#c9a84c"
          rings
          streaks={false}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      {/* ── Warm gold haze ── */}
      <div
        ref={hazeRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 68% 58% at 50% 50%, rgba(201,168,76,0.11) 0%, rgba(201,168,76,0.025) 55%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Panel edge hints ── */}
      <div ref={hintLeftRef} style={{
        position: 'absolute', left: 0, top: '12%', bottom: '12%', width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.38), transparent)',
        zIndex: 3, pointerEvents: 'none',
      }} />
      <div ref={hintRightRef} style={{
        position: 'absolute', right: 0, top: '12%', bottom: '12%', width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.38), transparent)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════
          ESM banner — absolutely anchored to top center,
          appears first in the timeline as an opening title
      ══════════════════════════════════════════════════ */}
      <div
        ref={esmRef}
        style={{
          position: 'absolute',
          top: isMobile ? 'clamp(1rem, 3.5vh, 2rem)' : 'clamp(1.8rem, 4vh, 3.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: esmW,
          zIndex: 5,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {/* Subtle wide glow behind the banner text */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px -40px',
            background:
              'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 70%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }}
        />
        <img
          src="/every-second-matters.png"
          alt="Every Second Matters"
          onError={e => { e.target.style.visibility = 'hidden' }}
          style={{
            width: '100%',
            display: 'block',
            position: 'relative',
            // drop-shadow glows on the white text pixels, ignoring transparency
            filter:
              'drop-shadow(0 0 22px rgba(201,168,76,0.42)) drop-shadow(0 0 55px rgba(201,168,76,0.16))',
          }}
        />
        {/* Thin gold rule below the banner */}
        <div
          style={{
            width: isMobile ? '60%' : '50%',
            height: '1px',
            marginTop: isMobile ? '0.5rem' : '0.7rem',
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)',
          }}
        />
      </div>

      {/* ── CENTER COLUMN: portal ring + typography ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '22px' : '30px',
          zIndex: 4,
          paddingBottom: isMobile ? '100px' : '80px',
          // Extra top padding so content doesn't overlap the ESM banner
          paddingTop: isMobile ? '80px' : '60px',
          pointerEvents: 'none',
        }}
      >
        {/* Portal ring */}
        <div
          ref={portalRef}
          style={{
            width: ringSize,
            height: ringSize,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* Outer breathing glow */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              inset: '-45%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.04) 55%, transparent 75%)',
              animation: 'portalBreathe 3.6s ease-in-out infinite',
            }}
          />

          {/* Portrait photo — fills the inner circle, sits beneath the ring border */}
          <div
            style={{
              position: 'absolute',
              inset: '3px',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <img
              src="/akhi.png"
              alt="Akhileshwar K. Singh"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
              onError={e => { e.target.style.display = 'none' }}
            />
            {/* Circular vignette to blend photo edges into dark bg */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, transparent 35%, rgba(6,6,8,0.5) 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Ring border — sits above the photo */}
          <div
            ref={ringRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.52)',
              boxShadow: '0 0 28px rgba(201,168,76,0.2), inset 0 0 28px rgba(201,168,76,0.07)',
              animation: 'portalRotate 26s linear infinite',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {/* Shimmer sweep */}
            <div
              ref={shimmerRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '-50%',
                width: '45%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.32), transparent)',
              }}
            />
          </div>

          {/* Inner soft glow — above photo */}
          <div style={{
            position: 'absolute',
            inset: '22%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />

          {/* One-shot ripple */}
          <div
            ref={rippleRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid rgba(201,168,76,0.68)',
              display: 'none',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Text content */}
        <div
          ref={contentRef}
          style={{
            textAlign: 'center',
            width: 'min(88vw, 540px)',
          }}
        >
          <div
            ref={eyebrowRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(201,168,76,0.62)',
              letterSpacing: '0.52em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
            }}
          >
            Presenting
          </div>

          {/* Headline + sweep + underline */}
          <div style={{ position: 'relative' }}>
            <div
              ref={sweepRef}
              style={{
                position: 'absolute',
                top: '-12%', left: '-10%',
                width: '40%', height: '124%',
                background: 'linear-gradient(108deg, transparent, rgba(245,240,232,0.07), transparent)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile
                  ? 'clamp(1.9rem, 9vw, 2.9rem)'
                  : 'clamp(2.6rem, 5.5vw, 4rem)',
                fontWeight: 300,
                color: 'var(--white)',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'baseline',
                gap: '0.28em',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span ref={word0Ref} style={{ display: 'inline-block' }}>Akhileshwar</span>
              <span ref={word1Ref} style={{ display: 'inline-block' }}>K.</span>
              <span ref={word2Ref} style={{ display: 'inline-block' }}>Singh</span>
            </h1>

            <div
              ref={underlineRef}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(201,168,76,0.6), rgba(201,168,76,0.25), transparent)',
                marginTop: '0.6rem',
              }}
            />
          </div>

          <div
            ref={taglineRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245,240,232,0.38)',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
            }}
          >
            Healthcare Technologist &amp; Visionary
          </div>
        </div>
      </div>

      {/* ── Enter button — pinned to bottom ── */}
      <div
        ref={enterRef}
        style={{
          position: 'absolute',
          bottom: 'max(env(safe-area-inset-bottom, 0px) + 2rem, 2rem)',
          left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
          zIndex: 7,
          pointerEvents: 'auto',
        }}
      >
        <button
          className="btn-primary"
          onClick={() => triggerOpen()}
          style={{
            letterSpacing: '0.26em',
            minWidth: isMobile ? '190px' : undefined,
            fontSize: isMobile ? '0.85rem' : undefined,
          }}
        >
          Enter Experience
        </button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(245,240,232,0.26)',
            letterSpacing: '0.12em',
          }}
        >
          Auto-opening in a moment
        </span>
      </div>

      {/* ── Book panels ── */}
      <div
        ref={panelLeftRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
          background: 'linear-gradient(to right, #040406 65%, rgba(201,168,76,0.035) 100%)',
          borderRight: '1px solid rgba(201,168,76,0.2)',
          boxShadow: 'inset -14px 0 44px rgba(0,0,0,0.65)',
          zIndex: 8, display: 'none',
        }}
      />
      <div
        ref={panelRightRef}
        style={{
          position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
          background: 'linear-gradient(to left, #040406 65%, rgba(201,168,76,0.035) 100%)',
          borderLeft: '1px solid rgba(201,168,76,0.2)',
          boxShadow: 'inset 14px 0 44px rgba(0,0,0,0.65)',
          zIndex: 8, display: 'none',
        }}
      />
    </div>
  )
}
