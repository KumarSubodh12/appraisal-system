'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email, password, redirect: false,
    })
    setLoading(false)
    if (res?.error) setError('Invalid credentials. Please try again.')
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="font-display text-4xl gold-shimmer">AppraisalAI</h1>
          </Link>
          <p className="font-body text-obsidian-400 text-sm mt-2 tracking-widest uppercase">ML-Powered Performance</p>
        </div>

        {/* Card */}
        <div className="glass p-8">
          <h2 className="font-display text-2xl text-white mb-1">Welcome back</h2>
          <p className="font-body text-obsidian-400 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6">
              <p className="text-red-400 font-body text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                className="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-4 py-3 font-body text-white placeholder-obsidian-500 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-4 py-3 font-body text-white placeholder-obsidian-500 focus:outline-none focus:border-gold-500/60 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-lg font-body text-sm mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-obsidian-500 text-sm">
              Demo: admin@company.com / admin123
            </p>
          </div>
        </div>

        <p className="text-center font-body text-obsidian-500 text-xs mt-8">
          Made by <span className="text-gold-600">Kumar Subodh</span>
        </p>
      </div>
    </div>
  )
}
