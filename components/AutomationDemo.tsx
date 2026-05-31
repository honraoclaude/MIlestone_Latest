'use client'

import { useState, useRef } from 'react'

type Phase = 'idle' | 'running' | 'done'

type Scenario = {
  id: string
  label: string
  from: string
  subject: string
  body: string
  steps: { label: string; ms: number }[]
  actions: string[]
  prompt: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'complaint',
    label: 'Customer Complaint',
    from: 'sarah.thompson@gmail.com',
    subject: 'Order #8834 — Still Not Arrived',
    body: "Hi,\n\nI placed order #8834 on Monday with a promised 2-day delivery. It's now Friday and nothing has arrived — I need this for an event tomorrow morning.\n\nThis is completely unacceptable. Please resolve this urgently.",
    steps: [
      { label: 'Analysing sentiment & urgency', ms: 1000 },
      { label: 'Looking up order #8834', ms: 1100 },
      { label: 'Drafting personalised reply', ms: 900 },
      { label: 'Raising urgent support ticket', ms: 800 },
      { label: 'Alerting fulfilment team', ms: 700 },
    ],
    actions: ['Ticket #T-2891 raised (Priority: High)', 'Fulfilment team notified via Slack', '£10 goodwill voucher queued'],
    prompt: 'E-commerce customer complaint about undelivered order #8834, customer has event tomorrow morning, very frustrated',
  },
  {
    id: 'enquiry',
    label: 'Sales Enquiry',
    from: 'james.wilson@hartleyaccounting.co.uk',
    subject: 'AI Automation for Client Onboarding',
    body: "Hi,\n\nWe're a 15-person accountancy firm and our client onboarding currently takes around 3 hours per client — lots of manual data entry and document chasing.\n\nWe're keen to explore AI automation. Do you have solutions for firms like ours?",
    steps: [
      { label: 'Qualifying lead & company profile', ms: 900 },
      { label: 'Identifying key pain points', ms: 1000 },
      { label: 'Calculating ROI potential', ms: 1100 },
      { label: 'Drafting personalised proposal', ms: 800 },
      { label: 'Scheduling follow-up task', ms: 600 },
    ],
    actions: ['Lead added to CRM (Score: High)', 'Follow-up task set for 48 hours', 'ROI estimate report generated'],
    prompt: 'Sales enquiry from 15-person UK accountancy firm wanting to automate 3-hour manual client onboarding process',
  },
  {
    id: 'booking',
    label: 'Appointment Request',
    from: 'mike.patterson@outlook.com',
    subject: 'Follow-up Consultation — Dr. Smith',
    body: "Hello,\n\nI'd like to book a follow-up consultation with Dr. Smith next week. I'm available Tuesday or Thursday afternoon, ideally between 2pm and 5pm.\n\nPlease let me know what slots are free. Thank you.",
    steps: [
      { label: "Checking Dr. Smith's calendar", ms: 900 },
      { label: 'Matching patient availability', ms: 800 },
      { label: 'Reserving Thursday 3:00pm slot', ms: 700 },
      { label: 'Drafting confirmation email', ms: 600 },
      { label: 'Sending calendar invite', ms: 700 },
    ],
    actions: ['Thursday 3:00pm reserved with Dr. Smith', 'Calendar invite sent to patient', 'Patient record updated'],
    prompt: 'Patient requesting follow-up consultation with Dr. Smith, available Tue or Thu afternoon 2-5pm next week',
  },
]

