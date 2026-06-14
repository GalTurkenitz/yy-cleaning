import { motion } from 'framer-motion'

const placeholders = [
  { title: 'ניקיון דירת קבלן', before: 'לפני הניקיון', after: 'אחרי הניקיון', emoji: '🏗️' },
  { title: 'פוליש רצפה', before: 'לפני הפוליש', after: 'אחרי הפוליש', emoji: '💎' },
  { title: 'ניקיון חלונות', before: 'לפני הניקיון', after: 'אחרי הניקיון', emoji: '🪟' },
]

export default function BeforeAfter() {
  return (
    <section id="before-after" className="py-28 bg-[#0B2954]" aria-labelledby="ba-title">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <p className="text-[#42A5F5] font-700 text-sm tracking-widest uppercase mb-3">תוצאות אמיתיות</p>
          <h2 id="ba-title" className="text-4xl md:text-5xl font-900 text-white mb-4">לפני ואחרי</h2>
          <p className="text-blue-300 text-lg max-w-xl mx-auto">הצוות שלנו מצלם כל עבודה — כדי שתראו את ההבדל במו עיניכם</p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[#42A5F5]" aria-hidden="true" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}>

              {/* Video placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1565C0]/30 to-[#0B2954]/60 flex flex-col items-center justify-center gap-3 border-b border-white/10">
                <div className="text-5xl" aria-hidden="true">{p.emoji}</div>
                <div className="flex items-center justify-center gap-8 text-white/50 text-xs">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-white/10 mb-1 flex items-center justify-center text-2xl" aria-hidden="true">😟</div>
                    {p.before}
                  </div>
                  <div className="text-2xl" aria-hidden="true">→</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#1565C0]/40 mb-1 flex items-center justify-center text-2xl" aria-hidden="true">😍</div>
                    {p.after}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    aria-label={`סרטון ${p.title} — בקרוב`}>
                    <svg className="w-6 h-6 text-white mr-[-3px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-[#1565C0]/80 text-white text-xs font-600">
                  בקרוב
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white font-700 text-base">{p.title}</h3>
                <p className="text-blue-300/70 text-sm mt-1">סרטון לפני ואחרי יועלה בקרוב</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-12 text-center">
          <p className="text-blue-300/60 text-sm">לצפייה בסרטונים נוספים עקבו אחרינו באינסטגרם</p>
          <a href="https://www.instagram.com/cleanliness2344?igsh=MWl3MmI0aDh6aDNyZw=="
            target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-[#42A5F5] font-700 hover:underline"
            aria-label="עברו לאינסטגרם שלנו לצפייה בסרטונים">
            @cleanliness2344 ←
          </a>
        </motion.div>
      </div>
    </section>
  )
}
