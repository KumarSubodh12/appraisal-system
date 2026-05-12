'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

const mockDetail = {
  id: '1',
  employee: { name: 'Priya Sharma', dept: 'Engineering', role: 'Senior Engineer', email: 'priya@company.com' },
  period: 'Q1 2025',
  status: 'Completed',
  mlScore: 92.4,
  grade: 'Outstanding',
  reviewer: 'Kumar Subodh',
  createdAt: '2025-01-15',
  scores: {
    performance: 95,
    productivity: 91,
    teamwork: 88,
    leadership: 86,
    innovation: 94,
    communication: 92,
  },
  insights: 'Strongest dimension: Innovation (94). Consistent high performer across all dimensions. Communication and performance scores indicate a well-rounded professional. Recommend for senior leadership fast-track program.',
  comments: 'Priya has consistently delivered high-quality work this quarter. Her innovative approach to the microservices migration saved the team 3 weeks of development time.',
  goals: '1. Lead the upcoming API redesign project\n2. Mentor 2 junior developers\n3. Complete AWS Solutions Architect certification',
}

const scoreEntries = Object.entries(mockDetail.scores)

export default function AppraisalDetailPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Animate score counter
    let start = 0
    const end = mockDetail.mlScore
    const duration = 1500
    const step = (end / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setAnimatedScore(end); clearInterval(timer) }
      else setAnimatedScore(Math.floor(start * 10) / 10)
    }, 16)
    return () => clearInterval(timer)
  }, [])

  const radarData = scoreEntries.map(([key, val]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    A: val,
  }))

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 reveal">
          <div>
            <Link href="/appraisals" className="font-body text-obsidian-500 text-xs hover:text-gold-400 transition-colors mb-2 inline-block">
              ← Back to Appraisals
            </Link>
            <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Detail View</p>
            <h1 className="font-display text-4xl text-white">{mockDetail.employee.name}</h1>
            <p className="font-body text-obsidian-400 text-sm">{mockDetail.employee.role} · {mockDetail.employee.dept}</p>
          </div>
          <div className="text-right">
            <span className="font-body text-xs px-3 py-1.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/20">
              {mockDetail.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left column */}
          <div className="col-span-2 space-y-6">
            {/* ML Score Card */}
            <div className="glass p-8 reveal">
              <div className="flex items-center gap-8">
                {/* Animated score circle */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(226,184,36,0.1)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="#e2b824"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * mockDetail.mlScore / 100)}
                      style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl gold-shimmer">{animatedScore.toFixed(1)}</span>
                    <span className="font-body text-obsidian-500 text-xs">/ 100</span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-body text-obsidian-400 text-xs uppercase tracking-widest mb-1">ML Grade</p>
                  <h2 className="font-display text-3xl text-white mb-3">{mockDetail.grade}</h2>
                  <p className="font-body text-obsidian-300 text-sm leading-relaxed">{mockDetail.insights}</p>
                </div>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="glass p-6 reveal">
              <h3 className="font-display text-lg text-gold-400 mb-5">Performance Breakdown</h3>
              <div className="space-y-4">
                {scoreEntries.map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-body text-obsidian-300 text-sm capitalize">{key}</span>
                      <span className="font-mono text-gold-400 text-sm">{val}</span>
                    </div>
                    <div className="h-1.5 bg-obsidian-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                        style={{ width: `${val}%`, transition: 'width 1s ease-out' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments & Goals */}
            <div className="grid grid-cols-2 gap-4 reveal">
              <div className="glass p-5">
                <h3 className="font-display text-base text-gold-400 mb-3">Manager Comments</h3>
                <p className="font-body text-obsidian-300 text-sm leading-relaxed">{mockDetail.comments}</p>
              </div>
              <div className="glass p-5">
                <h3 className="font-display text-base text-gold-400 mb-3">Goals</h3>
                <p className="font-body text-obsidian-300 text-sm leading-relaxed whitespace-pre-line">{mockDetail.goals}</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Radar */}
            <div className="glass p-5 reveal">
              <h3 className="font-display text-base text-gold-400 mb-3">Skill Radar</h3>
              {mounted && (
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(226,184,36,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#767688', fontSize: 9, fontFamily: 'DM Sans' }} />
                    <Radar dataKey="A" stroke="#e2b824" fill="#e2b824" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Employee info */}
            <div className="glass p-5 reveal">
              <h3 className="font-display text-base text-gold-400 mb-4">Employee Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Email', value: mockDetail.employee.email },
                  { label: 'Department', value: mockDetail.employee.dept },
                  { label: 'Period', value: mockDetail.period },
                  { label: 'Reviewer', value: mockDetail.reviewer },
                  { label: 'Date', value: mockDetail.createdAt },
                ].map(item => (
                  <div key={item.label}>
                    <p className="font-body text-obsidian-500 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="font-body text-white text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="glass p-5 reveal space-y-2">
              <h3 className="font-display text-base text-gold-400 mb-3">Actions</h3>
              <button className="btn-gold w-full py-2.5 rounded-lg font-body text-sm">Approve Appraisal</button>
              <button className="w-full py-2.5 rounded-lg font-body text-sm border border-gold-500/20 text-gold-400 hover:bg-gold-500/5 transition-colors">Send Email</button>
              <button className="w-full py-2.5 rounded-lg font-body text-sm border border-red-500/20 text-red-400 hover:bg-red-500/5 transition-colors">Request Revision</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
