import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  { img: '/reviews/review3.jpg', alt: 'ביקורת לקוח - yuvalsassons אינסטגרם' },
  { img: '/reviews/review2.jpg', alt: 'ביקורת לקוח - ניקוי דירות קבלן' },
  { img: '/reviews/review1.jpg', alt: 'ביקורת לקוח - danielbaruch2' },
  { img: '/reviews/review4.jpg', alt: 'ביקורת לקוח - לקוחות מרוצים' },
  { img: '/reviews/review5.jpg', alt: 'ביקורת לקוח - היה מצוין, ממליץ בחום' },
  { img: '/reviews/review6.jpg', alt: 'ביקורת לקוח - מיכאל רז, נתניה' },
  { img: '/reviews/review7.jpg', alt: 'ביקורת לקוח' },
  { img: '/reviews/review8.jpg', alt: 'ביקורת לקוח' },
  { img: '/reviews/review9.jpg', alt: 'ביקורת לקוח' },
  { img: '/reviews/review10.jpg', alt: 'ביקורת לקוח - ימית עדני, הוד השרון' },
  { img: '/reviews/review11.jpg', alt: 'ביקורת לקוח - תגובות מלקוחות' },
  { img: '/reviews/review12.jpg', alt: 'ביקורת לקוח' },
  { img: '/reviews/review13.jpg', alt: 'ביקורת לקוח - ינון מדהים' },
]

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = dir => {
    setDirection(dir)
    setCurrent(c => (c + dir + reviews.length) % reviews.length)
  }

  const variants = {
    enter: d => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:  d => ({ x: d > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.3 } }),
  }

  return (
    <section id="reviews" className="py-28 bg-white" aria-labelledby="reviews-title">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <p className="text-[#1565C0] font-700 text-sm tracking-widest uppercase mb-3">לקוחות מרוצים</p>
          <h2 id="reviews-title" className="text-3xl md:text-5xl font-900 text-[#0B2954] mb-4 leading-tight">
            אצלנו כל לקוח מקבל<br />יחס אישי, שירות מקצועי,<br />נקיון ברמה גבוהה
          </h2>
          <p className="text-slate-500 text-lg">מה הלקוחות שלנו אומרים עלינו</p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[#1565C0]" aria-hidden="true" />
        </motion.div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="ביקורות לקוחות">
          {reviews.map((r, i) => (
            <motion.div key={r.img} role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <img src={r.img} alt={r.alt} className="w-full object-contain bg-gray-50" loading="lazy" />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ minHeight: 400 }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={current} custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                className="absolute inset-0">
                <img src={reviews[current].img} alt={reviews[current].alt}
                  className="w-full h-full object-contain bg-gray-50" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => go(-1)} className="w-10 h-10 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1565C0] hover:bg-[#1565C0] hover:text-white transition-colors" aria-label="ביקורת קודמת">←</button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#1565C0] w-6' : 'bg-slate-300'}`}
                  aria-label={`ביקורת ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="w-10 h-10 rounded-full bg-[#EEF6FF] flex items-center justify-center text-[#1565C0] hover:bg-[#1565C0] hover:text-white transition-colors" aria-label="ביקורת הבאה">→</button>
          </div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-8 rounded-2xl bg-[#EEF6FF]">
          <div className="text-center">
            <div className="text-5xl font-900 text-[#0B2954]">5.0</div>
            <div className="text-yellow-400 text-xl mt-1">★★★★★</div>
            <div className="text-slate-500 text-sm mt-1">דירוג ממוצע</div>
          </div>
          <div className="w-px h-16 bg-blue-200 hidden sm:block" aria-hidden="true" />
          <div className="text-center">
            <div className="text-5xl font-900 text-[#0B2954]">100%</div>
            <div className="text-slate-500 text-sm mt-2">לקוחות מרוצים</div>
          </div>
          <div className="w-px h-16 bg-blue-200 hidden sm:block" aria-hidden="true" />
          <div className="text-center">
            <div className="text-5xl font-900 text-[#0B2954]">10+</div>
            <div className="text-slate-500 text-sm mt-2">שנות ניסיון</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
