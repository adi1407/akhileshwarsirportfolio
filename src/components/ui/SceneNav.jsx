import { motion } from 'framer-motion'

export default function SceneNav({ scenes, current, navigate, onMapOpen }) {
  const displayIdx = String(current).padStart(2, '0')
  const displayTotal = String(scenes.length - 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{
        position: 'fixed',
        bottom: 'calc(2rem + env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      {/* Dot nav */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {scenes.slice(1).map((s, i) => {
          const idx = i + 1
          const active = idx === current
          return (
            <button
              key={s.id}
              onClick={() => navigate(idx)}
              title={s.label}
              style={{
                width: active ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: active ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          )
        })}
      </div>

      {/* Scene counter */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--white-muted)',
        letterSpacing: '0.2em',
        userSelect: 'none',
      }}>
        <span style={{ color: 'var(--gold)' }}>{displayIdx}</span>
        {' '}/{' '}
        {displayTotal}
      </span>

      {/* Map button */}
      <button onClick={onMapOpen} className="btn-ghost" style={{ padding: '0.4rem 0.8rem' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="0" y="0" width="12" height="2" rx="1" fill="currentColor"/>
          <rect x="0" y="5" width="8" height="2" rx="1" fill="currentColor"/>
          <rect x="0" y="10" width="12" height="2" rx="1" fill="currentColor"/>
        </svg>
        <span>Map</span>
      </button>
    </motion.div>
  )
}
