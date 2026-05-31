'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem('mgil-cookie-consent')
    if (!choice) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('mgil-cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('mgil-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4">
      <div
        className="max-w-4xl mx-auto glass-card px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ boxShadow: '0 -4px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.1)' }}
      >
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#00d4ff" strokeWidth="1.4" />
            <path d="M9 8v5M9 6v.5" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text */}
        <p className="text-sm text-slate-300 flex-1 leading-relaxed">
          We use strictly necessary cookies to keep this site working. No tracking or advertising cookies.{' '}
          <a href="/privacy-policy" className="text-[#00d4ff] hover:underline">
            Privacy Policy
          </a>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn-primary py-2 px-5 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
