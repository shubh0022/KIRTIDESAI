import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  const adminSession = await getAdminSession();
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Administrative clearance required to view atelier financial analytics.' },
      { status: 403 }
    );
  }

  const summary = store.getAnalyticsSummary();
  return NextResponse.json({ summary });
}
