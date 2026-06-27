import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCategoryBySlug } from '../data/categories'
import { getGallery } from '../data/gallery'
import Lightbox from './Lightbox'

function MediaCard({ item, cat, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      className="relative group overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/60"
      style={{ borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
    >
      <div className="aspect-square relative overflow-hidden bg-white/5">
        {item.type === 'video' ? (
          <video
            src={item.url}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.url}
            alt={cat.label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Zoom hint on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <svg className="w-9 h-9 text-white opacity-0 group-hover:opacity-90 transition-opacity drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const cat = getCategoryBySlug(slug)
  const media = getGallery(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (!cat) navigate('/')
  }, [cat, navigate])

  if (!cat) return null

  return (
    <section style={{ background: cat.heroGradient, minHeight: '100vh' }}>

      {/* Hero */}
      <div className="relative overflow-hidden pt-20 pb-16 px-6 text-center">
        {/* Hero background image */}
        {cat.image && (
          <div className="absolute inset-0 pointer-events-none">
            <img src={cat.image} alt={`${cat.label} — נקיון מקצועי בנתניה והשרון`} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(5,14,31,0.55) 0%, rgba(5,14,31,0.45) 45%, rgba(5,14,31,0.96) 100%)' }} />
          </div>
        )}

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: cat.color }} />
        </div>

        <div className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">הבית</Link>
            <span>/</span>
            <span className="text-white/80">{cat.label}</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-6xl mb-5 drop-shadow-lg"
            aria-hidden="true"
          >{cat.icon}</motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-900 text-white mb-3 leading-tight drop-shadow-xl"
          >{cat.label}</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-lg font-500 drop-shadow-md"
            style={{ color: cat.color }}
          >{cat.tagline}</motion.p>
        </div>

      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto px-4 pb-32">

        {media.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-6xl mb-4" aria-hidden="true">📷</p>
            <p className="text-white/50 text-lg">עוד אין תמונות כאן</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {media.map((item, i) => (
              <MediaCard key={item.url} item={item} cat={cat} index={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && media[lightboxIndex] && (
          <Lightbox
            items={media}
            index={lightboxIndex}
            onIndex={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
