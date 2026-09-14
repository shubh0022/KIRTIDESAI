import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to access couture anatomical profiles.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const targetUserId = adminSession
    ? searchParams.get('userId') || 'user-client-01'
    : clientSession!.userId;

  const measurements = store.getMeasurements(targetUserId);
  return NextResponse.json({ measurements });
}

export async function POST(req: Request) {
  try {
    const adminSession = await getAdminSession();
    const clientSession = await getClientSession();

    if (!adminSession && !clientSession) {
      return NextResponse.json(
        { error: 'Authentication required to record couture anatomical profiles.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const targetUserId = adminSession
      ? body.userId || 'user-client-01'
      : clientSession!.userId;

    const { userId: _, ...profile } = body;
    const saved = store.saveMeasurements(targetUserId, profile);
    return NextResponse.json({ success: true, profile: saved });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save measurements' }, { status: 500 });
  }
}
