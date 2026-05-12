import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({ id: params.id, message: 'ok' })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({ id: params.id, message: 'ok' })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({ success: true })
}
