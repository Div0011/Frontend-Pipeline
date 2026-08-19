import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, value, rating, delta, id } = body;

    console.log(`[WebVitals] ${name}:`, {
      value: typeof value === 'number' ? value.toFixed(3) : value,
      rating,
      delta: typeof delta === 'number' ? delta.toFixed(3) : delta,
      id,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
