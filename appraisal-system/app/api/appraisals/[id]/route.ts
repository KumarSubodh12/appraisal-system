import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appraisal = await prisma.appraisal.findUnique({
      where: { id: params.id },
      include: {
        employee: true,
        reviewer: { select: { id: true, name: true, email: true } },
      },
    })
    if (!appraisal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(appraisal)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const appraisal = await prisma.appraisal.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(appraisal)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.appraisal.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
