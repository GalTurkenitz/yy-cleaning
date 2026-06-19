import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 8 + 10,
}))

const checks = [
  'מעל 10 שנות ניסיון בתחום הניקיון',
  'שירות מקצועי, אמין ואדיב',
  'עמידה בזמנים והתחייבות לאיכות',
  'ניקיון יסודי עד לפרטים הקטנים',
  'תוצאות מבריקות שנראות ומורגשות',
]

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      heroRef.current.style.setProperty('--parallax-y', `${window.scrollY * 0.4}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="עמוד ראשי">

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-0">

        {/* Logo */}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-0">
          <div style={{ height: 260, overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/logo.png" alt="לוגו י.י נקיון ואחזקת מבנים" style={{ height: 430, width: 'auto', display: 'block' }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-900 text-white mb-4 leading-tight">
          נקיון ברמה גבוהה!
        </motion.h1>

        {/* Paragraphs */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-blue-200 text-lg leading-relaxed mb-3">
          לאורך השנים צברנו ניסיון רב במגוון רחב של עבודות ניקיון. הניסיון שצברנו מאפשר לנו להתמודד עם כל אתגר ולהעניק ללקוחותינו תוצאות מושלמות בכל פעם מחדש.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-blue-200 text-lg leading-relaxed mb-8">
          אנחנו מאמינים שניקיון איכותי מתחיל באחריות, אמינות וירידה לפרטים הקטנים. כל עבודה מתבצעת בקפידה תוך שימוש בציוד מקצועי ובחומרים איכותיים — במטרה להעניק לכם סביבה נקייה, נעימה ומבריקה!
        </motion.p>

        {/* Checklist */}
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col gap-2 text-right">
          {checks.map((c, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="flex items-center gap-3 text-white font-500">
              <span className="text-green-400 text-lg" aria-hidden="true">✔️</span>
              {c}
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  )
}
