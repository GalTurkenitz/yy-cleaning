import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 8 + 10,
}))

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.setProperty('--parallax-y', `${y * 0.4}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050e1f 0%, #0B2954 45%, #0d3d7a 70%, #0f4fa0 100%)' }}
      aria-label="עמוד ראשי">

      {/* Bubbles */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {BUBBLES.map(b => (
          <div key={b.id} className="bubble" style={{
            width: b.size, height: b.size,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }} />
        ))}
      </div>

      {/* Gradient orbs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #42A5F5, transparent)' }} />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #00AAFF, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8">
          <div className="logo-glow bg-white rounded-3xl shadow-2xl overflow-hidden inline-flex items-center justify-center" style={{ width: 176, height: 176 }}>
            <img src="/logo.png" alt="לוגו י.י נקיון ואחזקת מבנים" className="w-96 h-96 object-contain" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-900 text-white mb-4 leading-tight">
          נקיון ברמה גבוהה!
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-blue-200 mb-10 leading-relaxed font-400">
          י.י נקיון ואחזקת מבנים — שירות מקצועי, אמין ויסודי לכל סוגי הנכסים.<br className="hidden md:block" />
          על איכות ושירות לא מתפשרים.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:0587222077"
            className="btn-shine px-8 py-4 rounded-2xl bg-[#1565C0] text-white text-lg font-700 shadow-2xl hover:bg-[#1976D2] transition-all duration-200 hover:scale-105"
            aria-label="חייגו לינון 058-7222077">
            058-7222077 — חייגו עכשיו
          </a>
          <a href="https://wa.me/972587222077"
            target="_blank" rel="noopener noreferrer"
            className="btn-shine px-8 py-4 rounded-2xl text-white text-lg font-700 shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center"
            style={{ background: '#25D366' }}
            aria-label="שלחו הודעה בוואטסאפ">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            הצעת מחיר בוואטסאפ
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center" aria-hidden="true">
          <div className="flex flex-col items-center gap-2 text-blue-300/60 animate-bounce">
            <span className="text-xs font-500 tracking-widest uppercase">גלול למטה</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
