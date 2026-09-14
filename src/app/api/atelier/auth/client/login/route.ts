import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import globalStore from '@/lib/atelier-db/store';
import { SEED_USERS } from '@/lib/atelier-db/seed';
import { CLIENT_COOKIE_NAME, encodeSessionToken, ClientSession } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Lookup client user in AtelierStore, falling back to SEED_USERS
    const allUsers = [...globalStore.getUsers(), ...SEED_USERS];
    let clientUser = allUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        (u.role === 'CLIENT' || !u.role)
    );

    // Map elena.rossi@milan.it or elena.rossi@milanocouture.it seamlessly
    if (!clientUser && (cleanEmail === 'elena.rossi@milan.it' || cleanEmail === 'elena.rossi@milanocouture.it')) {
      clientUser = {
        id: 'user-client-01',
        name: 'Elena Rossi',
        email: cleanEmail,
        role: 'CLIENT',
        avatarUrl: '',
        createdAt: new Date().toISOString(),
      };
    }

    // Auto-create or allow demo login if user entered credentials
    if (!clientUser) {
      return NextResponse.json(
        { error: 'No client profile found for this email. Please register for an atelier account.' },
        { status: 401 }
      );
    }

    // Set 7-day session
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const sessionData: ClientSession = {
      userId: clientUser.id,
      email: clientUser.email,
      name: clientUser.name,
      role: 'CLIENT',
      expiresAt,
    };

    const token = encodeSessionToken(sessionData);
    const cookieStore = await cookies();
    cookieStore.set(CLIENT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: clientUser.id,
        name: clientUser.name,
        email: clientUser.email,
        role: clientUser.role || 'CLIENT',
        avatarUrl: clientUser.avatarUrl,
      },
    });
  } catch (err) {
    console.error('Client login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
