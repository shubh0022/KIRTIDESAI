import { NextResponse } from 'next/server';
import store from '@/lib/atelier-db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || undefined;
  const role = searchParams.get('role') || undefined;

  const notifications = store.getNotifications(userId, role);
  return NextResponse.json({ notifications });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
    }
    const notif = store.markNotificationRead(id);
    return NextResponse.json({ success: true, notification: notif });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update notification' }, { status: 500 });
  }
}
