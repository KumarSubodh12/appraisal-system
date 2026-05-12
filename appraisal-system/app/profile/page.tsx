'use client'
import { useSession } from 'next-auth/react'
import Sidebar from '@/components/layout/Sidebar'
import ScoreRing from '@/components/ui/ScoreRing'

const recentAppraisals = [
  { period: 'Q1 2025', score: 92.4, grade: 'Outstanding', status: 'Approved' },
  { period: 'Q4 2024', score: 88.1, grade: 'Excellent', status: 'Approved' },
  { period: 'Q3 2024', score: 84.6, grade: 'Excellent', status: 'Approved' },
]

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-10 reveal">
          <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Account</p>
          <h1 className="font-display text-4xl text-white">My Profile</h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="glass p-8 text-center reveal">
            <div className="w-20 h-20 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-4 border border-gold-500/20">
              <span className="font-display text-gold-400 text-3xl">
                {session?.user?.name?.[0] || 'K'}
              </span>
            </div>
            <h2 className="font-display text-xl text-white mb-1">{session?.user?.name || 'Kumar Subodh'}</h2>
            <p className="font-body text-obsidian-400 text-sm mb-1">{session?.user?.email || 'admin@company.com'}</p>
            <p className="font-body text-gold-500 text-xs uppercase tracking-widest mb-6">Admin</p>
            <div className="glow-line mb-6" />
            <div className="space-y-2 text-left">
              {[
                { label: 'Department', value: 'Engineering' },
                { label: 'Position', value: 'Senior Manager' },
                { label: 'Joined', value: 'Jan 2023' },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="font-body text-obsidian-500 text-xs">{item.label}</span>
                  <span className="font-body text-obsidian-300 text-xs">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right columns */}
          <div className="col-span-2 space-y-6">
            {/* Score overview */}
            <div className="glass p-6 reveal">
              <h3 className="font-display text-lg text-gold-400 mb-6">Performance Overview</h3>
              <div className="flex items-center gap-8">
                <ScoreRing score={92.4} label="Latest Score" />
                <div className="flex-1 grid grid-cols-3 gap-4">
                  {[
                    { label: 'Avg Score', value: '88.4' },
                    { label: 'Appraisals', value: '6' },
                    { label: 'Best Grade', value: 'Outstanding' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-2xl text-white mb-1">{s.value}</p>
                      <p className="font-body text-obsidian-500 text-xs uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appraisal history */}
            <div className="glass p-6 reveal">
              <h3 className="font-display text-lg text-gold-400 mb-4">Appraisal History</h3>
              <div className="space-y-3">
                {recentAppraisals.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-gold-500/5 last:border-0">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                      <span className="font-mono text-gold-400 text-xs">{a.score}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-white text-sm">{a.period}</p>
                      <p className="font-body text-obsidian-500 text-xs">{a.grade}</p>
                    </div>
                    <div className="h-1.5 w-24 bg-obsidian-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full" style={{ width: `${a.score}%` }} />
                    </div>
                    <span className="font-body text-green-400 text-xs">{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