export default function AutomationDemo() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id)
  const [phase, setPhase] = useState<Phase>('idle')
  const [completedSteps, setCompletedSteps] = useState(0)
  const [response, setResponse] = useState('')
  const abortRef = useRef<AbortController | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const scenario = SCENARIOS.find(s => s.id === activeId)!

  function reset() {
    abortRef.current?.abort()
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('idle')
    setCompletedSteps(0)
    setResponse('')
  }

  function selectScenario(id: string) {
    reset()
    setActiveId(id)
  }

  async function runDemo() {
    reset()
    setPhase('running')

    // Animate steps sequentially
    let delay = 0
    scenario.steps.forEach((step, i) => {
      delay += step.ms
      const t = setTimeout(() => setCompletedSteps(i + 1), delay)
      timersRef.current.push(t)
    })

    // Stream Claude response
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenario.prompt, message: scenario.body }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error('Failed')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') { setPhase('done'); return }
          try {
            const parsed = JSON.parse(data)
            if (parsed.text) setResponse(prev => prev + parsed.text)
          } catch { /* skip malformed chunk */ }
        }
      }
      setPhase('done')
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setPhase('done')
    }
  }

  const isIdle = phase === 'idle'
  const isRunning = phase === 'running'
  const isDone = phase === 'done'

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            See AI <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Pick a real business scenario and watch our AI agent handle it end-to-end — in seconds, not hours.
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

        {/* Demo area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left: incoming email */}
          <div className="glass-card p-6 flex flex-col gap-5">
            {/* Fake browser dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-600 font-medium">Incoming Message</span>
            </div>

            {/* Email meta */}
            <div className="border-b border-white/5 pb-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 w-16 shrink-0 text-xs">From</span>
                <span className="text-[#00d4ff] text-sm">{scenario.from}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-slate-500 w-16 shrink-0 text-xs">Subject</span>
                <span className="text-white font-semibold">{scenario.subject}</span>
              </div>
            </div>

            {/* Email body */}
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line flex-1 min-h-[120px]">
              {scenario.body}
            </p>

            {/* CTA button */}
            <button
              onClick={isIdle ? runDemo : reset}
              disabled={isRunning}
              className={`btn-primary w-full justify-center py-3 text-sm ${isRunning ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M7 2a5 5 0 015 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  AI Agent Running...
                </>
              ) : isDone ? (
                'Reset Demo →'
              ) : (
                'Run AI Agent →'
              )}
            </button>
          </div>

          {/* Right: steps + response */}
          <div className="flex flex-col gap-5">

            {/* Processing steps */}
            <div className="glass-card p-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
                AI Processing Pipeline
              </div>
              <div className="space-y-3.5">
                {scenario.steps.map((step, i) => {
                  const done = completedSteps > i
                  const active = isRunning && completedSteps === i
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                        done ? 'text-white' : active ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          done
                            ? 'bg-green-500/15 border border-green-500/35'
                            : active
                            ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/40'
                            : 'border border-white/8'
                        }`}
                      >
                        {done ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : active ? (
                          <svg className="animate-spin" width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="5" r="3.5" stroke="rgba(0,212,255,0.25)" strokeWidth="1.5" />
                            <path d="M5 1.5a3.5 3.5 0 013.5 3.5" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <span className="text-[10px] text-slate-700">{i + 1}</span>
                        )}
                      </div>
                      <span>{step.label}</span>
                      {done && (
                        <span className="ml-auto text-[10px] text-green-500/70 font-medium">Done</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* AI Response */}
            <div className={`glass-card p-6 flex-1 transition-opacity duration-500 ${isIdle ? 'opacity-40' : 'opacity-100'}`}>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Generated Response
              </div>

              {response ? (
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {response}
                  {isRunning && (
                    <span className="inline-block w-0.5 h-4 bg-[#00d4ff] ml-0.5 align-middle animate-blink" />
                  )}
                </p>
              ) : (
                <p className="text-sm text-slate-600 italic">
                  {isRunning ? 'Composing response...' : 'Response will stream here once the agent runs...'}
                </p>
              )}

              {/* Actions taken */}
              {isDone && (
                <div className="mt-5 pt-5 border-t border-white/5">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Automated Actions
                  </div>
                  <div className="space-y-2">
                    {scenario.actions.map((action, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-300"
                        style={{ animation: `fade-in-up 0.4s ease-out ${i * 0.12}s both` }}
                      >
                        <span className="w-4 h-4 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l1.5 1.5 3-3" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post-demo CTA */}
        {isDone && (
          <div
            className="mt-12 text-center"
            style={{ animation: 'fade-in-up 0.5s ease-out 0.3s both' }}
          >
            <p className="text-slate-400 mb-5 text-lg">
              This is exactly what we build for your business — tailored, automated, running 24/7.
            </p>
            <a href="#contact" className="btn-primary text-base px-8 py-3.5">
              Get This For My Business
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
