import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET() {
  const summary = store.getAnalyticsSummary();
  return NextResponse.json({ summary });
}
