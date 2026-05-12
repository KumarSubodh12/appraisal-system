'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'

const metrics = [
  { key: 'performance', label: 'Performance', icon: '⚡', desc: 'Quality and consistency of work output' },
  { key: 'productivity', label: 'Productivity', icon: '📈', desc: 'Efficiency and output volume' },
  { key: 'teamwork', label: 'Teamwork', icon: '🤝', desc: 'Collaboration and team contribution' },
  { key: 'leadership', label: 'Leadership', icon: '👑', desc: 'Initiative and team guidance' },
  { key: 'innovation', label: 'Innovation', icon: '💡', desc: 'Creative thinking and problem solving' },
  { key: 'communication', label: 'Communication', icon: '💬', desc: 'Clarity and effectiveness of communication' },
]

function computeMLScore(scores: Record<string, number>): number {
  const weights = { performance: 0.25, productivity: 0.20, teamwork: 0.15, leadership: 0.15, innovation: 0.15, communication: 0.10 }
  return Object.entries(weights).reduce((acc, [key, w]) => acc + (scores[key] || 0) * w, 0)
}

export default function NewAppraisalPage() {
  const [scores, setScores] = useState<Record<string, number>>({})
  const [comments, setComments] = useState('')
  const [goals, setGoals] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const mlScore = computeMLScore(scores)
  const allFilled = metrics.every(m => scores[m.key] !== undefined)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center glass p-16 max-w-md">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="font-display text-3xl text-white mb-2">Appraisal Submitted</h2>
            <p className="font-body text-obsidian-400 mb-4">ML Score computed successfully</p>
            <div className="font-display text-6xl gold-shimmer mb-6">{mlScore.toFixed(1)}</div>
            <p className="font-body text-obsidian-500 text-sm">The employee will be notified via email.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-10 reveal">
          <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Evaluate</p>
          <h1 className="font-display text-4xl text-white">New Appraisal</h1>
        </div>

        <div className="max-w-3xl">
          {/* ML Score Preview */}
          {allFilled && (
            <div className="glass p-6 mb-6 flex items-center gap-6 border-gold-500/30 reveal">
              <div>
                <p className="font-body text-obsidian-400 text-xs uppercase tracking-widest mb-1">ML Score</p>
                <div className="font-display text-5xl gold-shimmer">{mlScore.toFixed(1)}</div>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-obsidian-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-500"
                    style={{width: `${mlScore}%`}}
                  />
                </div>
                <p className="font-body text-obsidian-400 text-xs mt-2">
                  {mlScore >= 90 ? '🌟 Outstanding' : mlScore >= 80 ? '✅ Excellent' : mlScore >= 70 ? '👍 Good' : '📈 Needs Improvement'}
                </p>
              </div>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {metrics.map((m, i) => (
              <div key={m.key} className="glass p-5 reveal" style={{animationDelay: `${i * 0.08}s`}}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{m.icon}</span>
                  <div>
                    <p className="font-body text-white text-sm">{m.label}</p>
                    <p className="font-body text-obsidian-500 text-xs">{m.desc}</p>
                  </div>
                  {scores[m.key] !== undefined && (
                    <span className="ml-auto font-mono text-gold-400">{scores[m.key]}</span>
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[m.key] ?? 50}
                  onChange={e => setScores(prev => ({ ...prev, [m.key]: Number(e.target.value) }))}
                  onMouseDown={() => !scores[m.key] && setScores(prev => ({ ...prev, [m.key]: 50 }))}
                  className="w-full accent-gold-400 h-1"
                />
                <div className="flex justify-between font-body text-obsidian-600 text-xs mt-1">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comments */}
          <div className="glass p-5 mb-4 reveal">
            <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Manager Comments</label>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              rows={3}
              placeholder="Describe the employee's overall performance..."
              className="w-full bg-transparent font-body text-white text-sm placeholder-obsidian-600 focus:outline-none resize-none"
            />
          </div>

          <div className="glass p-5 mb-8 reveal">
            <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Goals for Next Period</label>
            <textarea
              value={goals}
              onChange={e => setGoals(e.target.value)}
              rows={3}
              placeholder="Set clear, measurable goals..."
              className="w-full bg-transparent font-body text-white text-sm placeholder-obsidian-600 focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!allFilled || loading}
            className="btn-gold w-full py-4 rounded-lg font-body disabled:opacity-40"
          >
            {loading ? 'Computing ML Score...' : 'Submit Appraisal'}
          </button>
        </div>
      </main>
    </div>
  )
}
