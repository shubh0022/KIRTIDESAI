import { NextResponse } from 'next/server';
import { getClientSession } from '@/lib/auth/session';
import { SEED_USERS } from '@/lib/atelier-db/seed';

export async function GET() {
  const session = await getClientSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = SEED_USERS.find((u) => u.id === session.userId);
  return NextResponse.json({
    authenticated: true,
    user: user || {
      id: session.userId,
      name: session.name,
      email: session.email,
      role: 'CLIENT',
    },
  });
}
