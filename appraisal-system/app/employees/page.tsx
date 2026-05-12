'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Link from 'next/link'

const mockEmployees = [
  { id: '1', name: 'Priya Sharma', role: 'Senior Engineer', dept: 'Engineering', score: 92, status: 'Completed' },
  { id: '2', name: 'Rahul Gupta', role: 'Product Designer', dept: 'Design', score: 88, status: 'In Review' },
  { id: '3', name: 'Ananya Singh', role: 'Marketing Lead', dept: 'Marketing', score: 79, status: 'Pending' },
  { id: '4', name: 'Vikram Patel', role: 'Sales Manager', dept: 'Sales', score: 85, status: 'Completed' },
  { id: '5', name: 'Neha Joshi', role: 'HR Specialist', dept: 'HR', score: 91, status: 'Completed' },
  { id: '6', name: 'Arjun Kumar', role: 'Backend Dev', dept: 'Engineering', score: 76, status: 'Pending' },
]

const statusColors: Record<string, string> = {
  'Completed': 'text-green-400 bg-green-400/10',
  'In Review': 'text-gold-400 bg-gold-400/10',
  'Pending': 'text-obsidian-400 bg-obsidian-400/10',
}

export default function EmployeesPage() {
  const [search, setSearch] = useState('')
  const filtered = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-10 reveal">
          <div>
            <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">People</p>
            <h1 className="font-display text-4xl text-white">Employees</h1>
          </div>
          <Link href="/appraisals/new" className="btn-gold px-6 py-2.5 rounded-lg font-body text-sm">
            + New Appraisal
          </Link>
        </div>

        {/* Search */}
        <div className="glass p-2 mb-6 reveal flex items-center gap-3">
          <span className="text-obsidian-500 pl-3">⌕</span>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent font-body text-white placeholder-obsidian-500 text-sm focus:outline-none py-2"
          />
        </div>

        {/* Table */}
        <div className="glass overflow-hidden reveal">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-500/10">
                {['Employee', 'Department', 'Role', 'ML Score', 'Status', 'Action'].map(h => (
                  <th key={h} className="font-body text-obsidian-400 text-xs uppercase tracking-widest px-6 py-4 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="border-b border-gold-500/5 hover:bg-gold-500/3 transition-colors" style={{animationDelay: `${i * 0.05}s`}}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold-500/15 flex items-center justify-center">
                        <span className="font-display text-gold-400 text-sm">{emp.name[0]}</span>
                      </div>
                      <span className="font-body text-white text-sm">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body text-obsidian-300 text-sm">{emp.dept}</td>
                  <td className="px-6 py-4 font-body text-obsidian-400 text-sm">{emp.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-obsidian-800 rounded-full overflow-hidden w-20">
                        <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full" style={{width: `${emp.score}%`}} />
                      </div>
                      <span className="font-mono text-gold-400 text-sm">{emp.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-body text-xs px-3 py-1 rounded-full ${statusColors[emp.status]}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/appraisals/${emp.id}`} className="font-body text-gold-500 text-xs hover:text-gold-300 transition-colors">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
