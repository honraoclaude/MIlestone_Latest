const stats = [
  {
    value: '100%',
    label: 'UK-Based',
    sub: 'Team & data stays in the UK',
    color: '#00d4ff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#00d4ff" strokeWidth="1.5" />
        <path d="M6 10l3 3 5-5" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Support',
    sub: 'Dedicated monitoring & on-call',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M10 6v4l3 3" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '2–8 wks',
    label: 'Delivery',
    sub: 'Rapid project turnaround',
    color: '#00d4ff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M13 6l4 4-4 4" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="10" r="1.5" fill="#00d4ff" />
      </svg>
    ),
  },
  {
    value: 'Free',
    label: 'Consultation',
    sub: 'No commitment, no cost',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 8.5C17 12.09 13.87 15 10 15a8.3 8.3 0 01-2.56-.4L4 16l.9-2.9A5.96 5.96 0 013 8.5C3 4.91 6.13 2 10 2s7 2.91 7 6.5z" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M7.5 8.5h5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 11h3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'Automation-First',
    label: 'Our Approach',
    sub: 'Every project fully automated from day one',
    color: '#00d4ff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 14l4-4 3 3 5-5" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'SOC2',
    label: 'Aligned Security',
    sub: 'Enterprise-grade practices',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l6 2.5v5C16 13 13.5 16.5 10 18c-3.5-1.5-6-5-6-8.5v-5L10 2z" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M7.5 10l2 2 3-3" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Why Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Built for <span className="gradient-text">Trust & Results</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            We combine deep AI expertise with a commitment to transparency, security,
            and genuinely measurable business outcomes.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center group">
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}
              >
                {s.icon}
              </div>
              <div
                className="text-3xl font-black mb-1"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-slate-500 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
