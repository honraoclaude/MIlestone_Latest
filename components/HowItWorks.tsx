const steps = [
  {
    number: '01',
    title: 'Consult',
    description:
      'We start with a free discovery call to understand your business, map your workflows, and identify where AI will deliver the most value.',
    color: '#00d4ff',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Our engineers design and build your solution in sprints, keeping you involved at every stage with clear demos and updates.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Deploy',
    description:
      'We handle production deployment, integration with your existing systems, staff training, and ongoing 24/7 monitoring.',
    color: '#00d4ff',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0f0f1a] relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            From first conversation to live deployment in as little as two weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-[#00d4ff]/15" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center mb-6">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-30"
                  style={{ background: step.color, transform: 'scale(1.4)' }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, rgba(139,92,246,0.15))`,
                    border: `2px solid ${step.color}40`,
                    color: step.color,
                  }}
                >
                  {step.number}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 text-[#00d4ff]/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M15 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#contact" className="btn-primary text-base py-3.5 px-8">
            Book Your Free Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
