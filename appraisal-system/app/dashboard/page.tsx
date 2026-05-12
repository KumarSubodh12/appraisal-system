'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'

const radarData = [
  { subject: 'Performance', A: 88 },
  { subject: 'Productivity', A: 92 },
  { subject: 'Teamwork', A: 78 },
  { subject: 'Leadership', A: 65 },
  { subject: 'Innovation', A: 85 },
  { subject: 'Communication', A: 90 },
]

const barData = [
  { dept: 'Engineering', score: 87 },
  { dept: 'Design', score: 91 },
  { dept: 'Marketing', score: 76 },
  { dept: 'Sales', score: 83 },
  { dept: 'HR', score: 79 },
]

const trendData = [
  { month: 'Jan', score: 72 }, { month: 'Feb', score: 75 },
  { month: 'Mar', score: 78 }, { month: 'Apr', score: 82 },
  { month: 'May', score: 80 }, { month: 'Jun', score: 87 },
]

const stats = [
  { label: 'Total Employees', value: '248', change: '+12', icon: '👥' },
  { label: 'Appraisals Done', value: '186', change: '+24', icon: '✅' },
  { label: 'Avg ML Score', value: '84.2', change: '+3.1', icon: '🧠' },
  { label: 'Pending Reviews', value: '32', change: '-8', icon: '⏳' },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-10 reveal">
          <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Overview</p>
          <h1 className="font-display text-4xl text-white">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="glass p-6 reveal" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`font-body text-xs px-2 py-1 rounded-full ${s.change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                  {s.change}
                </span>
              </div>
              <div className="font-display text-3xl text-white mb-1">{s.value}</div>
              <div className="font-body text-obsidian-400 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Radar */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-4">Team Performance Dimensions</h3>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(226,184,36,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#767688', fontSize: 11, fontFamily: 'DM Sans' }} />
                  <Radar name="Score" dataKey="A" stroke="#e2b824" fill="#e2b824" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Trend */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-4">ML Score Trend</h3>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}>
                  <XAxis dataKey="month" tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(226,184,36,0.2)', borderRadius: 8, fontFamily: 'DM Sans' }} />
                  <Line type="monotone" dataKey="score" stroke="#e2b824" strokeWidth={2} dot={{ fill: '#e2b824', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass p-6 reveal">
          <h3 className="font-display text-lg text-gold-400 mb-4">Department Scores</h3>
          {mounted && (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="dept" tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(226,184,36,0.2)', borderRadius: 8, fontFamily: 'DM Sans' }} />
                <Bar dataKey="score" fill="#e2b824" radius={[4, 4, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>
    </div>
  )
}
