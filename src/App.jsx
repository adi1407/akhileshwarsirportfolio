import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import SceneIntro    from './components/scenes/SceneIntro.jsx'
import SceneHero     from './components/scenes/SceneHero.jsx'
import SceneAbout    from './components/scenes/SceneAbout.jsx'
import SceneEducation from './components/scenes/SceneEducation.jsx'
import SceneMilestone from './components/scenes/SceneMilestone.jsx'
import SceneImpact   from './components/scenes/SceneImpact.jsx'
import SceneAwards   from './components/scenes/SceneAwards.jsx'
import SceneBlogs    from './components/scenes/SceneBlogs.jsx'
import SceneIUI      from './components/scenes/SceneIUI.jsx'
import SceneSecret     from './components/scenes/SceneSecret.jsx'
import SceneReflection from './components/scenes/SceneReflection.jsx'
import SceneContact    from './components/scenes/SceneContact.jsx'
import SceneNav      from './components/ui/SceneNav.jsx'
import SceneMap      from './components/ui/SceneMap.jsx'

// Walk up the DOM to find the nearest vertically scrollable ancestor
function findScrollableParent(el) {
  while (el && el !== document.body) {
    const { overflowY } = window.getComputedStyle(el)
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
      return el
    }
    el = el.parentElement
  }
  return null
}

const SCENES = [
  { id: 'intro',     label: 'Intro',     Component: SceneIntro },
  { id: 'hero',      label: 'Identity',  Component: SceneHero },
  { id: 'about',       label: 'Story',       Component: SceneAbout },
  { id: 'foundations', label: 'Foundations', Component: SceneEducation },
  { id: 'journey',     label: 'Journey',     Component: SceneMilestone },
  { id: 'impact',      label: 'Impact',      Component: SceneImpact },
  { id: 'awards',    label: 'Honours',   Component: SceneAwards },
  { id: 'blogs',     label: 'Thoughts',  Component: SceneBlogs },
  { id: 'iui',       label: 'IUI',       Component: SceneIUI },
  { id: 'secret',     label: '???',        Component: SceneSecret },
  { id: 'reflection', label: 'Reflection', Component: SceneReflection },
  { id: 'contact',    label: 'Contact',    Component: SceneContact },
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState(null)
  const [direction, setDir]   = useState(1)
  const [mapOpen, setMapOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const touchStartY      = useRef(null)
  const touchStartX      = useRef(null)
  const touchStartTarget = useRef(null)
  const wheelLock        = useRef(false)

  const navigate = useCallback((idx) => {
    if (transitioning) return
    if (idx < 0 || idx >= SCENES.length) return
    // Prevent navigating back to the intro once it has been exited
    if (current > 0 && idx === 0) return
    if (idx === current) return
    setTransitioning(true)
    setDir(idx > current ? 1 : -1)
    setPrev(current)
    setCurrent(idx)
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 900)
  }, [current, transitioning])

  // Keyboard navigation (disabled while intro is showing)
  useEffect(() => {
    const onKey = (e) => {
      if (current === 0) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   navigate(current - 1)
      if (e.key === 'Escape') setMapOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, navigate])

  // Wheel navigation (disabled while intro is showing)
  useEffect(() => {
    const onWheel = (e) => {
      if (current === 0) return
      if (wheelLock.current) return
      wheelLock.current = true
      if (e.deltaY > 40)       navigate(current + 1)
      else if (e.deltaY < -40) navigate(current - 1)
      setTimeout(() => { wheelLock.current = false }, 900)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [current, navigate])

  // Touch/swipe navigation (disabled while intro is showing)
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartY.current      = e.touches[0].clientY
      touchStartX.current      = e.touches[0].clientX
      touchStartTarget.current = e.touches[0].target
    }
    const onTouchEnd = (e) => {
      if (current === 0) return
      if (touchStartY.current === null) return
      const dy    = touchStartY.current - e.changedTouches[0].clientY
      const dx    = touchStartX.current - e.changedTouches[0].clientX
      const absdy = Math.abs(dy)
      const absdx = Math.abs(dx)
      touchStartY.current      = null
      touchStartX.current      = null
      touchStartTarget.current = null

      if (absdx > absdy && absdx > 50) {
        // Horizontal swipe: right → next, left → previous
        if (dx < 0) navigate(current + 1)   // finger moved right
        else        navigate(current - 1)   // finger moved left
      } else if (absdy > absdx && absdy > 80) {
        // Vertical swipe: only navigate when the scene is at its scroll boundary
        const scrollable = findScrollableParent(e.changedTouches[0].target)
        if (scrollable) {
          const { scrollTop, scrollHeight, clientHeight } = scrollable
          const atBottom = scrollTop + clientHeight >= scrollHeight - 10
          const atTop    = scrollTop <= 10
          if (dy > 0 && atBottom) navigate(current + 1)
          else if (dy < 0 && atTop) navigate(current - 1)
        } else {
          if (dy > 0) navigate(current + 1)
          else        navigate(current - 1)
        }
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [current, navigate])

  const prevScene    = prev !== null ? SCENES[prev] : null
  const currentScene = SCENES[current]

  // Coming from the intro → fade + scale instead of slide
  const fromIntro = prev === 0

  return (
    <div className="scene-viewport grain">

      {/* ── INTRO OVERLAY ─────────────────────────────────────
          Sits at z:1000 while current === 0.
          Calls navigate(1) when panels finish opening.        */}
      {current === 0 && (
        <SceneIntro onComplete={() => navigate(1)} />
      )}

      {/* ── NORMAL SCENE SYSTEM (current > 0) ──────────────── */}
      {current > 0 && (
        <>
          {/* Background scene blurs out — skipped when coming from intro */}
          <AnimatePresence>
            {prevScene && !fromIntro && (
              <motion.div
                key={`bg-${prevScene.id}`}
                className="scene"
                initial={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                animate={{ opacity: 0.3, filter: 'blur(12px)', scale: 0.97 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: 1 }}
              >
                <prevScene.Component
                  isBackground
                  navigate={navigate}
                  current={current}
                  total={SCENES.length}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active scene —
              after intro: subtle fade + scale-down (panels have just opened)
              normal nav:  slide in from the direction of travel               */}
          <motion.div
            key={currentScene.id}
            className="scene"
            initial={
              fromIntro
                ? { opacity: 0, scale: 1.03, filter: 'blur(4px)' }
                : { x: direction > 0 ? '100%' : '-100%', opacity: 0 }
            }
            animate={{ x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: 2 }}
          >
            <currentScene.Component
              navigate={navigate}
              current={current}
              total={SCENES.length}
            />
          </motion.div>
        </>
      )}

      {/* Scene nav — hidden during intro */}
      {current > 0 && (
        <SceneNav
          scenes={SCENES}
          current={current}
          navigate={navigate}
          onMapOpen={() => setMapOpen(true)}
        />
      )}

      {/* Overlay scene map */}
      <AnimatePresence>
        {mapOpen && (
          <SceneMap
            scenes={SCENES}
            current={current}
            navigate={(i) => { navigate(i); setMapOpen(false) }}
            onClose={() => setMapOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
