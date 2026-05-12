import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const employees = await prisma.user.findMany({
      select: {
        id: true, name: true, email: true, role: true,
        department: true, position: true, joinedAt: true, image: true,
        appraisals: { select: { mlScore: true, status: true, period: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(employees)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, department, position, role } = body

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 })

    const user = await prisma.user.create({
      data: { name, email, department, position, role: role || 'EMPLOYEE' },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
