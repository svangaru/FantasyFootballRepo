import { NextResponse } from 'next/server';

export async function POST() {
  // Simple shared-secret check (set this secret in GitHub → Actions secrets)
  const token = process.env.TRIGGER_TOKEN;
  const header = (globalThis as any).headers?.get?.('x-trigger-token') // Edge case
    ?? (await import('next/headers')).headers().get('x-trigger-token');

  if (!token || header !== token) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // Do your real work here (enqueue, call external runner, etc.)
  return NextResponse.json({ ok: true, triggered: true });
}