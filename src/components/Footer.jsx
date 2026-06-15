import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        className="relative z-10 bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 id="modal-title" className="text-xl font-800 text-[#0B2954]">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="סגור">✕</button>
        </div>
        <div className="overflow-y-auto p-6 text-slate-600 text-sm leading-relaxed space-y-4">{children}</div>
      </motion.div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <footer className="bg-[#050e1f] text-white py-12 px-6" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="לוגו י.י נקיון ואחזקת מבנים" style={{ height: 56, width: 'auto', display: 'inline-block' }} />
              <div>
                <p className="font-800 text-lg">י.י נקיון ואחזקת מבנים</p>
                <p className="text-blue-300/70 text-sm">נקיון ברמה גבוהה</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-blue-300/70 text-sm">
              <a href="tel:0587222076" className="hover:text-white transition-colors">058-7222076</a>
              <button onClick={() => setModal('privacy')} className="hover:text-white transition-colors">מדיניות פרטיות</button>
              <button onClick={() => setModal('terms')} className="hover:text-white transition-colors">תנאי שימוש</button>
              <button onClick={() => setModal('accessibility')} className="hover:text-white transition-colors">הצהרת נגישות</button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-300/50 text-xs">
            <p>© {new Date().getFullYear()} י.י נקיון ואחזקת מבנים. כל הזכויות שמורות.</p>
            <p>נבנה בידי <a href="https://webforyou2.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">webforyou2</a></p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {modal === 'privacy' && (
          <Modal title="מדיניות פרטיות" onClose={() => setModal(null)}>
            <p><strong>עדכון אחרון:</strong> {new Date().toLocaleDateString('he-IL')}</p>
            <p>י.י נקיון ואחזקת מבנים מחויבת להגן על פרטיות המשתמשים בהתאם לחוק הגנת הפרטיות הישראלי (תשמ"א-1981) ותקנות GDPR.</p>
            <p><strong>מידע שאנו אוספים:</strong> אנו אוספים מידע שנמסר מרצון בעת יצירת קשר — שם, מספר טלפון ואימייל בלבד.</p>
            <p><strong>שימוש במידע:</strong> המידע ישמש אך ורק ליצירת קשר חוזר ולמתן הצעת מחיר. לא נמכור או נעביר מידע לגורמים שלישיים.</p>
            <p><strong>אחסון:</strong> המידע נשמר בצורה מאובטחת ולמשך הזמן הנדרש לצורך ביצוע השירות.</p>
            <p><strong>זכויות המשתמש:</strong> יש לך זכות לעיין, לתקן או למחוק את המידע שלך בכל עת. לפנייה: 058-7222076.</p>
            <p><strong>Cookies:</strong> אתר זה אינו משתמש בעוגיות מעקב.</p>
          </Modal>
        )}
        {modal === 'terms' && (
          <Modal title="תנאי שימוש" onClose={() => setModal(null)}>
            <p><strong>ברוכים הבאים לאתר י.י נקיון ואחזקת מבנים.</strong></p>
            <p>השימוש באתר זה כפוף לתנאי השימוש הבאים. המשך השימוש באתר מהווה הסכמה לתנאים אלה.</p>
            <p><strong>שימוש מותר:</strong> האתר נועד לצורך קבלת מידע על שירותי החברה ויצירת קשר בלבד.</p>
            <p><strong>קניין רוחני:</strong> כל תוכן האתר, כולל טקסטים, תמונות ולוגו, שייך לי.י נקיון ואחזקת מבנים ומוגן בזכויות יוצרים.</p>
            <p><strong>אחריות:</strong> החברה אינה אחראית לנזקים שיגרמו כתוצאה משימוש באתר. המידע באתר ניתן "כמות שהוא".</p>
            <p><strong>שינויים:</strong> החברה שומרת לעצמה את הזכות לשנות את תנאי השימוש בכל עת.</p>
            <p><strong>יצירת קשר:</strong> לשאלות בנושא תנאי שימוש: 058-7222076.</p>
          </Modal>
        )}
        {modal === 'accessibility' && (
          <Modal title="הצהרת נגישות" onClose={() => setModal(null)}>
            <p>י.י נקיון ואחזקת מבנים מחויבת לנגישות דיגיטלית בהתאם לתקן WCAG 2.1 ברמה AA ולחוק שוויון זכויות לאנשים עם מוגבלות.</p>
            <p><strong>מה עשינו:</strong></p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>כל התמונות כוללות תיאורים חלופיים (alt text)</li>
              <li>ניווט מלא באמצעות מקלדת</li>
              <li>תוויות ARIA לקוראי מסך</li>
              <li>קונטרסט צבעים תקני</li>
              <li>מבנה כותרות היררכי ברור</li>
              <li>עמוד בעברית מלאה עם RTL תקני</li>
            </ul>
            <p><strong>נמצאתם בעיה?</strong> אנחנו מתחייבים לטפל בפניות נגישות תוך 5 ימי עסקים.</p>
            <p><strong>פנייה:</strong> 058-7222076 — ינון</p>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
