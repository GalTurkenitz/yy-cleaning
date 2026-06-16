import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/categories'

export default function ServicesGrid() {
  const navigate = useNavigate()

  return (
    <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #050e1f 0%, #071428 100%)' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[#42A5F5] font-700 text-sm tracking-widest uppercase mb-3">השירותים שלנו</p>
          <h2 className="text-3xl md:text-5xl font-900 text-white leading-tight">במה נוכל לעזור?</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl overflow-hidden text-right cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 group"
              aria-label={`עבור לדף ${cat.label}`}
            >
              {/* Placeholder card */}
              <div
                className="aspect-square relative flex items-center justify-center overflow-hidden"
                style={{ background: cat.heroGradient }}
              >
                {/* Decorative blur blob */}
                <div className="absolute w-32 h-32 rounded-full opacity-30 blur-2xl"
                  style={{ background: cat.color, top: '20%', right: '20%' }} />
                <span className="relative text-5xl md:text-6xl z-10 drop-shadow-lg"
                  aria-hidden="true">{cat.icon}</span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Label */}
              <div className="px-3 py-2.5" style={{ background: '#0B2954' }}>
                <p className="text-white font-700 text-sm leading-snug">{cat.label}</p>
                <p className="mt-0.5 text-[10px] leading-tight"
                  style={{ color: cat.color }}>{cat.tagline}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
