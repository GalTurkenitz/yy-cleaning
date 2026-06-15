import { useState } from 'react'
import { motion } from 'framer-motion'

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', location: '', size: '' })
  const [errors, setErrors] = useState({})

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim())     errs.name     = 'שדה חובה'
    if (!form.location.trim()) errs.location = 'שדה חובה'
    if (!form.size.trim())     errs.size     = 'שדה חובה'
    if (Object.keys(errs).length) { setErrors(errs); return }

    const msg = `שלום ינון! 👋\n\nשמי *${form.name}*\nמיקום: *${form.location}*\nגודל המבנה: *${form.size}*\n\nאשמח לקבל הצעת מחיר 🙏`
    window.open(`https://wa.me/972587222076?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const field = (key, label, placeholder, type = 'text') => (
    <div>
      <label htmlFor={`contact-${key}`} className="block text-blue-200 text-sm font-600 mb-2">{label}</label>
      <input
        id={`contact-${key}`}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={set(key)}
        onFocus={() => setErrors(p => ({ ...p, [key]: '' }))}
        className={`w-full px-5 py-3.5 rounded-xl bg-white/10 border text-white placeholder-blue-300/50 text-sm outline-none transition-all focus:bg-white/15 focus:border-white/50 ${errors[key] ? 'border-red-400' : 'border-white/20'}`}
        aria-required="true"
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `err-${key}` : undefined}
      />
      {errors[key] && <p id={`err-${key}`} className="text-red-400 text-xs mt-1" role="alert">{errors[key]}</p>}
    </div>
  )

  return (
    <section id="contact" className="py-28"
      style={{ background: 'linear-gradient(160deg, #050e1f 0%, #0B2954 60%, #1565C0 100%)' }}
      aria-labelledby="contact-title">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14">
          <p className="text-[#42A5F5] font-700 text-sm tracking-widest uppercase mb-3">אנחנו כאן בשבילכם</p>
          <h2 id="contact-title" className="text-4xl md:text-6xl font-900 text-white mb-4 leading-tight">
            להצעת מחיר<br />חייגו עוד היום!
          </h2>
          <p className="text-blue-200 text-lg">ינון יחזור אליכם תוך זמן קצר</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Quick contact buttons */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-72 flex flex-col gap-4 shrink-0">
            <a href="tel:0587222076"
              className="btn-shine flex items-center gap-4 px-7 py-5 rounded-2xl bg-white text-[#0B2954] font-800 text-xl shadow-2xl hover:bg-blue-50 transition-all hover:scale-105"
              aria-label="חייגו לינון 058-7222076">
              <motion.span animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                className="text-3xl" aria-hidden="true">📞</motion.span>
              058-7222076
            </a>
            <a href="https://wa.me/972587222076?text=שלום, אשמח לקבל הצעת מחיר"
              target="_blank" rel="noopener noreferrer"
              className="btn-shine flex items-center gap-3 px-7 py-5 rounded-2xl font-800 text-lg shadow-2xl transition-all hover:scale-105"
              style={{ background: '#25D366', color: '#fff' }}
              aria-label="שלחו הודעה ישירה בוואטסאפ">
              {WA_ICON}
              וואטסאפ ישיר
            </a>
            <p className="text-blue-300/60 text-sm text-center pt-2">ינון — זמין ראשון עד שישי</p>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-4">
            <div className="w-px flex-1 bg-white/10" aria-hidden="true" />
            <span className="text-white/30 text-xs font-600">או</span>
            <div className="w-px flex-1 bg-white/10" aria-hidden="true" />
          </div>
          <div className="lg:hidden flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
            <span className="text-white/30 text-xs font-600">או מלאו טופס</span>
            <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
          </div>

          {/* Form */}
          <motion.form initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit} noValidate
            className="flex-1 rounded-2xl p-7 flex flex-col gap-5 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
            aria-label="טופס יצירת קשר">

            <p className="text-white font-700 text-lg mb-1">השאירו פרטים ונחזור אליכם</p>

            {field('name',     'שם מלא',        'ישראל ישראלי')}
            {field('location', 'מיקום',          'עיר / שכונה / כתובת')}
            {field('size',     'גודל המבנה',     'למשל: 4 חדרים, 120 מ"ר, קומת משרדים...')}

            <motion.button type="submit"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="btn-shine w-full flex items-center justify-center gap-3 py-4 rounded-xl font-800 text-lg shadow-xl mt-1"
              style={{ background: '#25D366', color: '#fff' }}
              aria-label="שלחו הטופס לוואטסאפ">
              {WA_ICON}
              שלחו לוואטסאפ
            </motion.button>

            <p className="text-blue-300/40 text-xs text-center">לחיצה על הכפתור תפתח שיחת וואטסאפ עם הפרטים</p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
