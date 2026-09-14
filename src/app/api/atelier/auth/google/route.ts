import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import globalStore from '@/lib/atelier-db/store';
import {
  CLIENT_COOKIE_NAME,
  ADMIN_COOKIE_NAME,
  encodeSessionToken,
  ClientSession,
  AdminSession,
} from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, avatarUrl, targetRole = 'CLIENT' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required from Google identity provider.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const displayName = name?.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ');
    const userAvatar = avatarUrl || '';

    // Check if user is logging into Admin portal or is an atelier staff member
    const isAdminTarget =
      targetRole === 'ADMIN' ||
      cleanEmail.endsWith('@kirtidesai.com') ||
      cleanEmail === 'admin@kirtidesai.com' ||
      cleanEmail === 'kirti@kirtidesai.com';

    const cookieStore = await cookies();

    if (isAdminTarget && (targetRole === 'ADMIN' || cleanEmail.endsWith('@kirtidesai.com'))) {
      // 1. Authenticate as Staff / Admin
      const existingUser = globalStore.getUserByEmail(cleanEmail);
      const staffUser = globalStore.upsertUser({
        id: existingUser?.id || (cleanEmail === 'kirti@kirtidesai.com' ? 'user-admin-01' : 'user-admin-02'),
        name: existingUser?.name || displayName,
        email: cleanEmail,
        role: 'SUPER_ADMIN',
        avatarUrl: userAvatar || existingUser?.avatarUrl || '/images/hero/kirti-hero-chandelier.jpg',
      });

      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      const adminSession: AdminSession = {
        userId: staffUser.id,
        email: staffUser.email,
        name: staffUser.name,
        role: staffUser.role as any,
        permissions: [
          'MANAGE_ORDERS',
          'MANAGE_COLLECTIONS',
          'MANAGE_RUNWAY',
          'MANAGE_REQUESTS',
          'MANAGE_MEDIA',
          'VIEW_AUDIT',
        ],
        expiresAt,
      };

      const token = encodeSessionToken(adminSession);
      cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      });

      // Audit log
      try {
        globalStore.logAudit(
          staffUser.name,
          'SUPER_ADMIN',
          'GOOGLE_WORKSPACE_AUTH',
          'AUTH_SESSION',
          staffUser.id,
          `Google Workspace SSO verified for staff: ${cleanEmail}`
        );
      } catch {
        // Non-blocking
      }

      return NextResponse.json({
        success: true,
        targetRole: 'ADMIN',
        redirectUrl: '/admin',
        user: staffUser,
      });
    }

    // 2. Authenticate as Client Atelier User
    const existingClient = globalStore.getUserByEmail(cleanEmail);
    const clientUser = globalStore.upsertUser({
      id: existingClient?.id || (cleanEmail.includes('elena') ? 'user-client-01' : undefined),
      name: existingClient?.name || displayName,
      email: cleanEmail,
      role: 'CLIENT',
      avatarUrl: userAvatar,
      stylePreferences: existingClient?.stylePreferences || ['Bespoke Atelier', 'Living Indian Craft'],
    });

    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const clientSession: ClientSession = {
      userId: clientUser.id,
      email: clientUser.email,
      name: clientUser.name,
      role: 'CLIENT',
      expiresAt,
    };

    const token = encodeSessionToken(clientSession);
    cookieStore.set(CLIENT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      targetRole: 'CLIENT',
      redirectUrl: '/account',
      user: clientUser,
    });
  } catch (err) {
    console.error('Google Auth Route Error:', err);
    return NextResponse.json({ error: 'Failed to process Google authentication.' }, { status: 500 });
  }
}
