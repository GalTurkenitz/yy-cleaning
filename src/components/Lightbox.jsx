import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Lightbox({ items, index, onClose, onIndex }) {
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
        key={index}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="max-w-[92vw] max-h-[86vh] flex items-center justify-center"
      >
        {item.type === 'video' ? (
          <video src={item.url} controls autoPlay playsInline className="max-w-full max-h-[86vh] rounded-lg" />
        ) : (
          <img src={item.url} alt={item.alt || 'תמונת עבודת נקיון של י.י נקיון ואחזקת מבנים'} className="max-w-full max-h-[86vh] rounded-lg object-contain" />
        )}
      </motion.div>
    </motion.div>
  )
}
