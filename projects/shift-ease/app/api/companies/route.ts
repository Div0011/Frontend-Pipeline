import { NextRequest, NextResponse } from 'next/server';
import { companies } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ companies });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Company application received:', body);
    return NextResponse.json({ success: true, message: 'Application submitted' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
