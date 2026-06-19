import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '../data/categories'

const topLinks = [
  { label: 'הבית',        path: '/',            icon: '🏠' },
  { label: 'ביקורות',    path: '/reviews',      icon: '⭐' },
  { label: 'תהליך עבודה', path: '/before-after', icon: '🎬' },
  { label: 'צור קשר',    path: '/contact',      icon: '📞' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [location.pathname])

  const go = path => {
    setOpen(false)
    navigate(path)
  }

  const isCategory = location.pathname.startsWith('/category/')
  const activeSlug = isCategory ? location.pathname.split('/category/')[1] : null

  return (
    <>
      {/* Hamburger button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setOpen(v => !v)}
        className="fixed top-4 left-4 z-[60] w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-lg"
        style={{ background: open ? '#0B2954' : 'rgba(11,41,84,0.85)', backdropFilter: 'blur(8px)' }}
        aria-label="פתח תפריט"
        aria-expanded={open}
      >
        <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="sidebar"
            initial={{ x: -224 }}
            animate={{ x: 0 }}
            exit={{ x: -224 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-56 z-[55] flex flex-col overflow-y-auto"
            style={{ background: 'linear-gradient(180deg, #050e1f 0%, #0B2954 60%, #1565C0 100%)' }}
            role="navigation"
            aria-label="ניווט ראשי"
          >
            {/* Logo */}
            <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-white/10 shrink-0">
              <button onClick={() => go('/')} aria-label="חזרה לעמוד הבית">
                <img src="/logo.png" alt="לוגו" style={{ height: 110, width: 'auto', display: 'inline-block' }} />
              </button>
              <p className="text-white/70 text-xs mt-2 text-center leading-relaxed">י.י נקיון<br />ואחזקת מבנים</p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
              {topLinks.map((l, i) => {
                const active = location.pathname === l.path
                return (
                  <motion.button
                    key={l.path}
                    onClick={() => go(l.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-600 transition-all duration-200 text-left
                      ${active ? 'bg-white text-[#0B2954] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span className="text-base" aria-hidden="true">{l.icon}</span>
                    {l.label}
                  </motion.button>
                )
              })}

              {/* Services collapsible */}
              <div className="mt-1">
                <motion.button
                  onClick={() => setServicesOpen(v => !v)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-600 transition-all duration-200
                    ${isCategory ? 'bg-white text-[#0B2954] shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  aria-expanded={servicesOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">✨</span>
                    שירותים
                  </div>
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs opacity-60"
                    aria-hidden="true"
                  >▼</motion.span>
                </motion.button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pt-1 pr-2">
                        {CATEGORIES.map((cat, i) => {
                          const active = activeSlug === cat.slug
                          return (
                            <motion.button
                              key={cat.slug}
                              onClick={() => go(`/category/${cat.slug}`)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-600 transition-all text-left
                                ${active ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/8'}`}
                              style={active ? { color: cat.color } : {}}
                            >
                              <span aria-hidden="true">{cat.icon}</span>
                              {cat.shortLabel}
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* CTA */}
            <div className="px-3 pb-8 shrink-0">
              <motion.button
                onClick={() => go('/contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full py-3.5 rounded-xl text-white font-700 text-sm shadow-lg"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                הצעת מחיר
              </motion.button>
              <p className="text-white/30 text-xs text-center mt-3">058-7222076</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
