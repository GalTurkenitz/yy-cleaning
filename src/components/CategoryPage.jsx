import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { getCategoryBySlug, CATEGORIES } from '../data/categories'
import MediaUploader from './MediaUploader'

function MediaCard({ item, cat, index, onOpen }) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async e => {
    e.stopPropagation()
    if (!confirm('למחוק את הקובץ?')) return
    const path = new URL(item.url).pathname.split('/media/')[1]
    await supabase.storage.from('media').remove([path])
    await supabase.from('media').delete().eq('id', item.id)
    setDeleted(true)
  }

  if (deleted) return null

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
        {/* Delete button — appears on hover */}
        <button
          onClick={handleDelete}
          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-600/90 text-white text-sm font-700 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
          aria-label="מחק"
          title="מחק"
        >✕</button>
      </div>
    </motion.div>
  )
}

function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index]
  const many = items.length > 1
  const prev = () => onIndex(i => (i - 1 + items.length) % items.length)
  const next = () => onIndex(i => (i + 1) % items.length)

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') prev()
      else if (e.key === 'ArrowLeft') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [items.length])

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-colors"
        aria-label="סגור"
      >✕</button>

      {/* Counter */}
      {many && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-500">
          {index + 1} / {items.length}
        </div>
      )}

      {/* Nav arrows */}
      {many && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition-colors"
            aria-label="הקודם"
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition-colors"
            aria-label="הבא"
          >›</button>
        </>
      )}

      {/* Media */}
      <motion.div
        key={item.id}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="max-w-[92vw] max-h-[86vh] flex items-center justify-center"
      >
        {item.type === 'video' ? (
          <video src={item.url} controls autoPlay playsInline className="max-w-full max-h-[86vh] rounded-lg" />
        ) : (
          <img src={item.url} alt="" className="max-w-full max-h-[86vh] rounded-lg object-contain" />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const cat = getCategoryBySlug(slug)
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const loadMedia = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('media')
      .select('*')
      .eq('category', slug)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    setMedia(data || [])
    setLoading(false)
  }, [slug])

  useEffect(() => {
    if (!cat) { navigate('/'); return }
    loadMedia()
  }, [slug, cat, navigate, loadMedia])

  if (!cat) return null

  return (
    <section style={{ background: cat.heroGradient, minHeight: '100vh' }}>

      {/* Hero */}
      <div className="relative overflow-hidden pt-20 pb-16 px-6 text-center">
        {/* Hero background image */}
        {cat.image && (
          <div className="absolute inset-0 pointer-events-none">
            <img src={cat.image} alt="" className="w-full h-full object-cover" />
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

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
          </div>
        ) : media.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-6xl mb-4" aria-hidden="true">📷</p>
            <p className="text-white/50 text-lg">עוד אין תמונות כאן</p>
            <p className="text-white/30 text-sm mt-1">לחץ על כפתור ההוספה — או פשוט הדבק תמונה עם Ctrl+V</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {media.map((item, i) => (
              <MediaCard key={item.id} item={item} cat={cat} index={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>
        )}
      </div>

      {/* Upload button */}
      <MediaUploader category={slug} onUpload={loadMedia} color={cat.color} />

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
