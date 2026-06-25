import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getGallery } from '../data/gallery'
import Lightbox from './Lightbox'

const SLUG = 'work-process'

export default function BeforeAfter() {
  const videos = getGallery(SLUG)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <section className="min-h-screen py-24 px-4"
      style={{ background: 'linear-gradient(160deg, #050e1f 0%, #0B2954 45%, #0d3d7a 70%, #0f4fa0 100%)' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-[#42A5F5] font-700 text-sm tracking-widest uppercase mb-3">י.י נקיון ואחזקת מבנים</p>
          <h1 className="text-4xl md:text-6xl font-900 text-white leading-tight">תהליך עבודה</h1>
        </motion.div>

        {videos.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-40">
            <p className="text-6xl mb-4" aria-hidden="true">🎬</p>
            <p className="text-white/50 text-lg">עוד אין סרטונים</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {videos.map((item, i) => (
              <motion.div key={item.url}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i) } }}
                className="relative group overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/60"
                style={{ border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
                <div className="aspect-square relative bg-white/5">
                  <video
                    src={item.url}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Play / zoom hint on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-90 transition-opacity drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.35)" />
                      <path d="M9.5 7.5v9l7-4.5z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && videos[lightboxIndex] && (
          <Lightbox
            items={videos}
            index={lightboxIndex}
            onIndex={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
