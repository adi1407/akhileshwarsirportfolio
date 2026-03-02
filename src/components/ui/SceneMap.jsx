import { motion } from 'framer-motion'

export default function SceneMap({ scenes, current, navigate, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,6,8,0.92)',
        backdropFilter: 'blur(24px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          padding: '3rem',
          minWidth: '320px',
        }}
      >
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scene Map
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--white-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {scenes.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => navigate(i)}
              whileHover={{ x: 8 }}
              style={{
                background: 'none',
                border: 'none',
                color: i === current ? 'var(--gold)' : 'var(--white-dim)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-lg)',
                fontWeight: 300,
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid rgba(201,168,76,0.08)',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--white-muted)', minWidth: '28px' }}>
                {String(i).padStart(2,'0')}
              </span>
              {s.label}
              {i === current && (
                <span style={{ marginLeft: 'auto', fontSize: 'var(--text-xs)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                  ← NOW
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
