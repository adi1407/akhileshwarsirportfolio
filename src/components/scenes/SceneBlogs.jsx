import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThreeAmbient from '../three/ThreeAmbient.jsx'

const BLOGS_STATIC = [
  { _id: '1', title: 'The Future of Healthcare Technology', slug: 'future-healthcare-technology', excerpt: 'Exploring how digital transformation is reshaping patient care and clinical workflows across modern health systems.', category: 'Healthcare Innovation', readTime: '6 min read', date: 'March 2024', coverColor: '#1a1200', content: 'The intersection of artificial intelligence and healthcare has long been a subject of fascination for technologists and clinicians alike. As we move deeper into the era of connected health, the question is no longer whether technology will transform medicine — but how rapidly.\n\nModern healthcare systems are burdened by inefficiency, fragmented data, and the ever-growing complexity of patient care. The solution lies not in incremental improvement, but in fundamental rethinking of how we build, deploy, and scale health technology.\n\nAt the core of this transformation is interoperability — the ability of disparate systems to communicate seamlessly. When a patient\'s history, lab results, imaging, and clinical notes exist in isolated silos, care suffers. When they flow as a unified stream, remarkable things become possible.\n\nWe are entering an era where predictive analytics can identify at-risk patients before symptoms manifest. Where ambient AI documentation liberates clinicians from keyboards and returns them to bedside presence. Where patients carry their complete health record in their pocket.\n\nThis is not speculation. The infrastructure exists. What remains is the will to implement it thoughtfully, ethically, and at scale.' },
  { _id: '2', title: 'Designing for Compliance Without Compromise', slug: 'designing-compliance-without-compromise', excerpt: 'How we built HIPAA-compliant systems that are still delightful to use — because security and elegance are not enemies.', category: 'Product Design', readTime: '5 min read', date: 'January 2024', coverColor: '#0a1a0a', content: 'There is a persistent myth in enterprise software that compliance requirements must produce ugly, unusable products. That security demands friction. That regulatory constraints kill design.\n\nThis myth has infected healthcare technology for decades, producing systems that clinicians despise, patients abandon, and administrators tolerate only because they have no choice.\n\nWe chose a different path.\n\nWhen we set out to build for healthcare, we asked a simple question: what if compliance was the design brief, not the constraint? What if every HIPAA requirement was treated as an opportunity to earn trust?\n\nThe result was a security architecture built on zero-trust principles, end-to-end encryption, and role-based access control — implemented with a user experience so smooth that security became invisible.' },
  { _id: '3', title: 'Building Systems That Scale in Healthcare', slug: 'building-systems-scale-healthcare', excerpt: 'Lessons from architecting infrastructure that handles millions of patient records with sub-second response times.', category: 'Engineering', readTime: '7 min read', date: 'November 2023', coverColor: '#0a0a1a', content: 'Scalability in healthcare is not the same as scalability in consumer technology. The stakes are higher. A slow e-commerce checkout is annoying. A slow clinical decision support system can delay care.\n\nWhen we began architecting our health platforms, we knew that performance was a clinical requirement, not merely a technical preference. Every millisecond of latency in a critical workflow has a cost measured in ways beyond server bills.\n\nWe adopted a microservices architecture with event-driven data pipelines, capable of processing millions of records while maintaining sub-second response times at the API layer. Each service was designed to fail gracefully, with circuit breakers and fallback states ensuring the system remained usable even under partial failure.\n\nScaling a healthcare system is a discipline. It requires patience, rigor, and deep respect for the humans whose care depends on every query completing in time.' },
]

function ReaderMode({ blog, onClose }) {
  const [scrollPct, setScrollPct] = useState(0)
  const paragraphs = blog.content.split('\n\n').filter(Boolean)

  const handleScroll = (e) => {
    const el = e.target
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
    setScrollPct(Math.min(100, Math.max(0, pct)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#060608',
        zIndex: 400,
        overflowY: 'auto',
        padding: '0',
      }}
      onScroll={handleScroll}
    >
      {/* Reading progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${scrollPct}%`,
        background: 'linear-gradient(90deg, var(--gold), var(--gold-bright))',
        zIndex: 500,
        transition: 'width 0.1s',
      }} />

      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.2rem 2rem',
        background: 'rgba(6,6,8,0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 499,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--white-muted)',
          letterSpacing: '0.1em',
        }}>
          {blog.readTime}
        </div>
        <button
          onClick={onClose}
          className="btn-ghost"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          ← Return
        </button>
      </div>

      {/* Article content */}
      <div style={{
        maxWidth: '660px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--gold)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          {blog.category} — {blog.date}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 300,
          color: 'var(--white)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '2rem',
        }}>
          {blog.title}
        </h1>

        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, var(--gold), transparent)',
          marginBottom: '2.5rem',
          width: '100px',
        }} />

        {paragraphs.map((para, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            lineHeight: 1.9,
            color: 'var(--white-dim)',
            marginBottom: '1.8rem',
            fontWeight: 300,
          }}>
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default function SceneBlogs() {
  const [blogs] = useState(BLOGS_STATIC)
  const [reading, setReading] = useState(null)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #070610 0%, #060608 60%, #0a0810 100%)',
      position: 'relative',
      overflow: 'hidden auto',
    }}>
      <ThreeAmbient
        particleCount={100}
        color="#6a5a2e"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 1.5rem 6rem',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gold)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            05 / Thoughts
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 300,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
          }}>
            Editorial <em style={{ color: 'var(--gold)' }}>Writing</em>
          </h2>
        </motion.div>

        {/* Blog cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blogs.map((blog, i) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              onClick={() => setReading(blog)}
              className="glass-card"
              style={{
                padding: '2rem',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                background: `linear-gradient(135deg, ${blog.coverColor}60, rgba(14,14,22,0.7))`,
                border: '1px solid rgba(201,168,76,0.1)',
                transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
              }}
              whileHover={{
                rotateX: 1,
                rotateY: -1,
                y: -4,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--gold)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '0.6rem',
                }}>
                  {blog.category} — {blog.date}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 400,
                  color: 'var(--white)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.2,
                }}>
                  {blog.title}
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--white-muted)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>
                  {blog.excerpt}
                </p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.8rem',
                flexShrink: 0,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--white-muted)',
                }}>
                  {blog.readTime}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '2px',
                }}>
                  Read →
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Reader Mode */}
      <AnimatePresence>
        {reading && (
          <ReaderMode blog={reading} onClose={() => setReading(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
