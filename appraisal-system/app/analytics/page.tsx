'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'

const trendData = [
  { month: 'Jan', avg: 72, top: 91, low: 54 },
  { month: 'Feb', avg: 74, top: 93, low: 56 },
  { month: 'Mar', avg: 77, top: 95, low: 58 },
  { month: 'Apr', avg: 80, top: 96, low: 61 },
  { month: 'May', avg: 82, top: 97, low: 65 },
  { month: 'Jun', avg: 85, top: 98, low: 68 },
]

const deptData = [
  { dept: 'Engineering', avg: 87, count: 42 },
  { dept: 'Design', avg: 91, count: 18 },
  { dept: 'Marketing', avg: 76, count: 24 },
  { dept: 'Sales', avg: 83, count: 36 },
  { dept: 'HR', avg: 79, count: 12 },
  { dept: 'Finance', avg: 84, count: 20 },
]

const gradeData = [
  { name: 'Outstanding', value: 28, color: '#e2b824' },
  { name: 'Excellent', value: 45, color: '#4ade80' },
  { name: 'Good', value: 32, color: '#60a5fa' },
  { name: 'Satisfactory', value: 18, color: '#f97316' },
  { name: 'Needs Improvement', value: 7, color: '#f87171' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 text-xs font-body">
        <p className="text-gold-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-10 reveal">
          <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Insights</p>
          <h1 className="font-display text-4xl text-white">Analytics</h1>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg ML Score', value: '84.2', sub: '+3.1 vs last quarter', up: true },
            { label: 'Completion Rate', value: '91%', sub: '+5% vs last quarter', up: true },
            { label: 'Top Performer Dept', value: 'Design', sub: 'Score: 91.0', up: true },
            { label: 'Appraisals This Month', value: '42', sub: '8 pending', up: false },
          ].map((k, i) => (
            <div key={i} className="glass p-5 reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <p className="font-body text-obsidian-400 text-xs uppercase tracking-wider mb-2">{k.label}</p>
              <p className="font-display text-3xl text-white mb-1">{k.value}</p>
              <p className={`font-body text-xs ${k.up ? 'text-green-400' : 'text-obsidian-400'}`}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Area chart — trend */}
        <div className="glass p-6 mb-6 reveal">
          <h3 className="font-display text-lg text-gold-400 mb-5">Score Distribution Over Time</h3>
          {mounted && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e2b824" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e2b824" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#767688', fontSize: 11 }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="top" name="Top" stroke="#4ade80" fill="url(#topGrad)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="avg" name="Average" stroke="#e2b824" fill="url(#avgGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="low" name="Low" stroke="#f87171" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Dept bar */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-5">Department Comparison</h3>
            {mounted && (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={deptData} layout="vertical">
                  <XAxis type="number" tick={{ fill: '#767688', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <YAxis dataKey="dept" type="category" tick={{ fill: '#9d9daa', fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avg" name="Avg Score" fill="#e2b824" radius={[0, 4, 4, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Pie — grade distribution */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-5">Grade Distribution</h3>
            {mounted && (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={gradeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                    {gradeData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value) => <span style={{ color: '#9d9daa', fontSize: 11, fontFamily: 'DM Sans' }}>{value}</span>}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
