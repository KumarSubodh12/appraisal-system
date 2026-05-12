import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

function computeMLScore(input: Record<string, number>): number {
  const weights: Record<string, number> = {
    performance: 0.25, productivity: 0.20, teamwork: 0.15,
    leadership: 0.15, innovation: 0.15, communication: 0.10,
  }
  return Object.entries(weights).reduce((acc, [k, w]) => acc + (input[k] || 0) * w, 0)
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const employeeId = searchParams.get('employeeId')

    const where: any = {}
    if (status) where.status = status
    if (employeeId) where.employeeId = employeeId

    const appraisals = await prisma.appraisal.findMany({
      where,
      include: {
        employee: { select: { id: true, name: true, email: true, department: true, position: true } },
        reviewer: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(appraisals)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { employeeId, reviewerId, period, performance, productivity, teamwork, leadership, innovation, communication, comments, goals } = body

    const scores = { performance, productivity, teamwork, leadership, innovation, communication }
    const mlScore = computeMLScore(scores)

    const weakest = Object.entries(scores).sort(([,a],[,b]) => a - b)[0]
    const strongest = Object.entries(scores).sort(([,a],[,b]) => b - a)[0]
    const mlInsights = `Strongest: ${strongest[0]} (${strongest[1]}). Growth area: ${weakest[0]} (${weakest[1]}). Weighted ML composite score computed.`

    const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / 6

    const appraisal = await prisma.appraisal.create({
      data: {
        employeeId, reviewerId, period,
        performance, productivity, teamwork, leadership, innovation, communication,
        overallScore: Math.round(overallScore * 10) / 10,
        mlScore: Math.round(mlScore * 10) / 10,
        mlInsights, comments, goals,
        status: 'IN_REVIEW',
      },
      include: {
        employee: { select: { name: true, email: true } },
      },
    })

    return NextResponse.json(appraisal, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
