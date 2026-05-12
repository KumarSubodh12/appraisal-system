'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/employees', label: 'Employees', icon: '◉' },
  { href: '/appraisals', label: 'Appraisals', icon: '◎' },
  { href: '/appraisals/new', label: 'New Appraisal', icon: '⊕' },
  { href: '/analytics', label: 'Analytics', icon: '◊' },
]

const bottomItems = [
  { href: '/profile', label: 'Profile', icon: '○' },
  { href: '/settings', label: 'Settings', icon: '⊙' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 sidebar-glow border-r border-gold-500/10 bg-obsidian-950/90 backdrop-blur-xl flex flex-col z-50">
      <div className="p-6 border-b border-gold-500/10">
        <Link href="/">
          <h1 className="font-display text-2xl gold-shimmer">AppraisalAI</h1>
          <p className="font-body text-obsidian-500 text-xs mt-1 tracking-widest">ML Performance Suite</p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="font-body text-obsidian-600 text-xs uppercase tracking-widest px-4 mb-3">Main</p>
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 group ${active ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-obsidian-400 hover:text-gold-400 hover:bg-gold-500/5'}`}
            >
              <span className={`text-base transition-transform group-hover:scale-110 ${active ? 'text-gold-400' : ''}`}>{item.icon}</span>
              {item.label}
              {active && <span className="ml-auto w-1 h-4 bg-gold-400 rounded-full" />}
            </Link>
          )
        })}
        <p className="font-body text-obsidian-600 text-xs uppercase tracking-widest px-4 mt-6 mb-3">Account</p>
        {bottomItems.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all duration-200 ${active ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-obsidian-400 hover:text-gold-400 hover:bg-gold-500/5'}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gold-500/10">
        <div className="glass p-3 flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-gold-400 font-display text-sm">{session?.user?.name?.[0] || 'K'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-white text-xs truncate">{session?.user?.name || 'Kumar Subodh'}</p>
            <p className="font-body text-obsidian-500 text-xs truncate">{session?.user?.email || ''}</p>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full font-body text-obsidian-400 text-xs py-2 hover:text-red-400 transition-colors">
          Sign Out
        </button>
        <p className="text-center font-body text-obsidian-700 text-xs mt-3">Made by Kumar Subodh</p>
      </div>
    </aside>
  )
}
