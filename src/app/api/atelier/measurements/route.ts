import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'user-client-01';
  const measurements = store.getMeasurements(userId);
  return NextResponse.json({ measurements });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, ...profile } = body;

    const saved = store.saveMeasurements(userId || 'user-client-01', profile);
    return NextResponse.json({ success: true, profile: saved });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save measurements' }, { status: 500 });
  }
}
