import type { Metadata } from 'next'
import Image from 'next/image'
import PrintButton from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'Scan to Visit — Milestone Global IT Limited',
  description: 'Scan this QR code to visit milestoneglobalit.co.uk',
  robots: { index: false, follow: false },
}

export default function QRCodePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8 print:p-0">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Logo row */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 4L11 8L7 12L3 8Z" fill="white" opacity="0.9" />
              <path d="M7 4L11 8L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-black text-slate-900 leading-tight">
            Milestone Global IT Limited
          </span>
        </div>

        {/* QR code */}
        <div className="border-4 border-slate-900 rounded-2xl overflow-hidden p-3 shadow-xl">
          <Image
            src="/qr-code.png"
            alt="QR code for milestoneglobalit.co.uk"
            width={280}
            height={280}
            priority
          />
        </div>

        {/* Label */}
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-1">Scan to visit</p>
          <p className="text-slate-900 font-bold text-lg tracking-tight">milestoneglobalit.co.uk</p>
          <p className="text-slate-400 text-sm mt-2">AI Agent Services for UK Businesses</p>
        </div>

        <PrintButton />

        <p className="print:hidden text-xs text-slate-400 text-center">
          Right-click the QR code and save as image to use on business cards or flyers.
        </p>
      </div>
    </main>
  )
}
