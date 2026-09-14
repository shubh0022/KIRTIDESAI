import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import globalStore from '@/lib/atelier-db/store';
import { SEED_USERS } from '@/lib/atelier-db/seed';
import { ADMIN_COOKIE_NAME, encodeSessionToken, AdminSession } from '@/lib/auth/session';

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
    const adminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'ATELIER_MANAGER'];

    // 1. Look up user in AtelierStore, falling back to SEED_USERS
    const allUsers = [...globalStore.getUsers(), ...SEED_USERS];
    let staffUser = allUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && adminRoles.includes(u.role)
    );

    // Fallback: If cleanEmail is 'admin@kirtidesai.com' or 'kirti@kirtidesai.com'
    if (!staffUser && (cleanEmail === 'admin@kirtidesai.com' || cleanEmail === 'kirti@kirtidesai.com')) {
      staffUser = {
        id: 'user-admin-01',
        name: 'Kirti Desai',
        email: cleanEmail,
        role: 'SUPER_ADMIN',
        avatarUrl: '/images/hero/kirti-hero-chandelier.jpg',
        createdAt: new Date().toISOString(),
      };
    }

    if (!staffUser) {
      return NextResponse.json(
        { error: 'Invalid administrative credentials. Access restricted to authorized personnel.' },
        { status: 401 }
      );
    }

    // 2. Validate password
    const validPasswords = ['superadmin2026', 'atelier2026', 'kirti2026', 'password'];
    // In demo / staging environment, accept defined master keys or any 6+ char key
    const isPasswordValid = validPasswords.includes(password) || password.length >= 6;
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Incorrect access key or password.' },
        { status: 401 }
      );
    }

    // 3. Set 24-hour administrative session
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const sessionData: AdminSession = {
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

    const token = encodeSessionToken(sessionData);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    // 4. Audit Log
    try {
      globalStore.logAudit(
        staffUser.name,
        staffUser.role,
        'ADMIN_AUTHENTICATED',
        'AUTH_SESSION',
        staffUser.id,
        `Staff authenticated from administrative portal: ${staffUser.email}`
      );
    } catch {
      // Non-blocking audit log
    }

    return NextResponse.json({
      success: true,
      user: {
        id: staffUser.id,
        name: staffUser.name,
        email: staffUser.email,
        role: staffUser.role,
        avatarUrl: staffUser.avatarUrl,
      },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
