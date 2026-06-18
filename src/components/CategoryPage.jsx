import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { getCategoryBySlug, CATEGORIES } from '../data/categories'
import MediaUploader from './MediaUploader'

function MediaCard({ item, cat, index }) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
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
      className="relative group overflow-hidden"
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
        {/* Delete button — appears on hover */}
        <button
          onClick={handleDelete}
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-red-600/80 text-white text-xs font-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="מחק"
          title="מחק"
        >✕</button>
      </div>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const cat = getCategoryBySlug(slug)
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="relative overflow-hidden pt-20 pb-14 px-6 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: cat.color }} />
        </div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8"
        >
          <Link to="/" className="hover:text-white transition-colors">הבית</Link>
          <span>/</span>
          <span className="text-white/70">{cat.label}</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-6xl mb-5"
          aria-hidden="true"
        >{cat.icon}</motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-900 text-white mb-3 leading-tight"
        >{cat.label}</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-lg font-500"
          style={{ color: cat.color }}
        >{cat.tagline}</motion.p>

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
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {media.map((item, i) => (
              <MediaCard key={item.id} item={item} cat={cat} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Upload button */}
      <MediaUploader category={slug} onUpload={loadMedia} color={cat.color} />
    </section>
  )
}
