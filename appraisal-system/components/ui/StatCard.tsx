interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon?: string
  delay?: number
}

export default function StatCard({ label, value, change, icon, delay = 0 }: StatCardProps) {
  const isPositive = change?.startsWith('+')

  return (
    <div className="glass p-6 reveal" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-start justify-between mb-3">
        {icon && <span className="text-2xl">{icon}</span>}
        {change && (
          <span className={`font-body text-xs px-2 py-1 rounded-full ml-auto ${isPositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="font-display text-3xl text-white mb-1">{value}</div>
      <div className="font-body text-obsidian-400 text-xs uppercase tracking-wider">{label}</div>
    </div>
  )
}
