import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'הבית', href: '#hero' },
  { label: 'שירותים', href: '#services' },
  { label: 'ביקורות', href: '#reviews' },
  { label: 'לפני ואחרי', href: '#before-after' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = href => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur bg-white/90 shadow-sm border-b border-blue-100' : 'bg-transparent'}`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => handleLink('#hero')} aria-label="חזרה לעמוד הבית">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden inline-flex items-center justify-center" style={{ width: 80, height: 80 }}>
            <img src="/logo.png" alt="לוגו י.י נקיון ואחזקת מבנים" className="h-28 w-auto" />
          </div>
        </button>

        {/* Desktop nav */}
        <nav aria-label="ניווט ראשי" className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l.href} onClick={() => handleLink(l.href)}
              className={`px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${scrolled ? 'text-slate-700' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleLink('#contact')}
            className="btn-shine mr-3 px-5 py-2 rounded-full bg-[#1565C0] text-white text-sm font-700 shadow-lg hover:bg-[#0B2954] transition-colors duration-200">
            הצעת מחיר
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)} aria-label="פתח תפריט" aria-expanded={menuOpen}>
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-slate-700' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-blue-100 overflow-hidden">
            <nav className="flex flex-col p-4 gap-1" aria-label="תפריט נייד">
              {links.map(l => (
                <button key={l.href} onClick={() => handleLink(l.href)}
                  className="text-right px-4 py-3 rounded-xl text-slate-700 font-500 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  {l.label}
                </button>
              ))}
              <button onClick={() => handleLink('#contact')}
                className="btn-shine mt-2 px-5 py-3 rounded-xl bg-[#1565C0] text-white font-700 text-center">
                הצעת מחיר חינם
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
