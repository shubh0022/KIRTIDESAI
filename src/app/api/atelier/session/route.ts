import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';
import { SEED_USERS } from '@/lib/atelier-db/seed';

// In-memory active session for pair client/admin simulation
let currentUserId = 'user-client-01'; // Default Elena Rossi

export async function GET() {
  const user = SEED_USERS.find((u) => u.id === currentUserId) || SEED_USERS[0];
  return NextResponse.json({
    user,
    availableUsers: SEED_USERS,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.userId) {
      const found = SEED_USERS.find((u) => u.id === body.userId);
      if (found) {
        currentUserId = found.id;
        return NextResponse.json({ success: true, user: found });
      }
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
