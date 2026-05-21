export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/VID.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay — keeps text crisp while showing the video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,15,0.65) 0%, rgba(10,10,15,0.45) 50%, rgba(10,10,15,0.75) 100%)',
        }}
      />

      {/* Subtle animated grid */}
      <div className="grid-bg" style={{ zIndex: 2 }} />

      {/* Accent blobs */}
      <div
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full animate-glow-pulse pointer-events-none"
        style={{ zIndex: 2, background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full animate-glow-pulse pointer-events-none"
        style={{ zIndex: 2, background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', animationDelay: '1.5s' }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-5xl mx-auto px-6 text-center pt-28 pb-20" style={{ zIndex: 10 }}>

        {/* Badge pill */}
        <div className="hero-anim-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs text-[#00d4ff] mb-8 font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          UK-Based &nbsp;·&nbsp; AI Agent Services &nbsp;·&nbsp; Free Consultation
        </div>

        {/* Headline */}
        <h1 className="hero-anim-1 text-5xl sm:text-6xl md:text-7xl font-black leading-[1.06] tracking-tight mb-5 text-white drop-shadow-lg">
          Your Business Deserves
          <br />
          <span className="shimmer-text">Smarter AI Agents</span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-anim-2 text-xl md:text-2xl font-semibold text-white/80 mb-3 drop-shadow">
          Automate. Engage. Grow — on autopilot.
        </p>

        {/* Supporting copy */}
        <p className="hero-anim-3 text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Milestone Global IT builds bespoke AI chatbots, workflow automations, and custom agents
          that save hours every week and turn visitors into loyal customers.
        </p>

        {/* CTAs */}
        <div className="hero-anim-4 flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#services" className="btn-primary text-base py-3.5 px-8">
            See What We Build
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost text-base py-3.5 px-8">
            Book a Free Call
          </a>
        </div>

        {/* Floating AI demo card */}
        <div className="hero-anim-5 inline-block animate-float">
          <div className="glass-card px-5 py-4 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                  <circle cx="6" cy="6" r="3" />
                  <path d="M2 6h1M9 6h1M6 2v1M6 9v1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#00d4ff]">Milestone AI Agent</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              ✅ Booked 3 appointments, answered 14 enquiries, and saved your team{' '}
              <span className="text-[#00d4ff] font-bold">12 hrs</span> — all while you slept.
            </p>
            <div className="mt-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"
                  style={{ animation: `dot-bounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue — clicks scroll to #services */}
        <a
          href="#services"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-[#00d4ff] transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" />
          </svg>
        </a>
      </div>
    </section>
  )
}
