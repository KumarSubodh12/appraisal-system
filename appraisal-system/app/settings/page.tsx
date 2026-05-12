'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    companyName: 'Acme Corp',
    appraisalCycle: 'Quarterly',
    emailNotifications: true,
    autoScore: true,
    publicScores: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-10 reveal">
          <p className="font-body text-gold-500 text-xs tracking-widest uppercase mb-1">Preferences</p>
          <h1 className="font-display text-4xl text-white">Settings</h1>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* General */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-5">General</h3>
            <div className="space-y-4">
              <div>
                <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Company Name</label>
                <input
                  value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                  className="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-gold-500/50"
                />
              </div>
              <div>
                <label className="font-body text-obsidian-300 text-xs uppercase tracking-widest mb-2 block">Appraisal Cycle</label>
                <select
                  value={form.appraisalCycle}
                  onChange={e => setForm({ ...form, appraisalCycle: e.target.value })}
                  className="w-full bg-obsidian-900/50 border border-gold-500/20 rounded-lg px-4 py-3 font-body text-white text-sm focus:outline-none focus:border-gold-500/50"
                >
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Half-Yearly</option>
                  <option>Annually</option>
                </select>
              </div>
            </div>
          </div>

          {/* ML Settings */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-5">ML Engine</h3>
            <div className="space-y-4">
              {[
                { key: 'autoScore', label: 'Auto-compute ML scores', desc: 'Automatically generate ML scores when appraisal is submitted' },
                { key: 'publicScores', label: 'Show scores to employees', desc: 'Allow employees to view their ML score in their profile' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-body text-white text-sm">{item.label}</p>
                    <p className="font-body text-obsidian-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setForm({ ...form, [item.key]: !form[item.key as keyof typeof form] })}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form[item.key as keyof typeof form] ? 'bg-gold-500' : 'bg-obsidian-700'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${form[item.key as keyof typeof form] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="glass p-6 reveal">
            <h3 className="font-display text-lg text-gold-400 mb-5">Notifications</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-body text-white text-sm">Email Notifications</p>
                <p className="font-body text-obsidian-500 text-xs mt-0.5">Send email when appraisal is completed</p>
              </div>
              <button
                onClick={() => setForm({ ...form, emailNotifications: !form.emailNotifications })}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form.emailNotifications ? 'bg-gold-500' : 'bg-obsidian-700'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${form.emailNotifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Save */}
          <button onClick={handleSave} className="btn-gold w-full py-3.5 rounded-lg font-body">
            {saved ? '✓ Saved Successfully' : 'Save Changes'}
          </button>
        </div>
      </main>
    </div>
  )
}
