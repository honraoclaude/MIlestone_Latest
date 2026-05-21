const services = [
  {
    tag: 'Most Popular',
    tagColor: 'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20',
    title: 'AI Chatbots for Business',
    description:
      'Deploy intelligent chatbots that handle customer queries 24/7, qualify leads, and book appointments — trained on your specific business knowledge.',
    price: 'From £1,500',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="16" rx="4" stroke="#00d4ff" strokeWidth="1.8" />
        <circle cx="9" cy="12" r="2" fill="#00d4ff" />
        <circle cx="14" cy="12" r="2" fill="#8b5cf6" />
        <circle cx="19" cy="12" r="2" fill="#00d4ff" />
        <path d="M8 20l2 4h4l2-4" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tag: null,
    tagColor: '',
    title: 'Workflow Automation',
    description:
      'Eliminate repetitive tasks with AI-powered automation pipelines that connect your existing tools (CRM, email, calendar) and make intelligent decisions.',
    price: 'From £2,000',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="6" cy="6" r="3" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="22" cy="6" r="3" stroke="#00d4ff" strokeWidth="1.8" />
        <circle cx="6" cy="22" r="3" stroke="#00d4ff" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="3" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="4" stroke="#00d4ff" strokeWidth="1.8" />
        <path d="M9 6h10M6 9v10M22 9v10M9 22h10" stroke="rgba(0,212,255,0.3)" strokeWidth="1.2" />
        <path d="M10.5 10.5l7 7M17.5 10.5l-7 7" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: null,
    tagColor: '',
    title: 'AI Consulting',
    description:
      'Strategic guidance on AI adoption. We analyse your operations, identify high-ROI opportunities, and build a clear AI roadmap for your business.',
    price: 'From £500/day',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20l6-6 4 4 10-10" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="10" r="6" stroke="#8b5cf6" strokeWidth="1.8" strokeDasharray="3 2" />
        <path d="M14 7v3l2 2" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tag: 'Enterprise',
    tagColor: 'text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20',
    title: 'Custom AI Agent Development',
    description:
      'Bespoke multi-step AI agents for complex workflows. When off-the-shelf solutions fall short, we engineer exactly what your business needs.',
    price: 'Price on enquiry',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="#8b5cf6" strokeWidth="1.8" />
        <rect x="16" y="4" width="8" height="8" rx="2" stroke="#00d4ff" strokeWidth="1.8" />
        <rect x="4" y="16" width="8" height="8" rx="2" stroke="#00d4ff" strokeWidth="1.8" />
        <rect x="16" y="16" width="8" height="8" rx="2" stroke="#8b5cf6" strokeWidth="1.8" />
        <path d="M12 8h4M8 12v4M20 12v4M12 20h4" stroke="rgba(0,212,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            What We Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Four core capabilities to transform your business with AI — from a quick chatbot to
            a fully custom automation ecosystem.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="glass-card p-8 group cursor-default">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-[#0a0a0f] border border-[#00d4ff]/10 flex items-center justify-center group-hover:border-[#00d4ff]/30 transition-colors">
                  {s.icon}
                </div>
                {s.tag && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.tagColor}`}>
                    {s.tag}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-[#00d4ff] font-semibold text-sm">{s.price}</span>
                <a
                  href="#contact"
                  className="text-xs text-slate-500 hover:text-[#00d4ff] transition-colors flex items-center gap-1"
                >
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
