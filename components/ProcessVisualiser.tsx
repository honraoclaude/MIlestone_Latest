'use client'

import { useState } from 'react'

type Step = {
  icon: string
  text: string
  detail: string
}

type Scenario = {
  id: string
  label: string
  before: { steps: Step[]; summary: string }
  after: { steps: Step[]; summary: string }
}

const SCENARIOS: Scenario[] = [
  {
    id: 'support',
    label: 'Customer Support',
    before: {
      steps: [
        { icon: '📧', text: 'Customer emails in', detail: 'Sits in shared inbox unread' },
        { icon: '⏰', text: '4 hours pass', detail: 'Staff finally spots it' },
        { icon: '🔍', text: 'Manually look up account', detail: '10 minutes of searching' },
        { icon: '✍️', text: 'Type reply from scratch', detail: 'Another 15 minutes gone' },
        { icon: '😤', text: 'Customer already left a review', detail: '1 star. Could have been avoided.' },
      ],
      summary: '4+ hrs response · 2 staff involved · Customer unhappy',
    },
    after: {
      steps: [
        { icon: '📧', text: 'Customer emails in', detail: 'AI detects it instantly' },
        { icon: '⚡', text: 'Intent analysed in seconds', detail: 'Urgency and topic scored' },
        { icon: '🔍', text: 'Account pulled automatically', detail: 'CRM queried in real-time' },
        { icon: '✅', text: 'Professional reply sent', detail: 'Under 30 seconds total' },
        { icon: '😊', text: 'Customer delighted', detail: 'Ticket closed. 5-star rating.' },
      ],
      summary: '< 30 seconds · Zero staff time · Customer happy',
    },
  },
  {
    id: 'onboarding',
    label: 'Client Onboarding',
    before: {
      steps: [
        { icon: '📞', text: 'New client enquires', detail: 'Manual note-taking on a call' },
        { icon: '📤', text: 'Forms emailed manually', detail: 'Hours after the conversation' },
        { icon: '⏰', text: 'Wait days for documents', detail: 'Client forgot to send them' },
        { icon: '🔄', text: 'Chase the client 3 times', detail: 'Awkward follow-up calls' },
        { icon: '✍️', text: 'Data entered by hand', detail: '45 minutes of typing' },
      ],
      summary: '3–5 days to onboard · 3+ hrs staff time · Error-prone',
    },
    after: {
      steps: [
        { icon: '📞', text: 'Client enquires', detail: 'AI captures every detail' },
        { icon: '⚡', text: 'Forms sent instantly', detail: 'Automated and personalised' },
        { icon: '📎', text: 'Documents collected', detail: 'Smart reminders chase for you' },
        { icon: '🔄', text: 'Data synced to CRM', detail: 'Zero manual entry needed' },
        { icon: '🎉', text: 'Client fully onboarded', detail: 'In hours, not days' },
      ],
      summary: 'Same-day onboarding · Zero staff time · 100% accurate',
    },
  },
  {
    id: 'booking',
    label: 'Appointment Booking',
    before: {
      steps: [
        { icon: '📞', text: 'Client calls to book', detail: 'Goes straight to voicemail' },
        { icon: '🔄', text: 'Phone tag begins', detail: '3 missed calls over 2 days' },
        { icon: '📅', text: 'Calendar checked manually', detail: 'Double-bookings happen' },
        { icon: '✍️', text: 'Written in a diary', detail: 'No digital record kept' },
        { icon: '❌', text: 'No reminder sent', detail: 'Client no-shows. Slot wasted.' },
      ],
      summary: '2–3 days to confirm · Missed calls · 20% no-show rate',
    },
    after: {
      steps: [
        { icon: '💬', text: 'Client messages anytime', detail: 'AI responds in seconds — 24/7' },
        { icon: '📅', text: 'Live slots shown instantly', detail: 'Synced to your real calendar' },
        { icon: '✅', text: 'Booked and confirmed', detail: 'In under 2 minutes' },
        { icon: '📱', text: 'Reminders sent automatically', detail: '24 hrs and 1 hr before' },
        { icon: '🤝', text: 'Client shows up', detail: 'No-shows drop by 80%' },
      ],
      summary: 'Booked in 2 minutes · 24/7 availability · 80% fewer no-shows',
    },
  },
]

export default function ProcessVisualiser() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id)
  const [animKey, setAnimKey] = useState(0)

  const scenario = SCENARIOS.find(s => s.id === activeId)!

  function selectScenario(id: string) {
    setActiveId(id)
    setAnimKey(k => k + 1)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            See The Difference
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The Old Way vs <span className="gradient-text">The AI Way</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Pick a scenario your business faces every day — then see what changes with AI.
          </p>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => selectScenario(s.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeId === s.id
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white border-transparent shadow-lg'
                  : 'border-white/10 text-slate-400 hover:border-[#00d4ff]/30 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Before / After panels */}
        <div key={animKey} className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Before */}
          <div
            className="glass-card overflow-hidden"
            style={{ borderColor: 'rgba(239,68,68,0.15)' }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center gap-3 border-b"
              style={{ background: 'rgba(239,68,68,0.07)', borderColor: 'rgba(239,68,68,0.12)' }}
            >
              <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Before AI</span>
              <span className="ml-auto text-xs text-red-400/60">Manual Process</span>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-3">
              {scenario.before.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(239,68,68,0.04)',
                    border: '1px solid rgba(239,68,68,0.08)',
                    animation: `fade-in-up 0.45s ease-out ${i * 0.12}s both`,
                  }}
                >
                  <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-200">{step.text}</div>
                    <div className="text-xs text-red-400/70 mt-0.5">{step.detail}</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="px-6 py-4 border-t"
              style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.1)' }}
            >
              <p className="text-xs text-red-400/80 font-medium">{scenario.before.summary}</p>
            </div>
          </div>

          {/* After */}
          <div
            className="glass-card overflow-hidden"
            style={{ borderColor: 'rgba(0,212,255,0.18)' }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center gap-3 border-b"
              style={{ background: 'rgba(0,212,255,0.07)', borderColor: 'rgba(0,212,255,0.12)' }}
            >
              <div className="w-7 h-7 rounded-full bg-[#00d4ff]/15 border border-[#00d4ff]/25 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#00d4ff] uppercase tracking-wider">After AI</span>
              <span className="ml-auto text-xs text-[#00d4ff]/60">Automated Process</span>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-3">
              {scenario.after.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid rgba(0,212,255,0.08)',
                    animation: `fade-in-up 0.45s ease-out ${i * 0.12 + 0.1}s both`,
                  }}
                >
                  <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-200">{step.text}</div>
                    <div className="text-xs text-[#00d4ff]/60 mt-0.5">{step.detail}</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="px-6 py-4 border-t"
              style={{ background: 'rgba(0,212,255,0.05)', borderColor: 'rgba(0,212,255,0.1)' }}
            >
              <p className="text-xs text-[#00d4ff]/80 font-medium">{scenario.after.summary}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-5 text-lg">
            Which of these processes is costing your business time and money right now?
          </p>
          <a href="#contact" className="btn-primary text-base px-8 py-3.5">
            Let's Automate It
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
