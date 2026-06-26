import { useState, useEffect, useRef, useCallback } from 'react'

/*
  ווידג'ט נגישות עצמאי — תואם ת"י 5568 (WCAG 2.0 AA).
  שימוש: <AccessibilityWidget businessName="..." email="..." phone="..." />
  הווידג'ט מזריק בעצמו את כל סגנונות האפקטים + פוקוס + דילוג לתוכן,
  כך שאין צורך לגעת ב-CSS של האתר.
*/

const STORAGE_KEY = 'a11y-prefs'
const FONT_STEPS = [100, 112, 125, 140, 160]

const DEFAULTS = {
  font: 0,
  contrast: false,
  grayscale: false,
  links: false,
  readable: false,
  stopAnim: false,
  bigCursor: false,
}

const GLOBAL_CSS = `
:focus-visible{outline:3px solid #1a73e8 !important;outline-offset:2px !important;border-radius:2px}
.a11y-skip{position:fixed;top:-200px;right:8px;z-index:100000;background:#0a2540;color:#fff;padding:12px 20px;border-radius:0 0 10px 10px;font-weight:700;transition:top .2s}
.a11y-skip:focus{top:0}
html.a11y-grayscale{filter:grayscale(100%) !important}
html.a11y-contrast,html.a11y-contrast body{background:#000 !important}
html.a11y-contrast *{background-color:transparent !important;color:#fff !important;border-color:#fff !important;text-shadow:none !important;box-shadow:none !important}
html.a11y-contrast a,html.a11y-contrast a *{color:#ffff00 !important}
html.a11y-contrast button,html.a11y-contrast input,html.a11y-contrast textarea,html.a11y-contrast select{border:1px solid #fff !important}
html.a11y-contrast img,html.a11y-contrast video{filter:grayscale(40%) contrast(1.1)}
html.a11y-links a{text-decoration:underline !important;text-underline-offset:3px !important}
html.a11y-readable *{font-family:Arial,"Segoe UI",Tahoma,sans-serif !important;letter-spacing:.02em !important;line-height:1.7 !important}
html.a11y-stopanim *,html.a11y-stopanim *::before,html.a11y-stopanim *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}
html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath d='M5 2l14 10-6 1 4 7-3 1.5-4-7-4 4z' fill='%23fff' stroke='%23000' stroke-width='1.2'/%3E%3C/svg%3E") 4 2,auto !important}
.a11y-fab{position:fixed;bottom:20px;left:20px;z-index:99998;width:56px;height:56px;border-radius:50%;background:#1a4ed8;color:#fff;border:3px solid #fff;box-shadow:0 6px 22px rgba(0,0,0,.35);display:grid;place-items:center;cursor:pointer}
.a11y-fab:hover{background:#1540b8}
.a11y-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:flex-start;padding:20px}
.a11y-panel{background:#fff;color:#10233f;width:320px;max-width:calc(100vw - 40px);max-height:calc(100vh - 40px);overflow:auto;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:Arial,sans-serif;direction:rtl}
.a11y-panel h2{font-size:18px;font-weight:800;margin:0}
.a11y-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;background:#1a4ed8;color:#fff;position:sticky;top:0}
.a11y-x{background:transparent;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;width:32px;height:32px;border-radius:8px}
.a11y-x:hover{background:rgba(255,255,255,.2)}
.a11y-body{padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.a11y-font{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#eef3ff;border-radius:12px;padding:10px 12px}
.a11y-font button{width:40px;height:40px;border-radius:10px;border:1px solid #c7d6ff;background:#fff;font-size:18px;font-weight:800;cursor:pointer;color:#1a4ed8}
.a11y-font button:hover{background:#dbe6ff}
.a11y-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:right;padding:12px;border-radius:12px;border:1px solid #e3e8f0;background:#fff;font-size:15px;font-weight:600;color:#10233f;cursor:pointer}
.a11y-opt:hover{background:#f4f7ff}
.a11y-opt[aria-pressed="true"]{background:#1a4ed8;color:#fff;border-color:#1a4ed8}
.a11y-opt .dot{width:14px;height:14px;border-radius:50%;border:2px solid currentColor;flex:0 0 auto}
.a11y-opt[aria-pressed="true"] .dot{background:#fff}
.a11y-reset{margin-top:4px;padding:11px;border-radius:12px;border:1px solid #d33;background:#fff;color:#d33;font-weight:700;cursor:pointer}
.a11y-reset:hover{background:#fee}
.a11y-statement-btn{padding:11px;border-radius:12px;border:1px solid #1a4ed8;background:#fff;color:#1a4ed8;font-weight:700;cursor:pointer}
.a11y-statement-btn:hover{background:#eef3ff}
.a11y-doc{background:#fff;color:#10233f;max-width:680px;width:100%;max-height:calc(100vh - 60px);overflow:auto;border-radius:16px;padding:0;direction:rtl;font-family:Arial,sans-serif}
.a11y-doc .a11y-head{border-radius:0}
.a11y-doc-body{padding:22px 26px;line-height:1.8;font-size:15px}
.a11y-doc-body h3{font-size:17px;font-weight:800;margin:18px 0 6px}
.a11y-doc-body p{margin:0 0 8px}
.a11y-doc-body a{color:#1a4ed8;font-weight:700}
.a11y-doc-overlay{position:fixed;inset:0;z-index:100001;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:24px}
`

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  } catch {
    return { ...DEFAULTS }
  }
}

