import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST() {
  const token = process.env.TRIGGER_TOKEN;
  const hdr = headers().get('x-trigger-token');

  if (!token || hdr !== token) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // do your actual trigger work here
  return NextResponse.json({ ok: true, triggered: true });
}
