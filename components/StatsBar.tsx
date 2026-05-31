'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { prefix: '£', target: 40, suffix: 'K+', label: 'Average Annual Savings', sub: 'per business' },
  { prefix: '', target: 10, suffix: 'hrs+', label: 'Saved Every Week', sub: 'per team' },
  { prefix: '', target: 3, suffix: 'x', label: 'Faster Customer Response', sub: 'vs manual handling' },
  { prefix: '', target: 90, suffix: ' days', label: 'Average Payback Period', sub: 'from day one' },
]

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

export default function StatsBar() {
  const [counts, setCounts] = useState(STATS.map(() => 0))
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
          observer.disconnect()

          STATS.forEach((stat, i) => {
            const delay = i * 150
            const duration = 1500

            setTimeout(() => {
              const start = performance.now()
              function tick(now: number) {
                const elapsed = now - start
                const progress = Math.min(elapsed / duration, 1)
                const eased = easeOutQuart(progress)
                const current = Math.round(eased * stat.target)
                setCounts(prev => {
                  const next = [...prev]
                  next[i] = current
                  return next
                })
                if (progress < 1) requestAnimationFrame(tick)
              }
              requestAnimationFrame(tick)
            }, delay)
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Real Business Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What AI Does for <span className="gradient-text">Local Businesses</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="glass-card p-7 text-center flex flex-col items-center gap-2">
              <div className="text-4xl md:text-5xl font-black gradient-text leading-none">
                {stat.prefix}{counts[i]}{stat.suffix}
              </div>
              <div className="text-sm font-semibold text-white mt-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
