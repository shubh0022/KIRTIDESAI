import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET() {
  const auditLog = store.getAuditLog();
  return NextResponse.json({ auditLog });
}
