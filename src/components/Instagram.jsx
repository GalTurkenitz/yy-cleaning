import { motion } from 'framer-motion'

const IG_URL = 'https://www.instagram.com/cleanliness2344?igsh=MWl3MmI0aDh6aDNyZw=='
const TIKTOK_URL = 'https://www.tiktok.com/@cleanliness2344?_r=1&_t=ZS-97S7DdqazLA'

const TIKTOK_ICON = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <path fill="#25F4EE" transform="translate(-0.9,0.9)"
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    <path fill="#FE2C55" transform="translate(0.9,-0.9)"
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    <path fill="#ffffff"
      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

export default function Instagram() {
  return (
    <section id="instagram" className="py-28 overflow-hidden relative"
      style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
      aria-labelledby="ig-title">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center md:text-right">
            <p className="text-blue-300 font-700 text-sm tracking-widest uppercase mb-3">מדיה חברתית</p>
            <h2 id="ig-title" className="text-4xl md:text-5xl font-900 text-white mb-5 leading-tight">
              באו לעקוב<br />אחרינו
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-4 max-w-sm">
              מאות פוסטים של עבודות נקיון, לפני ואחרי, טיפים ועוד — הכל באינסטגרם שלנו.
            </p>
            <motion.a href={IG_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="btn-shine inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#0B2954] font-800 text-lg shadow-2xl"
              aria-label="עקבו אחרינו באינסטגרם">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              עקבו עכשיו
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            {/* TikTok */}
            <motion.a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="btn-shine inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-white font-800 text-lg shadow-2xl mt-4 border border-white/15"
              aria-label="עקבו אחרינו בטיקטוק">
              {TIKTOK_ICON}
              צפו בטיקטוק
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Real Instagram screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.3 } }}
            className="shrink-0">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
              aria-label="עברו לדף האינסטגרם שלנו">
              <div className="w-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-white/20 cursor-pointer">
                <img
                  src="/instagram-profile.jpg"
                  alt="דף האינסטגרם של cleanliness2344 — י.י נקיון ואחזקת מבנים"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 420 }}
                />
                <div style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}
                  className="px-4 py-3 flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span className="text-white font-700 text-sm">לחצו לעמוד שלנו</span>
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
