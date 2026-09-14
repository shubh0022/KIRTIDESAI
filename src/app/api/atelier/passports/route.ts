import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { getAdminSession, getClientSession } from '@/lib/auth/session';

export async function GET(req: Request) {
  const adminSession = await getAdminSession();
  const clientSession = await getClientSession();

  if (!adminSession && !clientSession) {
    return NextResponse.json(
      { error: 'Authentication required to access digital piece passports.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  if (adminSession) {
    const ownerId = searchParams.get('ownerId') || undefined;
    const passports = store.getPassports(ownerId);
    return NextResponse.json({ passports });
  }

  const passports = store.getPassports(clientSession!.userId);
  return NextResponse.json({ passports });
}
