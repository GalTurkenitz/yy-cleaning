import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'הבית',        path: '/',            icon: '🏠' },
  { label: 'שירותים',    path: '/services',     icon: '✨' },
  { label: 'ביקורות',    path: '/reviews',      icon: '⭐' },
  { label: 'לפני ואחרי', path: '/before-after', icon: '🔄' },
  { label: 'צור קשר',    path: '/contact',      icon: '📞' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [location.pathname])

  const go = path => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -224 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed left-0 top-0 h-full w-48 z-50 flex-col"
        style={{ background: 'linear-gradient(180deg, #050e1f 0%, #0B2954 60%, #1565C0 100%)' }}
        role="navigation"
        aria-label="ניווט ראשי"
      >
        {/* Logo */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-white/10">
          <button onClick={() => go('/')} aria-label="חזרה לעמוד הבית">
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
              <img src="/logo.png" alt="לוגו" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }} />
            </div>
          </button>
          <p className="text-white/70 text-xs mt-3 text-center leading-relaxed">י.י נקיון<br />ואחזקת מבנים</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 py-6 flex-1">
          {links.map((l, i) => {
            const active = location.pathname === l.path
            return (
              <motion.button
                key={l.path}
                onClick={() => go(l.path)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-600 transition-all duration-200 text-left
                  ${active
                    ? 'bg-white text-[#0B2954] shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="text-base" aria-hidden="true">{l.icon}</span>
                {l.label}
              </motion.button>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="px-3 pb-8">
          <motion.button
            onClick={() => go('/contact')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full py-3.5 rounded-xl text-white font-700 text-sm shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
          >
            הצעת מחיר חינם
          </motion.button>
          <p className="text-white/30 text-xs text-center mt-3">058-7222076</p>
        </div>
      </motion.aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: 'linear-gradient(90deg, #050e1f, #0B2954)' }}>
        <button onClick={() => go('/')} aria-label="בית">
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/logo.png" alt="לוגו" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} />
          </div>
        </button>
        <button onClick={() => setMenuOpen(v => !v)} aria-label="תפריט" className="p-2">
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-14 inset-x-0 z-40 p-4 flex flex-col gap-2"
            style={{ background: '#0B2954' }}>
            {links.map(l => (
              <button key={l.path} onClick={() => go(l.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-600 text-left transition-all
                  ${location.pathname === l.path ? 'bg-white text-[#0B2954]' : 'text-white/80 hover:bg-white/10'}`}>
                <span aria-hidden="true">{l.icon}</span>
                {l.label}
              </button>
            ))}
            <button onClick={() => go('/contact')}
              className="mt-2 py-3 rounded-xl text-white font-700 text-sm"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
              הצעת מחיר חינם
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
