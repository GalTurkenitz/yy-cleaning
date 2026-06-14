import { motion } from 'framer-motion'

const services = [
  { icon: '🏗️', title: 'נקיון לפני איכלוס', desc: 'ניקיון יסודי לנכסים חדשים לפני כניסת דיירים — בלי אבק, בלי שאריות בנייה.' },
  { icon: '🏢', title: 'נקיון דירות קבלן', desc: 'ניקיון מעמיק של דירות ישירות מהקבלן, כולל מסגרות, אריחים וחלונות.' },
  { icon: '🪟', title: 'חלונות וויטרינות', desc: 'שטיפת חלונות וויטרינות עד לברק — מבפנים ומבחוץ, בכל גובה.' },
  { icon: '🏠', title: 'בתים פרטיים', desc: 'ניקיון מקצועי לבתים פרטיים, כולל חצרות, מרפסות ושטחים חיצוניים.' },
  { icon: '✨', title: 'דירות פרקט', desc: 'ניקיון עדין ומקצועי לדירות עם רצפות פרקט ללא שריטות וללא נזק.' },
  { icon: '💎', title: 'פוליש', desc: 'ברק ממש — פוליש מקצועי לשיש, קרמיקה ורצפות לכל סוג משטח.' },
  { icon: '🏬', title: 'משרדים', desc: 'ניקיון שוטף ועמוק למשרדים ומרכזי עסקים — לסביבת עבודה נקייה ומוסדרת.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#EEF6FF]" aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <p className="text-[#1565C0] font-700 text-sm tracking-widest uppercase mb-3">מה אנחנו מציעים</p>
          <h2 id="services-title" className="text-4xl md:text-5xl font-900 text-[#0B2954] mb-4">השירותים שלנו</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">כל שירות מבוצע ביסודיות, עם ציוד מקצועי וצוות מיומן</p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[#1565C0]" aria-hidden="true" />
        </motion.div>

        <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {services.map(s => (
            <motion.li key={s.title} variants={item}
              className="service-card bg-white rounded-2xl p-7 shadow-sm border border-blue-50 cursor-default"
              aria-label={s.title}>
              <div className="text-4xl mb-4" aria-hidden="true">{s.icon}</div>
              <h3 className="text-xl font-800 text-[#0B2954] mb-2">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
            </motion.li>
          ))}

          {/* CTA card */}
          <motion.li variants={item}
            className="service-card rounded-2xl p-7 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0B2954, #1565C0)' }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            role="button" tabIndex={0} aria-label="צרו קשר לקבלת הצעת מחיר"
            onKeyDown={e => e.key === 'Enter' && document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="text-4xl mb-4" aria-hidden="true">📞</div>
            <h3 className="text-xl font-800 text-white mb-2">רוצים הצעת מחיר?</h3>
            <p className="text-blue-200 text-sm">צרו קשר עוד היום ונחזור אליכם בהקדם</p>
            <span className="mt-4 px-5 py-2 rounded-full bg-white/20 text-white text-sm font-600 border border-white/30">דברו איתנו</span>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  )
}
