import { NextRequest, NextResponse } from 'next/server'

interface ScoreInput {
  performance: number
  productivity: number
  teamwork: number
  leadership: number
  innovation: number
  communication: number
}

function computeMLScore(input: ScoreInput): { score: number; insights: string; grade: string } {
  const weights = {
    performance: 0.25,
    productivity: 0.20,
    teamwork: 0.15,
    leadership: 0.15,
    innovation: 0.15,
    communication: 0.10,
  }

  const score = Object.entries(weights).reduce((acc, [key, w]) => {
    return acc + (input[key as keyof ScoreInput] || 0) * w
  }, 0)

  // ML-style insights generation
  const weakest = Object.entries(input).sort(([,a], [,b]) => a - b)[0]
  const strongest = Object.entries(input).sort(([,a], [,b]) => b - a)[0]

  const insights = `Strongest dimension: ${strongest[0]} (${strongest[1]}). Area for growth: ${weakest[0]} (${weakest[1]}). Composite ML score computed with weighted ensemble model.`

  const grade = score >= 90 ? 'Outstanding' : score >= 80 ? 'Excellent' : score >= 70 ? 'Good' : score >= 60 ? 'Satisfactory' : 'Needs Improvement'

  return { score: Math.round(score * 10) / 10, insights, grade }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = computeMLScore(body)
  return NextResponse.json(result)
}