export default function AccessibilityWidget({
  businessName = 'העסק',
  email = '',
  phone = '',
  coordinator = '',
}) {
  const [open, setOpen] = useState(false)
  const [showDoc, setShowDoc] = useState(false)
  const [prefs, setPrefs] = useState(load)
  const [mainId, setMainId] = useState('a11y-main')
  const fabRef = useRef(null)

  // הזרקת סגנונות גלובליים פעם אחת
  useEffect(() => {
    if (!document.getElementById('a11y-global-style')) {
      const el = document.createElement('style')
      el.id = 'a11y-global-style'
      el.textContent = GLOBAL_CSS
      document.head.appendChild(el)
    }
    // יעד לדילוג לתוכן — שימוש ב-id קיים אם יש, אחרת יצירת אחד
    const main = document.querySelector('main') || document.querySelector('#root')
    if (main) {
      if (!main.id) main.id = 'a11y-main'
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
      setMainId(main.id)
    }
  }, [])

  // החלת ההעדפות על ה-<html>
  useEffect(() => {
    const root = document.documentElement
    root.style.fontSize = FONT_STEPS[prefs.font] + '%'
    root.classList.toggle('a11y-contrast', prefs.contrast)
    root.classList.toggle('a11y-grayscale', prefs.grayscale)
    root.classList.toggle('a11y-links', prefs.links)
    root.classList.toggle('a11y-readable', prefs.readable)
    root.classList.toggle('a11y-stopanim', prefs.stopAnim)
    root.classList.toggle('a11y-cursor', prefs.bigCursor)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  }, [prefs])

  // ESC לסגירה
  useEffect(() => {
    const onKey = e => {
      if (e.key !== 'Escape') return
      if (showDoc) setShowDoc(false)
      else if (open) { setOpen(false); fabRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, showDoc])

  const set = useCallback((k, v) => setPrefs(p => ({ ...p, [k]: v })), [])
  const toggle = useCallback(k => setPrefs(p => ({ ...p, [k]: !p[k] })), [])
  const reset = () => setPrefs({ ...DEFAULTS })

  const opt = (key, label) => (
    <button className="a11y-opt" aria-pressed={prefs[key]} onClick={() => toggle(key)}>
      <span className="dot" aria-hidden="true" />
      {label}
    </button>
  )

  const contact = (
    <>
      {phone && <p>טלפון: <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} dir="ltr">{phone}</a></p>}
      {email && <p>דוא״ל: <a href={`mailto:${email}`}>{email}</a></p>}
    </>
  )

  return (
    <>
      <a href={`#${mainId}`} className="a11y-skip">דלג לתוכן הראשי</a>

      <button
        ref={fabRef}
        className="a11y-fab"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {/* אייקון נגישות בינלאומי */}
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="3.8" r="2" />
          <path d="M12 6.5c-2.3 0-4.5-.5-6.3-1.2-.6-.2-1.2.1-1.4.6-.2.6.1 1.2.6 1.4 1.4.5 2.9.9 4.5 1.1V12l-1.7 6.3c-.2.7.2 1.4.9 1.5.6.2 1.3-.2 1.5-.9L11.6 14h.8l1.5 5c.2.7.9 1 1.5.9.7-.1 1.1-.8.9-1.5L14.6 12V9.4c1.6-.2 3.1-.6 4.5-1.1.6-.2.8-.8.6-1.4-.2-.6-.8-.8-1.4-.6-1.8.7-4 1.2-6.3 1.2z" />
        </svg>
      </button>

      {open && (
        <div className="a11y-overlay" onClick={() => setOpen(false)}>
          <div className="a11y-panel" role="dialog" aria-label="תפריט נגישות" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="a11y-head">
              <h2>תפריט נגישות</h2>
              <button className="a11y-x" aria-label="סגירה" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="a11y-body">
              <div className="a11y-font">
                <button aria-label="הקטנת גודל טקסט" onClick={() => set('font', Math.max(0, prefs.font - 1))}>A−</button>
                <span style={{ fontWeight: 700 }}>גודל טקסט {FONT_STEPS[prefs.font]}%</span>
                <button aria-label="הגדלת גודל טקסט" onClick={() => set('font', Math.min(FONT_STEPS.length - 1, prefs.font + 1))}>A+</button>
              </div>

              {opt('contrast', 'ניגודיות גבוהה')}
              {opt('grayscale', 'גווני אפור')}
              {opt('links', 'הדגשת קישורים')}
              {opt('readable', 'גופן קריא')}
              {opt('stopAnim', 'עצירת אנימציות')}
              {opt('bigCursor', 'סמן גדול')}

              <button className="a11y-reset" onClick={reset}>איפוס הגדרות נגישות</button>
              <button className="a11y-statement-btn" onClick={() => setShowDoc(true)}>הצהרת נגישות</button>
            </div>
          </div>
        </div>
      )}

      {showDoc && (
        <div className="a11y-doc-overlay" onClick={() => setShowDoc(false)}>
          <div className="a11y-doc" role="dialog" aria-label="הצהרת נגישות" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="a11y-head">
              <h2>הצהרת נגישות</h2>
              <button className="a11y-x" aria-label="סגירה" onClick={() => setShowDoc(false)}>✕</button>
            </div>
            <div className="a11y-doc-body">
              <p>אתר זה של <strong>{businessName}</strong> שואף לאפשר שימוש נוח ושוויוני לכלל הגולשים, לרבות אנשים עם מוגבלות.</p>

              <h3>רמת הנגישות באתר</h3>
              <p>הושקעו מאמצים להנגיש את האתר בהתאם לתקן הישראלי ת"י 5568 ברמה AA, המבוסס על הנחיות WCAG 2.0 של ארגון W3C, ובהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.</p>

              <h3>מה הונגש באתר</h3>
              <p>ניווט מלא במקלדת, סימון פוקוס ברור, מבנה כותרות סמנטי, טקסט חלופי לתמונות, ניגודיות צבעים, וכן תפריט נגישות המאפשר: הגדלת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, גופן קריא, עצירת אנימציות וסמן גדול.</p>

              <h3>הסדרי נגישות</h3>
              <p>אנו ממשיכים לשפר את נגישות האתר באופן שוטף. ייתכן שיימצאו רכיבים שטרם הונגשו במלואם, ואנו פועלים לתקנם.</p>

              <h3>פנייה בנושא נגישות</h3>
              <p>נתקלתם בבעיית נגישות? נשמח לטפל. ניתן לפנות לרכז הנגישות{coordinator ? <> <strong>{coordinator}</strong></> : ''}:</p>
              {contact}

              <p style={{ marginTop: 14, color: '#5a6a82' }}>הצהרה זו עודכנה בחודש יוני 2026.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
