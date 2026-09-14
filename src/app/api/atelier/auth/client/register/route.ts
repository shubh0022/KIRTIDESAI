import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import globalStore from '@/lib/atelier-db/store';
import { CLIENT_COOKIE_NAME, encodeSessionToken, ClientSession } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required to create an atelier profile.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = globalStore.getUserByEmail(cleanEmail);
    if (existing) {
      // Existing client - log in directly
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      const sessionData: ClientSession = {
        userId: existing.id,
        email: existing.email,
        name: existing.name,
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
        user: existing,
        message: 'Welcome back to your atelier profile.',
      });
    }

    // Create new client user
    const newUser = globalStore.upsertUser({
      name: name.trim(),
      email: cleanEmail,
      phone: phone?.trim() || '',
      role: 'CLIENT',
      stylePreferences: ['Bespoke Atelier', 'Handloom Heritage'],
    });

    // Send welcome notification
    try {
      globalStore.addNotification(
        newUser.id,
        'CLIENT',
        'SYSTEM',
        'Welcome to Kirti Desai Atelier',
        `Your client account (${cleanEmail}) has been activated. You may now book private consultations and track bespoke commissions.`
      );
    } catch {
      // Non-blocking notification
    }

    // Set 7-day session
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const sessionData: ClientSession = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
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
      user: newUser,
      message: 'Account created successfully.',
    });
  } catch (err) {
    console.error('Client registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
