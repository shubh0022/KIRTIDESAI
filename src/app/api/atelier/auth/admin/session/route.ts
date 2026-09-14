import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import globalStore from '@/lib/atelier-db/store';
import { SEED_USERS } from '@/lib/atelier-db/seed';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = globalStore.getUserById(session.userId) || SEED_USERS.find((u) => u.id === session.userId);
  return NextResponse.json({
    authenticated: true,
    user: user || {
      id: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
      avatarUrl: '/images/hero/kirti-hero-chandelier.jpg',
    },
    role: session.role,
    permissions: session.permissions,
  });
}
