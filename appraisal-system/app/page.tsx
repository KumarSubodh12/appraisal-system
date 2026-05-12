'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
        heroRef.current.style.opacity = `${1 - scrollY * 0.002}`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-obsidian-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div ref={heroRef} className="text-center z-10 px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-body tracking-widest uppercase">ML-Powered Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light mb-6 reveal" style={{animationDelay: '0.1s'}}>
            <span className="gold-shimmer">Appraisal</span>
            <br />
            <span className="text-white opacity-90">Reimagined</span>
          </h1>

          <p className="font-body text-obsidian-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 reveal" style={{animationDelay: '0.2s'}}>
            Harness machine learning to evaluate performance with precision, fairness, and insight — transforming how organizations recognize excellence.
          </p>

          <div className="flex items-center justify-center gap-4 reveal" style={{animationDelay: '0.3s'}}>
            <Link href="/login" className="btn-gold px-8 py-3 rounded-full font-body text-sm">
              Get Started
            </Link>
            <Link href="#features" className="glass px-8 py-3 rounded-full font-body text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 border border-gold-500/10 rounded-full animate-ping" style={{animationDuration: '4s'}} />
          <div className="absolute w-64 h-64 border border-gold-500/15 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-obsidian-400 text-xs tracking-widest uppercase font-body">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-line reveal" />

      {/* Features Section */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl font-light mb-4 reveal">
            <span className="gold-shimmer">Features</span>
          </h2>
          <p className="text-obsidian-400 font-body reveal">Everything you need for intelligent performance management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🧠', title: 'ML Score Engine', desc: 'Our proprietary algorithm analyzes 6 performance dimensions to generate unbiased scores with full transparency.' },
            { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards powered by Pusher give managers instant visibility into team performance trends.' },
            { icon: '🔒', title: 'Enterprise Security', desc: 'Role-based access control with NextAuth ensures data stays protected at every level.' },
            { icon: '📧', title: 'Smart Notifications', desc: 'Automated email workflows via Resend keep employees informed at every appraisal stage.' },
            { icon: '📁', title: 'Document Management', desc: 'Securely upload and manage performance evidence with Uploadthing integration.' },
            { icon: '🎯', title: 'Goal Tracking', desc: 'Set, monitor, and evaluate employee goals with intelligent progress tracking.' },
          ].map((f, i) => (
            <div key={i} className="glass p-8 reveal group" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-display text-xl text-gold-400 mb-2">{f.title}</h3>
              <p className="font-body text-obsidian-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="glow-line reveal" />

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '98%', label: 'Accuracy' },
            { value: '3x', label: 'Faster Reviews' },
            { value: '100%', label: 'Unbiased' },
            { value: '24/7', label: 'Real-time' },
          ].map((s, i) => (
            <div key={i} className="reveal" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="font-display text-5xl gold-shimmer mb-2">{s.value}</div>
              <div className="font-body text-obsidian-400 text-sm tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="glass max-w-2xl mx-auto p-16 reveal">
          <h2 className="font-display text-4xl mb-4 text-white">Ready to Transform <span className="gold-shimmer">Appraisals?</span></h2>
          <p className="font-body text-obsidian-300 mb-8">Join forward-thinking organizations using AI to recognize talent fairly.</p>
          <Link href="/login" className="btn-gold px-10 py-4 rounded-full font-body inline-block">
            Start Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-500/10 py-8 px-6 text-center">
        <p className="font-body text-obsidian-500 text-sm">
          © 2025 AppraisalAI · <span className="text-gold-600">Made by Kumar Subodh</span>
        </p>
      </footer>
    </main>
  )
}
