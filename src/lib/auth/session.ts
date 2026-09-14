// Strict Multi-Tier Session & Authorization Management
// PUBLIC != CLIENT != ADMIN

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const CLIENT_COOKIE_NAME = 'kd_client_session';
export const ADMIN_COOKIE_NAME = 'kd_admin_session';

export interface ClientSession {
  userId: string;
  email: string;
  name: string;
  role: 'CLIENT';
  expiresAt: number;
}

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'ATELIER_MANAGER';
  permissions: string[];
  expiresAt: number;
}

// Helper to encode a simple secure token for demo/local storage
export function encodeSessionToken<T>(data: T): string {
  const json = JSON.stringify(data);
  return Buffer.from(json).toString('base64url');
}

export function decodeSessionToken<T>(token: string): T | null {
  try {
    const json = Buffer.from(token, 'base64url').toString('utf-8');
    const data = JSON.parse(json);
    if (data.expiresAt && Date.now() > data.expiresAt) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// Server Component / API Route Session Getters
export async function getClientSession(): Promise<ClientSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CLIENT_COOKIE_NAME);
  if (!cookie?.value) return null;
  const session = decodeSessionToken<ClientSession>(cookie.value);
  if (!session || session.role !== 'CLIENT') return null;
  return session;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) return null;
  const session = decodeSessionToken<AdminSession>(cookie.value);
  if (!session) return null;
  const validAdminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'ATELIER_MANAGER'];
  if (!validAdminRoles.includes(session.role)) return null;
  return session;
}

// Middleware / Request Session Getters
export function getClientSessionFromRequest(req: NextRequest): ClientSession | null {
  const cookie = req.cookies.get(CLIENT_COOKIE_NAME);
  if (!cookie?.value) return null;
  const session = decodeSessionToken<ClientSession>(cookie.value);
  if (!session || session.role !== 'CLIENT') return null;
  return session;
}

export function getAdminSessionFromRequest(req: NextRequest): AdminSession | null {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
  if (!cookie?.value) return null;
  const session = decodeSessionToken<AdminSession>(cookie.value);
  if (!session) return null;
  const validAdminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'ATELIER_MANAGER'];
  if (!validAdminRoles.includes(session.role)) return null;
  return session;
}

// RBAC Role Checker
export function hasAdminPermission(
  session: AdminSession | null,
  requiredRole?: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'ATELIER_MANAGER'
): boolean {
  if (!session) return false;
  if (session.role === 'SUPER_ADMIN') return true;
  if (!requiredRole) return true;
  if (requiredRole === 'ADMIN' && session.role === 'ADMIN') return true;
  if (requiredRole === 'EDITOR' && (session.role === 'ADMIN' || session.role === 'EDITOR')) return true;
  if (requiredRole === 'ATELIER_MANAGER' && (session.role === 'ADMIN' || session.role === 'ATELIER_MANAGER')) return true;
  return false;
}
