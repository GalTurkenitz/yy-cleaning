import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function MediaUploader({ category, onUpload, color }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [pasted, setPasted] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = useCallback(async files => {
    files = Array.from(files || [])
    if (!files.length) return
    setUploading(true)
    setError(null)
    setProgress(0)

    const total = files.length
    let done = 0

    for (const file of files) {
      // Pasted/clipboard files often have no filename — fall back to the MIME subtype
      const ext = (file.name && file.name.includes('.')
        ? file.name.split('.').pop()
        : (file.type.split('/')[1] || 'png')).toLowerCase()
      const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const path = `${category}/${uid}.${ext}`
      const isVideo = file.type.startsWith('video/')

      const { error: upErr } = await supabase.storage
        .from('media')
        .upload(path, file, { upsert: false })

      if (upErr) {
        setError(upErr.message)
        done++
        setProgress(Math.round((done / total) * 100))
        continue
      }

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path)

      await supabase.from('media').insert({
        category,
        url: publicUrl,
        type: isVideo ? 'video' : 'image',
        sort_order: 0,
      })

      done++
      setProgress(Math.round((done / total) * 100))
    }

    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
    onUpload()
  }, [category, onUpload])

  // Paste-to-upload: grab any image/video from the clipboard on Ctrl+V
  useEffect(() => {
    const onPaste = e => {
      if (uploading) return
      const items = e.clipboardData?.items || []
      const files = []
      for (const it of items) {
        if (it.kind === 'file' && /^(image|video)\//.test(it.type)) {
          const f = it.getAsFile()
          if (f) files.push(f)
        }
      }
      if (!files.length) return
      e.preventDefault()
      setPasted(true)
      setTimeout(() => setPasted(false), 1200)
      handleFiles(files)
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [uploading, handleFiles])

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Floating upload button above the float-group */}
      <motion.button
        onClick={() => inputRef.current?.click()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={uploading}
        className="fixed z-[950] flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-700 text-sm shadow-2xl"
        style={{
          bottom: '220px',
          left: '8px',
          background: uploading ? '#555' : (color || '#25D366'),
          boxShadow: `0 4px 20px ${color || '#25D366'}55`,
        }}
        aria-label="העלה תמונה או סרטון — אפשר גם להדביק עם Ctrl+V"
        title="הוסף תמונה / סרטון · או הדבק עם Ctrl+V"
      >
        {uploading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" strokeOpacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {progress}%
          </>
        ) : pasted ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            הודבק!
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            הוספה
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed z-[960] bg-red-600 text-white text-xs p-3 rounded-xl shadow-xl"
            style={{ bottom: '270px', left: '8px', maxWidth: '200px' }}
          >
            שגיאה: {error}
            <button onClick={() => setError(null)} className="mr-2 font-700">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
