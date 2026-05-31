'use client'

import { useState, useRef } from 'react'

const HOURLY_RATE_DEFAULT = 15
const AI_SAVING_PCT = 0.75
const AUTOMATION_COST = 2000

function formatGBP(n: number) {
  if (n >= 1000) return `£${(n / 1000).toFixed(1)}k`
  return `£${n}`
}

export default function ROICalculator() {
  const [staff, setStaff] = useState(3)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(HOURLY_RATE_DEFAULT)
  const resultRef = useRef<HTMLDivElement>(null)

  const annualManualCost = staff * hoursPerWeek * 52 * hourlyRate
  const annualSavings = Math.round(annualManualCost * AI_SAVING_PCT)
  const paybackMonths = Math.ceil(AUTOMATION_COST / (annualSavings / 12))
  const paybackLabel = paybackMonths <= 1 ? 'under 1 month' : `${paybackMonths} months`

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What Is Manual Work <span className="gradient-text">Costing You?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Drag the sliders to match your business — see your real savings in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="glass-card p-8 flex flex-col gap-8">
            <SliderField
              label="Staff spending time on manual tasks"
              value={staff}
              min={1}
              max={20}
              step={1}
              suffix={staff === 1 ? 'person' : 'people'}
              onChange={setStaff}
            />
            <SliderField
              label="Hours per week per person on manual tasks"
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              suffix="hrs / week"
              onChange={setHoursPerWeek}
            />
            <SliderField
              label="Average hourly cost of staff time"
              value={hourlyRate}
              min={10}
              max={75}
              step={5}
              prefix="£"
              suffix="/ hr"
              onChange={setHourlyRate}
            />

            <p className="text-xs text-slate-600 leading-relaxed">
              Includes salary, national insurance, and overhead. UK national living wage is £11.44/hr. Office manager ~£15–20/hr.
            </p>
          </div>

          {/* Results */}
          <div ref={resultRef} className="flex flex-col gap-4">
            {/* Annual manual cost */}
            <div
              className="glass-card p-6 flex items-center gap-5"
              style={{ borderColor: 'rgba(239,68,68,0.15)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" transform="rotate(45 10 10)" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Annual cost of manual work</div>
                <div className="text-3xl font-black text-red-400">{formatGBP(annualManualCost)}</div>
                <div className="text-xs text-slate-600 mt-0.5">per year, in staff time alone</div>
              </div>
            </div>

            {/* Annual savings */}
            <div
              className="glass-card p-6 flex items-center gap-5"
              style={{ borderColor: 'rgba(0,212,255,0.18)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4 4 8-8" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Projected annual savings with AI</div>
                <div className="text-3xl font-black gradient-text">{formatGBP(annualSavings)}</div>
                <div className="text-xs text-slate-600 mt-0.5">75% of manual work automated away</div>
              </div>
            </div>

            {/* Payback */}
            <div
              className="glass-card p-6 flex items-center gap-5"
              style={{ borderColor: 'rgba(139,92,246,0.18)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#8b5cf6" strokeWidth="1.8" />
                  <path d="M10 6v4l2.5 2.5" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Payback period</div>
                <div className="text-3xl font-black" style={{ color: '#a78bfa' }}>{paybackLabel}</div>
                <div className="text-xs text-slate-600 mt-0.5">based on our standard automation package</div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary text-base px-8 py-3.5 justify-center"
            >
              See How We'd Automate This For You
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

type SliderFieldProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (v: number) => void
}

function SliderField({ label, value, min, max, step, prefix = '', suffix = '', onChange }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-base font-black gradient-text tabular-nums">
          {prefix}{value}{suffix ? ` ${suffix}` : ''}
        </span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-700">
        <span>{prefix}{min}{suffix ? ` ${suffix}` : ''}</span>
        <span>{prefix}{max}{suffix ? ` ${suffix}` : ''}</span>
      </div>
    </div>
  )
}
