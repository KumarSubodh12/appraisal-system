'use client'
import { useEffect, useState } from 'react'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  label?: string
}

export default function ScoreRing({ score, size = 120, strokeWidth = 8, label }: ScoreRingProps) {
  const [animated, setAnimated] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * animated) / 100

  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = 0
      const step = score / 60
      const timer = setInterval(() => {
        current += step
        if (current >= score) { setAnimated(score); clearInterval(timer) }
        else setAnimated(Math.floor(current * 10) / 10)
      }, 16)
      return () => clearInterval(timer)
    }, 300)
    return () => clearTimeout(timeout)
  }, [score])

  const color = score >= 90 ? '#4ade80' : score >= 80 ? '#e2b824' : score >= 70 ? '#fde047' : '#f87171'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(226,184,36,0.1)" strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl" style={{ color }}>{animated.toFixed(1)}</span>
          <span className="font-body text-obsidian-500 text-xs">/ 100</span>
        </div>
      </div>
      {label && <span className="font-body text-obsidian-400 text-xs uppercase tracking-widest">{label}</span>}
    </div>
  )
}
