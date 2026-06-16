import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/categories'

export default function ServicesGrid() {
  const navigate = useNavigate()

  return (
    <section className="pt-14 pb-12 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-xl overflow-hidden text-right cursor-pointer focus:outline-none group"
              style={{ border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              aria-label={`עבור לדף ${cat.label}`}
            >
              {/* Image area */}
              <div
                className="aspect-square relative flex items-center justify-center overflow-hidden"
                style={{ background: cat.heroGradient }}
              >
                <div className="absolute w-16 h-16 rounded-full opacity-30 blur-xl"
                  style={{ background: cat.color }} />
                <span className="relative text-3xl z-10 drop-shadow-lg"
                  aria-hidden="true">{cat.icon}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Label */}
              <div className="px-1.5 py-2" style={{ background: '#0B2954' }}>
                <p className="text-white font-700 text-[11px] leading-snug">{cat.shortLabel}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
