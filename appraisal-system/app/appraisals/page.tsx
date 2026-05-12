'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Link from 'next/link'

const mockAppraisals = [
  { id: '1', employee: 'Priya Sharma', dept: 'Engineering', period: 'Q1 2025', mlScore: 92.4, status: 'Completed', reviewer: 'Kumar Subodh' },
  { id: '2', employee: 'Rahul Gupta', dept: 'Design', period: 'Q1 2025', mlScore: 87.1, status: 'In Review', reviewer: 'Kumar Subodh' },
  { id: '3', employee: 'Ananya Singh', dept: 'Marketing', period: 'Q1 2025', mlScore: 74.8, status: 'Pending', reviewer: '—' },
  { id: '4', employee: 'Vikram Patel', dept: 'Sales', period: 'Q1 2025', mlScore: 83.6, status: 'Completed', reviewer: 'Kumar Subodh' },
  { id: '5', employee: 'Neha Joshi', dept: 'HR', period: 'Q1 2025', mlScore: 91.2, status: 'Approved', reviewer: 'Kumar Subodh' },
  { id: '6', employee: 'Arjun Kumar', dept: 'Engineering', period: 'Q1 2025', mlScore: 68.5, status: 'Pending', reviewer: '—' },
  { id: '7', employee: 'Divya Mehta', dept: 'Design', period: 'Q1 2025', mlScore: 88.9, status: 'Completed', reviewer: 'Kumar Subodh' },
  { id: '8', employee: 'Rohan Shah', dept: 'Marketing', period: 'Q1 2025', mlScore: 79.3, status: 'In Review', reviewer: 'Kumar Subodh' },
]

const statusColors: Record<string, string> = {
  'Completed': 'text-green-400 bg-green-400/10 border-green-400/20',
  'In Review': 'text-gold-400 bg-gold-400/10 border-gold-400/20',
  'Pending': 'text-obsidian-400 bg-obsidian-400/10 border-obsidian-400/20',
  'Approved': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
}

const scoreColor = (s: number) => s >= 90 ? 'text-green-400' : s >= 80 ? 'text-gold-400' : s >= 70 ? 'text-yellow-600' : 'text-red-400'

export default function AppraisalsPage() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Completed', 'In Review', 'Pending', 'Approved']

  const filtered = filter === 'All' ? mockAppraisals : mockAppraisals.filter(a => a.status === filter)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 reveal">
          <div>
            <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Performance</p>
            <h1 className="font-display text-4xl text-white">Appraisals</h1>
          </div>
          <Link href="/appraisals/new" className="btn-gold px-6 py-2.5 rounded-lg font-body text-sm">
            + New Appraisal
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 reveal">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === f
                  ? 'border-gold-500/40 bg-gold-500/10 text-gold-400'
                  : 'border-obsidian-700 text-obsidian-400 hover:text-gold-400 hover:border-gold-500/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a, i) => (
            <div key={a.id} className="glass p-5 hover:border-gold-500/30 transition-all duration-300 reveal" style={{animationDelay: `${i * 0.06}s`}}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center">
                    <span className="font-display text-gold-400">{a.employee[0]}</span>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-medium">{a.employee}</p>
                    <p className="font-body text-obsidian-500 text-xs">{a.dept} · {a.period}</p>
                  </div>
                </div>
                <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${statusColors[a.status]}`}>
                  {a.status}
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-body text-obsidian-400 text-xs">ML Score</span>
                  <span className={`font-mono text-sm font-medium ${scoreColor(a.mlScore)}`}>{a.mlScore}</span>
                </div>
                <div className="h-1.5 bg-obsidian-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${a.mlScore}%`,
                      background: a.mlScore >= 90 ? 'linear-gradient(90deg, #16a34a, #4ade80)' : a.mlScore >= 80 ? 'linear-gradient(90deg, #c49a18, #e2b824)' : 'linear-gradient(90deg, #ca8a04, #fde047)'
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body text-obsidian-500 text-xs">Reviewer: {a.reviewer}</span>
                <Link href={`/appraisals/${a.id}`} className="font-body text-gold-500 text-xs hover:text-gold-300 transition-colors">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
