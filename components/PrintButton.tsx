'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden mt-2 px-6 py-3 rounded-lg text-white text-sm font-semibold"
      style={{ background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)' }}
    >
      Print / Save as PDF
    </button>
  )
}
