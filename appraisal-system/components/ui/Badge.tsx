type Status = 'Completed' | 'In Review' | 'Pending' | 'Approved' | 'COMPLETED' | 'IN_REVIEW' | 'PENDING' | 'APPROVED'

const map: Record<string, string> = {
  COMPLETED: 'text-green-400 bg-green-400/10 border-green-400/20',
  Completed: 'text-green-400 bg-green-400/10 border-green-400/20',
  IN_REVIEW: 'text-gold-400 bg-gold-400/10 border-gold-400/20',
  'In Review': 'text-gold-400 bg-gold-400/10 border-gold-400/20',
  PENDING: 'text-obsidian-400 bg-obsidian-400/10 border-obsidian-400/20',
  Pending: 'text-obsidian-400 bg-obsidian-400/10 border-obsidian-400/20',
  APPROVED: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Approved: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
}

const labels: Record<string, string> = {
  IN_REVIEW: 'In Review',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  APPROVED: 'Approved',
}

export default function Badge({ status }: { status: Status }) {
  return (
    <span className={`font-body text-xs px-2.5 py-1 rounded-full border ${map[status] || 'text-obsidian-400 bg-obsidian-800 border-obsidian-700'}`}>
      {labels[status] || status}
    </span>
  )
}
